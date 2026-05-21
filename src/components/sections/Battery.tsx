import { FeatureSection } from "./FeatureSection";

function BatteryVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative h-48 w-48 rounded-full border border-neon-violet/40 flex items-center justify-center">
        {/* energy core */}
        <div
          className="h-32 w-32 rounded-full bg-[radial-gradient(circle_at_30%_30%,oklch(0.7_0.27_305),oklch(0.4_0.2_290)_60%,transparent_80%)] animate-pulse-glow text-neon-violet"
        />
        {/* orbiting electron */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -ml-1.5 h-3 w-3 rounded-full bg-neon-cyan shadow-[0_0_16px_oklch(0.88_0.18_200/0.9)]" />
        </div>
        <div
          className="absolute inset-0 animate-[spin_5s_linear_infinite_reverse]"
          style={{ transform: "rotate(60deg)" }}
        >
          <div className="absolute top-0 left-1/2 -ml-1 h-2 w-2 rounded-full bg-neon-violet shadow-[0_0_14px_oklch(0.7_0.27_305/0.9)]" />
        </div>
        {/* charge ring */}
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="oklch(0.7 0.27 305 / 0.2)" strokeWidth="1" />
          <circle
            cx="50" cy="50" r="46" fill="none"
            stroke="oklch(0.88 0.18 200)" strokeWidth="1.5"
            strokeDasharray="289" strokeDashoffset="58"
            strokeLinecap="round" transform="rotate(-90 50 50)"
          />
        </svg>
        <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
          80% · 48h Remaining
        </span>
      </div>
    </div>
  );
}

export function Battery() {
  return (
    <FeatureSection
      index="04"
      label="Quantum Cell"
      title={
        <>
          Energy <span className="text-gradient-neon">Core</span>
        </>
      }
      description="A solid-state quantum cell sustains 60 hours of playback. Five-minute fast charge yields a full eight-hour session — engineered to outlast your day."
      align="right"
      accent="violet"
      stats={[
        { label: "Playback", value: "60h" },
        { label: "Fast Chg", value: "5min" },
        { label: "Cycles", value: "5K" },
      ]}
      visual={<BatteryVisual />}
    />
  );
}
