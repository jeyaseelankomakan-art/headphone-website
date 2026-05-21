import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import type { VariantId } from "@/lib/variants";

const links = [
  { label: "Audio", href: "#noise" },
  { label: "Spatial", href: "#spatial" },
  { label: "Controls", href: "#touch" },
  { label: "Power", href: "#battery" },
  { label: "Inspect", href: "#viewer" },
  { label: "Finish", href: "#variants" },
  { label: "Specs", href: "#specs" },
];

export function Nav({ variant }: { variant: VariantId }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-md bg-background/60 border-b border-white/5" : "py-5"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="relative h-6 w-6">
            <div className="absolute inset-0 rounded-sm border border-neon-cyan rotate-45" />
            <div className="absolute inset-1 rounded-sm bg-neon-cyan/50 rotate-45 animate-pulse-glow text-neon-cyan" />
          </div>
          <span className="font-mono text-sm uppercase tracking-[0.4em] text-white">
            Aether
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55 hover:text-neon-cyan transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          <span className="hidden sm:inline">{variant.replace("-", " ")}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse-glow text-neon-cyan" />
        </div>
      </div>
    </motion.header>
  );
}
