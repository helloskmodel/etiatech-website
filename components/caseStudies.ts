// Featured ETIA case studies (B1–B10). Shared by the home page carousel
// and the Application page Customer Success section.
import { caseStudiesZh } from "./caseStudies.zh";

export type MaterialRow = { application: string; system: string; category: string; notes: string };

export type CaseStudy = {
  id: string;
  industry: string; // broad taxonomy (drives the chip color)
  sector: string; // concise detailed application name shown on the card chip
  company: string;
  title: string;
  image?: string; // filename under IMAGE/casestudies/ in the COS bucket
  overview?: string;
  challenge: string;
  solution: string;
  materials?: { rows: MaterialRow[]; disclaimer?: string };
  benefits?: string[];
  results?: string;
  marketContext?: string;
  keywords: string[];
  metric: string;
  metricLabel: string;
  source: string;
};

export const successStories: CaseStudy[] = [
  {
    id: "B1",
    industry: "Automotive & ADAS",
    sector: "EV Battery Manufacturing",
    company: "EV Battery Manufacturing",
    title: "Using UV Curing to Improve EV Battery Manufacturing Reliability and Costs",
    image: "ev-battery.png",
    overview:
      "Global EV sales grew from under 25,000 units in 2012 to over 8.5 million in 2021 (IEA). Battery pack reliability and manufacturing cost reduction are the central challenges, with electrode fabrication (binder coating) representing 63% of battery cell cost.",
    challenge:
      "Reducing manufacturing costs while increasing reliability of lithium-ion battery packs (LIB), particularly electrode coating (traditionally PVDF, requiring >35,000 kW heated air dryers) and cell-to-pack assembly under extreme vibration, heat, and corrosion exposure.",
    solution:
      "UV curable binders eliminate industrial dryers and solvents (up to 80% manufacturing cost reduction, 25%+ electrode cost reduction). OmniCure AC8/AC9 Series, S2000 Elite, and LX500 systems cure cell-to-pack sealants, structural adhesives, and vibration-resistant cell-to-weld protection materials.",
    materials: {
      rows: [
        { application: "LIB sealant/gasket", system: "AC8/9 Series, S2000 Elite, LX500", category: "H.B. Fuller EA6062 (UVA, 365nm)", notes: "In-place gasket forming/sealing" },
        { application: "LIB assembly", system: "AC8/9 Series, S2000 Elite, LX500", category: "Dymax 9501-F (UVA, UVV)", notes: "Cell assembly" },
        { application: "LIB assembly", system: "AC8/9 Series, S2000 Elite, LX500", category: "Loctite AA 3963 (UVA, UVV)", notes: "Cell assembly w/ Bayblend FR3040EV" },
        { application: "Vibration resistance", system: "AC8/9 Series, S2000 Elite, LX500", category: "Panacol Vitralit 2113/2114", notes: "Cell-to-weld protection, low ion" },
        { application: "Vibration resistance", system: "AC8/9 Series, S2000 Elite, LX500", category: "Panacol Vitralit UD 8050", notes: "Dual cure, ion-pur, shadow areas" },
      ],
    },
    benefits: [
      "Reduced process times, higher throughput, lowered rejection rates",
      "Enhanced battery pack reliability, reduced manufacturing cost",
      "Lower operational costs and resource consumption",
      "Environmentally friendly — reduction/elimination of VOCs",
    ],
    keywords: ["EV Battery (LIB)", "UV-Curable Binders", "AC8/AC9 · S2000 Elite · LX500", "Up to 80% Cost ↓", "VOC-Free"],
    metric: "Up to 80% ↓",
    metricLabel: "Manufacturing cost reduction. VOCs eliminated.",
    source: "Excelitas Application Note: UV Curing for EV Battery Manufacturing (IEA data)",
  },
  {
    id: "B2",
    industry: "Photonics & Advanced Packaging",
    sector: "Optical Transceivers (400G–1.6T)",
    company: "Optical Transceiver (400G–1.6T)",
    title: "UV Curing for Next-Generation Optical Transceiver Manufacturing (400G–1.6T)",
    image: "optical-transceiver.jpg",
    overview:
      "Optical transceivers are the 'killer application' driving the silicon photonics and PIC market, according to IDTechEx research. Data rates have doubled approximately every few years — 2026 has seen commercialization of 1.6 Tbps optical transceivers, enabling the latest generation of AI accelerator architectures with high-bandwidth, low-latency chip-to-chip communication. IDTechEx anticipates this doubling trend continuing, with 3.2T transceivers emerging toward the end of the decade. Every transceiver module — whether pluggable (QSFP-DD, OSFP) or co-packaged — depends on precision UV-cured bonding between lasers, photodiodes, lenses, and optical fiber.",
    challenge:
      "As data rates climb from 400G to 800G to 1.6T, the optical alignment tolerance required between laser/photodiode and fiber tightens from approximately ±500 nm to ±200 nm. UV adhesive cure-induced shrinkage — previously a minor tolerance contributor — now represents a significant fraction of the total alignment budget. Manufacturers also face mounting pressure to increase throughput as hyperscalers order transceivers in the tens of millions of units annually, while maintaining 5+ year field reliability under continuous data center operating conditions (thermal cycling, vibration, humidity).",
    solution:
      "OmniCure S2000 Elite, with patented Closed-Loop Feedback (CLF) technology, maintains UV output stability within ±5% of set point across millions of bonding cycles — directly addressing the dose-repeatability requirement that determines cure-shrinkage consistency. For multi-channel transceiver assembly lines bonding several fiber pigtails or lens elements per module, the OmniCure LX500 V2 multi-channel UV LED controller enables simultaneous curing across 2–4 bond stations, reducing per-unit cycle time. Both platforms integrate with the OmniCure R2000 Radiometer (NIST-traceable) or LS200 Radiometry System for in-process dose verification — critical for hyperscaler-mandated quality documentation and supplier qualification audits.",
    materials: {
      rows: [
        { application: "Laser-to-fiber pigtail bonding", system: "S2000 Elite (CLF)", category: "Cyanoacrylate / UV epoxy hybrid (illustrative — Dymax, Master Bond)", notes: "Sub-100nm cure shrinkage target" },
        { application: "Lens-to-photodiode bonding", system: "LX500 V2, 365nm", category: "UV-cure optical cement (illustrative — Norland, Epotek)", notes: "Index-matched cure required" },
        { application: "Multi-fiber array bonding", system: "LX500 V2 multi-channel", category: "Low-shrinkage UV epoxy (illustrative)", notes: "Sub-100nm alignment stability" },
        { application: "Process verification", system: "R2000 / LS200 Radiometry", category: "N/A", notes: "NIST-traceable dose documentation" },
      ],
      disclaimer: "Specific adhesive part numbers (Norland, Epotek, etc.) are illustrative category examples, not confirmed Excelitas-validated formulations. Verify with Applications Engineering.",
    },
    benefits: [
      "Stable optical alignment maintained through 5+ years of continuous data center operation",
      "Multi-channel simultaneous cure reduces per-unit cycle time at hyperscaler production volumes",
      "NIST-traceable process documentation supports hyperscaler supplier qualification requirements",
      "Scalable from 400G legacy lines to next-generation 1.6T and 3.2T transceiver platforms",
    ],
    marketContext:
      "IDTechEx projects the silicon photonics and PIC transceiver market to be the primary growth driver for the broader photonics industry through 2035, with AI accelerator bandwidth demands as the principal catalyst.",
    keywords: ["Optical Transceiver", "Silicon Photonics / PIC", "S2000 Elite CLF · LX500 V2", "±200nm Alignment", "NIST-Traceable"],
    metric: "±5% Dose",
    metricLabel: "CLF stability across millions of cycles. 400G → 1.6T.",
    source: "IDTechEx research · Excelitas OmniCure",
  },
  {
    id: "B3",
    industry: "Photonics & Advanced Packaging",
    sector: "Co-Packaged Optics (CPO)",
    company: "Co-Packaged Optics (CPO)",
    title: "UV Curing for Co-Packaged Optics — Enabling AI Data Center Infrastructure",
    image: "co-packaged-optics.png",
    overview:
      "Co-packaged optics (CPO) integrates optical transceivers directly onto the same package substrate as the switch ASIC or AI accelerator, eliminating the copper electrical traces that connect pluggable optical modules to traditional switch ports. The CPO market, valued at approximately $46M in 2024, is projected to reach $8.1B by 2030 — a 137% compound annual growth rate — driven by the shift from pluggables to CPO and from copper to optics across AI data center infrastructure. At GTC 2025, NVIDIA unveiled its Spectrum-X and Quantum-X silicon photonics switch platforms using CPO to connect GPUs at 1.6 Tbps per port. Broadcom, Cisco, Intel, and Marvell are pursuing parallel CPO architectures for hyperscale data center deployment.",
    challenge:
      "CPO assembly demands the most precise fiber-bonding tolerance of any commercial photonics application: silicon photonic engines must be bonded to fiber array units (FAUs) at alignment stability of 50–100 nanometers — meaning UV adhesive cure-induced shrinkage must not shift fiber position by more than this threshold. Compounding the difficulty, CPO packages undergo over 10,000 thermal cycles between –40°C and +125°C across their operating lifetime, and must maintain optical coupling efficiency throughout. Manufacturing volume is also scaling rapidly as hyperscalers commit to CPO-based switch architectures, requiring UV cure cycle times under 5 seconds per bond site to support production economics.",
    solution:
      "The OmniCure LX500 V2 with 365 nm V3 UV LED Heads provides the multi-channel, high-stability curing platform required for CPO fiber array bonding. Combined with the OmniCure LS200 UV LED Radiometry and Calibration System, manufacturers can verify UV dose in-process at each individual bond site — establishing the process control discipline that CPO's sub-100 nm tolerance demands. For applications requiring the highest level of documented process stability (qualification lots, new product introduction), the OmniCure S2000 Elite's Closed-Loop Feedback technology provides ±5% output stability with NIST-traceable R2000 Radiometer calibration.",
    materials: {
      rows: [
        { application: "Silicon photonic engine-to-fiber bonding", system: "LX500 V2, 365nm V3 Heads", category: "Low-shrinkage UV epoxy (illustrative — Master Bond, Epotek)", notes: "Sub-100nm alignment target" },
        { application: "Process dose verification", system: "LS200 Radiometry System", category: "N/A", notes: "In-process per-bond-site verification" },
        { application: "Package-level fiber pigtailing", system: "S2000 Elite or LX500 V2", category: "MT/MPO ferrule UV epoxy (illustrative)", notes: "High-density fiber termination" },
        { application: "Hermetic lid sealing", system: "AC Small (AC4/AC5)", category: "Low-outgassing UV sealant (illustrative)", notes: "Humidity protection for photonic die" },
      ],
      disclaimer: "Adhesive examples are illustrative manufacturer categories; specific formulations require validation with your materials/applications team.",
    },
    benefits: [
      "Sub-100 nm post-cure alignment shift meets the precision threshold for NVIDIA/Broadcom-class CPO switch platforms",
      "In-process dose verification (LS200) supports the quality systems hyperscaler customers require",
      "Closed-loop output stability (S2000 Elite) supports qualification-grade process documentation",
      "Positions Excelitas/OmniCure as a qualified supplier as the $46M→$8.1B CPO market scales through 2030",
    ],
    keywords: ["Co-Packaged Optics (CPO)", "LX500 V2 · 365nm V3 Heads", "LS200 Dose Verify", "Sub-100nm", "AI Data Center"],
    metric: "$46M → $8.1B",
    metricLabel: "CPO market by 2030 (137% CAGR). Sub-100nm cure.",
    source: "Industry CPO market forecasts · NVIDIA GTC 2025 · Excelitas OmniCure",
  },
  {
    id: "B4",
    industry: "Photonics & Advanced Packaging",
    sector: "Photonic IC (PIC) Packaging",
    company: "Photonic IC (PIC) Packaging",
    title: "UV Curing in Photonic Integrated Circuit (PIC) Packaging for AI Infrastructure",
    image: "pic-packaging.jpg",
    overview:
      "Photonic Integrated Circuits (PICs) — silicon photonic chips that process data using light rather than electrons — are the foundational technology behind AI data centers, 5G optical networks, LiDAR systems, and medical imaging. A silicon photonic chip may carry 100+ optical input/output ports, each requiring fiber-to-chip coupling at alignment tolerances below ±100 nm. Despite enormous advances in PIC fabrication at the wafer level, packaging remains the most challenging and cost-intensive step in PIC manufacturing — and UV-curable adhesives are the primary method for permanently locking fiber arrays into aligned position on the chip.",
    challenge:
      "Fiber Array Unit (FAU) bonding to PIC edge couplers is the single most precision-critical bonding operation in photonics manufacturing. A 32–512 channel fiber array is actively aligned to the photonic chip's waveguide facets, then permanently fixed with UV epoxy. UV adhesive shrinkage during cure can shift fiber alignment by hundreds of nanometers if not tightly controlled — directly impacting insertion loss and device yield. Additionally, UV adhesives for fiber-to-waveguide coupling must cure to exact refractive index values (typically n=1.45–1.52 at 1310/1550 nm telecom wavelengths), requiring controlled cure to prevent index variation across the production lot.",
    solution:
      "OmniCure LX500 V2 multi-channel UV LED spot curing, paired with the LS200 UV LED Radiometry and Calibration System, gives PIC packaging houses the combination of multi-point simultaneous curing (for chips with multiple FAU bond sites) and in-situ dose measurement needed to hold refractive index and alignment tolerances within specification. The LS200's NRC-traceable calibration and 320–750 nm selectable wavelength range accommodate the full range of photoinitiator chemistries used in low-shrinkage optical bonding formulations. For wafer-level 2.5D integration steps, OmniCure S2000 Elite with R2000 Radiometer calibration provides the validated, documented bonding dose required for foundry and OSAT (outsourced assembly and test) quality systems.",
    materials: {
      rows: [
        { application: "FAU-to-PIC edge coupler bonding", system: "LX500 V2 + LS200", category: "Index-matched UV epoxy (illustrative — Norland NOA series, Epotek)", notes: "n=1.45–1.52 @ 1310/1550nm" },
        { application: "Grating coupler index matching", system: "LX500 V2, selectable wavelength", category: "Refractive-index UV adhesive (illustrative)", notes: "±0.001 index precision target" },
        { application: "Micro-lens array bonding", system: "LX500 V2 (365nm)", category: "Optical UV cement (illustrative)", notes: "VCSEL array beam shaping" },
        { application: "Wafer-level interposer bonding", system: "S2000 Elite + R2000", category: "Wafer-scale UV bonding film (illustrative)", notes: "2.5D heterogeneous integration" },
      ],
      disclaimer: "Adhesive brand/series names are illustrative examples of known optical adhesive categories; confirm exact qualified formulations with your materials team before publication.",
    },
    benefits: [
      "Repeatable, low-shrinkage cure preserves fiber-to-waveguide coupling efficiency across high-volume PIC production",
      "In-situ LS200 dose measurement supports process qualification documentation for foundry/OSAT customers",
      "Multi-channel simultaneous cure increases throughput on chips with multiple FAU bond sites",
      "Positions Excelitas as a qualified UV curing partner for the AI-driven PIC manufacturing ramp",
    ],
    marketContext:
      "NVIDIA's GTC 2025 Spectrum-X/Quantum-X CPO switch announcement and the broader AI infrastructure buildout (Meta, Google, Microsoft, Amazon collectively announcing >$300B in 2025–2026 AI data center capex) are driving unprecedented demand for PIC packaging capacity at TSMC, Intel, and GlobalFoundries.",
    keywords: ["PIC Packaging", "FAU-to-Chip Bonding", "LX500 V2 + LS200", "Index-Matched n=1.45–1.52", "Foundry/OSAT"],
    metric: "±100 nm",
    metricLabel: "FAU-to-PIC alignment. Refractive index held in spec.",
    source: "IDTechEx · AI infrastructure capex data · Excelitas OmniCure",
  },
  {
    id: "B5",
    industry: "Photonics & Advanced Packaging",
    sector: "Advanced Packaging (Chiplet / 2.5D / 3D)",
    company: "Advanced Packaging (Chiplet / 2.5D / 3D)",
    title: "UV Curing in Advanced Semiconductor Packaging — Chiplets, 2.5D and 3D Integration",
    image: "advanced-packaging.jpg",
    overview:
      "The semiconductor industry's response to the physical limits of monolithic scaling has been to evolve packaging technology — integrating multiple chiplets, memory dies, and photonic engines into a single heterogeneous package. Technologies such as TSMC's CoWoS, Intel's Foveros, and the UCIe (Universal Chiplet Interconnect Express) open standard are transforming chip packaging from a commodity process step into a primary technology differentiator. NVIDIA's Blackwell architecture, AMD's MI300X, and Intel's Ponte Vecchio all rely on chiplet integration with dense interconnects between compute dies, HBM memory stacks, and (increasingly) photonic I/O engines.",
    challenge:
      "Advanced packaging introduces UV curing requirements at multiple, increasingly demanding process steps: bonding chiplets to silicon or organic interposers without introducing warpage on dies as thin as 50–100 µm; curing underfill between dense micro-bump arrays (bump pitches now below 40 µm on leading-edge designs) without thermal stress that could crack fragile interconnects; and — increasingly — bonding optical waveguide structures for photonic chiplet interconnects within the same package. Each of these steps must be compatible with high-mix, high-value production where die yield loss carries enormous cost consequences.",
    solution:
      "OmniCure LX500 V2 spot curing delivers the low-heat, precisely dosed UV exposure required for chiplet-to-interposer bonding without inducing warpage on thin dies. For underfill cure across larger interposer areas, the OmniCure AC Small Series (AC4/AC5) provides uniform area curing compatible with the fine-pitch micro-bump geometries found in CoWoS and Foveros-style packages. Where wafer-level UV dicing tape release precedes die singulation for 3D stacking, the OmniCure AC Large Series (AC7/AC8) provides full-wafer uniform exposure for clean die release across 200–450 mm wafer diameters without die breakage — a critical yield factor given the value of modern AI accelerator and HBM dies.",
    materials: {
      rows: [
        { application: "Chiplet-to-interposer bonding", system: "LX500 V2", category: "Low-warpage die-attach UV adhesive (illustrative — Master Bond, Namics)", notes: "Thin-die (50–100µm) compatible" },
        { application: "Fine-pitch underfill cure", system: "AC Small (AC4/AC5)", category: "UV-initiated capillary underfill (illustrative)", notes: "Sub-40µm bump pitch compatible" },
        { application: "UV dicing tape release", system: "AC Large (AC7/AC8)", category: "Standard UV dicing tape (illustrative — Nitto, Lintec categories)", notes: "Full 200–450mm wafer exposure" },
        { application: "Photonic chiplet waveguide bonding", system: "LX500 V2 (365nm)", category: "Index-matched UV epoxy (illustrative)", notes: "Optical I/O chiplet interconnect" },
      ],
      disclaimer: "Adhesive/tape brand examples are illustrative industry categories; confirm specific qualified products with your materials engineering team.",
    },
    benefits: [
      "Warpage-free die attach supporting next-generation AI accelerator and HBM memory packaging architectures",
      "Clean, contamination-free wafer dicing tape release critical for thin-die 3D stacking yield",
      "Scalable platform supporting both leading-edge AI silicon and broader chiplet ecosystem adoption (UCIe)",
      "Positions Excelitas alongside the foundry/OSAT ecosystem as advanced packaging volume scales",
    ],
    keywords: ["Chiplet · 2.5D · 3D", "CoWoS · Foveros · UCIe", "LX500 V2 · AC4/5 · AC7/8", "Thin-Die 50–100µm", "UV Dicing Release"],
    metric: "<40 µm pitch",
    metricLabel: "Fine-pitch underfill. Warpage-free thin-die attach.",
    source: "Excelitas OmniCure · advanced packaging ecosystem (CoWoS/Foveros/UCIe)",
  },
  {
    id: "B6",
    industry: "Automotive & ADAS",
    sector: "Automotive LiDAR Sensor",
    company: "Automotive LiDAR Sensor",
    title: "UV Curing for Automotive LiDAR Sensor Assembly",
    image: "Automotive LiDAR.jpg",
    overview:
      "LiDAR (Light Detection and Ranging) sensors are a critical enabling technology for autonomous vehicles, advanced driver assistance systems (ADAS), robotics, and industrial 3D mapping. A single automotive-grade LiDAR unit contains 16–128 precisely aligned laser transmitter and receiver channels, each bonded with UV-curable adhesives that must maintain optical alignment across automotive thermal and vibration environments (–40°C to +105°C, 15G vibration). The automotive LiDAR market is forecast to grow at approximately 25% CAGR through 2030, driven by SAE L2+ and L3 autonomous driving system adoption across both traditional OEMs and autonomous vehicle developers.",
    challenge:
      "LiDAR manufacturing demands sub-micron alignment of laser emitters (905 nm or 1550 nm) to collimating lenses, and precise focal-length setting between avalanche photodiode receivers and receiver lens assemblies — both locked permanently by UV adhesive cure. Any cure-induced shift in alignment directly degrades ranging accuracy, a safety-critical performance parameter. Additionally, MEMS scanning mirror bonding and optical aperture window sealing (for IP69K weatherproof rating) must be achieved without introducing stress on delicate micro-mechanical and optical components, all while meeting automotive-grade production volume and traceability requirements (IATF 16949).",
    solution:
      "OmniCure LX500 V2 precision spot curing, with fast (~30 ms) shutter response, locks laser-to-lens and photodiode-to-lens alignment the instant the UV trigger fires — minimizing the alignment drift window inherent to any post-active-alignment bonding process. For housing window sealing and broader area protection, the OmniCure AC Small Series (AC4/AC5) provides uniform, low-heat exposure compatible with IP69K sealant formulations. Combined, these two platforms address both the precision optical bonding and the broader environmental sealing requirements within a single LiDAR unit.",
    materials: {
      rows: [
        { application: "Laser emitter-to-collimating lens bonding", system: "LX500 V2 (365/405nm)", category: "UV optical cement (illustrative — Master Bond, Norland)", notes: "Sub-micron alignment lock" },
        { application: "APD receiver-to-lens bonding", system: "LX500 V2", category: "Precision UV cement (illustrative)", notes: "Focal length-critical cure" },
        { application: "MEMS scanning mirror bonding", system: "LX500 V2, low-stress profile", category: "Low-stress UV adhesive (illustrative)", notes: "Micro-mechanical compatibility" },
        { application: "Optical aperture window sealing", system: "AC Small (AC4/AC5)", category: "IP69K-rated UV sealant (illustrative)", notes: "Automotive weatherproof rating" },
      ],
      disclaimer: "Adhesive examples are illustrative categories based on known optical bonding adhesive suppliers; specific qualified part numbers require verification with your materials team.",
    },
    benefits: [
      "Precision optical alignment maintained through automotive vibration and thermal cycling, ensuring ranging accuracy",
      "Fast shutter response minimizes alignment-drift window during high-volume automated assembly",
      "Single-vendor platform (OmniCure) addresses both precision bonding and environmental sealing needs",
      "Positions Excelitas to serve the 25% CAGR automotive LiDAR manufacturing growth through 2030",
    ],
    keywords: ["Automotive LiDAR", "Laser/APD-to-Lens Bonding", "LX500 V2 · AC4/5", "Sub-Micron Lock", "IP69K Seal"],
    metric: "~25% CAGR",
    metricLabel: "Automotive LiDAR growth to 2030. Sub-micron lock.",
    source: "Automotive LiDAR market forecasts · Excelitas OmniCure",
  },
  {
    id: "B7",
    industry: "Optical Fiber & Cable Manufacturing",
    sector: "Optical Fiber Draw Tower",
    company: "Optical Fiber Draw Tower",
    title: "UV Curing for High-Speed Optical Fiber Draw Tower Manufacturing",
    image: "Optical Fiber Draw Tower.jpg",
    overview:
      "Optical fiber production begins with drawing glass fiber from a heated preform at speeds up to 3,500 m/min, immediately coating the bare fiber with dual UV-curable acrylate layers (primary and secondary coatings) within the draw tower. Global optical fiber demand is accelerating due to three converging trends: 5G network densification requiring fiber-to-the-antenna backhaul, hyperscale data center buildouts for AI training infrastructure, and national broadband expansion programs across multiple regions. Corning alone has announced multi-billion-dollar fiber capacity expansion investments to meet this demand.",
    challenge:
      "The UV curing step is the critical throughput bottleneck in fiber production: insufficient cure leads to coating delamination and fiber failure; excessive cure time limits achievable draw speed. Achieving complete, uniform 360° cure at the highest possible line speed — while maintaining continuous 24/7 operation with minimal planned maintenance — is the defining performance challenge for UV curing systems in fiber manufacturing. Coating cures must be completely uniform around the fiber circumference; any asymmetry causes residual stress and birefringence in the finished fiber, degrading optical performance.",
    solution:
      "OmniCure AC Large UV LED fiber draw tower systems deliver 360° uniform exposure engineered specifically for the continuous, high-speed demands of fiber coating cure, supporting draw speeds exceeding 3,000 m/min. The AC922S-F fiber-optimized system addresses fiber ribbon coating applications downstream of the draw tower. For facilities transitioning from legacy microwave-powered systems, OmniCure's UV LED platforms offer significant energy efficiency gains and longer service intervals, directly reducing the total cost of ownership for 24/7 continuous fiber production lines.",
    materials: {
      rows: [
        { application: "Primary/secondary coating cure", system: "AC Large UV LED (Fiber Draw Tower)", category: "Dual acrylate fiber coating (illustrative — DSM/Covestro, Coresix categories)", notes: "360° uniform cure at >3,000 m/min" },
        { application: "Fiber ribbon matrix coating", system: "AC922S-F", category: "UV-curable ribbon matrix material (illustrative)", notes: "Continuous ribbon line speed" },
        { application: "Coloring/marking layer cure", system: "AC Large or AC Small", category: "UV-curable coloring ink (illustrative — GEM Gravure category)", notes: "Fiber identification marking" },
      ],
      disclaimer: "Coating material brand examples are illustrative categories of known fiber coating suppliers; confirm specific qualified formulations with your materials team.",
    },
    benefits: [
      "Complete, uniform coating cure at maximum draw speed supports capacity expansion for 5G and AI data center fiber demand",
      "360° uniform exposure prevents coating asymmetry that causes residual stress and birefringence",
      "Energy-efficient UV LED platform reduces total cost of ownership vs. legacy microwave systems",
      "Supports continuous 24/7 production with minimal planned maintenance downtime",
    ],
    keywords: ["Fiber Draw Tower", "360° Uniform Cure", "AC Large UV LED · AC922S-F", ">3,000 m/min", "Energy-Efficient vs Microwave"],
    metric: ">3,000 m/min",
    metricLabel: "360° uniform cure at full draw speed.",
    source: "Optical fiber industry (Corning capacity data) · Excelitas OmniCure",
  },
  {
    id: "B8",
    industry: "Automotive & ADAS",
    sector: "ADAS Camera Module",
    company: "ADAS Camera Module",
    title: "UV Curing for ADAS Camera Module Manufacturing",
    image: "ADAS Camera Module.jpg",
    overview:
      "Advanced Driver Assistance Systems (ADAS) and autonomous driving require automotive-grade camera modules that maintain optical alignment to ±10 µm across –40°C to +105°C thermal environments and 15G mechanical shock. A modern vehicle may contain 8–12 cameras for 360° surround view, lane keeping, traffic sign recognition, and pedestrian detection. Each camera module requires UV-cured adhesive bonds that must maintain alignment through the 15-year service life of the vehicle, with IATF 16949 process validation and full traceability mandatory for automotive tier-1 qualification.",
    challenge:
      "Lens-to-barrel bonding requires active focus adjustment followed by UV cure to lock focal position, where cure-induced shrinkage must not shift focus by more than approximately 5 µm. Barrel-to-PCB bonding must fix the assembled lens barrel to the image sensor substrate at automotive-grade alignment. IR cut filter and housing-to-PCB sealing add further bonding steps, each requiring 100% UV dose traceability linked to unit serial number — a requirement driven by automotive batch recall capability and PPAP (Production Part Approval Process) documentation standards.",
    solution:
      "OmniCure S2000 Elite, with WEB UI remote monitoring, enables centralized oversight of UV dose across multiple ADAS camera assembly stations from a single dashboard — supporting the multi-station, high-volume production typical of tier-1 automotive camera suppliers. The system's NIST-traceable R2000 Radiometer provides the measurement traceability automotive quality systems require, while Closed-Loop Feedback ensures the dose repeatability needed to hold focus-lock tolerance across full production volume.",
    materials: {
      rows: [
        { application: "Lens-to-barrel focus-lock bonding", system: "S2000 Elite (CLF)", category: "UV optical cement (illustrative — Master Bond, Dymax)", notes: "±5µm focus shift tolerance" },
        { application: "Barrel-to-PCB structural bonding", system: "S2000 Elite or LX500 V2", category: "Structural UV adhesive (illustrative)", notes: "Automotive thermal cycling rated" },
        { application: "IR cut filter bonding", system: "LX500 V2 (365nm)", category: "Optical UV cement (illustrative)", notes: "Zero-tilt filter attachment" },
        { application: "Housing-to-PCB IP67 sealing", system: "AC Small (AC4/AC5)", category: "UV-curable sealant (illustrative)", notes: "Exterior camera waterproofing" },
      ],
      disclaimer: "Adhesive brand examples are illustrative categories; verify specific automotive-qualified part numbers with your materials engineering team.",
    },
    benefits: [
      "Automotive-grade optical alignment stability maintained through 15-year vehicle service life",
      "WEB UI centralized monitoring across multiple stations supports tier-1 high-volume production",
      "NIST-traceable dose documentation supports IATF 16949 and PPAP submission requirements",
      "Single-platform solution addresses focus-lock, structural, filter, and sealing bond steps",
    ],
    keywords: ["ADAS Camera Module", "Focus-Lock Bonding", "S2000 Elite · WEB UI · R2000", "±5µm Focus", "IATF 16949 · PPAP"],
    metric: "±10 µm",
    metricLabel: "Alignment across –40 to +105°C, 15-yr life.",
    source: "Automotive ADAS qualification standards · Excelitas OmniCure",
  },
  {
    id: "B9",
    industry: "Medical Device Assembly",
    sector: "Cardiovascular Catheter",
    company: "Cardiovascular Catheter",
    title: "UV Curing for Cardiovascular Catheter Manufacturing",
    image: "cardiovascular-catheter.jpg",
    overview:
      "Catheters are plastic tubes, sometimes coated, inserted into vessels or cavities to facilitate drainage, injection, or surgical access. Key applications include cardiovascular, urological, and intravenous. While urological catheters lead in unit sales, cardiovascular catheters hold the largest revenue share due to the severity and prevalence of cardiovascular disease — the leading cause of death globally, accounting for approximately 30% of disease worldwide (WHO). Percutaneous transluminal coronary angioplasty (PTCA), a minimally invasive procedure using balloon catheters to open obstructed coronary arteries, represents one of the fastest-growing catheter segments.",
    challenge:
      "Cardiovascular catheter manufacturing requires multiple bonding operations — balloon bonding, hub bonding, and marker bonding — each demanding strong, repeatable bonds of different material combinations. The critical, life-sustaining nature of cardiovascular catheters makes this an ideal application for UV spot curing systems with the highest level of control, since inconsistent bonds directly translate to patient safety risk.",
    solution:
      "The OmniCure S2000 Elite's Closed-Loop Feedback technology automatically maintains a repeatable UV energy dose for every catheter assembly, removing the user-intervention burden (and associated process risk) required by curing systems lacking this feature. The OmniCure R2000 Radiometer calibrates and sets output across all S2000 Elite systems on a production floor, ensuring an exact, matched process across every assembly line — with NIST-traceable calibration. For balloon bonding specifically, a multi-legged (3–4 leg) High Power Fiber Light Guide arranged radially provides uniform 360° curing; alternatively, the Cure Ring optical accessory (solid or slotted) couples to standard Light Guides for 360° uniform curing power with easier catheter insertion.",
    materials: {
      rows: [
        { application: "Balloon bonding (360° radial)", system: "S2000 Elite + 4-leg Light Guide or Cure Ring", category: "UV cyanoacrylate / urethane acrylate (illustrative — Dymax, Loctite)", notes: "360° simultaneous, low thermal stress" },
        { application: "Hub bonding", system: "S2000 Elite + Cure Ring", category: "Medical-grade UV adhesive (illustrative)", notes: "Dissimilar plastic-to-plastic bond" },
        { application: "Marker bonding", system: "S2000 Elite + fiber light guide", category: "UV adhesive, sub-mm bond line (illustrative)", notes: "Radiopaque marker fixation" },
      ],
      disclaimer: "Adhesive examples illustrative; the existing AN-MED-001 AppNote on file does not specify exact part numbers either — confirm with materials team if specific products are required for publication.",
    },
    benefits: [
      "Strong and repeatable bonding of plastic parts, critical for life-sustaining cardiovascular devices",
      "NIST-traceable calibration enables exact, matched process control across multiple assembly lines",
      "360° uniform curing via Cure Ring or multi-leg Light Guide ensures complete bond-line cure",
      "Lower irradiance settings (enabled by zero-loss multi-leg guides) extend lamp life and reduce operating cost",
    ],
    keywords: ["Cardiovascular Catheter", "Balloon/Hub/Marker Bonding", "S2000 Elite · Cure Ring · R2000", "360° Uniform", "NIST-Traceable"],
    metric: "Matched Lines",
    metricLabel: "NIST-traceable 360° cure. Patient-safety repeatability.",
    source: "WHO cardiovascular disease data · Excelitas Application Note (AN-MED-001)",
  },
  {
    id: "B10",
    industry: "Aerospace & Defense",
    sector: "Aerospace Composite Bonding",
    company: "Structural Composite Bonding",
    title: "UV Curing for Aerospace Structural Composite Bonding",
    image: "Aerospace Composite.jpeg",
    overview:
      "Aerospace structural composites — carbon fiber reinforced polymer (CFRP) and fiberglass — are increasingly used in airframe, interior, and unmanned aerial system (UAS/drone) structures to reduce weight while maintaining structural integrity. UV-curable structural adhesives offer rapid, documented cure for composite bonding operations, but aerospace's stringent airworthiness certification requirements (FAA, EASA) demand a level of process documentation and traceability beyond most other industrial UV curing applications.",
    challenge:
      "Flight-critical structural composite bonding requires fully documented, repeatable cure validation suitable for airworthiness certification submission. Any variability in UV dose delivery — whether from lamp aging, optical accessory losses, or operator inconsistency — must be detected, documented, and controlled within tight tolerances, since structural bond failure in a flight-critical component carries catastrophic safety consequences. Aerospace manufacturers also require long-term traceability records linking individual aircraft components back to specific cure cycles and equipment calibration records, often for the multi-decade service life of the aircraft.",
    solution:
      "The OmniCure S2000 Elite combined with the R2000 Radiometer provides the NIST-traceable calibration and Closed-Loop Feedback dose control required to meet aerospace quality system documentation standards. The R2000's serial communication with the S2000 Elite allows calibration and output setting from a single reference point, ensuring an exact, matched cure process is maintained across every structural bonding station on the production floor — directly supporting AS9100 aerospace quality management system requirements and FAA/EASA process validation documentation.",
    materials: {
      rows: [
        { application: "CFRP structural bonding", system: "S2000 Elite + R2000 Radiometer", category: "Structural UV/acrylic adhesive (illustrative — 3M, Master Bond aerospace-grade categories)", notes: "NIST-traceable cure documentation" },
        { application: "Fiberglass component bonding", system: "S2000 Elite + R2000 Radiometer", category: "UV structural adhesive (illustrative)", notes: "AS9100-compatible process control" },
        { application: "UAS/drone composite assembly", system: "LX500 V2 (for smaller components)", category: "UV structural adhesive (illustrative)", notes: "Lightweight structure bonding" },
      ],
      disclaimer: "Adhesive examples are illustrative categories of known aerospace-grade structural adhesive suppliers; specific qualified products must be confirmed through your aerospace materials qualification process (AS9100/NADCAP as applicable).",
    },
    benefits: [
      "Fully documented, repeatable structural bonding meeting aerospace quality and airworthiness certification requirements",
      "NIST-traceable calibration supports AS9100 quality management system and FAA/EASA documentation",
      "Closed-Loop Feedback ensures consistent dose delivery across the full production floor",
      "Long-term traceability records support multi-decade aircraft service life requirements",
    ],
    keywords: ["Aerospace Composite (CFRP)", "Structural Bonding", "S2000 Elite + R2000 · LX500 V2", "AS9100 · FAA/EASA", "Multi-Decade Traceability"],
    metric: "AS9100",
    metricLabel: "NIST-traceable cure for airworthiness certification.",
    source: "AS9100/NADCAP aerospace standards · Excelitas OmniCure",
  },
];

// Case study hero images live in the COS bucket under "IMAGE/case studies "
// (note: a space inside the folder name AND a trailing space — encoded as
// %20). Filenames are appended URL-encoded by caseStudyImage().
const CASE_IMG_BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/case%20studies%20";

export function caseStudyImage(c: CaseStudy): string {
  return c.image ? `${CASE_IMG_BASE}/${encodeURIComponent(c.image)}` : "";
}

// Builds a case-studies bucket URL from a raw filename (used for hero banners
// that reuse case-study photography). Filename is URL-encoded.
export function caseImageUrl(filename: string): string {
  return `${CASE_IMG_BASE}/${encodeURIComponent(filename)}`;
}

// Some banner photos live under the /IMAGE/application/ bucket instead.
const APP_IMG_BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/application";
export function appImageUrl(filename: string): string {
  return `${APP_IMG_BASE}/${encodeURIComponent(filename)}`;
}

// Purpose-made wide hero banners (1926×600, compressed) under /IMAGE/logo/.
const BANNER_BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo";
export function bannerUrl(filename: string): string {
  return `${BANNER_BASE}/${encodeURIComponent(filename)}`;
}

// Per-page hero background banner (blurred, lightened case-study photo).
// Change a filename here to swap that page's banner — no component edits needed.
export const PAGE_BANNERS = {
  omnicure: bannerUrl("BANNER-OMNICURE.jpg"),
  phoseon: bannerUrl("BANNER-PHOSEON.jpg"),
  applications: bannerUrl("BANNER-APPLICATION.jpg"),
  insights: bannerUrl("BANNER-INSIGHT.jpg"),
  support: bannerUrl("BANNER-SALES AND SUPPORT.jpg"),
} as const;

// Readable, SEO-friendly slug for a case study's landing page.
export function caseSlug(c: CaseStudy): string {
  return c.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return successStories.find((c) => caseSlug(c) === slug);
}

// Returns the case study with translated fields merged in for the given
// locale. Any field not translated falls back to the English source.
export function localizeCase(c: CaseStudy, locale: "en" | "zh" | "vi" | "th"): CaseStudy {
  if (locale !== "zh") return c;
  const zh = caseStudiesZh[c.id];
  return zh ? { ...c, ...zh } : c;
}

// Representative case-study photo reused as the page-hero banner background.
// Change the id to swap which photo backs the heroes.
const heroCase = successStories.find((s) => s.id === "B5");
export const heroBannerImage = heroCase ? caseStudyImage(heroCase) : "";

// Rotating banner set for the home hero — curated "latest industry tech"
// photos. Edit this id list to change which photos rotate / their order.
export const heroBannerImages: string[] = ["B5", "B1"]
  .map((id) => successStories.find((s) => s.id === id))
  .filter((c): c is CaseStudy => Boolean(c))
  .map(caseStudyImage)
  .filter(Boolean);
