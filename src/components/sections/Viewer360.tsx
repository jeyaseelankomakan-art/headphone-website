import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Headphone } from "@/components/scene/Headphone";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NeonButton } from "@/components/ui/NeonButton";
import { motion } from "framer-motion";
import type { VariantId } from "@/lib/variants";

export function Viewer360({ variant }: { variant: VariantId }) {
  const [explode, setExplode] = useState(0);

  return (
    <section className="relative min-h-screen w-full py-24 flex items-center">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-10"
        >
          <div className="flex justify-center">
            <SectionLabel index="05" label="Interactive Inspection" />
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            360° <span className="text-gradient-neon">Inspection</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto">
            Drag to rotate. Pinch to zoom. Explode the chassis to study every
            cybernetic component of the AETHER-X9.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="glass relative rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[21/9]"
        >
          <Canvas
            shadows
            dpr={[1, 1.75]}
            camera={{ position: [0, 0.3, 4], fov: 38 }}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.35} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <spotLight position={[-4, 3, 2]} angle={0.5} penumbra={0.8} intensity={1.4} color="#a855f7" />
              <spotLight position={[4, -2, 3]} angle={0.6} penumbra={0.9} intensity={1.2} color="#22d3ee" />
              <Environment preset="city" environmentIntensity={0.4} />
              <Headphone variant={variant} explode={explode} rotate={false} />
              <OrbitControls
                enablePan={false}
                minDistance={2.5}
                maxDistance={6}
                enableDamping
                dampingFactor={0.08}
              />
            </Suspense>
          </Canvas>

          {/* HUD overlays */}
          <div className="pointer-events-none absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan/80">
            ▸ Live Inspection
          </div>
          <div className="pointer-events-none absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
            Drag · Zoom · Rotate
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
            <NeonButton variant="ghost" onClick={() => setExplode(0)}>
              Assemble
            </NeonButton>
            <NeonButton variant="primary" onClick={() => setExplode(1)}>
              Explode View
            </NeonButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
