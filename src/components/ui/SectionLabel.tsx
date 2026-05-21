interface Props {
  index: string;
  label: string;
  accent?: "cyan" | "violet";
}

export function SectionLabel({ index, label, accent = "cyan" }: Props) {
  const color = accent === "cyan" ? "text-neon-cyan" : "text-neon-violet";
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-white/60">
      <span className={`${color}`}>{index}</span>
      <span className="h-px w-10 bg-white/20" />
      <span>{label}</span>
    </div>
  );
}
