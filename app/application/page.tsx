"use client";
import { useState } from "react";
import Link from "next/link";

type App = {
  id: string;
  industry: string;
  subCategory: string;
  product: string;
  title: string;
  hot?: boolean;
  challenge: string;
  solution: string;
  benefit: string;
  recommended: string;
};

const apps: App[] = [
  // Medical Device
  { id: "AN-MED-001", industry: "Medical Device", subCategory: "Cardiovascular", product: "S2000 Elite", title: "Balloon Catheter Tip Bonding", hot: true, challenge: "Bonding the inflatable balloon to the catheter shaft requires a strong, flexible joint capable of withstanding repeated inflation/deflation cycles and ISO 10993 biocompatibility requirements. Solvent-based adhesives introduce VOC contamination in clean-room environments and require long cure times.", solution: "UV-curable biocompatible adhesive (e.g. Dymax or Loctite 4311) applied at the balloon-shaft interface, cured using OmniCure S2000 Elite spot curing system through liquid light guide. Cure time 3–8 seconds at >1,500 mW/cm². CLF maintains consistent dose through production run.", benefit: "VOC-free clean-room process. Cycle time <10 seconds. FDA 21 CFR Part 820 validation with NIST-traceable R2000 dose records. Bond strength meets ISO 10555 burst pressure requirements.", recommended: "OmniCure S2000 Elite + S Series Light Guide + R2000 Radiometer" },
  { id: "AN-MED-002", industry: "Medical Device", subCategory: "Needle & Syringe", product: "LX500 V2", title: "Hypodermic Needle Assembly", hot: true, challenge: "Securing the stainless steel needle hub to the plastic barrel demands precise adhesive placement and fast cure — critical in high-speed automated assembly. Thermal cure causes barrel deformation at elevated temperatures.", solution: "UV-curable structural adhesive dispensed at hub-barrel interface. OmniCure LX500 V2 LED spot curing system provides instant on/off triggering via PLC, eliminating over-cure. Wavelength 365 nm matches photoinitiator absorption peak. 0 ms warm-up supports high-speed inline operation.", benefit: "Zero heat input eliminates barrel deformation. Cycle time <5 seconds. Inline PLC integration with automated dispensing line. Consistent bond strength across full production run without lamp warm-up delays.", recommended: "OmniCure LX500 V2 LED + Light Guide" },
  { id: "AN-MED-003", industry: "Medical Device", subCategory: "Sensors & Wearables", product: "S2000 Elite", title: "Medical Sensor Encapsulation", challenge: "Electronic sensors used in implantable or wearable medical devices must be hermetically encapsulated against body fluid ingress. Potting with thermal cure materials requires oven cycles that can stress delicate wire bonds and SMD components.", solution: "Low-viscosity UV-curable encapsulant dispensed over sensor assembly. OmniCure S2000 Elite delivers broad-spectrum 320–500 nm cure, activating multi-component photoinitiator systems. StepCure® 2.0 ramp profile prevents thermal shock during exothermic cure initiation.", benefit: "Eliminates oven cure step. Validated cure profile via StepCure® reduces internal stress. Encapsulant fully cured in <15 seconds. Biocompatibility validated per ISO 10993-5.", recommended: "OmniCure S2000 Elite + Collimating Adaptor" },
  { id: "AN-MED-004", industry: "Medical Device", subCategory: "Endoscope", product: "LX500 V2", title: "Endoscope Objective Lens Bonding", challenge: "Bonding optical-grade glass lenses within an endoscope tip requires sub-millimetre adhesive placement with no bleed, optical clarity after cure, and compatibility with steam autoclave sterilisation cycles.", solution: "Optically clear UV-curable adhesive (refractive index-matched) applied via automated micro-dispenser. OmniCure LX500 V2 at 365 nm provides controlled, narrow-spectrum cure that avoids yellowing. Spot size adaptor limits cure zone to lens edge only.", benefit: "Optically transparent bond. Autoclave-stable at 134°C. No adhesive bleed onto optical surface. Cure dose logged per unit via R2000 for regulatory audit trail.", recommended: "OmniCure LX500 V2 + Spot Size Adaptor + R2000 Radiometer" },
  { id: "AN-MED-005", industry: "Medical Device", subCategory: "Drug Delivery", product: "LX500 V2", title: "Drug Delivery Device Assembly", challenge: "Auto-injector and pen-injector devices contain multiple sub-assemblies requiring fast, reliable bonding of dissimilar materials (PC, ABS, TPE) under clean-room conditions.", solution: "UV-curable adhesive applied at each bond interface in sequential automated assembly. OmniCure LX500 V2 triggered by PLC at each station. Single-wavelength 365 nm eliminates broad-spectrum yellowing risk on transparent barrel windows.", benefit: "Multi-station inline cure with <3s cycle per joint. Clean-room compatible process. Full traceability through PLC log. Production yield improved vs. snap-fit assembly.", recommended: "OmniCure LX500 V2 (multiple heads) + PLC Integration" },
  { id: "AN-MED-006", industry: "Medical Device", subCategory: "Surgical Instruments", product: "S2000 Elite", title: "Surgical Instrument Bonding", challenge: "Bonding PEEK or stainless-steel surgical instrument components must withstand repeated autoclave sterilisation (134°C, 2 bar), mechanical shock during use, and chemical exposure to surgical disinfectants.", solution: "High-temperature-resistant UV-curable structural adhesive applied at joint interface. OmniCure S2000 Elite broad-spectrum output (320–500 nm) fully cures thick-cross-section bonds at up to 30 W/cm². CLF ensures consistent dose despite lamp aging.", benefit: "Autoclave-stable bond (>500 cycles validated). Bond shear strength >20 MPa. No adhesive yellowing or brittleness after sterilisation. Process validated per ISO 13485.", recommended: "OmniCure S2000 Elite + Liquid Light Guide" },
  { id: "AN-MED-007", industry: "Medical Device", subCategory: "IVD Diagnostics", product: "AC Small (AC4 or AC5)", title: "PCR Diagnostic Chip Sealing", challenge: "Sealing microfluidic channels in PCR diagnostic cartridges requires precision UV cure of a thin adhesive film over a structured substrate without deforming channel geometry or introducing air bubbles.", solution: "UV-curable film adhesive laminated over chip substrate. OmniCure AC Small series area-curing system delivers uniform irradiance across the full chip footprint in a single exposure. Low-intensity ramp-up via StepCure® prevents channel deformation.", benefit: "Uniform cure across 40×60 mm chip area. Channel integrity maintained. Throughput: 1 chip per 5 seconds. Clean-room compatible. Validated cure dose per lot via inline radiometry.", recommended: "OmniCure AC Small (AC4 or AC5) Area Curing System" },
  { id: "AN-MED-008", industry: "Medical Device", subCategory: "Orthopedics & Implants", product: "S2000 Elite", title: "Implantable Device Coating", hot: true, challenge: "Protective UV-curable coatings on implantable orthopaedic or cardiovascular devices must achieve full depth-of-cure across irregular 3D surface geometry without shadowing, while meeting ISO 10993 biocompatibility requirements.", solution: "Low-viscosity UV-curable biocompatible coating applied by dip or spray. OmniCure S2000 Elite with collimating adaptor enables controlled irradiance at defined working distance. Multiple exposures from different angles ensure uniform cure on complex geometry.", benefit: "Complete depth-of-cure on 3D surfaces. Biocompatible per ISO 10993-10. Hard coat Pencil Hardness >4H. Batch cure records maintained via Intelli-Lamp® hour log.", recommended: "OmniCure S2000 Elite + Collimating Adaptor" },
  { id: "AN-MED-009", industry: "Medical Device", subCategory: "Wound Care", product: "AC Large (AC7 or AC8)", title: "Wound Care Dressing Lamination", challenge: "Laminating absorbent wound pad layers to backing film in continuous roll-to-roll production requires uniform UV cure of pressure-sensitive adhesive across wide web widths at high line speeds.", solution: "UV-curable PSA applied by slot-die coating onto backing film. OmniCure AC Large series (AC7/AC8) provides uniform irradiance across full web width in a single pass. Consistent output at high conveyor speeds.", benefit: "Uniform adhesion across full web width. Line speed up to 30 m/min. No thermal exposure to absorbent layer. Reduced energy consumption vs. thermal PSA activation.", recommended: "OmniCure AC Large Series (AC7 or AC8)" },
  { id: "AN-MED-010", industry: "Medical Device", subCategory: "IV & Fluid Delivery", product: "LX500 V2", title: "Micro-Tube Assembly", challenge: "Joining micro-bore PTFE tubing connectors in fluid delivery systems for infusion pumps requires a fast, clean bond that is chemically compatible with saline and drug solutions and free from extractables.", solution: "Extractable-free UV-curable adhesive applied at connector-tube interface. OmniCure LX500 V2 at 385 nm achieves full cure through translucent PTFE wall in <5 seconds. Tight spot beam prevents adhesive migration into fluid path.", benefit: "No extractables in fluid path. Burst pressure >8 bar at connector joint. Clean-room process. PLC trigger for automated assembly line integration.", recommended: "OmniCure LX500 V2 + Small-Diameter Light Guide Tip" },

  // Automotive
  { id: "AN-AUT-001", industry: "Automotive", subCategory: "EV Battery", product: "S2000 Elite", title: "EV Battery Tab Bonding", hot: true, challenge: "Bonding copper or aluminium current-collector tabs to battery cell casings in EV pack assembly requires a structural adhesive that cures rapidly in an inline process, withstands vibration and thermal cycling (-40°C to 85°C), and replaces slow thermal oven cure.", solution: "UV-curable structural adhesive applied to tab-casing interface by robotic dispenser. OmniCure S2000 Elite triggered by PLC delivers up to 30 W/cm² for fast, deep-section cure. StepCure® 2.0 ramp profile controls exothermic heat in large bondlines.", benefit: "80% reduction in cure cycle time vs. thermal oven. Inline validation with NIST-traceable dose records. Bond withstands 1,000 thermal cycles (-40 to 85°C). Process scalable to high-volume EV production.", recommended: "OmniCure S2000 Elite + PLC Integration + R2000 Radiometer" },
  { id: "AN-AUT-002", industry: "Automotive", subCategory: "ADAS & Sensors", product: "LX500 V2", title: "Automotive Sensor Potting", hot: true, challenge: "Environmental sensors (ADAS cameras, radar, LiDAR) require encapsulant potting to protect PCB assemblies against moisture, dust, and vibration. Thermal cure causes CTE mismatch stress cracking in sensor housings.", solution: "UV-curable low-modulus encapsulant dispensed into sensor cavity. OmniCure LX500 V2 at 365 nm cures through translucent housing lid. Secondary thermal post-cure optional for shadowed areas. CLF maintains dose consistency.", benefit: "Eliminates oven cure step. Low-modulus cure protects wire bonds from CTE stress. IP67 protection validated. Cure cycle <20 seconds. Throughput increased 3× vs. thermal process.", recommended: "OmniCure LX500 V2 + Spot Size Adaptor" },
  { id: "AN-AUT-003", industry: "Automotive", subCategory: "Connectors & Sealing", product: "LX500 V2", title: "Connector & Housing Sealing", challenge: "Sealing electrical connectors in automotive underbody and powertrain environments demands a chemical and heat-resistant adhesive/sealant that cures rapidly in automated assembly and achieves IP67/IP69K protection.", solution: "UV-curable polyurethane or silicone sealant dispensed at connector mating face. OmniCure LX500 V2 LED cures at 365 nm in <5 seconds. Inline PLC triggering ensures consistent dose in automated assembly. No oven required.", benefit: "IP67/IP69K validated seal. Cycle time <8 seconds. Chemical resistance to automotive fluids (engine oil, brake fluid). Annual production throughput increased vs. moisture-cure silicone.", recommended: "OmniCure LX500 V2" },
  { id: "AN-AUT-004", industry: "Automotive", subCategory: "Camera Module", product: "S2000 Elite", title: "Camera Module Assembly", hot: true, challenge: "Bonding and sealing automotive camera modules (rear-view, ADAS) requires high-accuracy adhesive placement, fast cure at ambient temperature, and environmental resistance to moisture and temperature extremes in service.", solution: "UV-curable optical adhesive applied at lens-barrel and barrel-PCB interfaces. OmniCure S2000 Elite with liquid light guide reaches confined module geometry. CLF ensures consistent dose. Module aligned optically prior to UV exposure via active alignment process.", benefit: "Optical alignment maintained through cure. Cure cycle <10 seconds. Bond withstands AEC-Q200 thermal shock. No thermal distortion of optical assembly. Validated for ADAS camera production.", recommended: "OmniCure S2000 Elite + Liquid Light Guide" },
  { id: "AN-AUT-005", industry: "Automotive", subCategory: "Headlamp", product: "AC Large (AC7)", title: "Headlamp Lens Bonding", challenge: "Bonding polycarbonate lens to headlamp housing must withstand stone chip impact, thermal cycling, and high-pressure car-wash jets while maintaining optical clarity and UV stability.", solution: "UV-curable flexible adhesive dispensed along lens flange and cured using OmniCure AC Large area curing system. Uniform irradiance across full lens perimeter in a single automated exposure. UV-stabilised adhesive formulation prevents yellowing in service.", benefit: "Full-perimeter cure in single pass. Bond passes FMVSS 108 impact test. UV-stable adhesive — no yellowing after 1,500 hours weatherometer. Production cycle time <30 seconds per lamp assembly.", recommended: "OmniCure AC Large (AC7) + Conveyor System" },
  { id: "AN-AUT-006", industry: "Automotive", subCategory: "Automotive Electronics", product: "AC Small (AC5) or AC Large (AC7)", title: "PCB Conformal Coating — Automotive", challenge: "Automotive-grade PCBs (ECU, BMS, transmission control) require conformal coating protection against moisture, vibration, and corrosive gases across a wide temperature range (-40°C to 125°C). Thermal cure coatings require long oven cycles.", solution: "UV-curable conformal coating applied by selective robotic spray. OmniCure AC Large or AC Small area system provides uniform cure across full board footprint. Secondary thermal bake optional for shadowed areas under components.", benefit: "Cycle time reduced from 30 min (oven) to <60 seconds. AEC-Q100 Grade 1 environmental qualification. Coating thickness 25–75 µm. Throughput increased 4× in inline production.", recommended: "OmniCure AC Small (AC5) or AC Large (AC7)" },
  { id: "AN-AUT-007", industry: "Automotive", subCategory: "Interior Trim", product: "AC Large (AC8-HD)", title: "Dashboard & Trim Panel Coating", challenge: "Interior automotive trim panels (PP, ABS, TPO) require a scratch-resistant UV-clear coat that bonds to low-surface-energy substrates, maintains haptic quality, and cures rapidly in an inline painting process without heat distortion of the substrate.", solution: "UV-curable scratch-resistant clear coat applied by robotic spray, cured using OmniCure AC Large belt conveyor system. Substrate pre-treatment with corona discharge improves adhesion to PP/TPO. Conveyor speed tuned to achieve target dose.", benefit: "Scratch resistance >3H Pencil Hardness. No substrate distortion. Line speed 6 m/min. VOC-free formulation. Coating adhesion >3B cross-hatch (ISO 2409) on TPO substrate.", recommended: "OmniCure AC Large (AC8-HD) Belt Conveyor System" },

  // Electronics
  { id: "AN-ELC-001", industry: "Electronics", subCategory: "PCB Assembly", product: "AC Small (AC4/AC5) or AC Large (AC7)", title: "PCB Conformal Coating", hot: true, challenge: "Consumer and industrial PCBs require conformal coating to protect against moisture, fungus, and corrosion in field service. Solvent-based coatings require long drying cycles and VOC extraction infrastructure. Thermal coatings risk component damage.", solution: "UV-curable conformal coating applied by selective spray robot or dip-coat. OmniCure AC Small or AC Large area curing system provides uniform cure across board footprint. For shadowed areas, secondary moisture-cure chemistry activates after UV exposure.", benefit: "Cycle time <60 seconds. VOC-free process. IPC-CC-830B coating qualification. Throughput 3–5× greater than thermal oven. Compatible with all standard PCB substrate materials.", recommended: "OmniCure AC Small (AC4/AC5) or AC Large (AC7)" },
  { id: "AN-ELC-002", industry: "Electronics", subCategory: "Display Bonding", product: "LX500 V2", title: "Display Module Assembly (OCA)", hot: true, challenge: "Bonding polariser film, cover glass, and touch panel layers in LCD/OLED display assemblies requires optically clear, bubble-free adhesive cure with high transmittance and low birefringence. Air gaps between layers cause display quality issues.", solution: "Optically Clear Adhesive (OCA) applied by laminator between layers. OmniCure LX500 V2 at 365 nm cures OCA under controlled irradiance to prevent outgassing bubbles. Low-intensity cure profile achieves high transmittance (>99%) with minimal shrinkage stress.", benefit: "Optical transmittance >99.5% post-cure. No air voids or bubbles. Low shrinkage stress preserves touch panel calibration. Cycle time <10 seconds. Validated for smartphone display volume production.", recommended: "OmniCure LX500 V2 + Area Head + Low-Intensity Profile" },
  { id: "AN-ELC-003", industry: "Electronics", subCategory: "Wire & Coil", product: "LX500 V2 (365 nm)", title: "Wire Tacking & Strain Relief", challenge: "Securing wire harness loops and coil windings in motors, transformers, and electronic assemblies using traditional lacing or heat-shrink is slow and inconsistent. Wire movement under vibration causes fatigue failure at solder joints.", solution: "UV-curable wire tacking adhesive applied at anchor points. OmniCure LX500 V2 spot curing triggers at each tack point via PLC in automated dispensing system. Single-wavelength LED eliminates broad-spectrum degradation of wire insulation colour coding.", benefit: "Tack cure in <3 seconds per point. Wire movement eliminated in 10G vibration test. Colour coding intact. Throughput 5× faster than lacing. Compatible with PVC, PTFE, and silicone insulation.", recommended: "OmniCure LX500 V2 (365 nm)" },
  { id: "AN-ELC-004", industry: "Electronics", subCategory: "SMT Assembly", product: "LX500 V2", title: "Component Bonding (SMT Adhesive)", challenge: "Placing and temporarily bonding surface-mount components prior to wave soldering requires adhesive that cures rapidly under UV, holds component position accurately, and carbonises cleanly during subsequent solder reflow without residue.", solution: "UV-curable SMT adhesive dispensed by jet dispenser onto PCB pads. OmniCure LX500 V2 provides instantaneous cure in <1 second per component placement zone. PLC-synchronised with placement machine for inline operation at full SMT line speed.", benefit: "Sub-1-second cure per dot. No component tombstoning. Clean burn-off at reflow. Compatible with standard lead-free solder process (260°C peak). Throughput matched to SMT placement machine cycle time.", recommended: "OmniCure LX500 V2 (inline, 365 or 395 nm)" },
  { id: "AN-ELC-005", industry: "Electronics", subCategory: "Semiconductor", product: "LX500 V2 or S2000 Elite", title: "SMT Underfill", challenge: "Underfilling flip-chip and BGA packages in high-reliability electronics requires full capillary flow beneath package followed by rapid uniform cure. Thermal cure underfill requires long oven ramp cycles and limits throughput.", solution: "Snap-cure UV underfill dispensed around package perimeter, flows by capillary action beneath die. OmniCure LX500 V2 or S2000 Elite delivers defined dose from above to initiate snap-cure reaction. Full underfill cure in <20 seconds.", benefit: "Snap cure eliminates 30-minute oven cycle. Full underfill coverage confirmed by X-ray. Bond line voids <0.1%. Throughput increased 6× vs. thermal process. Validated for mil-spec board assemblies.", recommended: "OmniCure LX500 V2 or S2000 Elite" },
  { id: "AN-ELC-006", industry: "Electronics", subCategory: "Semiconductor Packaging", product: "S2000 Elite", title: "Semiconductor Package Glob-Top", challenge: "Protecting wire-bonded die on open-cavity packages requires a glob-top encapsulant that flows without lifting wire bonds, cures rapidly, and provides mechanical and moisture protection over a wide temperature range.", solution: "UV-curable glob-top encapsulant dispensed over wire-bonded die. OmniCure S2000 Elite broad-spectrum output achieves full-depth cure of opaque/filled encapsulants. StepCure® profile controls cure rate to prevent wire bond lifting.", benefit: "Full cure of 2 mm depth encapsulant in <30 seconds. No wire lift. Moisture absorption <0.5% at 85°C/85%RH. Passes JEDEC MSL Level 3. Throughput 4× faster than thermal oven glob-top.", recommended: "OmniCure S2000 Elite + StepCure® 2.0" },
  { id: "AN-ELC-007", industry: "Electronics", subCategory: "OLED Display", product: "LX500 V2 (365 nm)", title: "OLED Panel Encapsulation", challenge: "OLED displays require hermetic thin-film encapsulation to exclude oxygen and water vapour (WVTR <10⁻⁶ g/m²/day) that degrade organic emitter layers. Conventional glass frit sealing requires high-temperature laser process incompatible with flexible substrates.", solution: "UV-curable barrier adhesive applied as thin-film encapsulant layer. OmniCure LX500 V2 at 365 nm delivers low-dose, tightly controlled cure profile to minimise UV exposure of OLED emitter layer beneath encapsulant. Glove-box inert atmosphere maintained during cure.", benefit: "WVTR barrier <10⁻⁶ g/m²/day. OLED emitter layer protected from UV dose. Flexible encapsulation compatible with roll-to-roll OLED substrate. Cycle time <10 seconds. Validated for foldable OLED production.", recommended: "OmniCure LX500 V2 (365 nm, low dose profile)" },
  { id: "AN-ELC-008", industry: "Electronics", subCategory: "Wearable Electronics", product: "LX500 V2 (compact)", title: "Wearable Device PCB Potting", challenge: "Wearable electronics (smart watches, fitness trackers) require PCB potting that is ultra-thin, IP68-rated, and flexible enough to survive repeated bending without cracking.", solution: "Ultra-low-viscosity UV-curable encapsulant applied by micro-dispenser over wearable PCB. OmniCure LX500 V2 compact spot cures through transparent housing in <5 seconds. Low-modulus formulation absorbs flex stress without cracking.", benefit: "IP68 waterproof protection validated. Encapsulant thickness <0.5 mm. No cracking after 10,000 bend cycles. Biocompatible per ISO 10993. Weight impact <0.1 g per unit.", recommended: "OmniCure LX500 V2 (compact) + Micro Light Guide" },
  { id: "AN-ELC-009", industry: "Electronics", subCategory: "EV Charging", product: "AC Small (AC5)", title: "EV Charger Board Conformal Coating", challenge: "PCBs inside EV charging stations face condensation, salt air, and thermal cycling. High-voltage creepage requirements limit traditional coating spray patterns.", solution: "UV-curable selective conformal coating applied by robotic spray per IPC-CC-830B masking pattern. OmniCure AC Small provides full-board cure in 45 seconds. Creepage and clearance maintained per IEC 62196.", benefit: "IPC-CC-830B qualified. Salt-fog resistance >500h. Creepage / clearance compliant per IEC 62196. 4× throughput vs. thermal-cure coating process.", recommended: "OmniCure AC Small (AC5)" },

  // Cable & Fiber
  { id: "AN-CAB-001", industry: "Cable & Fiber", subCategory: "Fiber Connector", product: "S2000 Elite or LX500 V2", title: "Fiber Optic Connector Termination", hot: true, challenge: "Securing glass fiber in ferrules for LC/SC/FC connectors requires adhesive that bonds to both glass and ceramic/polymer ferrule materials, withstands repeated mating cycles, and cures without shrinkage that would misalign the fiber end-face.", solution: "UV-curable fiber optic adhesive injected into ferrule bore. OmniCure S2000 Elite or LX500 V2 at 365 nm cures adhesive through fiber tip in <5 seconds. Near-zero-shrinkage formulation preserves fiber alignment.", benefit: "Insertion loss <0.2 dB. Return loss >55 dB PC. Fiber pull-out force >10 N. Cure time 3–5 seconds. Compatible with LC, SC, FC, and MTP connector types. 10× faster than epoxy cure.", recommended: "OmniCure S2000 Elite or LX500 V2 + Fiber-Tip Adaptor" },
  { id: "AN-CAB-002", industry: "Cable & Fiber", subCategory: "Fiber Ribbon", product: "AC922S-F", title: "Fiber Ribbon Coating", challenge: "Bundling individual fibers into ribbon cable for high-density data centre and telecom applications requires UV-curable matrix coating that bonds fibers in precise parallel array while maintaining individual fiber access for mid-span splicing.", solution: "UV-curable fiber ribbon matrix material applied in die, cured by UV LED array inline during draw process. OmniCure AC922S-F fiber-specific curing system optimised for ribbon geometry provides uniform irradiance across full ribbon width at line speeds up to 2,000 m/min.", benefit: "Uniform ribbon geometry (fiber spacing ±2 µm). Colour coding preserved. Ribbon tensile strength >30 N. Line speed compatible with standard ribbon draw process. >50,000 m/lamp life LED system.", recommended: "OmniCure AC922S-F Fiber Ribbon Curing System" },
  { id: "AN-CAB-003", industry: "Cable & Fiber", subCategory: "Optical Fiber Drawing", product: "AC Large UV LED (Fiber Draw Tower)", title: "Optical Fiber Primary Coating", hot: true, challenge: "Applying and curing dual-layer primary coating (soft inner + hard outer) onto bare drawn glass fiber must achieve complete cure at draw speeds up to 3,000 m/min with zero uncured material reaching the take-up spool.", solution: "UV-curable dual-layer primary coating applied in die immediately after fiber draw. OmniCure AC Large UV LED curing system in fiber draw tower provides sufficient energy dose at full draw speed. LED array optimised for coating absorption spectra.", benefit: "Complete cure at 3,000 m/min draw speed. Coating OD uniformity ±2 µm. Coating adhesion meets IEC 60794-1-2 Method E1. Zero uncured material. LED system lifetime >50,000h reduces draw tower downtime.", recommended: "OmniCure AC Large UV LED System (Fiber Draw Tower Config)" },
  { id: "AN-CAB-004", industry: "Cable & Fiber", subCategory: "Cable Jacket", product: "AC Large (AC8) with 360° Reflector", title: "Cable Jacket Cure", challenge: "Applying UV-curable outer jacket coatings to data cables (Cat 6A, HDMI, USB) in extrusion/pull-through process requires uniform full-perimeter cure at production line speeds without hot-draw distortion of inner conductor geometry.", solution: "UV-curable jacket material applied over inner cable structure in crosshead die. OmniCure AC Large belt system provides 360° irradiance with mirror reflector system for full-perimeter cure. Line speed tuned to achieve target dose at cable OD.", benefit: "Full-perimeter cure. Cable OD tolerance ±0.05 mm. Jacket surface hardness Shore D 55–65. Line speed >30 m/min. Eliminates thermal jacket extrusion oven. Low-VOC formulation.", recommended: "OmniCure AC Large (AC8) with 360° Reflector" },
  { id: "AN-CAB-005", industry: "Cable & Fiber", subCategory: "Fiber Splice", product: "S2000 Elite or LX500 V2", title: "Fiber Splice Protection", challenge: "Protecting fusion splices in installed fiber optic cables requires UV-curable adhesive that flows under splice sleeve, cures rapidly, and provides mechanical protection and moisture exclusion across field installation temperatures.", solution: "UV-curable splice protection adhesive injected under heat-shrink sleeve, cured by compact battery-powered OmniCure spot curing unit at the splice point. Low-viscosity formulation ensures complete void-free fill.", benefit: "Splice tensile strength >200 N. Splice attenuation increase <0.05 dB. Field-curable in <10 seconds. Compact battery-powered curing unit suitable for FTTH installation workflow.", recommended: "OmniCure S2000 Elite (portable config) or LX500 V2" },
  { id: "AN-CAB-006", industry: "Cable & Fiber", subCategory: "Fiber Coating", product: "AC Large with 360° Reflector Array", title: "Tight-Buffer Fiber Coating", challenge: "Applying UV-curable tight-buffer layer over primary-coated fiber requires controlled cure of high-viscosity coating at draw speeds up to 500 m/min without surface defects or OD variation.", solution: "UV-curable nylon-acrylate tight-buffer coating applied inline at secondary coating station. OmniCure AC Large LED system with 360° mirror reflector array ensures full-perimeter cure at full line speed.", benefit: "Tight-buffer OD uniformity ±3 µm. Adhesion per IEC 60794-1-2 E1. Line speed 500 m/min. LED lifetime >50,000h. Low maintenance vs. mercury lamp alternative.", recommended: "OmniCure AC Large with 360° Reflector Array" },

  // Precision Optics
  { id: "AN-OPT-001", industry: "Precision Optics", subCategory: "Lens Assembly", product: "LX500 V2 (365 nm)", title: "Camera Lens Element Bonding", challenge: "Bonding precision glass lens elements in multi-element camera objectives requires optical-grade UV adhesive with matched refractive index, <0.1% shrinkage, and cure without introducing wavefront aberration or stress birefringence.", solution: "Refractive-index-matched UV-curable optical adhesive applied between lens elements. OmniCure LX500 V2 at 365 nm provides low-heat, controlled-dose cure. Active wavefront alignment maintained during cure via interferometer feedback.", benefit: "Wavefront error <λ/10 post-cure. Refractive index match Δn <0.0005. Stress birefringence <5 nm/cm. MTF maintained >90% at Nyquist frequency. Validated for machine vision and DSLR lens production.", recommended: "OmniCure LX500 V2 (365 nm) + Low-Dose Profile" },
  { id: "AN-OPT-002", industry: "Precision Optics", subCategory: "Optical Assembly", product: "LX500 V2 + Large-Area Adaptor", title: "Prism & Beamsplitter Assembly", challenge: "Assembling optical prisms and beamsplitters in projection and measurement systems requires UV-curable cement with matching dispersion characteristics, mechanical stability across -20°C to 60°C, and cure without disturbing cement layer uniformity.", solution: "UV-curable optical cement applied between prism faces in controlled environment. OmniCure S2000 Elite or LX500 V2 with flood attachment provides uniform large-area irradiance across prism face. Low-viscosity cement flows to eliminate air inclusions under gentle pressure.", benefit: "Cement layer uniformity <1 µm. Wavefront distortion <λ/4. Thermal stability validated to MIL-PRF-13830. Transmittance >99.5% per cement layer. Cement lifetime >25 years UV-stable formulation.", recommended: "OmniCure LX500 V2 + Large-Area Adaptor" },
  { id: "AN-OPT-003", industry: "Precision Optics", subCategory: "AR Coating", product: "LX500 V2 (365 nm)", title: "AR Coating Bond / Protective Overlay", challenge: "Laminating anti-reflection coated optical elements with UV-curable adhesive to protective substrate layers must preserve AR coating performance and surface quality without adhesive squeeze-out or delamination at operating temperature extremes.", solution: "UV-curable lamination adhesive applied to AR-coated substrate. OmniCure LX500 V2 at 365 nm provides gentle, low-heat cure that prevents AR layer delamination. Tack-free surface cure confirmed at 30 seconds; full structural cure at 60 seconds.", benefit: "AR coating reflectance preserved <0.2% per surface post-lamination. Delamination free at -40°C to +80°C thermal shock. Optical transmittance maintained. Clean edge bond without squeeze-out.", recommended: "OmniCure LX500 V2 (365 nm, low power profile)" },

  // UV Printing
  { id: "AN-PRT-001", industry: "UV Printing", subCategory: "Industrial Inkjet", product: "LX500 V2 Inline or AC Large LED", title: "UV Inkjet — Industrial & Wide-Format", challenge: "UV inkjet inks deposited onto non-absorbent substrates (glass, metal, polycarbonate, PVC banner) must cure instantly to prevent ink spread, achieve full colour gamut, and bond to substrate without primer on most materials.", solution: "UV-curable inkjet inks formulated for 365–405 nm LED cure. OmniCure LX500 V2 LED arrays or AC Large LED system mounted inline with inkjet print head array provides pin and flood cure sequence. LED cure eliminates ozone and mercury from print environment.", benefit: "Instant pin-cure freezes droplet geometry for sharp dot. Full flood cure achieves scratch-resistant ink film. Works on >200 substrate types without primer. Energy consumption reduced 60% vs. mercury lamp equivalent.", recommended: "OmniCure LX500 V2 Inline or AC Large Area LED System" },
  { id: "AN-PRT-002", industry: "UV Printing", subCategory: "Flexo & Offset", product: "AC Large (AC8-HD) or NobleLight Mercury Arc", title: "Flexographic / Offset UV Printing", challenge: "High-speed label, packaging, and commercial printing using UV-curable inks on flexo and offset presses requires consistent, high-energy cure at web speeds up to 400 m/min with uniform irradiance across full web width.", solution: "UV-curable flexo/offset inks formulated for OmniCure AC Large belt system or NobleLight mercury arc lamps. Broad-spectrum output (200–400 nm) cures standard photoinitiator ink systems at full press speed. Conveyor-synchronised exposure control.", benefit: "Full cure at 400 m/min web speed. Ink adhesion pass BS EN ISO 2409. Rub and scratch resistance achieved. Compatible with standard UV flexo press configurations. System integrates with press PLC for speed-compensated energy control.", recommended: "OmniCure AC Large (AC8-HD) or NobleLight Mercury Arc Lamp System" },
  { id: "AN-PRT-003", industry: "UV Printing", subCategory: "Container Decoration", product: "AC Small (AC2/AC4)", title: "Digital Label & Container Decoration", challenge: "UV-curable digital printing onto shaped containers (bottles, cans, tubes) requires wrap-around or partial-wrap cure on complex 3D surfaces, maintaining cure energy at all angles of substrate curvature.", solution: "UV-curable inkjet inks applied to rotating container surface by digital printer. OmniCure curved-profile LED array or AC Small compact system provides cure at all angular positions. Rotary encoder synchronises cure exposure to substrate rotation speed.", benefit: "Full wrap-around cure on 30–120 mm OD cylindrical containers. Ink adhesion >3B. UV-stable ink set: <ΔE 1.0 after 500h xenon. Compatible with glass, PET, aluminium, PP substrates. Output: 6,000 containers/hour.", recommended: "OmniCure AC Small (AC2/AC4) or Curved LED Array" },

  // Wood Coatings
  { id: "AN-WOD-001", industry: "Wood Coatings", subCategory: "Flat Panel", product: "AC Large (AC8-HD) or NobleLight Mercury Arc", title: "UV Lacquer Cure — Flat Panel", hot: true, challenge: "Applying and curing UV-curable lacquer on MDF and hardwood flat panels for flooring and furniture requires uniform high-energy cure across full panel width at conveyor speeds that maintain competitive throughput.", solution: "UV-curable lacquer applied by roller coater, cured by OmniCure AC Large belt conveyor system or NobleLight mercury arc lamp array. Multi-pass coating/cure sequence builds film thickness to 80–120 µm. Flat panel conveyor speed 20–40 m/min.", benefit: "Coating hardness >4H Pencil. Scratch resistance >3N Crockmeter. Throughput: 2,000 m²/shift. VOC-free formulation. Gloss uniformity <2 GU variation across 1.22 m panel width.", recommended: "OmniCure AC Large (AC8-HD) or NobleLight Mercury Arc Lamp Array" },
  { id: "AN-WOD-002", industry: "Wood Coatings", subCategory: "3D Profile & Edge", product: "AC Large with Multi-Angle Reflector", title: "3D Profile & Edge Coating", challenge: "Applying and curing UV-coatings on routed profiles, mouldings, and edge-banded furniture components presents shadowing challenges that prevent uniform cure on vertical edges and curved profiles with flat-beam systems.", solution: "UV-curable coating applied by spray or roll on 3D profile. OmniCure AC Large with shaped reflector array or multi-angle LED heads provides irradiance across all profile faces simultaneously. Conveyor speed matched to cure dose requirement.", benefit: "Full profile cure including vertical edges and radii. Coating adhesion: 0-1 cross-hatch. Hardness >3H. Processing speed 15–20 m/min. No shadow zones. Suitable for window frame, skirting, and door frame profiles.", recommended: "OmniCure AC Large with Multi-Angle Reflector Array" },
  { id: "AN-WOD-003", industry: "Wood Coatings", subCategory: "Flooring", product: "AC Large LED Belt Conveyor (Multi-Stage)", title: "Parquet Floor UV Curing", challenge: "Solid hardwood and engineered parquet flooring requires UV-curable oil or lacquer finish that penetrates wood grain, cures rapidly, and achieves the scratch and wear resistance required for commercial flooring applications.", solution: "UV-curable penetrating oil or lacquer applied by roller, cured in multi-stage OmniCure belt curing system. Multiple conveyor passes with intermediate sanding between coats builds surface quality. LED system provides low-heat cure compatible with solid wood dimensional stability.", benefit: "Surface hardness: Brinell >3.5 N/mm². Wear class AC4 (EN 13329). Coating cycle: 4 passes to final finish. Low-heat LED cure maintains moisture content of solid wood within ±1%. VOC-free finish.", recommended: "OmniCure AC Large LED Belt Conveyor (Multi-Stage)" },
  { id: "AN-WOD-004", industry: "Wood Coatings", subCategory: "Wood Print", product: "LX500 V2 Inline (Pin + Flood)", title: "UV Print on Wood", challenge: "Direct UV inkjet printing of photographic or decorative imagery onto natural wood or wood-grain paper requires ink penetration control, sharp dot gain management, and instant pin-cure to prevent feathering on absorbent substrate.", solution: "UV-curable inkjet ink deposited onto wood or décor paper substrate. OmniCure LX500 V2 inline LED pin-cure head mounted adjacent to each inkjet array provides instant dot freeze. Flood cure head downstream delivers full cure before substrate stack.", benefit: "Dot gain <5% at 600 dpi. Ink adhesion to décor paper >3B. No ink feathering on open wood grain. Output: 200 m²/hour. Compatible with wood grain, knot, and parquet visual designs.", recommended: "OmniCure LX500 V2 Inline (Pin + Flood Configuration)" },
  { id: "AN-WOD-005", industry: "Wood Coatings", subCategory: "Open Pore Finish", product: "AC Large LED Belt (Low Intensity)", title: "UV Penetrating Oil — Open Pore Finish", challenge: "Applying UV-curable penetrating oil to achieve an open-pore, natural-look appearance on hardwood requires a low-viscosity formulation that wets wood grain without forming a surface film, curing rapidly in production.", solution: "UV-curable penetrating oil applied by roller. OmniCure AC Large belt conveyor with low-intensity LED cure profile achieves full cure without forming surface film. Multiple passes build coverage depth in-wood.", benefit: "Open-pore natural appearance maintained. Penetration depth: 0.1–0.3 mm. Water repellency: contact angle >90°. Low-VOC formulation. Processing speed: 20 m/min.", recommended: "OmniCure AC Large LED Belt (Low Intensity Profile)" },
  { id: "AN-WOD-006", industry: "Wood Coatings", subCategory: "Anti-Fingerprint", product: "AC Large LED Belt Conveyor", title: "Anti-Fingerprint Soft-Touch Topcoat", challenge: "Applying an anti-fingerprint, low-surface-energy hard coat on wood-effect furniture panels requires UV cure of a textured topcoat that resists smearing and achieves soft-touch haptic quality with no additional embossing step.", solution: "UV-curable anti-fingerprint textured coating applied by roller onto panel surface. OmniCure AC Large LED belt cures in single pass. Matting agent and surface micro-texture built into coating formulation.", benefit: "Fingerprint resistance: <10% reflectance increase after 50-touch test. Soft-touch texture without embossing step. Gloss: 5–15 GU. Pencil hardness: 2H. Processing speed: 25 m/min.", recommended: "OmniCure AC Large LED Belt Conveyor" },

  // Metal Coatings
  { id: "AN-MET-001", industry: "Metal Coatings", subCategory: "Powder Coating", product: "AC Large (AC8) or NobleLight Mercury Arc", title: "UV Powder Coating — Metal Parts", challenge: "Applying durable decorative and protective coatings to metal parts (aluminium extrusions, steel sheet, automotive wheels) using UV-curable powder eliminates multi-step liquid paint processes and VOC emissions while achieving Class A surface quality.", solution: "UV-curable powder electrostatically applied to pre-heated metal substrate. OmniCure AC Large or NobleLight medium-pressure UV system melts and cures powder in single-pass conveyor process. Broad-spectrum UV (250–450 nm) fully activates pigmented powder coating system.", benefit: "Class A surface gloss: 85–95 GU. Coating adhesion: 0 cross-hatch. Impact resistance: >80 kg·cm reverse impact. Process: electrostatic spray + UV cure in single inline pass. VOC-free. Compatible with aluminium, steel, and zinc substrates.", recommended: "OmniCure AC Large (AC8) or NobleLight Mercury Arc System" },
  { id: "AN-MET-002", industry: "Metal Coatings", subCategory: "Anti-Corrosion", product: "AC Large (AC7 or AC8) Belt Conveyor", title: "Metal Protective & Anti-Corrosion Coating", challenge: "Protecting steel and aluminium structural components against corrosion, chemical attack, and abrasion requires UV-curable coating systems that match or exceed the performance of two-pack epoxy coatings without isocyanate exposure risk.", solution: "UV-curable epoxy-acrylate coating applied by spray or roller to pre-treated metal surface. OmniCure AC Large belt conveyor system cures coating in single pass. Primer + topcoat system applied in two-pass inline process.", benefit: "Corrosion resistance >1,000h salt spray (ISO 9227). Adhesion: 0 cross-hatch. Abrasion resistance: <50 mg loss (Taber CS-17, 1 kg, 1000 cycles). Processing speed: 8 m/min. Isocyanate-free formulation.", recommended: "OmniCure AC Large (AC7 or AC8) Belt Conveyor" },
  { id: "AN-MET-003", industry: "Metal Coatings", subCategory: "Decorative Coating", product: "AC Large LED or LX500 V2 Array", title: "Decorative Metal Printing & Coating", challenge: "Applying UV-curable decorative finishes (brushed, anodised-effect, colour tints) to aluminium profiles and panels requires UV coating with metallic pigment compatibility, adhesion to pre-anodised surfaces, and UV stability for exterior applications.", solution: "UV-curable decorative coating with metallic pigment applied by roller or digital inkjet onto pre-anodised or mill-finish aluminium. OmniCure AC Large UV LED system provides low-heat cure compatible with thin aluminium substrate. UV-stable photoinitiator package ensures exterior durability.", benefit: "ΔE <1.0 after 1,000h QUV weathering. Adhesion to pre-anodised Al: 0 cross-hatch. Gloss uniformity across 1.5 m panel width <3 GU. Low-heat LED cure prevents oil-canning on thin-gauge sheet.", recommended: "OmniCure AC Large LED System or LX500 V2 Array" },
  { id: "AN-MET-004", industry: "Metal Coatings", subCategory: "Stamped Parts", product: "AC Large (AC8) — Two-Stage Inline", title: "UV Primer + Basecoat for Stamped Parts", challenge: "Applying primer and basecoat on stamped metal parts (brackets, housings) in an automated inline process requires UV cure that matches press cycle time and achieves salt-spray corrosion resistance without slow thermal oven stages.", solution: "UV-curable epoxy primer applied by flood coat to stamped metal, UV-cured by OmniCure AC Large. Acrylate topcoat applied and cured at second station. Full primer+topcoat in <90 seconds total line time.", benefit: "Salt spray resistance >500h (ISO 9227). Adhesion: 0 cross-hatch. Coat stack 40–80 µm. Inline cycle at 8 m/min matches press output. Isocyanate-free formulation. VOC <50 g/L.", recommended: "OmniCure AC Large (AC8) — Two-Stage Inline" },

  // Aerospace
  { id: "AN-AER-001", industry: "Aerospace", subCategory: "Structural Composite", product: "S2000 Elite + R2000 Radiometer", title: "Structural Composite Bonding", hot: true, challenge: "Bonding CFRP, GFRP, and aluminium structural components in aerospace assemblies requires adhesive systems that cure at room temperature, achieve aerospace-grade mechanical properties, and generate a full audit trail for AS9100 quality management.", solution: "UV-curable structural adhesive applied at composite bond interface. OmniCure S2000 Elite broad-spectrum output (320–500 nm) provides sufficient irradiance for thick-section cure. CLF ±5% guarantees dose consistency across bond area. Cure record logged per serial number via R2000.", benefit: "Lap shear strength >25 MPa (ASTM D1002). Bond qualified per ASTM D3762. Full cure audit trail: dose, date, operator per serial number. Room-temperature cure eliminates thermal distortion of CFRP laminate.", recommended: "OmniCure S2000 Elite + R2000 Radiometer + Ethernet Data Log" },
  { id: "AN-AER-002", industry: "Aerospace", subCategory: "Avionics PCB", product: "LX500 V2 or AC Small (AC4/AC5)", title: "PCB Conformal Coating — Avionics", hot: true, challenge: "Avionics PCBs in aircraft and UAV systems require conformal coating protection across extreme temperature ranges (-55°C to +125°C), vibration, fungus, and corrosion per MIL-I-46058C and IPC-CC-830B.", solution: "UV-curable conformal coating applied by selective robotic spray onto avionics PCB. OmniCure LX500 V2 or AC Small area system provides uniform cure across full board footprint. IPC-CC-830B qualified material used.", benefit: "IPC-CC-830B and MIL-I-46058C qualified. Temperature range -55 to +125°C. Vibration resistance per MIL-STD-810. Coating thickness 25–75 µm (fluorescent traceable). Throughput 4× faster than thermal process.", recommended: "OmniCure LX500 V2 or AC Small (AC4/AC5)" },
  { id: "AN-AER-003", industry: "Aerospace", subCategory: "Airframe Sealing", product: "S2000 Elite (spot) or AC Large (area)", title: "Sealant Cure — Fuel Tank & Airframe", challenge: "Sealing airframe joints, fuel tank access panels, and structural fasteners with UV-curable polysulfide or polyurethane sealant reduces cure time from 24–72 hours (ambient cure) to minutes, enabling faster aircraft assembly and maintenance turnaround.", solution: "UV-curable polysulfide sealant applied to joint or fastener interface. OmniCure S2000 Elite spot or AC Large area system provides irradiance appropriate to sealant thickness and substrate geometry. Secondary thermal post-cure optional for shadow areas.", benefit: "Cure time reduced from 72h to <10 minutes for UV-accessible areas. Fuel and hydraulic fluid resistance per MIL-S-8802. Peel strength >5 N/mm width. Process integrated into aircraft assembly sequence for MRO and production.", recommended: "OmniCure S2000 Elite (spot) or AC Large (area) + R2000 Radiometer" },
];

const industries = [...new Set(apps.map((a) => a.industry))];

const industryIcons: Record<string, string> = {
  "Medical Device": "🏥",
  "Automotive": "🚗",
  "Electronics": "💡",
  "Cable & Fiber": "🔌",
  "Precision Optics": "🔬",
  "UV Printing": "🖨️",
  "Wood Coatings": "🪵",
  "Metal Coatings": "⚙️",
  "Aerospace": "✈️",
};

const industryColors: Record<string, string> = {
  "Medical Device": "#e11d48",
  "Automotive": "#1e3a5f",
  "Electronics": "#1A56DB",
  "Cable & Fiber": "#0d9488",
  "Precision Optics": "#7c3aed",
  "UV Printing": "#d97706",
  "Wood Coatings": "#16a34a",
  "Metal Coatings": "#92400e",
  "Aerospace": "#475569",
};

type CaseStudy = {
  id: string;
  industry: string;
  company: string;
  title: string;
  challenge: string;
  solution: string;
  results: string;
  metric: string;
  metricLabel: string;
  source: string;
};

const successStories: CaseStudy[] = [
  {
    id: "CS-001",
    industry: "Electronics",
    company: "PCB Manufacturer",
    title: "PCB Silkscreen & Solder Mask Printing",
    challenge: "Increasing PCB silkscreen and solder mask printing demands required a stable, consistent UV curing solution capable of sustaining quality over extended high-volume production runs. Inconsistent cure from aging lamp systems caused yield variation and unplanned downtime.",
    solution: "Phoseon FireJet FJ100 Air-Cooled UV LED system (OmniCure AC series equivalent) deployed on PCB printing line. LED technology delivers consistent irradiance with zero warm-up time, eliminating lamp-aging drift. Instant on/off control reduces energy consumption during line stops.",
    results: "Stable solder mask and silkscreen printing maintained across full extended production runs. Yield variation eliminated. Throughput increased and planned maintenance intervals extended significantly vs. lamp-based predecessor system.",
    metric: "↑ Throughput",
    metricLabel: "Yield variation eliminated. Uptime improved.",
    source: "Excelitas Case Study",
  },
  {
    id: "CS-002",
    industry: "Medical Device",
    company: "Cardiovascular Device OEM",
    title: "Balloon Catheter UV Spot Curing",
    challenge: "A cardiovascular device OEM required repeatable UV spot curing across multiple parallel production lines for balloon catheter tip bonding. The critical challenge was ensuring identical UV dose on every unit across all lines, and generating a full FDA-compliant process validation audit trail with NIST-traceable calibration records.",
    solution: "OmniCure S2000 Elite with CLF (Closed Loop Feedback) intensity control, Cure Ring attachment for 360° balloon tip irradiance, R2000 Radiometer for NIST-traceable dose measurement, and Intelli-Tap NFC logging. CLF ensures dose stays within ±5% regardless of lamp age.",
    results: "Identical UV dose confirmed across all production lines. Full NIST-traceable calibration records generated per unit. Process validation package supported 510(k) submission with complete dose traceability. Zero rework attributable to UV cure inconsistency.",
    metric: "100% Traceability",
    metricLabel: "510(k) submission supported. Zero rework from cure inconsistency.",
    source: "Excelitas Application Note: Bonding of Balloon Catheters (Feb 2026)",
  },
  {
    id: "CS-003",
    industry: "Automotive",
    company: "EV Battery Module Supplier",
    title: "EV Battery Cell Structural Bonding",
    challenge: "An EV battery module supplier needed to accelerate structural adhesive bonding of battery cell tabs and pack components to meet increasing production volume targets. Thermal-only cure processes required 30–60 minute oven cycles that created assembly line bottlenecks.",
    solution: "OmniCure AC7/AC8 LED Large-Area curing system deployed inline with UV + dual-cure adhesive formulation. UV cure achieves immediate handling strength in seconds; secondary thermal or moisture cure completes bonding in shadow zones. Zero warm-up, PLC-triggered, inline integration with existing assembly conveyor.",
    results: "60% cycle time reduction vs. thermal-only process. Zero VOC emissions from UV-curable adhesive system. Improved cell alignment consistency due to immediate-fixture UV snap-cure. Production throughput scaled to meet EV ramp targets.",
    metric: "60% Faster",
    metricLabel: "Cycle time cut by 60%. Zero VOC. Output scaled to meet EV ramp.",
    source: "Excelitas Application Note: UV Curing for EV Battery Manufacturing",
  },
  {
    id: "CS-004",
    industry: "Precision Optics",
    company: "Automotive Camera Module Manufacturer",
    title: "ADAS Camera Module Active Alignment",
    challenge: "An automotive Tier 1 supplier manufacturing ADAS camera modules required sub-micron lens alignment accuracy to be maintained throughout the UV cure step. The previous broad-spectrum lamp system introduced thermal warm-up drift that destabilised the 6-axis active alignment platform, causing MTF failures at final test.",
    solution: "OmniCure LX500 V2 UV LED spot curing system (365 nm, 0 ms warm-up) with StepCure® 2.0 ramped cure profile. Integrated directly with the 6-axis active alignment platform. Zero warm-up eliminates thermal drift. StepCure® ramp controls adhesive shrinkage rate during cure to prevent lens position shift.",
    results: "Sub-micron alignment (≤0.5 µm) maintained through full cure cycle. 35% faster cycle time vs. lamp predecessor system. 100% of modules meet MTF specification at final test — MTF failure rate from cure-induced misalignment reduced to zero.",
    metric: "≤0.5µm",
    metricLabel: "Sub-micron alignment. 35% faster cycle. MTF failures from cure → zero.",
    source: "ETIA Application Knowledge Base (Excelitas OmniCure documentation)",
  },
  {
    id: "CS-005",
    industry: "Wood Coatings",
    company: "Major Furniture Panel Manufacturer",
    title: "UV Lacquer Line — Furniture Panel Finishing",
    challenge: "A large furniture panel manufacturer was operating a traditional solvent-based lacquer finishing line requiring 30–60 minute drying time per coating layer, high VOC emissions requiring costly extraction infrastructure, and a maximum throughput of 150 panels per hour.",
    solution: "OmniCure AC7 LED Large-Area system installed on conveyor finishing line with UV-curable primer, sealer, and topcoat system (solvent-free formulation). Multi-pass UV cure replaces oven drying at each coat stage. LED system provides instant cure with zero warm-up and low heat output compatible with MDF substrate.",
    results: "Cure time per coat: 30–60 minutes → <30 seconds. VOC emissions eliminated. Throughput: 150 panels/hour → 400+ panels/hour. Scratch resistance improved 40% vs. solvent lacquer. Energy cost per m² reduced through LED efficiency.",
    metric: "167% Throughput",
    metricLabel: "150 → 400+ panels/hr. Cure: 45 min → 30 sec. VOC eliminated.",
    source: "ETIA Application Knowledge Base (Excelitas OmniCure + wood coatings industry data)",
  },
];

export default function ApplicationPage() {
  const [activeIndustry, setActiveIndustry] = useState<string>("All");
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  const filtered = activeIndustry === "All" ? apps : apps.filter((a) => a.industry === activeIndustry);

  return (
    <>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1241a3 0%, #1A56DB 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #1A56DB 0%, transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>9 Industries · 51 Application Notes</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">Validated Applications.<br /><span style={{ color: "#44B549" }}>Reliable Performance.</span></h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            UV curing solutions proven across 9 industries and 51 application scenarios — helping manufacturers achieve stable curing results in demanding production environments.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveIndustry("All")}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeIndustry === "All" ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            style={activeIndustry === "All" ? { background: "#1A56DB" } : {}}
          >
            All ({apps.length})
          </button>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${activeIndustry === ind ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              style={activeIndustry === ind ? { background: industryColors[ind] } : {}}
            >
              <span className={`w-2 h-2 rounded-full`} style={{ background: industryColors[ind] }} />
              {ind} ({apps.filter((a) => a.industry === ind).length})
            </button>
          ))}
        </div>
      </section>

      {/* Application Cards */}
      <section className="py-10" style={{ background: "#f5f7fa" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="text-left rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                {/* Colored top bar */}
                <div className="h-1" style={{ background: industryColors[app.industry] }} />
                <div className="p-4">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ background: industryColors[app.industry] }}>
                      {app.industry.toUpperCase()}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium">{app.product}</span>
                    {app.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-200 font-semibold">⭐ Hot</span>}
                  </div>
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 group-hover:text-[#1A56DB] transition-colors">{app.title}</h3>
                  {/* Subcategory */}
                  <p className="text-xs text-gray-400 mb-3">{app.subCategory}</p>
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-300">{app.id}</span>
                    <span className="text-xs text-[#1A56DB] opacity-0 group-hover:opacity-100 transition-opacity font-medium">View →</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Success */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Customer Success</p>
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#1A56DB" }}>Real Results from Real Manufacturers</h2>
          <p className="text-gray-500 mb-10">Validated UV curing outcomes across industries — from medical devices to EV batteries to furniture panels.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {successStories.map((s) => (
              <div key={s.id} className="rounded-xl border border-gray-100 overflow-hidden shadow-sm bg-white">
                {/* Colored top bar */}
                <div className="h-1" style={{ background: industryColors[s.industry] }} />
                {/* Header */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ background: industryColors[s.industry] }}>{s.industry.toUpperCase()}</span>
                    <span className="text-xs text-gray-400">{s.id}</span>
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: "#1A56DB" }}>{s.title}</h3>
                  <p className="text-gray-400 text-xs mt-1">{s.company}</p>
                </div>
                {/* Body */}
                <div className="px-6 py-4 space-y-3">
                  <div>
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">The Challenge</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#1A56DB" }}>The Solution</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Results & Metrics</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.results}</p>
                  </div>
                </div>
                {/* Footer metric */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "#1A56DB" }}>{s.metric}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.metricLabel}</p>
                  </div>
                  <p className="text-xs text-gray-400 text-right max-w-[40%]">Source: {s.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#1e3a5f" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Find the Right UV Curing Solution for Your Process</h2>
          <p className="text-gray-300 mb-6">Our engineers are ready to help — from application validation to system selection.</p>
          <Link href="/contact" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#2563eb" }}>
            Talk to Our Sales →
          </Link>
        </div>
      </section>

      {/* Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white relative max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Colored top bar */}
            <div className="h-1.5 rounded-t-2xl" style={{ background: industryColors[selectedApp.industry] }} />
            <div className="p-6">
            <button onClick={() => setSelectedApp(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl leading-none">✕</button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded text-white" style={{ background: industryColors[selectedApp.industry] }}>{selectedApp.industry.toUpperCase()}</span>
              <span className="text-xs text-gray-400">{selectedApp.subCategory}</span>
              {selectedApp.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 border border-orange-200 font-semibold">⭐ Hot</span>}
            </div>
            <h2 className="text-xl font-bold mt-2 mb-1 pr-6" style={{ color: "#1A56DB" }}>{selectedApp.title}</h2>
            <p className="text-xs text-gray-400 mb-4">{selectedApp.id}</p>

            <div className="space-y-3 mb-5">
              <div className="rounded-lg p-4 bg-red-50 border border-red-100">
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">The Challenge</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedApp.challenge}</p>
              </div>
              <div className="rounded-lg p-4 border" style={{ background: "#f0f5ff", borderColor: "#c7d9ff" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#1A56DB" }}>The Solution</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedApp.solution}</p>
              </div>
              <div className="rounded-lg p-4 bg-green-50 border border-green-100">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">The Benefit</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedApp.benefit}</p>
              </div>
              <div className="rounded-lg p-4 bg-gray-50 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Recommended System</p>
                <p className="text-sm font-semibold" style={{ color: "#1A56DB" }}>{selectedApp.recommended}</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="block text-center py-2.5 rounded font-semibold text-white text-sm hover:opacity-90"
              style={{ background: "#2563eb" }}
              onClick={() => setSelectedApp(null)}
            >
              Talk to Our Sales →
            </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
