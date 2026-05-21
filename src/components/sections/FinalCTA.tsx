import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/NeonButton";

export function FinalCTA() {
  return (
    <motion.section className="relative min-h-screen w-full flex items-center justify-center py-24 bg-gradient-to-br from-[#0d0d2b] via-[#1a1a40] to-[#0d0d2b]">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl pointer-events-none"></div>
      <div className="text-center px-6 space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-mono text-[11px] uppercase tracking-[0.45em] text-neon-violet/90"
        >
          The AETHER-X9 · Available Q4 2026
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] font-light tracking-tight max-w-5xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] to-[#ec4899] animate-pulse"
        >
          <span className="block text-white/95">Experience Sound</span>
          <span className="block text-gradient-neon font-medium text-glow-violet">
            Beyond Reality
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex flex-col items-center gap-5 pt-4"
        >
          <NeonButton variant="primary" size="lg">
            Reserve Yours · $899
          </NeonButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
            Free worldwide shipping · 30-day audition
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
