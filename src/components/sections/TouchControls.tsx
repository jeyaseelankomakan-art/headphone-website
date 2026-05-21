import { FeatureSection } from "./FeatureSection";

function TouchVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative h-48 w-48 rounded-full border border-neon-cyan/40">
        {/* center dot */}
        <div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-neon-cyan shadow-[0_0_20px_oklch(0.88_0.18_200/0.9)]" />
        {/* gesture arcs */}
        <div className="absolute inset-0 rounded-full border-t-2 border-neon-cyan/80 animate-pulse-glow text-neon-cyan" />
        {/* tap markers */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 h-2 w-2 -mt-1 -ml-1 rounded-full bg-white/80"
            style={{ transform: `rotate(${deg}deg) translateX(96px)` }}
          />
        ))}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
          Swipe · Tap · Hold
        </div>
      </div>
    </div>
  );
}

export function TouchControls() {
  return (
    <FeatureSection
      index="03"
      label="Capacitive Surface"
      title={
        <>
          Smart Touch <span className="text-gradient-neon">Interface</span>
        </>
      }
      description="The entire outer cup is a haptic gesture surface. Skip tracks with a swipe, summon the assistant with a hold, sculpt EQ with a circular drag."
      align="left"
      stats={[
        { label: "Gestures", value: "12" },
        { label: "Sensors", value: "64" },
        { label: "Response", value: "8ms" },
      ]}
      visual={<TouchVisual />}
    />
  );
}
