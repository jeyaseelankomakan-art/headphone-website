import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";

const specs = [
  { label: "Driver", value: "50mm", detail: "Planar Magnetic" },
  { label: "Frequency", value: "5Hz–40kHz", detail: "Hi-Res Certified" },
  { label: "Impedance", value: "32Ω", detail: "Universal" },
  { label: "Battery", value: "60h", detail: "Quantum Cell" },
  { label: "Weight", value: "284g", detail: "Carbon Frame" },
  { label: "Codec", value: "LDAC", detail: "+ aptX Lossless" },
];

const bars = [
  { label: "Bass", value: 92 },
  { label: "Mids", value: 88 },
  { label: "Highs", value: 95 },
  { label: "Soundstage", value: 90 },
  { label: "Isolation", value: 96 },
];

export function Specs() {
  return (
    <section className="relative min-h-screen w-full py-24 flex items-center">
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-14"
        >
          <div className="flex justify-center">
            <SectionLabel index="07" label="Technical Manifest" />
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            Engineered <span className="text-gradient-neon">Spec Sheet</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <GlassCard className="space-y-3 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon-cyan/80">
                  {s.label}
                </div>
                <div className="text-4xl font-light text-white">{s.value}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/45">
                  {s.detail}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="mt-8"
        >
          <GlassCard className="p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-neon-violet/80 mb-6">
              ▸ Acoustic Profile
            </div>
            <div className="space-y-4">
              {bars.map((b, i) => (
                <div key={b.label} className="flex items-center gap-4">
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-white/55 w-24">
                    {b.label}
                  </div>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet"
                      style={{ boxShadow: "0 0 12px oklch(0.88 0.18 200 / 0.6)" }}
                    />
                  </div>
                  <div className="font-mono text-xs text-white/70 w-10 text-right">
                    {b.value}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
