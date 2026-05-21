import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center">
      {/* top status bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse-glow text-neon-cyan" />
        SYS.AUDIO_ENGINE / ONLINE
      </div>

      {/* corner HUD */}
      <CornerHud position="tl" label="MODEL // AETHER-X9" />
      <CornerHud position="tr" label="LAT 37.77 / LON -122.41" />
      <CornerHud position="bl" label="DSP / 32BIT · 384KHZ" />
      <CornerHud position="br" label="UPLINK / SECURE" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] uppercase tracking-[0.45em] text-neon-cyan/90 mb-6"
        >
          Next-Gen AI Audio · 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-[clamp(3rem,12vw,9rem)] leading-[0.95] font-light tracking-tight"
        >
          <span className="block text-white/95">Hear The</span>
          <span className="block text-gradient-neon font-medium text-glow-cyan">Future</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 max-w-md mx-auto text-white/55 text-sm md:text-base"
        >
          A cybernetic listening device engineered for the next decade. Neural
          adaptive audio, holographic spatial fields, lifetime-grade titanium.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <NeonButton variant="primary" size="lg">
            Pre-Order · $899
          </NeonButton>
          <NeonButton variant="ghost" size="lg">
            Watch Film
          </NeonButton>
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40"
      >
        <span>Scroll</span>
        <div className="relative h-10 w-px bg-white/20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-3 bg-neon-cyan animate-scan" />
        </div>
      </motion.div>
    </section>
  );
}

function CornerHud({ position, label }: { position: "tl" | "tr" | "bl" | "br"; label: string }) {
  const pos = {
    tl: "top-6 left-6 items-start",
    tr: "top-6 right-6 items-end text-right",
    bl: "bottom-6 left-6 items-start",
    br: "bottom-6 right-6 items-end text-right",
  }[position];
  return (
    <div className={`absolute ${pos} z-20 hidden md:flex flex-col gap-1`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
        {label}
      </span>
      <span className="h-px w-16 bg-gradient-to-r from-neon-cyan/60 to-transparent" />
    </div>
  );
}
