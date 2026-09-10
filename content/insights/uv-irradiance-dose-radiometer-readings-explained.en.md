---
title: "Irradiance, Dose and Why Two Radiometers Disagree: UV Measurement for Process Control"
description: "The four variables that define a UV exposure, what a radiometer really measures, the UVA2 band for LEDs, one formula that converts dose across line speeds, and how to keep readings comparable from station to station."
date: 2026-09-09
tags: [Radiometry, UV Measurement, Process Validation, OmniCure R2000, LS200]
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product/LS200.png
coverFit: contain
author: ETIA Technology
---

Every UV process specification has a number in it — 2 W/cm², 1.5 J/cm², "full cure at 60 mm/s". The number is only useful if everyone who reads it measures it the same way, and in UV curing they usually do not. Two calibrated radiometers can be held to the same lamp and give readings that differ by 30%, both correctly. This article sets out the vocabulary, explains where the disagreement comes from, and gives the working methods that make UV measurement useful for process design and control — the substance of Excelitas Noblelight's technical note on measuring medium-pressure lamps and UV LEDs, applied to the systems ETIA supplies.

## Four variables define an exposure

A UV exposure is completely described by four things:

- **Irradiance** — the radiant power arriving at the surface, per unit area, within a stated wavelength band: W/cm² or mW/cm². It is an instantaneous quantity, like the brightness of the light at the part.
- **Time** — how long the surface is exposed. On a conveyor, time is set by the line speed and the length of the irradiated zone.
- **Spectral distribution** — how that power is spread across wavelengths. A mercury lamp spreads it from 250 to 600 nm; an LED puts nearly all of it within 10–20 nm of its centre wavelength.
- **Temperature** — the rise in the substrate during the exposure, which changes the kinetics of the cure.

**Dose** (properly *exposure* or *energy density*) is the time-integral of irradiance: J/cm² or mJ/cm². Dose is what the chemistry responds to; irradiance is what the equipment delivers. A process can reach the same dose with a high irradiance for a short time or a low irradiance for a long time, and the results are not always identical — high peak irradiance drives a cure deeper into a thick or pigmented layer than the same dose delivered slowly.

## What the instruments measure

A **radiometer** senses irradiance on its detector, within the band its filter passes, and most modern units integrate it over time to report dose as well. An **exposure meter** accumulates energy directly. A **spectroradiometer** adds a monochromator and reports irradiance wavelength by wavelength, with resolution down to half a nanometre — the instrument for checking what a lamp is actually emitting. **Radiochromic film** changes colour with total energy and can be laid directly on the part.

For medium-pressure lamps, irradiance at the part is usefully classed as very low (1–100 mW/cm²), low (100 mW/cm² to 1 W/cm²), high (1–10 W/cm²) or very high (above 10 W/cm²). Spot-cure systems such as the OmniCure S2000 Elite and LX500 sit in the last class at the light-guide tip — tens of W/cm² — which is why their dose is delivered in seconds.

## Why two radiometers disagree

Radiometers differ in three things: the wavelength range their filter passes (responsivity), the angle of light they accept, and the size and diffuser of their aperture. Two instruments measuring the same lamp report different numbers because they are integrating different slices of the spectrum over different acceptance angles. Neither is wrong; they are answering different questions.

The consequence for a factory is simple: **a UV number only means something alongside the instrument that produced it.** Standardise on one radiometer type per process, calibrate it on a fixed cycle, and record the model with every reading. A specification that says "1.2 W/cm²" without naming the meter cannot be reproduced at another station.

## LEDs need their own band

Radiometers built for mercury lamps have responsivity curves shaped around the UVA, UVB and UVC bands. Pointed at a 395 nm LED they respond, but not with a calibrated response, and different meters disagree even more than they do on lamps. The Measurements Group of RadTech North America therefore proposed a separate band, **UVA2 (365–405 nm)**, for LED sources, and the useful LED radiometers are calibrated to it — the OmniCure LS200 for the LX500 LED heads, for instance, while the R2000 is calibrated for the S-Series lamps.

RadTech's recommended way to describe an LED source is three numbers: static peak irradiance at the centre at a stated distance (usually 10 mm), the emitting face dimensions, and the centre wavelength — for example, *15 W/cm² – 44 mm – 395 nm*. That single line tells the next engineer everything a "UV LED lamp" label leaves out.

## Distance is not a footnote

A medium-pressure lamp in an elliptical reflector focuses its light: the highest irradiance is several centimetres from the lamp, at the focal line. An LED array does the opposite — irradiance is highest at the window and falls off continuously with distance, and the fall-off is steeper for a small emitter than for a large one. "Inverse square" is a rough guide, not a rule.

So the working distance belongs in the specification, and the measurement must be made at that distance — from the LED window to the diffuser of the radiometer. For a spot-cure head with a focusing lens, the same applies to focal height: the LS200 ships with a beam-positioning fixture for exactly this reason, so the sensor sits where the part will sit.

## One measurement, any speed

On a conveyor, measuring dose at every candidate line speed is unnecessary. Dose is inversely proportional to speed, and on a log-log plot dose against speed is a straight line. Measure once at the speed where the reading is most reliable — call the dose E₀ at speed v₀ — and calculate the dose at any other speed:

**Eₓ = E₀ · v₀ / vₓ**

Establish the minimum dose for full cure on the bench, apply the formula, and the maximum line speed follows. Adding a safety margin to the dose, not the speed, is the conservative habit.

## Correlating film with the meter

Where a radiometer cannot physically go — under an LED array a few millimetres from the window, inside a cure-ring fixture around a catheter — radiochromic film can. The method is to lay the film on the radiometer itself, expose both together, and correlate the film's change in optical density with the meter reading for that source. The correlation curve is specific to the lamp or LED, but once it exists the film alone can be used on the part.

## A measurement routine that stands up to an audit

1. One radiometer model per source type: LED-band (UVA2) for LED heads, lamp-band for arc lamps.
2. Calibration on a fixed cycle (the LS200's is one year, NRC-traceable), with the certificate on file.
3. Measure at the true working distance or focal height, using a positioning fixture.
4. Record irradiance, dose, distance, wavelength, meter model and date for every station.
5. Re-measure on a schedule — weekly or monthly — and plot the trend, so a dirty lens or an ageing lamp shows up before the parts do.

For S-Series lamp systems ETIA supplies the OmniCure R2000 with light-guide adapters and Cure-Site and Cure-Ring detectors, so the reading is taken at the bond, not at the lamp. For LX500 LED heads it supplies the LS200 calibration kit and the LM2011 meter. Both are calibrated and re-certified through ETIA, which is usually the part of the routine a plant finds hardest to keep up on its own.

*Sources: Excelitas Noblelight Knowledge Corner, "UV Measurements of Medium-Pressure Lamps and UV-LEDs for Process Design and Control"; RadTech North America Measurements Group; OmniCure R2000 and LS200 specifications.*
