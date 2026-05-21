import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlassCard } from "@/components/ui/GlassCard";

interface FeatureSectionProps {
  index: string;
  label: string;
  title: React.ReactNode;
  description: string;
  align?: "left" | "right";
  visual?: React.ReactNode;
  stats?: { label: string; value: string }[];
  accent?: "cyan" | "violet";
}

export function FeatureSection({
  index,
  label,
  title,
  description,
  align = "left",
  visual,
  stats,
  accent = "cyan",
}: FeatureSectionProps) {
  const isLeft = align === "left";
  return (
    <section className="relative min-h-screen w-full flex items-center py-24">
      <div className="container mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`${isLeft ? "md:order-1" : "md:order-2"} space-y-6`}
        >
          <SectionLabel index={index} label={label} accent={accent} />
          <h2 className="text-4xl md:text-6xl font-light leading-[1.05] tracking-tight text-white">
            {title}
          </h2>
          <p className="text-white/55 text-base md:text-lg max-w-lg">{description}</p>

          {stats && (
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-2xl text-white">{s.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`${isLeft ? "md:order-2" : "md:order-1"}`}
        >
          <GlassCard className="aspect-square p-8 flex items-center justify-center">
            {visual}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
