import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CanvasRoot } from "@/components/scene/CanvasRoot";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { NoiseCancellation } from "@/components/sections/NoiseCancellation";
import { SpatialAudio } from "@/components/sections/SpatialAudio";
import { TouchControls } from "@/components/sections/TouchControls";
import { Battery } from "@/components/sections/Battery";
import { Viewer360 } from "@/components/sections/Viewer360";
import { ColorVariants } from "@/components/sections/ColorVariants";
import { Specs } from "@/components/sections/Specs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { useLenis } from "@/lib/useLenis";
import type { VariantId } from "@/lib/variants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AETHER-X9 · Hear The Future" },
      {
        name: "description",
        content:
          "AETHER-X9 — a futuristic AI-powered headphone. Neural noise cancellation, spatial audio, quantum cell battery. Hear the future.",
      },
      { property: "og:title", content: "AETHER-X9 · Hear The Future" },
      {
        property: "og:description",
        content:
          "A cybernetic listening device engineered for the next decade. Neural adaptive audio. Holographic spatial fields.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  const [variant, setVariant] = useState<VariantId>("titanium");
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const [explode, setExplode] = useState(0);

  // scroll progress 0..1 over the hero+feature sections (we stop 3D scroll
  // anim before the 360 viewer takes over and final CTA)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = h > 0 ? window.scrollY / h : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main id="top" className="relative bg-background text-foreground min-h-screen">
      {/* Fixed 3D scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CanvasRoot
          variant={variant}
          scrollProgress={scrollProgress}
          mouse={mouse}
          explode={explode}
        />
        {/* atmospheric vignette + grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-30 mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05060c_85%)] pointer-events-none" />
      </div>

      <Nav variant={variant} />

      {/* Sections sit above the canvas */}
      <div className="relative z-10">
        <Hero />
        <div id="noise"><NoiseCancellation /></div>
        <div id="spatial"><SpatialAudio /></div>
        <div id="touch"><TouchControls /></div>
        <div id="battery"><Battery /></div>

        {/* 360 viewer uses its own Canvas; the scrolling 3D hero recedes here */}
        <div id="viewer">
          <Viewer360 variant={variant} />
        </div>

        <div id="variants">
          <ColorVariants variant={variant} onChange={setVariant} />
        </div>

        <div id="specs"><Specs /></div>

        <FinalCTA />
        <Footer />
      </div>

      {/* Floating explode trigger keeps backwards-compat; managed inside Viewer360 instead */}
      <span className="sr-only">{explode}</span>
      <button className="sr-only" onClick={() => setExplode((e) => (e ? 0 : 1))} />
    </main>
  );
}
