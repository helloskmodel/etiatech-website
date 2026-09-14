// Legacy /application/[slug] URLs → their closest live page.
//
// WHY THIS EXISTS
// The old site published 62 application notes at /application/[slug] (see
// `applicationNotes.ts`). When the section was rebuilt as /applications/[slug]
// with 18 reviewed notes, next.config sent every old URL to the /applications
// index with a single `/application/:path*` catch-all. That is a many-to-one
// redirect onto a generic list page, which Google treats as a SOFT 404: the old
// URL is dropped from the index instead of passing its ranking signals on, so
// every impression those 62 pages earned is simply lost. Search Console shows
// them under "Page with redirect".
//
// A redirect only carries ranking signals when it lands on a page about the
// SAME thing. So each old slug is mapped to the closest live equivalent:
//
//   Tier 1 — the note still exists under its new name → the new note.
//   Tier 2 — no direct successor, but the subject belongs to a live industry
//            or technology page → that page.
//
// Anything not listed here keeps the old catch-all behaviour (→ /applications).
// The catch-all must stay LAST in next.config's redirect list; the first
// matching rule wins.
//
// Destinations are verified by `scripts/validate-legacy-redirects.mjs`, which
// fails if any of them stops returning 200.

const APP = (slug: string) => `/applications/${slug}`;
const INDUSTRY = (slug: string) => `/solutions/${slug}`;
const TECH = (slug: string) => `/product/technology/${slug}`;

export const LEGACY_APPLICATION_REDIRECTS: Record<string, string> = {
  // ── Tier 1: renamed notes, one-to-one ──────────────────────────────────
  "balloon-catheter-tip-bonding": APP("uv-spot-curing-cardiovascular-catheter-bonding"),
  "hypodermic-needle-cannula-assembly": APP("uv-led-curing-hypodermic-needle-cannula-assembly"),
  "pcr-microfluidic-diagnostic-chip-sealing": APP("uv-curing-pcr-microfluidic-diagnostic-card-sealing"),
  "ev-battery-tab-cell-bonding": APP("uv-curing-ev-battery-manufacturing"),
  "lidar-sensor-assembly": APP("uv-led-curing-automotive-lidar-sensor-assembly"),
  "adas-camera-module-assembly": APP("uv-spot-curing-adas-camera-module-assembly"),
  "pcb-conformal-coating": APP("uv-led-curing-pcb-conformal-coating"),
  "display-module-assembly-optically-clear-adhesive": APP("uv-led-curing-display-module-oca-bonding"),
  "oled-panel-encapsulation": APP("uv-led-curing-oled-panel-edge-sealing"),
  "optical-transceiver-module-assembly": APP("uv-curing-optical-transceiver-manufacturing"),
  "co-packaged-optics-cpo-fiber-array-bonding": APP("uv-curing-co-packaged-optics-fiber-array-bonding"),
  "photonic-integrated-circuit-pic-packaging": APP("uv-curing-photonic-integrated-circuit-packaging"),
  "advanced-semiconductor-packaging-chiplet-2-5d-3d-integration": APP("uv-curing-advanced-semiconductor-packaging"),
  "fiber-optic-connector-termination": APP("uv-spot-curing-fiber-optic-connector-termination"),
  "optical-fiber-draw-tower-primary-secondary-coating": APP("uv-led-curing-optical-fiber-draw-tower-coating"),

  // Same subject, narrower framing than the note that replaced it — the new
  // note covers the process these described.
  "pcb-conformal-coating-automotive-electronics": APP("uv-led-curing-pcb-conformal-coating"),
  "pcb-conformal-coating-avionics": APP("uv-led-curing-pcb-conformal-coating"),
  "flip-chip-bga-underfill-cure": APP("uv-curing-advanced-semiconductor-packaging"),
  "semiconductor-package-glob-top-encapsulation": APP("uv-curing-advanced-semiconductor-packaging"),
  "silicon-photonics-wafer-level-packaging": APP("uv-curing-advanced-semiconductor-packaging"),
  "uv-dicing-tape-release-for-wafer-singulation": APP("uv-curing-advanced-semiconductor-packaging"),
  "active-optical-cable-aoc-mt-ferrule-termination": APP("uv-spot-curing-fiber-optic-connector-termination"),
  "lidar-quantum-photonic-component-assembly": APP("uv-curing-photonic-integrated-circuit-packaging"),

  // ── Tier 2: no successor note — closest live industry page ─────────────
  // Medical device assembly.
  "medical-sensor-encapsulation": INDUSTRY("medical-device"),
  "endoscope-objective-lens-bonding": INDUSTRY("medical-device"),
  "drug-delivery-device-assembly": INDUSTRY("medical-device"),
  "surgical-instrument-bonding": INDUSTRY("medical-device"),
  "implantable-device-coating": INDUSTRY("medical-device"),
  "wound-care-dressing-lamination": INDUSTRY("medical-device"),
  "iv-line-micro-tube-assembly": INDUSTRY("medical-device"),
  "in-vitro-diagnostics-lateral-flow-cartridge-assembly": INDUSTRY("medical-device"),

  // Automotive electronics.
  "automotive-sensor-potting": INDUSTRY("automotive"),
  "connector-housing-sealing": INDUSTRY("automotive"),
  "headlamp-lens-bonding": INDUSTRY("automotive"),
  "dashboard-interior-trim-panel-coating": INDUSTRY("automotive"),
  "ev-charger-power-electronics-board-coating": INDUSTRY("automotive"),

  // General electronics assembly — the semiconductor/electronics shelf.
  "wire-tacking-strain-relief": INDUSTRY("semiconductor"),
  "smt-component-bonding-adhesive-dot": INDUSTRY("semiconductor"),
  "wearable-device-pcb-potting": INDUSTRY("semiconductor"),

  // Optical fibre and cable.
  "fiber-ribbon-coating": INDUSTRY("optical-fiber"),
  "cable-jacket-cure": INDUSTRY("optical-fiber"),
  "fiber-splice-protection": INDUSTRY("optical-fiber"),
  "tight-buffer-fiber-coating": INDUSTRY("optical-fiber"),

  // Optics / optical modules.
  "camera-lens-element-bonding": INDUSTRY("optical-modules"),
  "prism-beamsplitter-assembly": INDUSTRY("optical-modules"),
  "ar-coating-bond-protective-overlay": INDUSTRY("optical-modules"),

  // ── Tier 2: web/industrial coating — closest live technology page ──────
  // Wide-web and sheet-fed printing is the microwave (Fusion UV) lamp line.
  "uv-inkjet-industrial-wide-format-printing": TECH("microwave-uv-lamp"),
  "flexographic-sheet-fed-offset-uv-printing": TECH("microwave-uv-lamp"),
  "digital-label-container-decoration": TECH("microwave-uv-lamp"),

  // Wood, furniture and metal finishing lines run mercury arc lamps.
  "uv-lacquer-cure-flat-panel-furniture": TECH("mercury-uv-lamp"),
  "3d-profile-edge-coating": TECH("mercury-uv-lamp"),
  "parquet-engineered-flooring-uv-curing": TECH("mercury-uv-lamp"),
  "uv-digital-print-on-wood": TECH("mercury-uv-lamp"),
  "uv-penetrating-oil-open-pore-finish": TECH("mercury-uv-lamp"),
  "anti-fingerprint-soft-touch-topcoat": TECH("mercury-uv-lamp"),
  "uv-powder-coating-metal-parts": TECH("mercury-uv-lamp"),
  "metal-protective-anti-corrosion-coating": TECH("mercury-uv-lamp"),
  "decorative-metal-printing-coating": TECH("mercury-uv-lamp"),
  "uv-primer-basecoat-for-stamped-metal-parts": TECH("mercury-uv-lamp"),

  // NOTE: the three aerospace notes (structural-composite-bonding,
  // sealant-cure-fuel-tank-airframe, satellite-space-electronics-encapsulation)
  // are deliberately absent. There is no aerospace industry page yet, so no
  // destination is a closer match than the /applications index the catch-all
  // already sends them to. Add them here when that page ships.
};

// The redirect entries next.config spreads into its list, ahead of the
// `/application/:path*` catch-all.
export function legacyApplicationRedirects() {
  return Object.entries(LEGACY_APPLICATION_REDIRECTS).map(([slug, destination]) => ({
    source: `/application/${slug}`,
    destination,
    permanent: true,
  }));
}
