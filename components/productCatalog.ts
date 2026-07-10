// Authoritative Excelitas UV curing product catalog.
// Organized by technology → brand. Used by the product index and detail pages.
import { productI18n, productAppsI18n } from "./productCatalog.zh";
import type { LangText } from "./LocaleContext";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  brandId: "omnicure" | "phoseon" | "fusionuv" | "noblelight";
  tech: string;
  sub?: string;
  accent: string;
  intro: string;
  features: string[];
  applications: string[];
  specs: [string, string][];
  // Optional override link (e.g. products with a dedicated rich page)
  href?: string;
  // Optional full image URL override (when the asset is not in the default folder)
  imageUrl?: string;
};

export const brandAccent: Record<Product["brandId"], string> = {
  omnicure: "#1A56DB",
  phoseon: "#0ea5e9",
  fusionuv: "#f59e0b",
  noblelight: "#7c3aed",
};

export const technologies = [
  "UV Spot Curing",
  "Water-Cooled UV LED Area Curing",
  "Air-Cooled UV LED Curing",
  "Microwave UV Curing",
];

export const products: Product[] = [
  // ───────────────── TECHNOLOGY 1: UV SPOT CURING ─────────────────
  {
    slug: "lx500",
    name: "OmniCure LX500 UV LED Spot Curing Controller",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "UV Spot Curing",
    sub: "UV LED Spot",
    accent: "#44B549",
    intro:
      "The OmniCure LX500 UV LED Spot Curing system controller is uniquely designed with proprietary Intelli-Lamp technology that monitors LED head temperature and lifetime data, while automatically maintaining optical stability ±5% to provide greater process assurance. Available in either 2 or 4-channel configurations, the LX500 is the most flexible and cost-effective option for industrial manufacturing. The controller manages up to four UV LED Spot curing heads simultaneously or independently at wavelengths of 365, 385, 395 and 405 nm. The updated LX500 supports OmniCure's higher power V3 UV LED Heads delivering up to 27 W/cm² irradiance and up to 1,100 mW of optical power.",
    features: [
      "Multiple wavelengths at high irradiance: 17 W/cm² at 365 nm | 28 W/cm² at 385 nm | 27 W/cm² at 395 nm | 24 W/cm² at 405 nm",
      "Intelli-Lamp LED technology: UV irradiation stability for power efficiency and long-term reliability over LED lifetime",
      "Precise light intensity control (5–100% in 1% increments) for consistent, repeatable UV process",
      "Simultaneous or individual control of up to four UV LED curing heads from a single controller",
      "Micro SD card interface: easy single-step programming; automatically saves exposure events and faults in real time",
      "StepCure: customized multi-phase curing processes via controller or PC interface",
      "LED head temperature display for optimum efficiency and extended head lifetime",
      "~75% less energy consumption than a typical UV arc-lamp curing system",
      "Compact, robust design — no cooling required in dense, harsh manufacturing environments",
      "External control via optional foot pedal, PLC, or PC through USB communication",
      "CE and RoHS compliant",
    ],
    applications: [
      "Medical device manufacturing (catheters, cannulas, endoscopes, syringes)",
      "Electronics assembly (CCM, smartphones, tablets, micro-speakers, lenses)",
      "Optoelectronics assembly",
      "Automotive and aerospace component bonding",
      "Pharmaceutical, semiconductor and general-purpose UV adhesive curing",
      "EV battery manufacturing reliability improvement",
    ],
    specs: [
      ["UV LED Heads", "1 to 4 individual & interchangeable to any channel"],
      ["Mode Control", "4-Way membrane control for system display and programming"],
      ["Intensity Level", "5–100% (1% increments)"],
      ["Controller Dimensions", '(H) 5.5" × (W) 3.5" × (D) 5.5"'],
      ["External Control", "Optional foot pedal, PLC, or PC via USB"],
      ["Power Consumption", "72 W max at 120 VAC"],
      ["Ambient Temp/Humidity", "5° to 35°C, 85% max (no condensation)"],
      ["Storage Temp/Humidity", "-10° to 60°C, 85% max (no condensation)"],
      ["Certifications", "CE and RoHS compliant"],
      ["Warranty", "1 year"],
    ],
  },
  {
    slug: "v3-led-heads",
    name: "OmniCure V3 UV LED Heads",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "UV Spot Curing",
    sub: "UV LED Spot",
    accent: "#44B549",
    intro:
      "Designed for use with the OmniCure LX500 Controller, the OmniCure V3 UV LED Heads feature next-generation high-output UV LEDs delivering best-in-class optical performance. With up to 120% increased optical power and up to 165% increase in peak irradiance compared to the predecessor MAX LED Heads, the V3 Heads deliver high dosage distributed uniformly across the spot area for faster, more consistent cures with greater control. Available in 365, 385, 395 and 405 nm wavelengths, delivering up to 22 W/cm² peak irradiance and 1,100 mW power with an exceptionally uniform beam profile.",
    features: [
      "Class-leading irradiance and optical power at 365, 385, 395 and 405 nm",
      "Up to 22 W/cm² peak irradiance and 1,100 mW total optical power",
      "Improved radiation distribution across the beam cross-section for consistent, controlled curing",
      "Up to 120% increased optical power vs. predecessor MAX LED Heads",
      "More energy efficient, lower maintenance, and longer service life",
      "Wide range of cross-compatible accessories: focusing lenses, adapters, extension cables",
      "Backward compatible with existing LX500 Controller",
      "Paired with LX500 for outstanding ±5% optical stability",
    ],
    applications: [
      "Precision UV adhesive curing in medical device assembly (catheters, endoscopes)",
      "Electronics: camera modules, smartphones, tablets, micro-speakers, lenses",
      "High-throughput industrial manufacturing requiring repeatable UV spot curing",
      "EV battery manufacturing adhesive bonding",
      "Optoelectronics assembly",
    ],
    specs: [
      ["Wavelengths", "365, 385, 395, 405 nm (standard); custom supported"],
      ["Peak Irradiance @ 365 nm", "17 W/cm² typical"],
      ["Peak Irradiance @ 385 nm", "28 W/cm² typical"],
      ["Peak Irradiance @ 395 nm", "27 W/cm² typical"],
      ["Peak Irradiance @ 405 nm", "24 W/cm² typical"],
      ["Maximum Optical Power", "Up to 1,100 mW"],
      ["Compatible Controller", "OmniCure LX500 (2- or 4-channel)"],
      ["Optical Stability", "±5% (via Intelli-Lamp in LX500)"],
      ["vs Predecessor", "Up to 120% more power, up to 165% more irradiance"],
      ["Accessories", "Focusing lenses, adapters, extension cables"],
    ],
  },
  {
    slug: "ls200",
    name: "OmniCure LS200 UV LED Radiometry & Calibration System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "UV Spot Curing",
    sub: "UV LED Spot",
    accent: "#44B549",
    intro:
      "The OmniCure LS200 UV LED Radiometry and Calibration System ensures precise measurement and calibration of UV LED power or irradiance directly at the cure site, enabling manufacturers to control light output for a reliable, repeatable curing process. An enhanced version of its LS100 predecessor, the LS200 brings expanded measurement range and NRC-traceable sensor calibration. With accuracy of ±10% and resolution of 1 mW/cm² (irradiance) and 1 mW (power), the LS200 integrates seamlessly with the LX500 controller via the Beam Positioning Kit.",
    features: [
      "Measurement accuracy ±10%; resolution 1 mW/cm² (irradiance) and 1 mW (power)",
      "Wide measurement range: 1–2,000 mW (power) and 50 mW/cm²–40 W/cm² (irradiance)",
      "NRC-traceable factory calibration for accuracy and reliability",
      "Seamless integration with OmniCure LX500 via Beam Positioning Kit",
      "Selectable wavelengths programmable from 320–750 nm",
      "Sensor optimized for monochromatic LED sources",
      "Backward compatible with LS100",
      "Two versions: LS200 (irradiance, W/cm²) and LS200P (optical power, W)",
      "Compact sensor for measurements in confined curing areas",
      "USB connectivity to LM2011 light meter or LX500 for real-time measurement",
    ],
    applications: [
      "UV LED spot curing process control and calibration in electronics assembly",
      "Medical device manufacturing quality assurance and compliance",
      "Automotive UV adhesive curing process verification",
      "Defense and aerospace manufacturing UV process monitoring",
      "R&D and laboratory UV LED characterization",
    ],
    specs: [
      ["Measurement Accuracy", "±10%"],
      ["Irradiance Resolution", "1 mW/cm²"],
      ["Power Resolution", "1 mW"],
      ["Power Range", "1 mW to 2,000 mW"],
      ["Irradiance Range", "50 mW/cm² to 40 W/cm²"],
      ["Wavelength Range", "320–750 nm (selectable)"],
      ["Calibration Traceability", "NRC traceable"],
      ["Compatible Controller", "OmniCure LX500 (via Beam Positioning Kit)"],
      ["Communication", "USB to PC (LM2011 or LX500)"],
      ["Versions", "LS200 (irradiance) / LS200P (power)"],
    ],
  },
  {
    slug: "r2000",
    name: "OmniCure R2000 UV Radiometer",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "UV Spot Curing",
    sub: "UV Radiometer",
    accent: "#44B549",
    intro:
      "The OmniCure R2000 UV Radiometer is the most advanced and accurate tool for measuring irradiance or power from a UV Spot Curing System. Radiometry is essential for maintaining a repeatable UV curing process. The R2000 combines with the OmniCure S2000 Elite, S2000 XLA, or S1500 to provide a complete curing station with unmatched control and repeatability — the only system that can be calibrated in real time for NIST accuracy. Special built-in electronics allow connection of custom sensors that measure light energy directly at the cure site or within cure-ring bonding fixtures, including the OmniCure UV Cure Ring Radiometer and UV Cure Site Radiometer.",
    features: [
      "Most advanced and accurate UV radiometer for OmniCure UV lamp spot curing systems",
      "Serial communication with S2000 Elite / S2000 XLA / S1500: set irradiance levels and calibrate from a single reference point",
      "Real-time NIST-traceable calibration with S2000 Elite — the only system with this capability",
      "Proprietary wide-band detector for accurate measurements across many systems",
      "Light guide detector with color-coded adapters auto-identifies light guide diameter",
      "Compatible with OmniCure UV Cure Ring Radiometer for cure-ring fixture process control",
      "Compatible with OmniCure UV Cure Site Radiometer for measuring irradiance at the bonding site",
      "Sets identical irradiance output across multiple S2000 Elite systems from one reference point",
      "Ideal for large-scale manufacturing with multiple UV curing stations",
      "NIST-traceable calibration recommended every 12 months",
    ],
    applications: [
      "UV irradiance and power measurement for S2000 Elite, S2000 XLA and S1500 spot curing systems",
      "Process control and calibration in medical device manufacturing (catheters, cannulas, syringes, endoscopes)",
      "Electronics and optoelectronics UV curing process verification",
      "Multi-station manufacturing requiring consistent irradiance across all stations",
      "Automated and semi-automated UV curing lines requiring real-time monitoring",
      "Laboratory and R&D UV light output measurement",
    ],
    specs: [
      ["Measurement Type", "UV irradiance (W/cm²) and optical power (W)"],
      ["Compatible Systems", "OmniCure S2000 Elite, S2000 XLA, S1500"],
      ["Calibration", "NIST-traceable; recommended every 12 months"],
      ["Real-Time Calibration", "Yes — with S2000 Elite (only system with this capability)"],
      ["Communication", "Serial communication with OmniCure S2000 / S2000 Elite"],
      ["Detector", "Proprietary wide-band; light guide diameter auto-identification"],
      ["Custom Sensor Support", "UV Cure Ring Radiometer; UV Cure Site Radiometer"],
      ["Multi-Station Use", "Calibrate multiple S2000 systems to identical irradiance"],
      ["Accessory For", "OmniCure S-Series UV Lamp Spot Curing Systems"],
    ],
  },
  {
    slug: "s2000-elite",
    name: "OmniCure S2000 Elite UV Spot Curing System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "UV Spot Curing",
    sub: "UV Lamp Spot",
    accent: "#1A56DB",
    href: "/product/omnicure/s2000",
    // The S2E.png asset is actually the S2E Network Module; use the real
    // S2000 Elite product photo (same one the dedicated S2000 page uses).
    imageUrl:
      "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/PROMOTION/PROMOTION-OMNICURE%20S2000%20ELITE%20-INTRODUCTION.webp",
    intro:
      "OmniCure S2000 Elite is a new generation of lamp-based UV spot curing system designed for the most demanding manufacturing applications. Equipped with proprietary Closed-Loop Feedback and Intelli-Lamp 2.0 technologies, it automatically monitors and maintains optical output within ±5%. The system features a high-speed mechanical shutter with 30 ms response and is Industry 4.0-ready with Ethernet, USB, SD card, NFC, and programmable PLC I/O.",
    features: [
      "Patented Closed-Loop Feedback (CLF): regulates UV output in real-time (±5% of set point)",
      "Intelli-Lamp 2.0: 2,000 hours guaranteed, 3,500–4,000 hours typical lamp life",
      "High-speed mechanical shutter with 30 ms response time",
      "200-Watt UV lamp with outputs up to 30 W/cm²",
      "Industry 4.0 / IIoT ready: Ethernet, USB, SD card, NFC, programmable PLC I/O",
      "WEB UI for remote control and monitoring of single or multiple systems",
      "Field-interchangeable lamps and 7 optical band-pass filter options",
      "NIST-traceable calibration with OmniCure R2000 Radiometer",
      "Backward compatible with original S2000 XLA",
    ],
    applications: [
      "Medical device assembly: catheters, cannulas, blood oxygenators, syringes, endoscopes",
      "Electronics and optoelectronics precision adhesive curing",
      "Automated and semi-automated high-throughput manufacturing lines",
      "Academic, development and laboratory UV curing applications",
      "Industry 4.0 smart manufacturing requiring remote monitoring",
    ],
    specs: [
      ["Lamp Power", "200 Watt UV mercury lamp"],
      ["Output Irradiance", "Up to 30 W/cm²"],
      ["Shutter Response Time", "30 ms"],
      ["Optical Stability", "±5% of set point (Closed-Loop Feedback)"],
      ["Lamp Lifetime", "2,000 h guaranteed; 3,500–4,000 h typical"],
      ["Band-Pass Filters", "7 options (field-interchangeable)"],
      ["Communication", "Ethernet, USB, SD card, NFC, PLC I/O"],
      ["Remote Access", "WEB UI"],
      ["Calibration", "NIST-traceable via OmniCure R2000"],
    ],
  },
  {
    slug: "s1500-pro",
    name: "OmniCure S1500 Pro UV Spot Curing System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "UV Spot Curing",
    sub: "UV Lamp Spot",
    accent: "#1A56DB",
    intro:
      "The OmniCure S1500 Pro is a revolutionary UV spot curing system designed for automated manufacturing. It features proprietary Intelli-Lamp 2.0 technology for enhanced lamp life (2,000 hours guaranteed) and integrated StepCure 2.0 for highly customizable multi-phase curing profiles. The intuitive 4.3\" LCD touch screen simplifies operation, while Industry 4.0 features include programmable PLC output, a Flight Recorder system event tracker, and Intelli-Tap NFC keycard capability.",
    features: [
      "Intelli-Lamp 2.0: constantly monitors lamp parameters, optimizes lamp life (2,000 h guaranteed)",
      "StepCure 2.0: precise programming of multi-phase curing profiles",
      '4.3" high-resolution LCD touch screen',
      "200-Watt UV lamp with outputs up to 30 W/cm²",
      "User-interchangeable optical filters (7 options) and lamp types",
      "Programmable PLC output (DB50 port)",
      "NFC with Intelli-Tap keycards (Admin, Supervisor levels)",
      "Flight Recorder system event tracking for Industry 4.0 traceability",
      "USB Type B and SD card connectivity",
      "Cleanroom-ready with dedicated duct attachment area",
      "Full backward compatibility with original S1500 light guides and radiometers",
    ],
    applications: [
      "High-throughput UV adhesive curing in micro-electronic manufacturing",
      "Automated bonding processes in opto-electronic manufacturing",
      "Medical device manufacturing requiring precision, traceability, and automation",
      "Cleanroom manufacturing environments",
      "General industrial automated manufacturing with UV spot curing requirements",
    ],
    specs: [
      ["Lamp Power", "200 Watt UV mercury lamp"],
      ["Output Irradiance", "Up to 30 W/cm²"],
      ["Display", '4.3" high-resolution LCD touch screen'],
      ["Lamp Lifetime", "2,000 hours guaranteed (Intelli-Lamp 2.0)"],
      ["Band-Pass Filters", "7 options (user-interchangeable)"],
      ["PLC Interface", "DB50 port; 1 programmable output channel"],
      ["Communication", "USB Type B, SD card"],
      ["NFC", "Intelli-Tap keycards (Admin, Supervisor)"],
      ["Cleanroom Ready", "Yes (dedicated duct attachment area)"],
    ],
  },
  {
    slug: "s2e-network-module",
    name: "OmniCure S2E Network Module",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "UV Spot Curing",
    sub: "S-Series Accessory",
    accent: "#1A56DB",
    imageUrl:
      "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product/S2E%20NETWORK%20MODULE.png",
    intro:
      "The OmniCure S2E Network Module is designed to save time on maintenance and keep production running smoothly with remote process monitoring and UV curing equipment control. The S2E complements the OmniCure family of S-Series spot UV curing systems, offering the same high level of innovation, quality and reliability that customers expect. The S2E Ethernet adapter enables production facilities to remotely access up to 300 UV curing systems within a local area network, while simultaneously monitoring their activity and maintenance requirements through the OmniCure Monitoring Station software.",
    features: [
      "Save maintenance time and keep production running smoothly with OmniCure Monitoring Station software",
      "Proactively trend and predict maintenance requirements with continuous operational data logging",
      "Enhance visibility of production activity and quickly isolate issues that result in potential waste/rework",
      "Increase productivity and eliminate time lost identifying system faults with real-time email alerts",
      "Remotely access and monitor up to 300 UV curing systems on a local area network",
      "Adds StepCure process functionality to the S1500",
    ],
    applications: [
      "Remote process monitoring of OmniCure S2000 and S1500 spot curing systems",
      "Multi-station production floors requiring centralized UV equipment oversight",
      "Predictive maintenance and operational data logging",
      "Production environments requiring real-time fault email alerts and electronic records",
    ],
    specs: [
      ["Compatible OmniCure Systems", "S2000 and S1500 (*S2E adds StepCure to the S1500)"],
      ["Power Supply (Included)", "DC input: 12 VDC, 0.5 A max"],
      ["Ethernet Interface", "10/100 Mbps (auto-sensing), RJ45 connector"],
      ["Remote Ethernet Functions", "HTTP web interface; auto TCP/IP device-find; XML data logging; SMTP email (up to 7 recipients); optional Modbus TCP PLC control"],
      ["Ambient Operating Temperature", "15°C to 35°C (59°F to 95°F)"],
      ["Storage Temperature", "-10°C to 60°C (14°F to 140°F)"],
      ["Humidity Range", "Up to 85% max (non-condensing)"],
      ["Operating Voltage", "100–240 VAC (±10%), 50/60 Hz, 0.06/0.025 A"],
      ["Dimensions (L×W×H)", '32 × 89 × 114 mm (1¼" × 3½" × 4½")'],
      ["Weight", "181 g (0.4 lb)"],
      ["Warranty", "1 year"],
    ],
  },
  {
    slug: "s-series-light-guides",
    name: "OmniCure S Series Light Guides & Adapters",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "UV Spot Curing",
    sub: "S-Series Accessory",
    accent: "#1A56DB",
    intro:
      "The OmniCure S Series offers a variety of light guides ranging from single and multi-legged to liquid-filled or fiber light guides, as well as a range of optical adapters to best meet customer requirements.",
    features: [
      "Liquid Light Guide: 3, 5 and 8 mm tip diameters; standard lengths 750–3000 mm; dual and triple-leg configurations for multi-site curing",
      "High-Power Fiber Light Guide: equal distribution of light energy to multiple cure sites from a single light source",
      "High-Power Fiber Light Line: high-output linear beam; continuous fibers from input to termination eliminate coupling losses",
      "UV Cure-Ring Optical Adapter: 360° curing power; solid or slotted versions for Liquid Light Guides",
      'UV Light-Line Optical Adapter: focused linear beam for small rows of components, tubing and cables (up to 2" line length)',
      'Adjustable Spot Collimating Adapter: uniform spot from 1" up to 6" (2.54–15.2 cm) for even power distribution',
    ],
    applications: [
      "Multi-site simultaneous curing with multi-leg light guides",
      "360° radial curing of catheters and tubing via Cure-Ring adapter",
      "Linear curing of component rows, tubing and cables via Light-Line adapter",
      "Uniform large-spot curing via the adjustable collimating adapter",
    ],
    specs: [
      ["Liquid Light Guide Tips", "3, 5, 8 mm diameters"],
      ["Liquid Light Guide Lengths", "750–3000 mm (standard)"],
      ["Multi-Leg Configurations", "Dual and triple-leg"],
      ["Fiber Options", "High-Power Fiber Light Guide; High-Power Fiber Light Line"],
      ["Cure-Ring Adapter", "360° curing; solid or slotted"],
      ["Light-Line Adapter", 'Up to 2" line length'],
      ["Collimating Adapter", 'Adjustable uniform spot 1"–6" (2.54–15.2 cm)'],
    ],
  },

  // ──────────── TECHNOLOGY 2: WATER-COOLED UV LED AREA (Phoseon) ────────────
  {
    slug: "nexus-ii",
    name: "Phoseon Nexus II Water-Cooled UV LED Large-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Water-Cooled UV LED Area Curing",
    accent: "#0d9488",
    intro:
      "The Nexus II water-cooled UV LED curing system is ideally suited for flexographic printing applications and delivers the best-performing solution in the industry. With patented thermal management techniques and ValidCure Technology, the Nexus II delivers the highest total UV energy for flexographic printing, bringing increased system reliability, improved performance in high-temperature environments, and an optional high-airflow model for enhanced cooling.",
    features: [
      "Highest total UV energy (dose) for flexographic printing — higher dose than the air-cooled variant",
      "Wider web: up to 675 mm, with print speeds up to 1050 ft (320 m)/min",
      "90 W per cm maximum electrical power for sustained high-output curing",
      "ValidCure Technology for reliable, consistent UV output and process control",
      "Patented thermal management for superior high-temperature performance",
      "108 diodes per 25 mm segment — highest diode count in the industry (>60,000 h at L90)",
      "Up to 60% less energy consumption; quick, easy retrofit to any press",
      "5-year warranty on the full system",
    ],
    applications: [
      "Flexographic printing (primary application)",
      "Industrial UV LED area curing on production lines",
      "High-temperature environment UV curing",
      "Production lines requiring maximum UV output consistency",
    ],
    specs: [
      ["Cooling Method", "Water-cooled"],
      ["Web Width", "300 – 675 mm"],
      ["Max Electrical Power", "90 W per cm"],
      ["Max Print Speed", "1050 ft (320 m)/min"],
      ["Energy Savings", "Up to 60% less kWh"],
      ["Diode Count", "108 diodes per 25 mm segment"],
      ["Diode Lifetime", ">60,000 h at L90"],
      ["Cross Section", "110 mm W × 190 mm H"],
      ["Communication", "Modbus over TCP/IP"],
      ["Key Technology", "ValidCure, patented thermal management"],
      ["Warranty", "5-year full-system warranty"],
      ["Primary Application", "Flexographic printing"],
    ],
  },
  {
    slug: "nexus-ii-ac",
    name: "Phoseon Nexus II Air-Cooled UV LED Large-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area · Flexographic",
    accent: "#1A56DB",
    intro:
      "The Nexus II Air-Cooled (AC) UV LED curing system brings Phoseon's flexographic-printing performance to production lines that need simple, chiller-free integration. Air cooling reduces routine maintenance and removes the need for a chiller, while a common form factor makes mounting easy. Available in emitting widths from 300 mm to 600 mm with Ethernet communications, it is purpose-built for flexographic printing applications.",
    features: [
      "Air-cooled — no chiller or fan blower needed, reduced routine maintenance",
      "Up to 70% less energy consumption — the most efficient of the Nexus II range",
      "Web width 300 – 600 mm; print speeds up to 720 ft (220 m)/min",
      "65 W per cm maximum electrical power; 45 °C maximum operating temperature",
      "108 diodes per 25 mm segment — highest diode count in the industry (>60,000 h at L90)",
      "Quick, easy retrofit to any press with the common Nexus II form factor",
      "ValidCure Technology; approved with all UV LED inks",
      "5-year warranty on the full system",
    ],
    applications: [
      "Flexographic printing (primary application)",
      "Industrial UV LED area curing on production lines",
      "Lines requiring chiller-free, low-maintenance integration",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller / blower)"],
      ["Web Width", "300 – 600 mm"],
      ["Max Electrical Power", "65 W per cm"],
      ["Max Print Speed", "720 ft (220 m)/min"],
      ["Max Operating Temp", "45 °C (air-cooled lamps)"],
      ["Energy Savings", "Up to 70% less kWh"],
      ["Diode Count", "108 diodes per 25 mm segment"],
      ["Diode Lifetime", ">60,000 h at L90"],
      ["Communication", "Modbus over TCP/IP (Ethernet)"],
      ["Warranty", "5-year full-system warranty"],
      ["Primary Application", "Flexographic printing"],
    ],
  },
  {
    slug: "fl200",
    name: "Phoseon FireLine FL200 UV LED Area Curing System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Water-Cooled UV LED Area Curing",
    accent: "#0d9488",
    intro:
      "The FireLine FL200 is a compact and scalable water-cooled light source that operates with a separate controller. The lamps can be scaled to various lengths up to 2 meters and provide exceptional optical uniformity. The FL200 offers 25 W/cm² peak irradiance at 385/395/405 nm and 10 W/cm² at 365 nm — a high-performance light source ideal for medical device assembly and a wide range of UV LED area curing applications.",
    features: [
      "Compact and scalable design — up to 2 meters in length",
      "High peak irradiance: 25 W/cm² at 385/395/405 nm; 10 W/cm² at 365 nm",
      "Exceptional optical uniformity for consistent curing across the area",
      "Separate controller for flexible system integration",
      "Water-cooled for sustained high-performance, low-noise operation",
    ],
    applications: [
      "Medical device UV curing assembly",
      "Web and conveyor-based UV curing systems",
      "Large-area UV LED curing on production lines",
      "Applications requiring scalable UV curing up to 2 m width",
    ],
    specs: [
      ["Cooling Method", "Water-cooled"],
      ["Peak Irradiance @ 365 nm", "10 W/cm²"],
      ["Peak Irradiance @ 385/395/405 nm", "25 W/cm²"],
      ["Maximum Length", "Up to 2 meters (scalable)"],
      ["Controller", "Separate (not integrated)"],
      ["Technology", "UV LED"],
    ],
  },
  {
    slug: "fl400",
    name: "Phoseon FireLine FL400 UV LED Area Curing System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Water-Cooled UV LED Area Curing",
    accent: "#0d9488",
    intro:
      "The FireLine FL400 is a water-cooled UV LED curing system designed for a wide variety of demanding printing and web/conveyor-based applications, including digital inkjet printing, container screen printing, and wood panel coating. It offers versatile connection options with straight or barbed water fittings and an enhanced window seal. Available in lengths from 125 mm to 350 mm, the FL400 delivers 8–24 W/cm² peak irradiance at 385/395/405 nm with Modbus TCP for remote access.",
    features: [
      "Versatile connection options: straight or barbed water fittings",
      "Enhanced window seal protecting against contaminants",
      "Available lengths: 125 mm to 350 mm",
      "Modbus TCP protocol for high-speed data exchange and remote access",
      "High peak irradiance: 8–24 W/cm² at 385, 395, 405 nm",
      "Water-cooled for sustained performance in demanding environments",
    ],
    applications: [
      "Digital inkjet printing",
      "Container screen printing",
      "Wood panel coating",
      "Web and conveyor-based UV curing",
      "Industrial large-area printing production lines",
    ],
    specs: [
      ["Cooling Method", "Water-cooled"],
      ["Peak Irradiance", "8–24 W/cm² at 385/395/405 nm"],
      ["Available Lengths", "125 mm to 350 mm"],
      ["Water Fittings", "Straight or barbed"],
      ["Communication", "Modbus TCP"],
      ["Technology", "UV LED"],
    ],
  },
  {
    slug: "fl400-i",
    name: "Phoseon FireLine FL400-i Industrial UV LED System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Water-Cooled UV LED Area Curing",
    accent: "#0d9488",
    intro:
      "The FireLine FL400-i Industrial UV LED Area Curing System is specifically designed for demanding industrial coating and adhesive curing in harsh, high-contaminant environments such as pipe coating and metal finishing. It features a newly engineered IP66-rated enclosure with robust endcaps, advanced window sealing, and optional sacrificial glass to shield primary optics from heat, dust and impact — delivering the same industry-leading optical uniformity and high dose performance as the original FL400.",
    features: [
      "IP66-rated ruggedized enclosure for harsh, high-contaminant environments",
      "Advanced window sealing protects against heat, liquid, and dirt intrusion",
      "Versatile connection options: straight or barbed water fittings",
      "CDA (clean, dry air) ports to protect against condensation",
      "Optional sacrificial glass to shield primary optics",
      "Same optical uniformity and high dose performance as FL400",
      "Robust endcaps engineered for challenging industrial environments",
    ],
    applications: [
      "Pipe coating UV curing in industrial environments",
      "Metal finishing and surface coating curing",
      "Adhesive curing in high-contamination, high-temperature environments",
      "Applications requiring IP66-rated UV curing equipment",
    ],
    specs: [
      ["Cooling Method", "Water-cooled"],
      ["IP Rating", "IP66-compliant"],
      ["Water Fittings", "Straight or barbed"],
      ["Air Ports", "CDA ports for condensation protection"],
      ["Protection", "Optional sacrificial glass"],
      ["Base Performance", "Same as FL400"],
    ],
  },
  {
    slug: "fl440",
    name: "Phoseon FireLine FL440 UV LED Area Curing System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Water-Cooled UV LED Area Curing",
    accent: "#0d9488",
    intro:
      "The FireLine FL440 complements the FireLine series by delivering unparalleled total UV energy. This IP66-compliant water-cooled UV LED system features a 40 mm-wide LED emitting window — significantly wider than the standard FL400 — providing longer exposure times and a greater dose of UV energy for complete single-pass curing. This eliminates the need for multiple passes and enhances production speed.",
    features: [
      "40 mm-wide LED emitting window for longer exposure and greater dose per pass",
      "IP66-compliant for robust operation in demanding environments",
      "Scalable to various lengths based on application requirements",
      "Exceptional optical uniformity across the entire curing area",
      "Single-pass complete curing capability — eliminates multiple passes",
      "Water-cooled design for sustained high-performance operation",
    ],
    applications: [
      "Demanding printing applications requiring maximum UV power",
      "Single-pass UV curing on high-speed production lines",
      "Industrial printing with wide-format exposure requirements",
      "Digital and commercial printing requiring maximum throughput",
    ],
    specs: [
      ["Cooling Method", "Water-cooled"],
      ["LED Window Width", "40 mm (vs 20 mm of standard FL400)"],
      ["Peak Irradiance", "16 W/cm² (40 mm window)"],
      ["IP Rating", "IP66-compliant"],
      ["Scalability", "Customizable to various lengths"],
      ["Key Advantage", "40 mm window enables single-pass curing"],
    ],
  },
  {
    slug: "vericure",
    name: "Phoseon VeriCure Water-Cooled UV LED Large-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Water-Cooled UV LED Area Curing",
    accent: "#0d9488",
    intro:
      "The VeriCure Water-Cooled UV LED curing system is a wide-format UV source engineered to meet the demanding requirements of industrial coatings and print applications. It features a patented Semiconductor Light Matrix (SLM) array and a unique high-efficiency cooling design, delivering high optical power and outstanding dose performance essential for high-speed processing. Patented SLM control technology provides optimum uniformity across the irradiation area to ensure peak performance and consistent curing quality. Available in wavelengths of 365, 395 and 405 nm (385 nm on request) and emission widths from 750 mm to 1350 mm, the VeriCure supports high conveyor line speeds with high-power/high-dose capabilities while advancing throughput and environmental sustainability.",
    features: [
      "Patented Semiconductor Light Matrix (SLM) array for high optical power",
      "Patented SLM control technology for optimum uniformity across the irradiation area",
      "Unique high-efficiency cooling design for outstanding dose performance",
      "Five wide-format models: 750, 900, 1050, 1200 and 1350 mm emission windows",
      "High dose at high line speed: 500 mJ/cm² typical at 50 mm working distance, 50 m/min",
      "Long LED lifetime: >60,000 hours at L90",
      "Optional secondary glass assembly to protect the emitting window",
      "Extensive communication: OmniCure AC Series, Analog, Modbus TCP/IP, Phoseon CLIP, Ethernet/PLC",
      "Eco-friendly: no mercury, no ozone",
      "Available wavelengths: 365, 395, 405 nm (385 nm on request)",
    ],
    applications: [
      "Industrial wide-format coatings",
      "Web and conveyor-based printing applications",
      "Wood coating — floors, furniture, panels",
      "High-speed production lines requiring high dose at high line speeds",
      "Eco-conscious manufacturing (no mercury, no ozone)",
    ],
    specs: [
      ["Models", "750, 900, 1050, 1200, 1350"],
      ["Emission Window", "750×20 mm up to 1350×20 mm"],
      ["Length", "1024 / 1174 / 1324 / 1474 / 1624 mm"],
      ["Amperage / Power (±10%)", "60 A / 7.2 kW up to 109 A / 13.1 kW"],
      ["Typical Dose", "500 mJ/cm² (@50 mm working distance, 50 m/min)"],
      ["Peak Irradiance", "20 W/cm² @window; 6 W/cm² @30 mm working distance"],
      ["Wavelengths", "365, 395, 405 nm (385 nm on request)"],
      ["Expected LED Lifetime", ">60,000 h at L90"],
      ["Max Operating Temperature", "40°C"],
      ["Cross Section", "147W × 155H mm with secondary glass (104W × 147H without)"],
      ["Input Voltage", "120 VDC (±5 VDC)"],
      ["Cooling Method", "Water-cooled"],
    ],
  },
  {
    slug: "semray-5000",
    name: "Noblelight Semray 5000+ UV LED Water-Cooled System",
    brand: "Noblelight",
    brandId: "noblelight",
    tech: "Water-Cooled UV LED Area Curing",
    sub: "Large-Area · Sheet-Fed & Wide Web",
    accent: "#7c3aed",
    intro:
      "The Semray 5000+ UV LED Water-Cooled System is designed to deliver exceptional printing results for industrial and larger print applications that require greater working distances from the substrate. Providing up to 30% more active UV energy to the printed product compared to conventional UV LED systems, the Semray 5000+ enables faster printing speeds and the ability to print on heat-sensitive materials. It reduces energy consumption and offers a significantly longer lifespan than traditional UV systems. Shorter curing times, minimized powder usage in sheetfed offset, and increased throughput meet the growing demands for product quality. The compact design and flexible integration make retrofitting into existing presses easy. Drawing on Noblelight's sheet-fed offset experience, the Semray 5000+ enables the 'dry sheet concept' — immediately processing printed sheets and greatly improving post-press workflow.",
    features: [
      "Highest UV LED output at 60 mm working distance — dramatically increases printing speed",
      "Up to 30% more active UV energy to the printed product vs. conventional UV LED systems",
      "Fast ON/OFF switching — system can turn off between each sheet for significant energy savings",
      "'Dry sheet concept': minimizes powder usage in sheetfed offset, enables immediate post-press processing",
      "Prints on heat-sensitive materials — reduced heat transfer to substrate",
      "Compact design with flexible integration for easy retrofitting into existing presses",
      "Format-based energy selection reduces consumption by matching format to sheet size",
      "Significantly longer lifespan than traditional UV mercury lamp systems",
      "Plug & play concept with global technical support for maximum uptime",
      "Ideal for online print shops and overnight delivery using the dry sheet concept",
    ],
    applications: [
      "Wide web printing (flexographic and other wide-format web printing)",
      "Roll-to-roll printing",
      "Sheet-fed offset printing (UV curing between sheets for dry-sheet concept)",
      "Industrial large-format print applications requiring longer working distances",
      "Printing on heat-sensitive substrates",
    ],
    specs: [
      ["Cooling Method", "Water-cooled"],
      ["Technology", "UV LED"],
      ["Working Distance", "Optimized for output at 60 mm distance"],
      ["UV Energy Advantage", "Up to 30% more active UV energy vs. conventional UV LED"],
      ["Switching", "Fast ON/OFF — instant on/off between sheets"],
      ["Energy Savings", "Format-based energy selection; ON/OFF between sheets"],
      ["Brand / Series", "Noblelight — Semray UV5000+ Series"],
      ["Integration", "Compact; retrofits into existing printing presses"],
    ],
  },
  {
    slug: "semray-pc6003",
    name: "Noblelight Semray UV PC6003 360° UV LED System",
    brand: "Noblelight",
    brandId: "noblelight",
    tech: "Water-Cooled UV LED Area Curing",
    sub: "Optical Fiber Draw · Wire Marking · 360°",
    accent: "#7c3aed",
    intro:
      "The Semray UV PC6003 is a UV LED curing system designed from the ground up for optical fiber draw and wire marking manufacturing processes, delivering full 360° curing coverage around the substrate. Part of the Excelitas / Noblelight Semray UV LED portfolio, it brings the efficiency, long lifetime and energy savings of UV LED to high-speed fiber and wire production, with a high radiance of 65–70 W/cm² at the target and a 165 mm emission length at 395 nm.",
    features: [
      "Purpose-built for optical fiber draw and wire marking manufacturing",
      "Full 360° curing coverage around the fiber/wire",
      "High radiance at target: 65–70 W/cm²",
      "395 nm peak wavelength",
      "165 mm emission length",
      "UV LED efficiency — energy saving, long lifetime, no mercury, no ozone",
      "Engineered for continuous high-speed production processes",
    ],
    applications: [
      "Optical fiber draw tower coating cure",
      "Wire marking and wire coating cure",
      "360° cure of cylindrical substrates",
      "High-speed continuous fiber/wire production lines",
    ],
    specs: [
      ["Type", "UV LED Lamp Assembly (Semray UV PC6003)"],
      ["Peak Wavelength", "395 nm"],
      ["Radiance at Target", "65–70 W/cm²"],
      ["Emission Length", "165 mm"],
      ["Curing Coverage", "360°"],
      ["Maximum Dimensions", "364 (W) × 265 (H) × 543 (L) mm"],
      ["Cooling Method", "Water-cooled"],
      ["Primary Applications", "Optical fiber draw, wire marking"],
      ["Brand / Series", "Noblelight — Semray"],
    ],
  },
  {
    slug: "semray-uv5052m",
    name: "Noblelight Semray UV5052M High-Intensity UV LED System",
    brand: "Noblelight",
    brandId: "noblelight",
    tech: "Water-Cooled UV LED Area Curing",
    sub: "Customized · High-Intensity",
    accent: "#7c3aed",
    intro:
      "The Semray UV5052M is a customized, high-intensity variant of the Excelitas / Noblelight Semray UV LED platform, equipped with dedicated optics that deliver more energy to the process — including at larger working distances. Available across 365, 385, 395 and 405 nm with peak irradiance up to 20 W/cm² at the emission window and a wide 1300 × 84 mm emission window, it is engineered for demanding industrial curing where high dose and flexible integration are essential.",
    features: [
      "Customized high-intensity Semray UV LED variant with dedicated optics",
      "Special optical concepts direct more energy to larger working distances",
      "Multiple wavelengths: 365, 385, 395 and 405 nm",
      "Peak irradiance up to 20 W/cm² at the emission window (395 nm)",
      "Wide 1300 × 84 mm emission window",
      "Flexible in size/length, peripheral connections and optical concepts",
      "UV LED efficiency — energy saving, long lifetime, no mercury, no ozone",
    ],
    applications: [
      "High-dose industrial UV LED curing",
      "Applications requiring high intensity at large working distances",
      "Wide-format coating and printing processes",
      "Custom-engineered production line integration",
    ],
    specs: [
      ["Peak Wavelengths", "365, 385, 395, 405 nm"],
      ["Irradiance @ 365 nm", "15 W/cm² (at emission window)"],
      ["Irradiance @ 385 nm", "17 W/cm² (at emission window)"],
      ["Irradiance @ 395 nm", "20 W/cm² (at emission window)"],
      ["Irradiance @ 405 nm", "19 W/cm² (at emission window)"],
      ["Emission Window Size", "1300 × 84 mm"],
      ["Outer Dimensions", "1316 (W) × 100 (D) × 100 (H) mm"],
      ["Cooling Method", "Water-cooled"],
      ["Optics", "Dedicated optics for high intensity at large working distances"],
      ["Brand / Series", "Noblelight — Semray (customized UV5052M)"],
    ],
  },

  // ──────────── TECHNOLOGY 3: AIR-COOLED UV LED ────────────
  {
    slug: "ac2",
    name: "OmniCure AC2 Series UV LED Small-Area System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "Air-Cooled UV LED Curing",
    sub: "Small-Area",
    accent: "#60a5fa",
    intro:
      "The OmniCure AC2 Series includes the compact AC275 and AC2110 air-cooled UV LED heads for space-constrained small-area curing. Advanced front-end optics provide uniform output across 75 mm or 114 mm curing lengths. Models are available at 365 nm with up to 3 W/cm² and at 395 nm with up to 4 W/cm² for printing, medical-device, electronics and optoelectronics applications.",
    features: [
      "Up to 3 W/cm² at 365 nm and 4 W/cm² at 395 nm",
      "Exceptional uniformity across the entire small curing area",
      "Patented individual UV LED module output for consistent results",
      "Compact and air-cooled — no chiller required",
      "Modular design suitable for both low- and high-power applications",
      "Available in AC275 and AC2110 configurations",
    ],
    applications: [
      "UV curing of inks, adhesives, and coatings in small-area applications",
      "Electronics and optoelectronics component bonding",
      "Medical device small-area UV curing",
      "Low- to high-power small-area curing (curing widths ≤75 mm)",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller)"],
      ["Peak Irradiance", "Up to 3 W/cm² at 365 nm; 4 W/cm² at 395 nm"],
      ["Models", "AC275 / AC275F, AC2110 / AC2110F"],
      ["Curing Area", "10 × 75 mm (AC275); 10 × 114 mm (AC2110)"],
      ["Wavelengths", "365 nm, 395 nm"],
      ["Technology", "UV LED, patented individual module output"],
    ],
  },
  {
    slug: "ac4",
    name: "OmniCure AC4 Series UV LED Small-Area System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "Air-Cooled UV LED Curing",
    sub: "Small-Area",
    accent: "#60a5fa",
    intro:
      "The OmniCure AC4 Series combines high-output LEDs and custom optics to deliver 8 W/cm² with exceptional uniformity at flexible working distances. AC450/P and AC475/P heads cover 50 mm and 75 mm curing lengths at 365 nm or 395 nm. Print ('P') variants use optics optimized for printing and product-marking processes.",
    features: [
      "8 W/cm² peak irradiance with exceptional uniformity",
      "Custom optics enabling high irradiance at long working distances",
      "Precise control of UV irradiance level and time for correct dose delivery",
      "Air-cooled — no chiller required",
      "Models: AC450, AC450P, AC475 and AC475P ('P' = Print optics)",
      "Ensures highly repeatable UV curing process",
    ],
    applications: [
      "Small-area UV adhesive curing requiring high irradiance",
      "Electronic component bonding requiring precision and repeatability",
      "Medical device assembly",
      "UV curing at long working distances",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller)"],
      ["Peak Irradiance", "8 W/cm²"],
      ["Working Distance", "Extended long working distance"],
      ["Models", "AC450, AC450P, AC475, AC475P"],
      ["Curing Area", "25 × 50 mm (AC450/P); 25 × 75 mm (AC475/P)"],
      ["Wavelengths", "365 nm, 395 nm"],
      ["'P' Models", "Print optics optimized for product marking and short working distances"],
      ["Technology", "UV LED with custom optics"],
    ],
  },
  {
    slug: "ac5",
    name: "OmniCure AC5 Series UV LED Small-Area System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "Air-Cooled UV LED Curing",
    sub: "Small-Area",
    accent: "#60a5fa",
    intro:
      "The OmniCure AC5 Series provides compact, air-cooled small-area UV LED curing at flexible working distances. AC550/P and AC575/P models deliver 14 W/cm² at 395 nm, while the AC575-405 reaches 15 W/cm² at 405 nm. The heads can be mounted in any orientation and require no external chiller or ozone extraction. Print ('P') variants use application-specific optics.",
    features: [
      "14 W/cm² at 395 nm; up to 15 W/cm² with AC575-405",
      "Advanced front-end optics for exceptional uniformity",
      "Patented LED UV module output ensures consistent results",
      "Air-cooled — no chiller required",
      "Models: AC550, AC550P, AC575, AC575P",
      "'P' variants use optics optimized for printing applications",
    ],
    applications: [
      "Small-area UV curing requiring 14 W/cm² irradiance",
      "Electronic and optoelectronic component assembly",
      "Medical device bonding and sealing",
      "Applications requiring precise UV dose control and power measurement",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller)"],
      ["Peak Irradiance", "14 W/cm² at 395 nm; 15 W/cm² for AC575-405"],
      ["Models", "AC550, AC550P, AC575, AC575P, AC575-405"],
      ["Curing Area", "25 × 50 mm (AC550/P); 25 × 75 mm (AC575/P)"],
      ["Wavelengths", "395 nm; 405 nm (AC575-405)"],
      ["'P' Models", "Print optics optimized for product marking"],
    ],
  },
  {
    slug: "ac7",
    name: "OmniCure AC7 Series UV LED Large-Area System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area",
    accent: "#60a5fa",
    intro:
      "The OmniCure AC7 Series provides uniform, air-cooled large-area UV LED curing in 150 mm and 300 mm lengths. AC7150 and AC7300 heads deliver 3 W/cm² at 365 nm or 5 W/cm² at 395 nm. Multiple heads can be adjoined without compromising uniformity, supporting medical-device, electronics, automotive, optical-fiber and industrial processes.",
    features: [
      "3 W/cm² at 365 nm or 5 W/cm² at 395 nm",
      "Custom front-end optics: high peak irradiance available at longer working distances",
      "High longitudinal uniformity for consistent and repeatable curing of all parts",
      "Multiple systems adjoinable (AC7150 + AC7300 combinations) for any curing width",
      "Air-cooled — no chiller required; simple, cost-effective integration",
      "Curing widths: 150 mm (AC7150) and 300 mm (AC7300)",
      "PLC interface for a high degree of automation and optical output control",
      "LED head lifetime >20,000 hours with effective thermal management",
      "Patented individual UV LED module output for exceptional uniformity",
    ],
    applications: [
      "Display and touch panel adhesive curing",
      "Thin film UV coating curing",
      "Fiber and optical component curing",
      "Large-area UV adhesive bonding in electronics manufacturing",
      "Applications requiring high irradiance at long working distances",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller required)"],
      ["Peak Irradiance", "3 W/cm² at 365 nm; 5 W/cm² at 395 nm"],
      ["Curing Widths", "150 mm (AC7150), 300 mm (AC7300)"],
      ["Models", "AC7150, AC7300"],
      ["Emitting Area", "15 × 150 mm (AC7150); 15 × 300 mm (AC7300)"],
      ["Wavelengths", "365 nm, 395 nm"],
      ["Adjoining", "Any combination of AC7150 and AC7300 for custom width"],
      ["Optics", "Custom front-end; high irradiance at extended working distances"],
      ["Control", "PLC interface"],
      ["LED Lifetime", ">20,000 hours accumulated on-time"],
      ["Technology", "UV LED with patented individual module output"],
    ],
  },
  {
    slug: "ac8",
    name: "OmniCure AC8 Series UV LED Large-Area System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area",
    accent: "#60a5fa",
    intro:
      "OmniCure AC8 Series air-cooled UV LED curing systems deliver over 8 W/cm² peak irradiance with exceptional uniformity for even curing. The AC8150/P, AC8225/P and AC8300/P provide high longitudinal uniformity across the entire 150 mm (6\") to 300 mm (12\") curing area for consistent, repeatable results. The 'P' versions feature enhanced optics optimized for dose delivery at the short working distances required by print applications. A patented process for addressing individual UV LED module outputs provides exceptional uniformity, and multiple heads can be adjoined while maintaining optical uniformity, enabling flexible scaling. LED head lifetime exceeds 20,000 hours.",
    features: [
      "Peak irradiance >8 W/cm² with exceptional uniformity for even curing",
      "Patented individual UV LED module output addressing for unbeatable uniformity",
      "Multiple heads adjoinable while maintaining optical uniformity between systems",
      "'P' versions: enhanced optics optimized for short working distance (print applications)",
      "High longitudinal uniformity across the entire 150–300 mm curing area",
      "Air-cooled — no chiller required; compact form factor",
      "Curing widths: 150 mm, 225 mm, 300 mm",
      "PLC interface for a high degree of automation and optical output control",
      "LED head lifetime >20,000 hours of accumulated on-time",
      "Flexible curing area scaling for improved throughput without compromise",
    ],
    applications: [
      "Display, touch panel and thin film adhesive/coating curing",
      "Print applications requiring short working distance dose optimization ('P' models)",
      "Large-area UV curing on electronics and optics production lines",
      "Industrial adhesive and coating curing requiring >8 W/cm² irradiance",
      "Applications requiring scalable curing width without uniformity compromise",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller required)"],
      ["Peak Irradiance", ">8 W/cm²"],
      ["Curing Widths", "150 mm (AC8150/P), 225 mm (AC8225/P), 300 mm (AC8300/P)"],
      ["Models", "AC8150, AC8150P, AC8225, AC8225P, AC8300, AC8300P"],
      ["'P' Models", "Enhanced optics for short working distance — optimized for print"],
      ["Adjoining", "Multiple heads adjoinable; optical uniformity maintained"],
      ["Control", "PLC interface"],
      ["LED Lifetime", ">20,000 hours accumulated on-time"],
      ["Power Cable", "5-conductor DC (18-00595R); not compatible with AC7/AC4 cables"],
      ["Technology", "UV LED with patented individual module output"],
    ],
  },
  {
    slug: "ac8-hd",
    name: "OmniCure AC8-HD High-Dose UV LED Large-Area System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area · High-Dose",
    accent: "#60a5fa",
    intro:
      "OmniCure AC8150P-HD, AC8225P-HD and AC8300P-HD air-cooled UV LED curing systems deliver an outstandingly high optical dose, bringing UV LED curing to the next level. The AC8-HD Series uses patented technology that enables unbeatable uniformity of output across the irradiation area. Available in 385, 395 and 405 nm, the AC8-HD delivers over 15 W/cm² peak irradiance — double the dose of the standard AC8 Series — making it ideal for large-area curing applications that demand the highest dosage. Offered in three cure widths (150, 225, 300 mm), systems can be adjoined to any curing size without compromising uniformity. Patented individual UV LED module output addressing enables customizable outputs and tighter process control; LED lifetime exceeds 20,000 hours.",
    features: [
      "Peak irradiance >15 W/cm² — double the dose of the standard AC8 Series",
      "Patented technology for unbeatable uniformity across the entire irradiation area",
      "Patented individual UV LED module output for customizable outputs and tighter process control",
      "Available wavelengths: 385, 395, 405 nm (±5 nm)",
      "Three standard cure widths: 150 mm, 225 mm, 300 mm",
      "Systems adjoinable to any curing size without uniformity compromise",
      "Air-cooled — no chiller required; compact form factor",
      "PLC interface for a high degree of automation and optical output control",
      "LED head lifetime >20,000 hours accumulated on-time",
      "State-of-the-art electronics with effective thermal management",
    ],
    applications: [
      "Large-area UV curing demanding the highest optical dose",
      "Display, touch panel, thin film bonding and coating requiring double-dose performance",
      "Electronics UV adhesive curing where standard AC8 dose is insufficient",
      "Applications requiring tight process control with customizable UV LED output",
      "High-speed production lines requiring maximum UV output in a compact footprint",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller required)"],
      ["Peak Irradiance", ">15 W/cm² (>2× standard AC8 dose)"],
      ["Available Wavelengths", "385, 395, 405 nm (±5 nm)"],
      ["Curing Widths", "150 mm (AC8150P-HD), 225 mm (AC8225P-HD), 300 mm (AC8300P-HD)"],
      ["Models", "AC8150P-HD, AC8225P-HD, AC8300P-HD"],
      ["Adjoining", "Systems adjoinable without uniformity compromise"],
      ["Control", "PLC interface; patented individual module output addressing"],
      ["LED Lifetime", ">20,000 hours accumulated on-time"],
      ["Power Cable", "5-conductor 8 AWG (225/300P-HD); 12 AWG (150P-HD); shielded, <5 m"],
      ["Technology", "UV LED with patented high-dose individual module output"],
    ],
  },
  {
    slug: "ac9225",
    name: "OmniCure AC9 Series High-Power UV LED Area Curing System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area · High-Power",
    accent: "#60a5fa",
    intro:
      "The OmniCure AC9 Series delivers 14 W/cm² peak irradiance for fast curing of inks, adhesives and coatings in a compact, air-cooled format. AC9150, AC9225 and AC9300 models cover 150 mm, 225 mm and 300 mm lengths at 385 nm or 395 nm. Print ('P') variants at 395 nm use optics optimized for short working distances, and multiple heads can be adjoined without compromising uniformity.",
    features: [
      "14 W/cm² peak irradiance for fast curing of inks, adhesives and coatings",
      "150 mm, 225 mm and 300 mm emitting lengths",
      "Patented individual UV LED module output for exceptional uniformity",
      "High longitudinal uniformity for consistent, repeatable results across all parts",
      "Multiple heads adjoinable while maintaining optical uniformity between systems",
      "Air-cooled — no chiller required; compact form factor with best-in-class irradiance",
      "395 nm 'P' variants use optics optimized for print applications",
      "PLC interface for a high degree of automation and optical output control",
      "LED head lifetime >20,000 hours accumulated on-time",
      "Scalable to curing widths from 150 mm to 300 mm across the AC9 Series",
    ],
    applications: [
      "High-speed UV ink curing requiring >14 W/cm² irradiance",
      "Adhesive and coating curing on electronics and display production lines",
      "Print applications requiring high-power UV output over 225 mm width",
      "Industrial manufacturing requiring best-in-class air-cooled UV LED performance",
      "Applications scaling from AC8225 needing higher irradiance in the same footprint",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller required)"],
      ["Peak Irradiance", "14 W/cm²"],
      ["Full AC9 Series Widths", "150 mm (AC9150/P), 225 mm (AC9225/P), 300 mm (AC9300/P)"],
      ["Models", "AC9150, AC9150P, AC9225, AC9225P, AC9300, AC9300P"],
      ["Wavelengths", "385 nm; 395 nm (standard and Print variants)"],
      ["'P' Models", "Print optics optimized for short working distances"],
      ["Adjoining", "Multiple heads adjoinable; optical uniformity maintained"],
      ["Control", "PLC interface; patented individual module output"],
      ["LED Lifetime", ">20,000 hours accumulated on-time"],
      ["Technology", "High-power UV LED with patented individual module output"],
    ],
  },
  {
    slug: "ac9225-f",
    name: "OmniCure AC9225-F Air-Cooled UV LED Fiber Curing System",
    brand: "OmniCure",
    brandId: "omnicure",
    tech: "Air-Cooled UV LED Curing",
    sub: "Fiber Curing · 225 mm",
    accent: "#60a5fa",
    intro:
      "OmniCure AC9225-F UV LED curing systems are specifically designed for fiber curing applications. An innovative optical design enhances output and optimizes delivery of UV onto the fiber, providing an air-cooled, high-output solution to meet the demand for increased process speeds. The AC9225-F delivers up to 88 W/cm² peak irradiance at the fiber (in a typical face-to-face configuration) at 10–18 mm working distance. A replaceable outer window lets customers scale production speeds without complex integration changes, and innovative LED control technology delivers exceptional uniformity — with multiple systems joinable to increase cure-area width while maintaining uniformity across all systems.",
    features: [
      "Purpose-designed for optical fiber curing applications",
      "Innovative optics enhance output and UV delivery onto the fiber",
      "Up to 88 W/cm² peak irradiance at the fiber (face-to-face configuration)",
      "10–18 mm working distance",
      "Replaceable outer window for easy maintenance and production scaling",
      "Air-cooled — no chiller required",
      "Multiple systems joinable for wider cure area with maintained uniformity",
      "Up to 60% lower power consumption vs. traditional arc-lamp systems",
      "Over 40,000 hours LED lifetime with no replacement parts",
    ],
    applications: [
      "Optical fiber coating cure",
      "High-speed fiber production lines",
      "Fiber draw, coloring and marking processes",
      "Upgrades from arc-lamp fiber curing seeking higher line speeds",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller)"],
      ["Configuration", "Fiber curing (face-to-face)"],
      ["Peak Irradiance at Fiber", "Up to 88 W/cm² (face-to-face)"],
      ["UV LED Head", "AC9225F-395: 20 W/cm², 15 × 225 mm @ 395 nm"],
      ["Working Distance", "10–18 mm"],
      ["Outer Window", "Replaceable"],
      ["Scalability", "Multiple systems joinable for wider cure area"],
      ["Energy Savings", "Up to 60% vs. arc lamp"],
      ["LED Lifetime", ">40,000 hours, no replacement parts"],
    ],
  },
  {
    slug: "fe100",
    name: "Phoseon FireEdge FE100 UV LED Small-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Air-Cooled UV LED Curing",
    sub: "Small-Area",
    accent: "#60a5fa",
    intro:
      "The FireEdge FE100 air-cooled UV LED curing system uses passive cooling through natural convection, enabling precise finish control for applications such as digital inkjet pinning and space-limited installations. An innovative UV LED source for commercial inkjet pinning, the FE100 has no internal fans — eliminating cooling fans for a thinner, more reliable curing source. Its extremely slim form factor and ambient cooling remove the need for any external forced-air system or chiller, making it ideal for flat panel display edge curing. Built on Phoseon's patented SLM and WhisperCure technologies, it delivers 2 W/cm² peak irradiance at 385/395/405 nm (1 W/cm² at 365 nm) across emitting windows from 80 mm to 240 mm, with simple analog control.",
    features: [
      "Peak irradiance 2 W/cm² at 385, 395, 405 nm (1 W/cm² at 365 nm)",
      "Patented WhisperCure technology for quieter operation",
      "Natural convection cooling — no external cooling system or chiller required",
      "No internal fans: thinner, more reliable curing source",
      "Slim form factor ideal for space-constrained environments",
      "Analog control for ease of use",
      "Phoseon SLM LED technology",
      "Available emitting windows: 80, 120, 180, 240 mm (× 10 mm)",
    ],
    applications: [
      "Digital inkjet printing (pinning & full cure)",
      "Adhesives",
      "Coatings",
      "Flat panel display edge curing",
      "Space-constrained inline installations",
    ],
    specs: [
      ["Cooling Method", "Air-cooled — natural convection (no fans, no chiller)"],
      ["Technology", "Solid-state UV LED with SLM and WhisperCure"],
      ["Wavelengths", "385, 395, 405 nm and 365 nm"],
      ["Peak Irradiance", "2 W/cm² (385/395/405 nm); 1 W/cm² (365 nm)"],
      ["Emitting Window", "80×10, 120×10, 180×10, 240×10 mm"],
      ["48 VDC Power In (max)", "34 W/0.7 A up to 100 W/2.1 A (by length)"],
      ["Control", "Analog"],
      ["Connector", "High-density DB-15 (male on source, female on cable)"],
      ["Operating Environment", "10°C to 50°C; 80% non-condensing up to 30°C"],
      ["Storage Temperature", "-20°C to 85°C"],
      ["Minimum Clearance", "50 mm (natural convection)"],
    ],
  },
  {
    slug: "fe400",
    name: "Phoseon FireEdge FE400 UV LED Small-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Air-Cooled UV LED Curing",
    sub: "Small-Area",
    accent: "#60a5fa",
    intro:
      "The FireEdge FE400 air-cooled UV LED curing system offers advanced features with maximum flexibility, including built-in intensity control for both full-cure and UV inkjet pinning applications. It features patented Semiconductor Light Matrix (SLM) technology for process stability and is available in lengths from 80 mm to 240 mm. Segment control allows half the light source to be disabled for precise UV coverage, and a Hub can manage up to six light sources.",
    features: [
      "Built-in intensity control: full-cure, low-intensity (pinning), and half-source modes",
      "Patented SLM technology for process stability and repeatable output",
      "Available lengths: 80, 120, 160, 180, 240 mm",
      "Air-cooled — no water connections required",
      "Segment control: disable left or right half for precise UV coverage",
      "Scalable: stack end-to-end for contiguous uniform UV output",
      "Hub supports up to six light sources, managed as a single unit",
    ],
    applications: [
      "Digital inkjet printing (UV pinning and full cure)",
      "UV adhesive curing in electronics and optics assembly",
      "3D printing UV curing",
      "Coating curing in web and sheet-fed printing",
    ],
    specs: [
      ["Cooling Method", "Air-cooled"],
      ["Technology", "Solid-state UV LED with patented SLM"],
      ["Available Lengths", "80, 120, 160, 180, 240 mm"],
      ["Intensity Modes", "Full-cure, Low Intensity (pinning), Disable L/R SLM"],
      ["Power Supply", "External switching supply (Mean Well RSP-series)"],
      ["Multi-Lamp Control", "Hub: up to six sources as single unit"],
      ["Safety Rating", "Risk Group 3 per IEC 62471 at 200 mm"],
    ],
  },
  {
    slug: "fe410",
    name: "Phoseon FireEdge FE410 UV LED Small-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Air-Cooled UV LED Curing",
    sub: "Small-Area",
    accent: "#60a5fa",
    intro:
      "The FireEdge FE410 UV LED curing system provides up to 50% higher irradiance, power, and dose than the original FE400, making it ideal for faster processing speeds and enhanced throughput. Designed for full cure and pinning applications, it features patented TargetCure technology for precise and predictable UV output, built-in intensity control, and segment control. Units can be stacked end-to-end for contiguous, uniform UV output at any application size.",
    features: [
      "Up to 50% higher irradiance, power, and dose than the FE400",
      "Patented TargetCure technology for precise, predictable UV output",
      "Built-in intensity control for full-cure and pinning applications",
      "Segment control to save energy and achieve precise UV coverage",
      "Scalable: stackable end-to-end for contiguous uniform output",
      "Available lengths: 80, 120, 160, 180, 240 mm",
      "Air-cooled — no water connections required",
      "FE400 Hub backward compatible",
    ],
    applications: [
      "Digital inkjet printing — UV pinning and full cure",
      "3D printing UV curing at higher throughput",
      "UV adhesive curing in electronics and medical assembly",
      "Production lines upgrading from FE400 seeking enhanced throughput",
    ],
    specs: [
      ["Cooling Method", "Air-cooled"],
      ["Technology", "Solid-state UV LED with patented TargetCure"],
      ["vs FE400", "Up to 50% higher irradiance, power, and dose"],
      ["Available Lengths", "80, 120, 160, 180, 240 mm"],
      ["Intensity Modes", "Full-cure, Low Intensity (pinning), Disable L/R SLM"],
      ["Power Supply", "External switching supply"],
      ["Safety Rating", "Risk Group 3 per IEC 62471 at 200 mm"],
    ],
  },
  {
    slug: "fj800",
    name: "Phoseon FireJet FJ800 UV LED Large-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area",
    accent: "#1A56DB",
    intro:
      "The Phoseon FireJet FJ800 UV LED Curing System is a large-area curing solution for adhesive and coating applications requiring low irradiance and long dwell time on large-scale production lines. Starting with a 100 mm × 100 mm base curing area, the modular components scale in all four directions, providing contiguous, uniform UV illumination. Operated by a simple controller supporting up to six light sources, the FJ800 is available in 365 and 395 nm wavelengths.",
    features: [
      "Modular and scalable: 100 mm × 100 mm base, scalable in all four directions",
      "Contiguous, uniform UV output across the entire curing area",
      "Simple controller supporting up to six light sources",
      "Available wavelengths: 365, 395 nm",
      "Air-cooled for flexible, cost-effective integration",
      "Optimized for large-area curing requiring low irradiance and long dwell time",
    ],
    applications: [
      "Micro-speaker manufacturing (adhesive curing)",
      "Camera module (CCM) assembly",
      "Flat panel display manufacturing",
      "Medical device assembly requiring large-area UV curing",
      "Large-scale electronics production lines",
    ],
    specs: [
      ["Cooling Method", "Air-cooled"],
      ["Base Curing Area", "100 mm × 100 mm (scalable all directions)"],
      ["Peak Irradiance @ 365 nm", "0.6 W/cm²"],
      ["Peak Irradiance @ 395 nm", "1.0 W/cm²"],
      ["Available Wavelengths", "365, 395 nm"],
      ["Controller", "Graphical interface; up to 6 sources"],
      ["Working Distance", "10–20 mm"],
    ],
  },
  {
    slug: "fj801",
    name: "Phoseon FireJet FJ801 UV LED Large-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area",
    accent: "#1A56DB",
    intro:
      "The Phoseon FireJet FJ801 UV LED Large-Area Curing Systems are designed primarily for production lines requiring area curing, such as micro-speaker and camera module manufacturing. These modular products scale from a 100 mm × 100 mm base and feature patented TargetCure technology for precise and predictable UV output. Available in 365, 385, 395 and 405 nm — a wider selection than the FJ800. The FJ801 controller is backward compatible with the FJ800 lamp.",
    features: [
      "Patented TargetCure technology for precise, predictable UV output",
      "Modular and scalable: 100 mm × 100 mm base, scalable in all directions",
      "Available wavelengths: 365, 385, 395, 405 nm (wider than FJ800)",
      "FJ801 controller backward compatible with FJ800 lamp",
      "Air-cooled for flexible integration without chiller",
      "Contiguous and uniform UV output across the curing area",
    ],
    applications: [
      "Micro-speaker manufacturing",
      "Camera module (CCM) assembly",
      "Electronics manufacturing requiring large-area UV curing",
      "Medical device assembly",
      "Production lines upgrading from FJ800",
    ],
    specs: [
      ["Cooling Method", "Air-cooled"],
      ["Base Curing Area", "100 mm × 100 mm (scalable)"],
      ["Available Wavelengths", "365, 385, 395, 405 nm"],
      ["Key Technology", "Patented TargetCure"],
      ["Controller Compatibility", "Backward compatible with FJ800 lamps"],
      ["Working Distance", "10 mm"],
    ],
  },
  {
    slug: "firejet-one",
    name: "Phoseon FireJet ONE UV LED Large-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area",
    accent: "#1A56DB",
    intro:
      "The FireJet ONE is a premium 20 W/cm² UV LED curing system designed for curing inks, coatings and adhesives where high power in a compact design is essential. Available in widths from 75 mm to 375 mm, FireJet ONE lamps scale easily by placing units side by side and daisy-chaining them together. Unique optics ensure consistent uniformity at the substrate surface, and as a fully self-contained unit it is simple to integrate — controllable via PLC signals for instant on/off, intensity and other primary functions, or digital control with Modbus TCP for advanced status, high-speed data exchange and remote access.",
    features: [
      "Premium 20 W/cm² peak irradiance in a compact, high-power design",
      "Five emitting-window widths: 75, 150, 225, 300, 375 mm",
      "Scalable — place units side by side and daisy-chain for wider coverage",
      "Unique optics for consistent uniformity at the substrate surface",
      "Fully self-contained unit for simple integration",
      "PLC control for instant on/off, intensity and primary functions",
      "Digital control with Modbus TCP for advanced status and remote access",
      "Air-cooled — no chiller required",
      "Available wavelengths: 385, 395, 405 nm",
    ],
    applications: [
      "UV curing of inks, coatings and adhesives",
      "Digital and industrial printing",
      "Web and conveyor-based production lines",
      "Large-area curing requiring high power in a compact footprint",
    ],
    specs: [
      ["Wavelengths", "385, 395, 405 nm"],
      ["Peak Irradiance", "20 W/cm²"],
      ["Emitting Window", "75×20 mm up to 375×20 mm"],
      ["Maximum Fan Capacity", "50 CFM up to 250 CFM (by width)"],
      ["48 V Power In (max)", "672 W/14 A up to 3,360 W/70 A"],
      ["Typical UV Emitting Power", "205 W up to 1,018 W"],
      ["DC Connector Type", "2W2 / 5W5 / 8W8 (by width)"],
      ["Cooling Method", "Air-cooled"],
      ["Communication", "PLC I/O, Modbus TCP"],
    ],
  },
  {
    slug: "fj100",
    name: "Phoseon FireJet FJ100 Gen2 UV LED Large-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area",
    accent: "#1A56DB",
    intro:
      "The Phoseon FireJet FJ100 Gen2 features a compact design and end-to-end scalability, making it a perfect solution for a variety of printing and coating applications. This fully self-contained unit comes with five window lengths for easy integration, providing an ideal combination of size and power for space-constrained environments. With WhisperCure and TargetCure technologies, the FJ100 delivers reliable, consistent performance at a quiet operating level. Lamps can be controlled via PLC signals for instant on/off and intensity, or digital control for advanced status. Units scale end-to-end to create any required curing length — ideal for UV inkjet and coating applications.",
    features: [
      "Compact, fully self-contained design — ideal for space-constrained environments",
      "End-to-end scalability: units stack to create any required curing length",
      "Five window lengths for flexible integration into any press or coater",
      "WhisperCure technology: reliable, consistent performance at a quiet operating level",
      "TargetCure technology: precise and predictable UV output",
      "PLC signal control: instant on/off, intensity and primary functions",
      "Advanced digital control option for detailed status and operation",
      "Air-cooled — no water connections or chiller required",
      "High-intensity output suitable for UV inkjet and coating curing at speed",
      "Supports RS485 and Modbus TCP communication",
    ],
    applications: [
      "UV inkjet printing (primary application)",
      "Coating curing on printing presses and coaters",
      "PCB silkscreen and solder mask printing",
      "Space-constrained environments requiring high-intensity UV curing",
      "Industrial printing requiring scalable UV curing width",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller required)"],
      ["Technology", "Solid-state UV LED with WhisperCure and TargetCure"],
      ["Window Lengths", "75, 150, 225, 300, 375 mm (5 options)"],
      ["Window Width", "20 mm"],
      ["Peak Irradiance @ 365 nm", "6 W/cm²"],
      ["Peak Irradiance @ 385/395/405 nm", "Up to 12 W/cm²"],
      ["Control", "PLC (on/off, intensity) or digital (RS485 / Modbus TCP)"],
      ["Scalability", "End-to-end stacking for any curing length"],
      ["Power Supply", "External switching power supply"],
      ["Generation", "Gen2 (second generation)"],
    ],
  },
  {
    slug: "fj240",
    name: "Phoseon FireJet FJ240 UV LED Large-Area System",
    brand: "Phoseon",
    brandId: "phoseon",
    tech: "Air-Cooled UV LED Curing",
    sub: "Large-Area · High-Dose",
    accent: "#1A56DB",
    intro:
      "The Phoseon FireJet FJ240 is an excellent choice for applications where maximum dosing and dwell time are crucial for effective scanning cures, thanks to its broad 40 mm-wide exposure window. This high-performance, air-cooled solution delivers more UV power than FireJet ONE or FJ100, making it ideal for applications demanding the highest curing performance. Available in window lengths of 75, 150, 225, 300 and 375 mm with peak irradiance up to 16 W/cm² at 385/395/405 nm. WhisperCure and TargetCure technologies ensure reliable, consistent and quiet operation, and Modbus TCP enables high-speed data exchange and remote access.",
    features: [
      "40 mm-wide LED window: maximum dose and dwell time for scanning cure applications",
      "Higher UV power than FireJet ONE and FJ100 — for the highest curing performance demands",
      "Peak irradiance up to 16 W/cm² at 385, 395 and 405 nm",
      "WhisperCure technology: consistent, reliable, quiet operation",
      "TargetCure technology: precise and predictable UV output",
      "Available window lengths: 75, 150, 225, 300 and 375 mm",
      "Air-cooled — no chiller required, easy installation and low maintenance",
      "Scalable: FireJet family products combine end-to-end for larger lengths",
      "Modbus TCP and RS485 communication for high-speed data exchange and remote access",
    ],
    applications: [
      "Digital inkjet printing requiring high UV dose and dwell time",
      "Wood coatings and surface finishing",
      "Scanning cure applications where maximum dose is critical",
      "Area cure applications demanding the highest curing performance",
      "Printing and coating where FJ100 or FireJet ONE output is insufficient",
    ],
    specs: [
      ["Cooling Method", "Air-cooled (no chiller required)"],
      ["Technology", "Solid-state UV LED with WhisperCure and TargetCure"],
      ["Window Dimensions", "75/150/225/300/375 mm length × 40 mm width"],
      ["Peak Irradiance @ 365 nm", "8 W/cm²"],
      ["Peak Irradiance @ 385/395/405 nm", "12 W/cm² or 16 W/cm² class"],
      ["UV Power @ 365 nm (75 mm)", "200 W; 48 V power in 720 W / 15 A"],
      ["UV Power @ 405 nm / 16 W/cm² (375 mm)", "2,000 W; 48 V power in 5,040 W / 105 A"],
      ["Communication", "RS485 and Modbus TCP"],
      ["Key Advantage vs FJ100", "40 mm window (vs 20 mm) for higher dose per pass"],
    ],
  },

  // ──────────── TECHNOLOGY 4: MICROWAVE UV CURING ────────────
  {
    slug: "f-series",
    name: "Fusion UV F Series Microwave UV Curing Systems",
    brand: "Fusion UV",
    brandId: "fusionuv",
    tech: "Microwave UV Curing",
    sub: "F Series",
    accent: "#f59e0b",
    intro:
      "The Fusion UV F Series are production-proven, simple-to-use microwave-powered systems used in hundreds of industrial UV curing applications worldwide. The F Series features electrodeless UV bulbs available in a variety of wavelengths, allowing optimization to specific process needs. Because these systems are electrode-free, they avoid the degradation issues of traditional UV lamps, extending lamp life and reducing maintenance. The modular design provides process flexibility with lower cost of ownership and easily retrofits into existing production lines. Note: lamps contain mercury — manage per applicable disposal laws.",
    features: [
      "Production-proven, simple-to-use design for broad industrial applications",
      "Electrodeless bulb design: avoids electrode degradation, extends lamp life",
      "Multiple UV broadband wavelengths (D, H, V, Q, M bulb fills)",
      "Easy-to-service modular design for lower cost of ownership",
      "Easily retrofits into existing production lines",
      "Multiple power classes: F300 (3 kW) and F600 (6 kW)",
      "High-intensity UV output for fast, uniform curing",
      "Wide selection of accessories and replacement parts",
    ],
    applications: [
      "Industrial UV curing of adhesives, coatings, and inks",
      "Optical fiber coating curing",
      "Wire and cable coating and marking",
      "Printing and converting applications",
      "Electronics and medical device UV adhesive curing",
    ],
    specs: [
      ["Power Classes", "F300 (3 kW), F600 (6 kW)"],
      ["Bulb Type", "Electrodeless UV bulb"],
      ["Bulb Fills", "D, H, V, Q, M spectral fills"],
      ["Technology", "Microwave-powered electrodeless lamp"],
      ["Design", "Modular for easy servicing"],
      ["Accessories", "Bulbs, reflectors, panes, magnetrons"],
      ["Mercury", "Yes — manage per disposal laws"],
    ],
  },
  {
    slug: "lighthammer-6",
    name: "Fusion UV LightHammer 6 MARK II UV Curing System",
    brand: "Fusion UV",
    brandId: "fusionuv",
    tech: "Microwave UV Curing",
    sub: "LightHammer Series",
    accent: "#f59e0b",
    intro:
      "The Fusion UV LightHammer 6 MARK II is a smart microwave-powered UV curing system with a 150 mm (6 inch) irradiator and 200 W/cm (500 W/inch) power class. Engineered for precision and lowest cost of ownership, it delivers high-intensity UV curing in a compact 6-inch module. The system includes an irradiator, electrodeless UV bulb, and a solid-state power supply with internal or external cooling blower. Modular systems can be combined to cure across wider widths or around complex shaped surfaces.",
    features: [
      "Smart solid-state power supply: flexible software-based control, reduced operating costs",
      "Power Factor Correction >99% at full load — eliminates electrical harmonics",
      "Reduced weight and better airflow for efficient cooling",
      "Modular design: combine systems for wider widths or complex surfaces",
      "Available with internal or external cooling blower",
      "150 mm (6 inch) irradiator with 200 W/cm (500 W/inch) power class",
      "Smaller and lighter than previous generation for easy integration",
      "Mercury-containing bulbs — manage per disposal laws",
    ],
    applications: [
      "High-speed converting, printing, and coating production lines",
      "Electronics and automotive UV adhesive curing",
      "Fiber optics and medical device UV curing",
      "Industrial lines requiring modular, scalable UV curing width",
    ],
    specs: [
      ["Irradiator Width", "150 mm (6 inch)"],
      ["Power Class", "200 W/cm (500 W/inch)"],
      ["Power Supply", "Solid-state (smart)"],
      ["Power Factor Correction", ">99% at full load"],
      ["Cooling", "Internal or external cooling blower"],
      ["Bulb Type", "Electrodeless UV bulb (D, H, V, Q, M)"],
      ["Modularity", "Combinable for wider curing width"],
      ["Mercury", "Yes — manage per disposal laws"],
    ],
  },
  {
    slug: "lighthammer-10",
    name: "Fusion UV LightHammer 10 MARK III UV Curing System",
    brand: "Fusion UV",
    brandId: "fusionuv",
    tech: "Microwave UV Curing",
    sub: "LightHammer Series",
    accent: "#f59e0b",
    intro:
      "The Fusion UV LightHammer 10 MARK III is the most advanced smart, IoT-ready, microwave-powered UV curing system, featuring a 10-inch irradiator and 240 W/cm (600 W/inch) power class. With sensors in both the intelligent irradiator and the solid-state power supply, it is fully IoT-enabled for today's Digitization Roadmap, monitoring 8 real-time operating parameters to minimize downtime and optimize processes. The intelligent irradiator is a direct drop-in replacement for existing LHI10 Mark II irradiators. Optional AIMS software provides centralized real-time monitoring.",
    features: [
      "IoT-ready: sensors in both irradiator and power supply for real-time monitoring",
      "Intelligent irradiator measures 8 operating parameters",
      "Reduces total cost of ownership via increased uptime",
      "240 W/cm (600 W/in) — highest power class in the LightHammer series",
      "Smart solid-state power supply with software-based control",
      "Optional AIMS software for centralized monitoring",
      "Direct drop-in replacement for existing LHI10 Mark II irradiators",
      "Systems combinable to increase curing width or cure complex 3D surfaces",
      "Available in D, H, H+, M, Q, V bulb spectral fills",
      "Mercury-containing bulbs — manage per disposal laws",
    ],
    applications: [
      "Converting, printing, and high-speed coating production lines",
      "Electronics, automotive, and fiber optics UV curing",
      "Medical device UV adhesive curing",
      "Industry 4.0 / smart manufacturing requiring IoT monitoring",
    ],
    specs: [
      ["Irradiator Footprint", "266.7 mm × 200 mm"],
      ["Power Class", "240 W/cm (600 W/inch)"],
      ["Line Power at 100%", "10 kVA"],
      ["Input Voltages", "200–480 V auto-ranging, 3-phase, 50/60 Hz"],
      ["Bulb Length", "25 cm"],
      ["Bulb Fills", "D, H, H+, M, Q, V"],
      ["Sensors", "8 operating parameters"],
      ["Weight", "LHI10 Mark III: 19 kg; LHI10B: 28 kg"],
      ["Monitoring Software", "Optional AIMS"],
      ["Mercury", "Yes — manage per disposal laws"],
    ],
  },
  {
    slug: "drf-series",
    name: "Fusion UV DRF Series Optical Fiber UV Curing Systems",
    brand: "Fusion UV",
    brandId: "fusionuv",
    tech: "Microwave UV Curing",
    sub: "Optical Fiber",
    accent: "#f59e0b",
    intro:
      "The Fusion UV DRF Series cure photoresponsive coatings, coloring inks, and ribbon matrix polymers in the production of optical fiber and cable. The DRF Series has been the UV curing system of choice for fiber manufacturing worldwide, thanks to its patented secondary elliptical reflector system that delivers highly focused, intense UV energy. The optical fiber passes through a sealed quartz tube aligned at the secondary focal point of the elliptical reflector for full-surface UV exposure. DRF systems support power levels from 1.8 kW (F300S) to 6 kW.",
    features: [
      "Patented secondary elliptical reflector: highest UV irradiance per watt",
      "Highly focused, intense UV energy for optical fiber curing",
      "Sealed quartz tube enables full-surface UV exposure with minimal stray radiation",
      "Noblelight microwave-powered electrodeless lamp: stable, consistent UV output",
      "Reaches maximum curing power within seconds of ignition",
      "Modular design for easy maintenance and component replacement",
      "Interchangeable bulbs to match spectral output to coating needs",
      "Optional easy-align lamp mounting system",
      "Optional patented back reflector for enhanced UV efficiency",
      "Individual lamp switching in multi-lamp setups for line-speed adjustment",
    ],
    applications: [
      "Optical fiber coating production — photoresponsive coatings on fiber",
      "Coloring inks for optical fiber color coding",
      "Ribbon matrix polymer curing for fiber optic ribbon cable",
      "Draw tower UV curing systems",
      "Wire and cable UV coating and marking",
    ],
    specs: [
      ["Models", "DRF F6 (6-inch), DRF F10T (10-inch)"],
      ["Power Range", "1.8 kW (F300S) to 6 kW"],
      ["Power Level Options", "65%/100% fixed or 35%–100% variable"],
      ["Reflector Types", "R500 (full-spectrum) or Dichroic (blocks visible/IR)"],
      ["Cooling", "Air-cooled (push-pull airflow)"],
      ["Quartz Tube Sealing", "Teflon gasket isolation"],
      ["Lamp Type", "Noblelight microwave-powered electrodeless"],
      ["Mercury", "Yes — manage per disposal laws"],
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Maps the model chips shown on the Products brand selector to catalog slugs,
// so each real product chip can link to its detail page.
export const modelToSlug: Record<string, string> = {
  "S2000 Elite": "s2000-elite",
  "S1500 Pro": "s1500-pro",
  "LX500": "lx500",
  "LS200 Radiometer": "ls200",
  "UV LED Heads (V3)": "v3-led-heads",
  "R2000 Radiometer": "r2000",
  "S2E Network Module": "s2e-network-module",
  "S Series Light Guide": "s-series-light-guides",
  "AC2": "ac2",
  "AC4": "ac4",
  "AC5": "ac5",
  "AC7": "ac7",
  "AC8": "ac8",
  "AC8-HD": "ac8-hd",
  "AC9225": "ac9225",
  "AC9225-F": "ac9225-f",
  "Nexus II": "nexus-ii",
  "Nexus II Air-Cooled": "nexus-ii-ac",
  "Semray 5000+": "semray-5000",
  "Semray UV5000+": "semray-5000",
  "Semray UV PC6003": "semray-pc6003",
  "Customized UV LED Solutions": "semray-uv5052m",
  "FireJet FJ100": "fj100",
  "FireJet FJ240": "fj240",
  "FireLine FL200": "fl200",
  "FireLine FL400": "fl400",
  "FireLine FL400-i Industrial": "fl400-i",
  "FireLine FL440": "fl440",
  "VeriCure Water-Cooled": "vericure",
  "FireJet ONE": "firejet-one",
  "FireJet FJ800": "fj800",
  "FireJet FJ801": "fj801",
  "FireEdge FE100": "fe100",
  "FireEdge FE400": "fe400",
  "FireEdge FE410": "fe410",
  "LightHammer 6 Mark II": "lighthammer-6",
  "LightHammer 10 Mark III": "lighthammer-10",
  "F Series": "f-series",
  "Optical Fiber UV Systems": "drf-series",
};

export function productHref(p: Product): string {
  return p.href ?? `/product/systems/${p.slug}`;
}

// Display order on the brand shop pages — most popular / best-selling first.
// (Sensible flagship-first default; adjust freely as real demand data comes in.)
// Products not listed fall to the end, in catalog order. The first few of each
// brand are badged "Popular" in the UI.
export const productPopularity: string[] = [
  // OmniCure
  "s2000-elite", "lx500", "ac8", "s1500-pro", "ac8-hd", "v3-led-heads", "ac5", "ac7",
  "r2000", "ls200", "ac9225", "ac4", "ac2", "ac9225-f", "s-series-light-guides", "s2e-network-module",
  // Phoseon
  "firejet-one", "fl400", "fj800", "nexus-ii", "vericure", "fe400", "fl440", "fl200",
  "fl400-i", "fj100", "fj240", "fj801", "fe100", "fe410", "nexus-ii-ac",
  // Fusion UV
  "lighthammer-10", "lighthammer-6", "f-series", "drf-series",
  // Noblelight
  "semray-5000", "semray-pc6003", "semray-uv5052m",
];

// Rank helper: index in productPopularity (unlisted → large number → sorts last).
export function popularityRank(slug: string): number {
  const i = productPopularity.indexOf(slug);
  return i === -1 ? 9999 : i;
}

// Eye-catching product tagline (from the official datasheets) shown under the
// H1 on the product detail hero. Bilingual; keyed by slug.
export const productTagline: Record<string, { en: string; zh: string; vi?: string; th?: string }> = {
  "s2000-elite": { en: "The Most Reliable, Highest-Quality Lamp Spot Curing", zh: "高可靠、高品质的灯式点固化", vi: "Lamp Spot Curing đáng tin cậy, chất lượng cao", th: "Lamp Spot Curing ที่เชื่อถือได้และคุณภาพสูง" },
  "s1500-pro": { en: "High-Throughput UV Curing for Micro- & Opto-Electronics", zh: "迈向紫外线固化的未来", vi: "UV Curing năng suất cao cho vi điện tử & quang điện tử", th: "UV Curing กำลังผลิตสูงสำหรับไมโครและออปโตอิเล็กทรอนิกส์" },
  "lx500": { en: "Ultra-Compact UV LED Spot Curing — Consistent, Repeatable Results", zh: "超紧凑 UV LED 点固化——一致、可重复的固化效果", vi: "UV LED Spot Curing siêu nhỏ gọn — kết quả nhất quán, lặp lại được", th: "UV LED Spot Curing ขนาดกะทัดรัดพิเศษ — ผลลัพธ์สม่ำเสมอ ทำซ้ำได้" },
  "ac9225": { en: "High-Power UV LED Curing for Adhesives, Coatings & Inks", zh: "面向胶粘剂、涂层与油墨的高功率 UV LED 固化", vi: "UV LED Curing công suất cao cho keo dán, lớp phủ & mực in", th: "UV LED Curing กำลังสูงสำหรับกาว สารเคลือบ และหมึกพิมพ์" },
};

// Shop-style highlight tags shown on product cards (short, spec-forward,
// language-neutral). Keyed by slug; products without an entry show none.
export const productHighlights: Record<string, LangText[]> = {
  // OmniCure — UV Lamp Spot
  "s2000-elite": [{ en: "Closed-Loop Feedback", zh: "闭环反馈", th: "ฟีดแบ็กแบบวงปิด", vi: "Phản hồi vòng kín" }, { en: "Intelli-Lamp 2.0", zh: "Intelli-Lamp 2.0", th: "Intelli-Lamp 2.0", vi: "Intelli-Lamp 2.0" }, { en: "Industry 4.0 Ready", zh: "支持工业 4.0", th: "รองรับ Industry 4.0", vi: "Sẵn sàng Industry 4.0" }],
  "s1500-pro": [{ en: "Intelli-Lamp 2.0", zh: "Intelli-Lamp 2.0", th: "Intelli-Lamp 2.0", vi: "Intelli-Lamp 2.0" }, { en: "4.3-inch Touchscreen", zh: "4.3 英寸触摸屏", th: "หน้าจอสัมผัส 4.3 นิ้ว", vi: "Màn hình cảm ứng 4.3 inch" }, { en: "StepCure 2.0", zh: "StepCure 2.0", th: "StepCure 2.0", vi: "StepCure 2.0" }],
  "r2000": [{ en: "Real-Time NIST Calibration", zh: "NIST 实时校准", th: "การสอบเทียบ NIST แบบเรียลไทม์", vi: "Hiệu chuẩn NIST thời gian thực" }, { en: "Multi-Station Matching", zh: "多工位匹配", th: "จับคู่หลายสถานี", vi: "Đồng bộ nhiều trạm" }, { en: "Cure-Ring Sensor", zh: "Cure-Ring 传感器", th: "เซนเซอร์ Cure-Ring", vi: "Cảm biến Cure-Ring" }],
  "s2e-network-module": [{ en: "Remote Monitoring", zh: "远程监控", th: "การมอนิเตอร์ระยะไกล", vi: "Giám sát từ xa" }, { en: "Up to 300 Systems", zh: "最多 300 台系统", th: "รองรับสูงสุด 300 ระบบ", vi: "Tối đa 300 hệ thống" }, { en: "Fault Email Alerts", zh: "故障邮件告警", th: "แจ้งเตือนข้อผิดพลาดทางอีเมล", vi: "Cảnh báo lỗi qua email" }],
  "s-series-light-guides": [{ en: "360° Cure-Ring", zh: "360° 环形固化", th: "Cure-Ring 360°", vi: "Cure-Ring 360°" }, { en: "Multi-Leg Delivery", zh: "多分支导光", th: "การนำแสงแบบหลายสาย", vi: "Dẫn sáng đa nhánh" }, { en: "Optical Adapters", zh: "光学适配器", th: "อะแดปเตอร์ออปติก", vi: "Bộ chuyển đổi quang học" }],
  // OmniCure — UV LED Spot
  "lx500": [{ en: "Intelli-Lamp Stability", zh: "Intelli-Lamp 稳定性", th: "ความเสถียร Intelli-Lamp", vi: "Ổn định Intelli-Lamp" }, { en: "2 / 4-Channel", zh: "2 / 4 通道", th: "2 / 4 ช่อง", vi: "2 / 4 kênh" }, { en: "StepCure 2.0", zh: "StepCure 2.0", th: "StepCure 2.0", vi: "StepCure 2.0" }],
  "v3-led-heads": [{ en: "High Output", zh: "高输出", th: "เอาต์พุตสูง", vi: "Đầu ra cao" }, { en: "Uniform Beam Profile", zh: "均匀光束分布", th: "โปรไฟล์ลำแสงสม่ำเสมอ", vi: "Chùm tia đồng đều" }, { en: "Multi-Wavelength", zh: "多波长", th: "หลายความยาวคลื่น", vi: "Đa bước sóng" }],
  "ls200": [{ en: "NRC-Traceable", zh: "NRC 可溯源", th: "สอบกลับได้ตาม NRC", vi: "Truy xuất theo NRC" }, { en: "Cure-Site Measurement", zh: "固化点测量", th: "การวัดที่จุดคิวริ่ง", vi: "Đo tại điểm đóng rắn" }, { en: "Selectable Wavelengths", zh: "波长可选", th: "เลือกความยาวคลื่นได้", vi: "Chọn bước sóng" }],
  // OmniCure — Air-Cooled UV LED Area
  "ac2": [{ en: "Air-Cooled · No Chiller", zh: "风冷 · 免冷水机", th: "ระบายความร้อนด้วยอากาศ · ไม่ต้องใช้ชิลเลอร์", vi: "Làm mát bằng khí · Không chiller" }, { en: "Compact Small-Area", zh: "紧凑小面积", th: "พื้นที่เล็กกะทัดรัด", vi: "Diện tích nhỏ gọn" }, { en: "Uniform Output", zh: "均匀输出", th: "เอาต์พุตสม่ำเสมอ", vi: "Đầu ra đồng đều" }],
  "ac4": [{ en: "High Irradiance", zh: "高辐照度", th: "ความเข้มแสงสูง", vi: "Cường độ cao" }, { en: "Long Working Distance", zh: "长工作距离", th: "ระยะทำงานไกล", vi: "Khoảng cách làm việc xa" }, { en: "Precise Dose Control", zh: "精准剂量控制", th: "ควบคุมโดสแม่นยำ", vi: "Kiểm soát liều chính xác" }],
  "ac5": [{ en: "High Irradiance", zh: "高辐照度", th: "ความเข้มแสงสูง", vi: "Cường độ cao" }, { en: "Even, Fast Curing", zh: "均匀快速固化", th: "คิวริ่งสม่ำเสมอและรวดเร็ว", vi: "Đóng rắn đều và nhanh" }, { en: "Optical Power Measurement", zh: "光功率测量", th: "การวัดกำลังแสง", vi: "Đo công suất quang" }],
  "ac7": [{ en: "Large-Area Uniformity", zh: "大面积均匀性", th: "ความสม่ำเสมอพื้นที่กว้าง", vi: "Đồng đều diện tích lớn" }, { en: "Adjoinable Heads", zh: "可拼接机头", th: "หัวต่อขยายได้", vi: "Đầu ghép nối được" }, { en: "Air-Cooled · No Chiller", zh: "风冷 · 免冷水机", th: "ระบายความร้อนด้วยอากาศ · ไม่ต้องใช้ชิลเลอร์", vi: "Làm mát bằng khí · Không chiller" }],
  "ac8": [{ en: "High Irradiance", zh: "高辐照度", th: "ความเข้มแสงสูง", vi: "Cường độ cao" }, { en: "Patented Uniformity", zh: "专利均匀性", th: "ความสม่ำเสมอที่จดสิทธิบัตร", vi: "Độ đồng đều được cấp bằng sáng chế" }, { en: "Print-Optimized 'P'", zh: "印刷优化「P」型", th: "รุ่น 'P' สำหรับงานพิมพ์", vi: "Bản 'P' tối ưu cho in" }],
  "ac8-hd": [{ en: "Double the Dose", zh: "双倍剂量", th: "โดสสองเท่า", vi: "Liều gấp đôi" }, { en: "High UV Energy", zh: "高紫外能量", th: "พลังงาน UV สูง", vi: "Năng lượng UV cao" }, { en: "Adjoinable", zh: "可拼接", th: "ต่อขยายได้", vi: "Ghép nối được" }],
  "ac9225": [{ en: "High-Power UV LED", zh: "高功率 UV LED", th: "UV LED กำลังสูง", vi: "UV LED công suất cao" }, { en: "Patented Uniformity", zh: "专利均匀性", th: "ความสม่ำเสมอที่จดสิทธิบัตร", vi: "Độ đồng đều được cấp bằng sáng chế" }, { en: "Scalable Width", zh: "幅宽可扩展", th: "ความกว้างขยายได้", vi: "Khổ mở rộng được" }],
  "ac9225-f": [{ en: "Fiber-Optimized Optics", zh: "光纤优化光学", th: "ออปติกที่ปรับสำหรับไฟเบอร์", vi: "Quang học tối ưu cho sợi quang" }, { en: "Replaceable Window", zh: "可更换视窗", th: "หน้าต่างเปลี่ยนได้", vi: "Cửa sổ thay thế được" }, { en: "40,000+ h LED Life", zh: "LED 寿命 40,000+ 小时", th: "อายุ LED 40,000+ ชม.", vi: "Tuổi thọ LED 40.000+ giờ" }],
  // Phoseon — Nexus II (water-cooled vs air-cooled differ on dose, width & speed)
  "nexus-ii": [{ en: "Higher Dose · 90 W/cm", zh: "更高剂量 · 90 W/cm", th: "โดสสูงขึ้น · 90 W/cm", vi: "Liều cao hơn · 90 W/cm" }, { en: "Up to 320 m/min", zh: "最高 320 m/min", th: "สูงสุด 320 ม./นาที", vi: "Tối đa 320 m/phút" }, { en: "Web Width to 675 mm", zh: "幅宽达 675 mm", th: "ความกว้างเว็บถึง 675 มม.", vi: "Khổ web đến 675 mm" }],
  "nexus-ii-ac": [{ en: "No Chiller · Air-Cooled", zh: "免冷水机 · 风冷", th: "ไม่ต้องใช้ชิลเลอร์ · ระบายความร้อนด้วยอากาศ", vi: "Không chiller · Làm mát bằng khí" }, { en: "70% Less Energy", zh: "能耗降低 70%", th: "ประหยัดพลังงาน 70%", vi: "Giảm 70% năng lượng" }, { en: "Up to 220 m/min", zh: "最高 220 m/min", th: "สูงสุด 220 ม./นาที", vi: "Tối đa 220 m/phút" }],
};

// ───────────────────────── Product documents ─────────────────────────
// Official Excelitas / OmniCure product literature (brochures, quick-start
// guides) hosted in the COS bucket under PRODUCTPDF/. Rendered as downloads on
// the product detail page. Keyed by slug; the `file` values are the real
// (case-sensitive, space-bearing) object keys in the bucket.
export type ProductDoc = {
  file: string;
  kind: { en: string; zh: string };
};

const PRODUCT_PDF_BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/PRODUCTPDF";

const DOC_BROCHURE = { en: "Brochure", zh: "产品手册" , vi: "Brochure", th: "โบรชัวร์" };
const DOC_QUICK_START = { en: "Quick Start Guide", zh: "快速入门指南" , vi: "Hướng dẫn khởi động nhanh", th: "คู่มือเริ่มต้นอย่างรวดเร็ว" };

export const productDocs: Record<string, ProductDoc[]> = {
  "ls200": [
    { file: "Brochure - OmniCure LS200 UV LED Radiometry and Calibration System.pdf", kind: DOC_BROCHURE },
  ],
  "ac7": [
    { file: "Quick Start Guide - OmniCure AC7 LED UV Curing System.pdf", kind: DOC_QUICK_START },
  ],
  "ac8": [
    { file: "Brochure - OmniCure AC8 LED UV Curing System.pdf", kind: DOC_BROCHURE },
  ],
  "ac8-hd": [
    { file: "Brochure - OmniCure AC8-HD LED UV Curing System.pdf", kind: DOC_BROCHURE },
  ],
  // Fusion UV — the F-Series product covers both F300 (3 kW) and F600 (6 kW)
  // power classes, so both brochures live here.
  "f-series": [
    { file: "Brochure Fusion-F300 Series UV Curing System.pdf", kind: { en: "F300 Series Brochure", zh: "F300 系列产品手册" } },
    { file: "Brochure Fusion-F600 Series UV Curing Systems.pdf", kind: { en: "F600 Series Brochure", zh: "F600 系列产品手册" } },
  ],
  "lighthammer-6": [
    { file: "Brochure Fusion-LightHammer 6 Mark II UV Curing System.pdf", kind: DOC_BROCHURE },
  ],
  "lighthammer-10": [
    { file: "Brochure Fusion-LightHammer 10 Mark III UV Curing System.pdf", kind: DOC_BROCHURE },
  ],
  // Noblelight
  "semray-5000": [
    { file: "Brochure - Noblelight-Semray 5000+ UV LED Water-Cooled System.pdf", kind: DOC_BROCHURE },
  ],
  // Phoseon — one Nexus II brochure covers both the water-cooled and
  // air-cooled variants, so it is listed on both product pages.
  "nexus-ii": [
    { file: "Brochure -Phoseon Nexus II water-cooled n air-cooled large-area curing system.pdf", kind: DOC_BROCHURE },
  ],
  "nexus-ii-ac": [
    { file: "Brochure -Phoseon Nexus II water-cooled n air-cooled large-area curing system.pdf", kind: DOC_BROCHURE },
  ],
  "vericure": [
    { file: "Brochure - Phoseon VeriCure Water-Cooled UV LED Large-Area Curing System.pdf", kind: DOC_BROCHURE },
  ],
};

// Full, browser-ready URL for a product document (spaces → %20, etc.).
export function productDocUrl(file: string): string {
  return `${PRODUCT_PDF_BASE}/${encodeURIComponent(file)}`;
}

// Product hero images live in the COS bucket under IMAGE/products/.
// The object keys there do NOT follow the slug convention (and are
// case-sensitive), so we map each slug to its real filename explicitly.
const PRODUCT_IMG_BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product";

// slug → actual object key in the bucket.
const productImageFile: Record<string, string> = {
  "lx500": "LX500.png",
  "v3-led-heads": "V3.png",
  "ls200": "LS200.png",
  "s1500-pro": "S1500.png",
  "nexus-ii": "nexusII.png",
  "nexus-ii-ac": "nexusII-air cooled.png",
  "fl200": "fl200.png",
  // FL400 and FL400-i are visually similar — share the FL400-i image
  // (a standalone fl400.png is not available in the asset bucket).
  "fl400": "fl400i.png",
  "fl400-i": "fl400i.png",
  "fl440": "fl440.png",
  "ac2": "AC2.png",
  "ac4": "AC4.png",
  "ac5": "AC5.png",
  "fj800": "fj800.png",
  "fj801": "fj801.png",
  "firejet-one": "firejet one.png",
  "f-series": "f300.png",
  "lighthammer-6": "6markII.png",
  "lighthammer-10": "10markIII.png",
  "vericure": "vericure.jpg",
  "drf-series": "phoseon optical fiber.jpg",
  "fe100": "fe100.png",
  "fe400": "fe400.png",
  "fe410": "fe410.png",
  "semray-5000": "semray5000.png",
  "semray-pc6003": "PC6003.png",
  "semray-uv5052m": "noblelight customer-specific.png",
  "fj100": "fj100.png",
  "fj240": "fj240.png",
  "ac7": "AC7.png",
  "ac8": "AC8.png",
  "ac8-hd": "AC8-HD.png",
  "ac9225": "ac9225.png",
  "ac9225-f": "AC9225-F.png",
  "r2000": "R2000.png",
};

// Full image URL for a product, or "" when no asset is available (the UI
// renders a branded placeholder instead of a broken image in that case).
export function productImage(p: Product): string {
  if (p.imageUrl) return p.imageUrl;
  const file = productImageFile[p.slug];
  return file ? `${PRODUCT_IMG_BASE}/${encodeURIComponent(file)}` : "";
}

// ───────────────────────── Product SEO (JSON-LD) ─────────────────────────
const SITE = "https://www.etiatech.com";

const BRAND_MANUFACTURER: Record<Product["brandId"], string> = {
  omnicure: "OmniCure (Excelitas Technologies)",
  phoseon: "Phoseon Technology (Excelitas)",
  fusionuv: "Fusion UV (Excelitas Technologies)",
  noblelight: "Excelitas Noblelight",
};

export const brandRouteSlug: Record<Product["brandId"], string> = {
  omnicure: "omnicure",
  phoseon: "phoseon",
  fusionuv: "fusion-uv",
  noblelight: "noblelight",
};

// ─────────────────────────────────────────────────────────────────────────
// Canonical UV technology taxonomy — the SINGLE source of truth for ETIA's
// six technology categories. Use these exact names everywhere (case studies,
// application notes, product & brand pages) and as SEO keywords. `id` is a
// stable slug for future faceted/tag pages.
// ─────────────────────────────────────────────────────────────────────────
export type TechRoute = { id: string; en: string; zh: string; th?: string; vi?: string };

export const TECH_ROUTES: TechRoute[] = [
  { id: "uv-lamp-spot-curing", en: "UV Lamp Spot Curing System", zh: "UV 灯点光源固化系统", th: "ระบบ UV Lamp Spot Curing", vi: "Hệ thống UV Lamp Spot Curing" },
  { id: "uv-led-spot-curing", en: "UV LED Spot Curing System", zh: "UV LED 点光源固化系统", th: "ระบบ UV LED Spot Curing", vi: "Hệ thống UV LED Spot Curing" },
  { id: "air-cooled-uv-led-large-area-curing", en: "Air-Cooled UV LED Large Area Curing System", zh: "风冷 UV LED 大面积固化系统", th: "ระบบ UV LED พื้นที่กว้าง ระบายความร้อนด้วยอากาศ", vi: "Hệ thống UV LED diện tích lớn làm mát bằng khí" },
  { id: "air-cooled-uv-led-small-area-curing", en: "Air-Cooled UV LED Small Area Curing System", zh: "风冷 UV LED 小面积固化系统", th: "ระบบ UV LED พื้นที่เล็ก ระบายความร้อนด้วยอากาศ", vi: "Hệ thống UV LED diện tích nhỏ làm mát bằng khí" },
  { id: "water-cooled-uv-led-large-area-curing", en: "Water-Cooled UV LED Large Area Curing System", zh: "水冷 UV LED 大面积固化系统", th: "ระบบ UV LED พื้นที่กว้าง ระบายความร้อนด้วยน้ำ", vi: "Hệ thống UV LED diện tích lớn làm mát bằng nước" },
  { id: "microwave-uv-curing", en: "Microwave UV Curing System", zh: "微波 UV Curing 紫外线固化系统", th: "ระบบ Microwave UV Curing", vi: "Hệ thống Microwave UV Curing" },
];

const TECH_BY_ID: Record<string, TechRoute> = Object.fromEntries(TECH_ROUTES.map((r) => [r.id, r]));

// Maps a product to exactly one of the six canonical technology routes, or
// undefined for pure accessories (radiometers, light guides, network modules)
// that don't cure. Spot curing splits lamp vs LED by `sub`; air-cooled splits
// large vs small area by `sub`.
export function techRouteFor(p: Product): TechRoute | undefined {
  switch (p.tech) {
    case "UV Spot Curing":
      if (p.sub?.startsWith("UV Lamp Spot")) return TECH_BY_ID["uv-lamp-spot-curing"];
      if (p.sub?.startsWith("UV LED Spot")) return TECH_BY_ID["uv-led-spot-curing"];
      return undefined; // radiometer / accessory
    case "Air-Cooled UV LED Curing":
      return p.sub?.includes("Small-Area")
        ? TECH_BY_ID["air-cooled-uv-led-small-area-curing"]
        : TECH_BY_ID["air-cooled-uv-led-large-area-curing"];
    case "Water-Cooled UV LED Area Curing":
      return TECH_BY_ID["water-cooled-uv-led-large-area-curing"];
    case "Microwave UV Curing":
      return TECH_BY_ID["microwave-uv-curing"];
    default:
      return undefined;
  }
}

// Short product model name for a "Product" ticket — strips the brand prefix and
// the trailing marketing/technology descriptor from the full catalog name.
// e.g. "OmniCure S2000 Elite UV Spot Curing System" → "S2000 Elite".
export function productModel(p: Product): string {
  let s = p.name;
  for (const b of ["OmniCure", "Phoseon", "Noblelight", "Fusion UV"]) {
    if (s.startsWith(b + " ")) { s = s.slice(b.length + 1); break; }
  }
  s = s.replace(/\s(UV (LED|Spot|Curing|Radiomet)|Water-Cooled|Air-Cooled|Microwave|High-Dose|High-Intensity).*$/i, "");
  return s.trim();
}

// Product JSON-LD (schema.org/Product) for a product detail page. ETIA is the
// distributor/seller; the brand is the manufacturer. areaServed reflects the
// Asia-Pacific territories ETIA covers.
export function productJsonLd(p: Product) {
  const img = productImage(p);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    ...(img ? { image: img } : {}),
    description: p.intro.slice(0, 300),
    category: p.tech,
    brand: { "@type": "Brand", name: p.brand },
    manufacturer: { "@type": "Organization", name: BRAND_MANUFACTURER[p.brandId] },
    url: `${SITE}${productHref(p)}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "ETIA Technology" },
      areaServed: ["CN", "HK", "TH", "VN"],
    },
  };
}

// BreadcrumbList JSON-LD: Home > Products > {Brand} > {Model}.
export function productBreadcrumbJsonLd(p: Product) {
  const brandName = p.brand;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE}/product` },
      { "@type": "ListItem", position: 3, name: brandName, item: `${SITE}/product/${brandRouteSlug[p.brandId]}` },
      { "@type": "ListItem", position: 4, name: p.name, item: `${SITE}${productHref(p)}` },
    ],
  };
}

// Returns the product with intro + feature + application bullets translated
// for the given locale. English is returned unchanged (no regression); zh/vi
// overlay the translated copy where available, falling back to the catalog
// text. Spec tables are intentionally left as-is (values are language-neutral).
export function localizeProduct(p: Product, locale: "en" | "zh" | "vi" | "th"): Product {
  if (locale === "en") return p;
  const pick = (l?: { zh: string[]; vi: string[]; th?: string[] }) =>
    l ? (locale === "zh" ? l.zh : locale === "vi" ? l.vi : locale === "th" ? (l.th ?? null) : null) : null;
  // Applications live in a parallel map so intro/feature entries stay untouched.
  const applications = pick(productAppsI18n[p.slug]) || p.applications;
  const o = productI18n[p.slug];
  if (!o) return { ...p, applications };
  const intro = o.intro ? (locale === "zh" ? o.intro.zh : locale === "vi" ? o.intro.vi : locale === "th" ? (o.intro.th ?? "") : "") || p.intro : p.intro;
  const features = pick(o.features) || p.features;
  return { ...p, intro, features, applications };
}
