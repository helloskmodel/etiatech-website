---
title: "What Is a UV Radiometer and Why Must a Curing Process Be Calibrated?"
description: "A UV radiometer is the only way to turn nominal equipment values into actual process values. Mercury and LED sources need differently calibrated instruments, measured at the real cure position."
date: 2026-09-15
tags: [Radiometer, Calibration, Process Control]
author: ETIA Technology
cardStyle: summary
series: uv-basics
seriesNo: 10
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/10-uv-led-beam-positioning-radiometer-calibration.png
---

**One-sentence answer:** A UV radiometer measures irradiance (W/cm²) or optical power (W) at the cure position and is the only way to turn "nominal equipment values" into "actual process values". Mercury and LED sources need differently calibrated radiometers; measurement must be made at the actual cure position, at the correct focal height, with the beam aligned to the detector, and traced to a national standard such as NIST.

## Why nominal values cannot be trusted

- Irradiance decays with distance; nominal values apply to a specific lens and distance.
- Every optical accessory (light guide, cure ring, elbow) has loss; cure-ring output is lower than light-guide tip output.
- Sources decay over time.

## Measuring mercury vs LED

| Item | Mercury | LED |
|---|---|---|
| Spectrum | Broad, needs a broadband detector | Monochromatic, calibrated per wavelength |
| Beam | Larger light-guide face | Narrow beam, must be centered on the detector at the right focal height |
| Special measurement | Cure-ring and cure-site detectors measure directly at the bond | Beam positioning kit guarantees repeatable alignment |
| Excelitas instrument | OmniCure R2000 (NIST traceable) | OmniCure LS200 / LS200P (±10%, NIST/NRC traceable, 1-year calibration interval) |

![UV LED calibration in practice: an LED head mounted in a beam positioning fixture aligned to the radiometer detector for accurate peak irradiance measurement](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/10-uv-led-beam-positioning-radiometer-calibration.png)

*A narrow LED beam must be centered on the detector at the correct focal height; the beam positioning kit makes the measurement repeatable. Image source: OmniCure LX500 brochure.*

![OmniCure R2000 radiometer with cure-site detector and cure-ring detector for measuring irradiance directly at the bond site or cure-ring exit](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/10b-r2000-radiometer-cure-site-cure-ring-detector.png)

*Every connection in the light path loses energy; measure at the actual cure position. Image source: OmniCure product catalog.*

## Recommended calibration routine

1. Measure a baseline after installation and record lens, distance and intensity setting.
2. Check every shift or batch; deviation beyond ±10% triggers adjustment.
3. Re-measure after changing light guides or lenses.
4. Cross-compare multiple units with the same radiometer.
5. Send the radiometer for calibration on schedule (LS200: 1 year).

## Related products

[OmniCure S2000 Elite](/product/omnicure/s2000) with the [R2000](/product/systems/r2000) displays irradiance in real time and is the only mercury spot system that can be calibrated in real time to NIST. [OmniCure LX500](/product/systems/lx500) has a built-in radiometer and calibrates in-line with the [LS200](/product/systems/ls200) and beam positioning kit. [Phoseon air-cooled fiber systems](/product/phoseon) provide a mounting position in the FRU for irradiance monitoring.

## FAQ

**Q: Can I use a mercury radiometer on an LED?**

A: No; the spectral response differs and the reading is meaningless. LEDs need detectors calibrated at 365/385/395/405 nm.

**Q: Do I need to measure both irradiance and dose?**

A: The radiometer measures irradiance; dose is calculated from irradiance × exposure time (or line speed). Both belong in the process document.
