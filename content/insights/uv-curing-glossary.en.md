---
title: "A UV Curing Glossary: 40 Terms Every Process Engineer Uses"
description: "Irradiance, dose, peak irradiance, photoinitiator, oxygen inhibition, UVA2, closed-loop feedback, cure ring — the vocabulary of UV curing and UV measurement, defined in plain language with the units."
date: 2026-09-06
tags: [UV Curing Basics, Glossary, Radiometry, Photoinitiators, Reference]
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/UVCURING.jpg
author: ETIA Technology
---

A UV process is specified in a vocabulary that mixes optics, chemistry and radiometry, and the same word often means different things to the adhesive supplier, the equipment maker and the quality engineer. This glossary fixes the meanings ETIA uses in its specifications, application notes and lab reports. Where a term has a formal definition in the radiometry literature — the Excelitas Noblelight UV & IR Academy glossary and RadTech's measurement guidance are the references — that definition is followed; where a term is equipment vocabulary, it is explained as it is used on the line.

## Light and wavelength

**Ultraviolet (UV).** Radiant energy from about 100 nm to 400 nm — shorter than visible light. In curing practice the range is extended to about 450 nm to include the violet that many photoinitiators absorb.

**Wavelength.** The distance between successive peaks of a light wave, measured in nanometres (nm; 10⁻⁹ m). It decides which photoinitiators absorb the light and how deep it penetrates.

**UVC, UVB, UVA, UVV.** The bands of the UV spectrum: vacuum UV 100–200 nm, UVC 200–280 nm, UVB 280–315 nm, UVA 315–400 nm, and UVV (visible violet) 400–450 nm. Short bands cure the surface; long bands cure the depth.

**UVA2.** A band of 365–405 nm proposed by RadTech North America's Measurements Group to cover UV LED sources, which emit here and are not measured correctly by radiometers built around the classical bands.

**Spectral distribution.** How a source's power is spread across wavelengths. A mercury lamp emits continuously from 250 to 600 nm with strong lines; an LED emits one narrow band.

**Monochromatic.** Light concentrated in a very narrow wavelength range. UV LEDs are nearly monochromatic, typically 10–20 nm wide.

**Line emission.** The narrow spikes in a lamp's spectrum produced by excited mercury atoms — the 365 nm line is the most important for curing.

**Broad spectrum.** A source emitting across the whole UV range, such as a mercury short-arc or medium-pressure lamp; the Excelitas selector guide uses it to name the lamp family, as against *single wavelength* for LEDs.

**Bandwidth.** The range of wavelengths between two limits, in nm — for example the 320–390 nm passband of a filter.

**Bandpass filter.** An optical filter that transmits one band and blocks the rest, used to select the part of a lamp's spectrum a formulation needs. The OmniCure S2000 Elite's filters are interchangeable cartridges.

**Dichroic / cold mirror.** A reflector that reflects UV and visible but transmits infrared, so heat is removed from the beam. A *hot mirror* does the opposite.

## Power, irradiance and dose

**Watt (W).** The unit of power: one joule per second.

**Joule (J).** The unit of energy: power integrated over time.

**Irradiance.** Radiant power arriving at a surface per unit area, within a stated wavelength band — W/cm² or mW/cm². The "brightness" of the UV at the part.

**Peak irradiance.** The maximum irradiance directly under a source — at the focal line of a lamp, or at the window of an LED. Spot-cure systems are specified by it: the S2000 Elite up to 37 W/cm², the LX500 up to 27 W/cm².

**Effective irradiance.** Irradiance counted only within the band the photoinitiator uses. What matters to the chemistry.

**Spectral irradiance.** Irradiance per unit wavelength interval, W/cm²/nm — the quantity a spectroradiometer reports.

**Energy density / exposure / dose.** Radiant energy arriving at a surface per unit area — J/cm² or mJ/cm² — equal to the time-integral of irradiance. Dose is what the formulation responds to; a data sheet's "cure at 2 J/cm²" is a dose.

**Static exposure.** Exposure to a constant irradiance for a controlled time, as under a spot head. **Dynamic exposure** is the moving case, under an array on a conveyor, where dose depends on line speed.

**Irradiance profile.** Irradiance plotted against time (or position) as a part passes a source.

**Working distance.** The distance from the light-guide tip, lens or LED window to the surface being cured. Irradiance depends on it strongly; it belongs in every specification.

**Inverse-square fall-off.** The rough rule that irradiance from a small source falls with the square of distance. A large LED array falls off more slowly; a focused lamp does not obey it at all.

## Measurement

**Radiometer.** An instrument that measures irradiance on its detector within its filter band, and usually integrates it to report dose. The OmniCure R2000 (for S-Series lamps) and LS200 (for LX500 LED heads) are radiometers.

**Exposure meter.** An instrument that accumulates energy over time and reports dose directly.

**Spectroradiometer.** A radiometer combined with a monochromator, reporting irradiance wavelength by wavelength.

**Responsivity.** How a detector's sensitivity varies with wavelength. Different radiometers have different responsivity curves, which is why two calibrated meters can read the same source differently.

**Radiochromic film / dosimeter.** A film that changes colour or optical density with total energy received; laid on a part to measure dose where a radiometer cannot go.

**Traceable calibration.** Calibration whose reference chain leads to a national standards body — the LS200's to NRC Canada — so a reading can be defended in an audit.

**Cure-site detector / cure-ring detector.** R2000 accessories that measure irradiance at the bond itself, or inside a ring fixture, rather than at the light-guide tip.

## Chemistry

**Photoinitiator.** A compound that absorbs UV or visible photons and produces reactive species — free radicals or cations — that start polymerisation. Its absorption spectrum decides which band and which source a formulation can use.

**Free-radical cure.** The common acrylate mechanism: fast, stops when the light stops, sensitive to oxygen at the surface.

**Cationic cure.** The epoxy and vinyl-ether mechanism: slower to start, continues after exposure ("dark cure"), insensitive to oxygen, sensitive to moisture and basic surfaces.

**Oxygen inhibition.** Atmospheric oxygen quenching the free radicals at a coating's surface, leaving it tacky. Overcome with UVC, higher irradiance, nitrogen inerting or surface-active photoinitiators.

**Surface cure / depth cure (through-cure).** Curing of the exposed top layer, versus curing through the full thickness of a bond or coating. Short wavelengths do the first; long wavelengths do the second.

**Bouguer–Lambert law.** Irradiance decreases exponentially with depth in a layer, in proportion to the layer's absorbance at that wavelength — the reason strongly absorbed bands cannot cure deep.

**Gel point.** The moment in a cure at which a liquid becomes a network solid — measured in photorheology as the crossover of G′ and G″.

**Process window.** The range of dose (or line speed) and irradiance over which a formulation cures fully without damaging the part. Established on the bench, then held on the line.

## Equipment

**Spot curing.** Delivering UV through a light guide or LED head to one point — a joint, a dot, a fillet.

**Flood / area curing.** Delivering UV over an area from an array, so a whole face or a moving web is cured in one exposure.

**Light guide.** A liquid-filled or fibre-optic cable carrying UV from a lamp to the part. Liquid guides carry more UV; fibre guides survive tighter bends and higher temperatures.

**Closed-loop feedback (CLF).** A sensor inside the lamp housing that measures output and adjusts the lamp to hold the set irradiance as it ages — ±5% on the S2000 Elite and LX500.

**Intelli-Lamp.** OmniCure's lamp-module intelligence: the module records its own hours and reports lamp life to the controller.

**StepCure.** OmniCure's programmable exposure profiles — several steps of irradiance and time in one cycle, stored and repeated.

**Cure ring.** A fixture that surrounds a cylindrical part (a catheter, a connector) with light from several directions, so the bond is cured all round without rotating the part.

**Microwave (electrodeless) lamp.** A mercury lamp excited by microwaves rather than electrodes — the Fusion UV F Series and LightHammer — giving instant restart and long life for wide-web area curing.

**Medium-pressure lamp / short-arc lamp.** Mercury lamps classified by fill pressure and arc length. Short-arc lamps (the S2000's 200 W) give a small, intense source suited to a light guide; medium-pressure tubes give a long source for area curing.

*Where a definition here differs from a supplier's data sheet, the data sheet governs that product; where a customer's specification uses a term differently, ETIA's lab report states the meaning used.*
