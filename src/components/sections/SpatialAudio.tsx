import { FeatureSection } from "./FeatureSection";

function SpatialVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center [perspective:800px]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border-2 border-neon-violet/50"
          style={{
            width: `${60 + i * 12}%`,
            height: `${60 + i * 12}%`,
            transform: `rotateX(70deg) rotateZ(${i * 30}deg)`,
            animation: `spin 12s linear infinite`,
            animationDelay: `${i * -2}s`,
            boxShadow: "0 0 30px oklch(0.7 0.27 305 / 0.4)",
          }}
        />
      ))}
      <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-neon-violet to-neon-blue shadow-[0_0_60px_oklch(0.7_0.27_305/0.8)]" />
      <style>{`@keyframes spin { to { transform: rotateX(70deg) rotateZ(360deg); } }`}</style>
    </div>
  );
}

export function SpatialAudio() {
  return (
    <FeatureSection
      index="02"
      label="Holographic Field"
      title={
        <>
          Spatial <span className="text-gradient-neon">Dimension</span>
        </>
      }
      description="360° head-tracked audio places every instrument in three-dimensional space. Music doesn't play — it surrounds, hovers, and breathes around you."
      align="right"
      accent="violet"
      stats={[
        { label: "Channels", value: "16.4" },
        { label: "Tracking", value: "9DOF" },
        { label: "Refresh", value: "1kHz" },
      ]}
      visual={<SpatialVisual />}
    />
  );
}
