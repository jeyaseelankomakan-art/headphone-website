export type VariantId = "titanium" | "neon-blue" | "cyber-red" | "silver-chrome";

export interface Variant {
  id: VariantId;
  name: string;
  body: string;       // metallic body color (hex)
  accent: string;     // neon emissive (hex)
  swatch: string;     // CSS color for UI swatch
  metalness: number;
  roughness: number;
}

export const VARIANTS: Variant[] = [
  {
    id: "titanium",
    name: "Black Titanium",
    body: "#1a1d24",
    accent: "#22d3ee",
    swatch: "linear-gradient(135deg,#2a2d35,#0a0c12)",
    metalness: 0.95,
    roughness: 0.28,
  },
  {
    id: "neon-blue",
    name: "Neon Blue",
    body: "#0b1a3a",
    accent: "#60a5fa",
    swatch: "linear-gradient(135deg,#1e40af,#0b1a3a)",
    metalness: 0.85,
    roughness: 0.22,
  },
  {
    id: "cyber-red",
    name: "Cyber Red",
    body: "#2a0a12",
    accent: "#ff3b6b",
    swatch: "linear-gradient(135deg,#7f1d1d,#2a0a12)",
    metalness: 0.9,
    roughness: 0.3,
  },
  {
    id: "silver-chrome",
    name: "Silver Chrome",
    body: "#c8ccd4",
    accent: "#a855f7",
    swatch: "linear-gradient(135deg,#e5e7eb,#9aa0a8)",
    metalness: 1.0,
    roughness: 0.12,
  },
];

export const getVariant = (id: VariantId) =>
  VARIANTS.find((v) => v.id === id) ?? VARIANTS[0];
