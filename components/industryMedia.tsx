import type { LucideIcon } from "lucide-react";
import { HeartPulse, Car, Cpu, Cable, Aperture, Newspaper, Layers, Cog, Plane } from "lucide-react";

// Real industry photos live in the COS bucket: IMAGE/application
// NOTE: filenames are transcribed from the source folder and include the
// original typos ("MANUFACURING", "CURRING"). All assumed .webp.
const BASE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/application";

const raw: Record<string, string> = {
  "Medical Device": `${BASE}/UV CURING APPLICATION-MANUFACURING-MEDICAL DEVICE ASSEMBLY.webp`,
  "Automotive": `${BASE}/UV CURING APPLICATION-MANUFACURING-AUTOMOTIVE MANUFACTURING.webp`,
  "Electronics": `${BASE}/UV CURRING APPLICATION-ELECTRONICS MANUFACTURING-PCB BY ROBOT.webp`,
  "Cable & Fiber": `${BASE}/UV CURING APPLICATION-CABLE ASSEMBLY MANUFACTURING-REDORANGE CABLES.webp`,
  "Precision Optics": `${BASE}/UV CURING APPLICATION-MANUFACURING-OPTICAL FIBER MANUFACTURING.webp`,
  "UV Printing": `${BASE}/UV CURING APPLICATION-MANUFACURING-UVPRINTING.webp`,
  "Wood Coatings": `${BASE}/UV CURING APPLICATION-MANUFACTURING-WOOD COATING.webp`,
  "Metal Coatings": `${BASE}/UV CURING APPLICATION-MANUFACURING-metal substrates with UV curing-BLUE TINS ON THE LINE.webp`,
};

// Pre-encoded URLs (spaces -> %20) for direct use in <img src>.
export const industryImage: Record<string, string> = Object.fromEntries(
  Object.entries(raw).map(([k, v]) => [k, encodeURI(v)])
);

// Clean line-icon fallback for industries without a photo (e.g. Aerospace).
export const industryFallbackIcon: Record<string, LucideIcon> = {
  "Medical Device": HeartPulse,
  "Automotive": Car,
  "Electronics": Cpu,
  "Cable & Fiber": Cable,
  "Precision Optics": Aperture,
  "UV Printing": Newspaper,
  "Wood Coatings": Layers,
  "Metal Coatings": Cog,
  "Aerospace": Plane,
};
