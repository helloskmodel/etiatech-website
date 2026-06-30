import type { LucideIcon } from "lucide-react";
import { HeartPulse, Car, Cpu, Cable, Aperture, Newspaper, Layers, Cog, Plane, CircuitBoard } from "lucide-react";

// Industry photos live in the COS bucket under: IMAGE/industries/<slug>.png
// Clean, lowercase, hyphenated filenames — no spaces.
const BASE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/industries";

const slug: Record<string, string> = {
  "Medical Device": "medical-device",
  "Automotive": "automotive",
  "Electronics & Semiconductor": "electronics",
  "Optical Fiber & Cable": "cable-fiber",
  "Optics & Optical Assembly": "precision-optics",
  "UV Printing": "uv-printing",
  "Wood Coatings": "wood-coatings",
  "Metal Coatings": "metal-coatings",
  "Aerospace": "aerospace",
};

export const industryImage: Record<string, string> = Object.fromEntries(
  Object.entries(slug).map(([k, v]) => [k, `${BASE}/${v}.png`])
);

// Accent color per industry — shared by the Application page and home carousel.
export const industryColors: Record<string, string> = {
  "Medical Device": "#e11d48",
  "Automotive": "#1e3a5f",
  "Electronics & Semiconductor": "#1A56DB",
  "Optical Fiber & Cable": "#0d9488",
  "Optics & Optical Assembly": "#7c3aed",
  "UV Printing": "#d97706",
  "Wood Coatings": "#16a34a",
  "Metal Coatings": "#92400e",
  "Aerospace": "#475569",
  "Photonics & Advanced Packaging": "#0891b2",
};

// Clean line-icon fallback, used if a photo is missing.
export const industryFallbackIcon: Record<string, LucideIcon> = {
  "Medical Device": HeartPulse,
  "Automotive": Car,
  "Electronics & Semiconductor": Cpu,
  "Optical Fiber & Cable": Cable,
  "Optics & Optical Assembly": Aperture,
  "UV Printing": Newspaper,
  "Wood Coatings": Layers,
  "Metal Coatings": Cog,
  "Aerospace": Plane,
  "Photonics & Advanced Packaging": CircuitBoard,
};
