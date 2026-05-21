import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VARIANTS, type VariantId, getVariant } from "@/lib/variants";

interface Props {
  variant: VariantId;
  onChange: (v: VariantId) => void;
}

export function ColorVariants({ variant, onChange }: Props) {
  const active = getVariant(variant);
  return (
    <section className="relative min-h-screen w-full flex items-center py-24">
      <div className="container mx-auto max-w-7xl px-6 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <SectionLabel index="06" label="Material Forge" accent="violet" />
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            Four <span className="text-gradient-neon">Finishes</span>
          </h2>
          <p className="text-white/55 max-w-xl mx-auto">
            Choose your alloy. Each finish is forged from aerospace-grade
            material and tuned with a signature neon accent.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {VARIANTS.map((v) => {
            const isActive = v.id === variant;
            return (
              <button
                key={v.id}
                onClick={() => onChange(v.id)}
                className="group flex flex-col items-center gap-3"
              >
                <div
                  className={`relative h-20 w-20 md:h-24 md:w-24 rounded-full transition-all duration-500 ${
                    isActive ? "scale-110" : "scale-100 opacity-60 group-hover:opacity-100"
                  }`}
                  style={{
                    background: v.swatch,
                    boxShadow: isActive
                      ? `0 0 0 2px ${v.accent}, 0 0 40px ${v.accent}88`
                      : "0 0 0 1px oklch(1 0 0 / 0.1)",
                  }}
                >
                  <span
                    className="absolute inset-0 m-auto h-3 w-3 rounded-full"
                    style={{
                      background: v.accent,
                      boxShadow: `0 0 16px ${v.accent}`,
                    }}
                  />
                </div>
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.3em] transition-colors ${
                    isActive ? "text-white" : "text-white/45"
                  }`}
                >
                  {v.name}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-white/55"
        >
          Selected · <span style={{ color: active.accent }}>{active.name}</span>
        </motion.div>
      </div>
    </section>
  );
}
