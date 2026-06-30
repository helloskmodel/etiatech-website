import type { LucideIcon } from "lucide-react";
import { HeartPulse, Car, Cpu, Cable, Aperture, Newspaper, Layers, Cog, Plane, CircuitBoard } from "lucide-react";

// Industry photos live in the COS bucket under: IMAGE/industries/<slug>.png
// Clean, lowercase, hyphenated filenames — no spaces.
const BASE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/industries";

const slug: Record<string, string> = {
  "Medical Device Assembly": "medical-device",
  "Automotive & ADAS": "automotive",
  "Electronics & PCB Assembly": "electronics",
  "Optical Fiber & Cable Manufacturing": "cable-fiber",
  "Optics & Imaging Systems": "precision-optics",
  "Printing & Graphic Arts": "uv-printing",
  "Wood & Furniture Coatings": "wood-coatings",
  "Metal & Industrial Coatings": "metal-coatings",
  "Aerospace & Defense": "aerospace",
};

export const industryImage: Record<string, string> = Object.fromEntries(
  Object.entries(slug).map(([k, v]) => [k, `${BASE}/${v}.png`])
);

// Accent color per industry — shared by the Application page and home carousel.
export const industryColors: Record<string, string> = {
  "Medical Device Assembly": "#e11d48",
  "Automotive & ADAS": "#1e3a5f",
  "Electronics & PCB Assembly": "#1A56DB",
  "Photonics & Advanced Packaging": "#0891b2",
  "Optical Fiber & Cable Manufacturing": "#0d9488",
  "Optics & Imaging Systems": "#7c3aed",
  "Printing & Graphic Arts": "#d97706",
  "Wood & Furniture Coatings": "#16a34a",
  "Metal & Industrial Coatings": "#92400e",
  "Aerospace & Defense": "#475569",
};

// Clean line-icon fallback, used if a photo is missing.
export const industryFallbackIcon: Record<string, LucideIcon> = {
  "Medical Device Assembly": HeartPulse,
  "Automotive & ADAS": Car,
  "Electronics & PCB Assembly": Cpu,
  "Photonics & Advanced Packaging": CircuitBoard,
  "Optical Fiber & Cable Manufacturing": Cable,
  "Optics & Imaging Systems": Aperture,
  "Printing & Graphic Arts": Newspaper,
  "Wood & Furniture Coatings": Layers,
  "Metal & Industrial Coatings": Cog,
  "Aerospace & Defense": Plane,
};
