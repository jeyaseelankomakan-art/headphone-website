import { FeatureSection } from "./FeatureSection";

function ShieldVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-neon-cyan/40 animate-pulse-glow text-neon-cyan"
          style={{
            width: `${i * 22}%`,
            height: `${i * 22}%`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
      <div className="relative h-10 w-10 rounded-full bg-neon-cyan/30 border border-neon-cyan shadow-[0_0_40px_oklch(0.88_0.18_200/0.8)]" />
      {/* incoming particle lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 h-px w-1/2 origin-left bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ transform: `rotate(${i * 45}deg)` }}
        />
      ))}
    </div>
  );
}

export function NoiseCancellation() {
  return (
    <FeatureSection
      index="01"
      label="Adaptive Neural Shield"
      title={
        <>
          AI Noise <span className="text-gradient-neon">Cancellation</span>
        </>
      }
      description="A neural DSP samples ambient frequencies 192,000 times per second, generating an inverse soundwave field that dissolves intrusion before it reaches your ears."
      align="left"
      stats={[
        { label: "Reduction", value: "-48dB" },
        { label: "Latency", value: "0.4ms" },
        { label: "Cores", value: "6" },
      ]}
      visual={<ShieldVisual />}
    />
  );
}
