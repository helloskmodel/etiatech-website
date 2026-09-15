---
title: "Irradiance vs Dose: Why Enough Dose Can Still Give a Poor Cure"
description: "Peak irradiance (W/cm²) determines cure speed and depth; dose (J/cm²) determines whether enough energy was delivered. The same dose at different irradiance gives a different crosslink network."
date: 2026-09-15
tags: [UV Curing Basics, Irradiance, Dose, Process Window]
author: ETIA Technology
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/04-uv-led-irradiance-vs-working-distance-optics.png
---

**One-sentence answer:** Peak irradiance (W/cm²) is the instantaneous optical power per unit area at the surface and determines cure speed and depth; energy density or dose (J/cm²) is irradiance integrated over time and determines whether enough energy has been delivered for full cure. The same dose at different irradiance levels gives a different crosslink network and surface properties, so a process window must specify both.

## The three process parameters

| Parameter | Definition | Unit | Determined by |
|---|---|---|---|
| Spectral output | Radiant power distribution across wavelengths | nm | Source type, bulb fill, filter |
| Peak irradiance | Radiant power per unit area at the surface | W/cm² | Source power, working distance, optics |
| Energy density (dose) | Energy accumulated during exposure | J/cm² | Irradiance × time |

## Why higher irradiance is better

Free-radical generation rate is proportional to irradiance. At high irradiance the radical concentration overcomes oxygen inhibition and penetrates pigmented layers, so surface and depth cure together; low irradiance for a long time can cure the surface first and seal the bottom, or let oxygen inhibition leave the surface tacky.

## The effect of distance

Irradiance falls off rapidly with working distance. Reflectors, focusing lenses and LED primary/secondary micro-optics can hold irradiance at greater distances; every published peak value corresponds to specific conditions (e.g. "3 mm lens, 10 mm distance" or "WD = 1 mm") and must be re-measured when conditions change.

![UV LED irradiance versus working distance: without optics it decays rapidly within 0-100 mm; with primary micro-lenses and secondary optics it peaks at 50 mm](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/04-uv-led-irradiance-vs-working-distance-optics.png)

*Irradiance decays with distance; dedicated optics can move the peak to a 50–60 mm working distance. Image source: Noblelight UV LED products overview.*

## Steps to build a process window

1. Obtain recommended wavelength, minimum irradiance and minimum dose from the formulation supplier.
2. Measure irradiance with a radiometer at the actual cure position.
3. Calculate dose from line speed or exposure time; test adhesion, hardness and surface cure.
4. Keep 20–30% margin above and below the passing range as alarm thresholds.

## Related products

Highest peak irradiance: [OmniCure S2000 Elite](/product/omnicure/s2000) 37 W/cm², [OmniCure LX500](/product/systems/lx500) 27.3 W/cm² at 385 nm, [Phoseon FireJet ONE](/product/phoseon) 20 W/cm². Long-term dose stability: S2000 Elite closed-loop feedback ±5%, LX500 Intelli-Lamp LED ±5%.

## FAQ

**Q: How do mW/cm² and mJ/cm² convert?**

A: mJ/cm² = mW/cm² × seconds. Example: 500 mW/cm² for 4 s = 2,000 mJ/cm² = 2 J/cm².

**Q: Why does an LED line with adequate dose cure worse than a mercury line?**

A: Usually spectral mismatch or oxygen inhibition, not dose.
