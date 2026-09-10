---
title: "UVA, UVB, UVC and UVV: Which Band Does What in a Cure — and How a Filter Chooses It"
description: "What each ultraviolet band contributes to depth cure, surface cure and adhesion, why a broad-spectrum lamp is filtered rather than used raw, and which OmniCure S2000 filter fits which adhesive."
date: 2026-09-07
tags: [UV Curing Basics, Wavelength, Optical Filters, OmniCure S2000 Elite, Photoinitiators]
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product/PRODUCT-UV%20LAMP%20SPOT-S2000%20HERO.png
coverFit: contain
author: ETIA Technology
---

"UV" covers a lot of light. The standard definitions run from vacuum UV at 100–200 nm, through UVC (200–280 nm), UVB (280–315 nm) and UVA (315–400 nm), to the "UVV" band that curing engineers add for the visible violet from 400 to about 450 nm. A mercury lamp emits across all of it; an LED emits in one 20 nm slice. Which band a formulation needs, and how much of the others it can tolerate, is the single most useful thing to understand about a UV process — it decides the source, the filter and the photoinitiator. This article sets it out band by band, then turns to the practical question of why a broad-spectrum lamp is almost always used through a filter.

## Absorption decides everything

Light cures nothing on its own. A photoinitiator absorbs a photon of the right energy, splits into reactive fragments, and those fragments start the polymerisation. Two consequences follow. A wavelength the photoinitiator does not absorb is wasted — it heats the part and does no chemistry. And a wavelength the *resin itself* absorbs strongly cannot get far into the layer: it is used up in the top microns. The Bouguer–Lambert law describes the loss — irradiance falls exponentially with depth in proportion to absorbance — and it is why the short and the long bands do different jobs.

## UVC (200–280 nm): the surface

Short-wave UV is absorbed within the first few microns of almost any acrylate. It is therefore the band that cures the surface hardest and fastest, and the one that overcomes oxygen inhibition — the competition from atmospheric oxygen that leaves an acrylate surface tacky. A coating that must be tack-free and scratch-resistant on top wants some UVC. Its cost is that it goes nowhere: UVC contributes nothing to a bond 1 mm deep, and it generates ozone and damages many plastics and most optical adhesives' substrates if delivered in quantity.

## UVB (280–315 nm): the crossover

UVB penetrates further than UVC — tens of microns — and is where many conventional photoinitiators absorb most strongly. It carries a share of both the surface and the near-surface cure. It is also the band most responsible for yellowing in aromatic resins and for photodegradation of substrates, so a formulation that is sensitive to colour is usually kept away from it.

## UVA (315–400 nm): the depth

Long-wave UV is where most of a mercury lamp's useful curing energy sits — the strong 365 nm line above all — and it penetrates through a clear acrylate for millimetres. UVA is the band for through-cure of a bond line, for thick sections and for anything where the light has to reach the other side of the joint through a transparent part. It is the band every UV LED in curing emits (365, 385, 395 nm), which is why LED-curable formulations are built around UVA-absorbing photoinitiators.

## UVV (400–450 nm): pigments and thickness

The violet edge of the visible is the deepest-penetrating band of all and the one that gets through pigmented, filled or slightly opaque materials that absorb everything shorter. White and coloured coatings, filled potting compounds and thick encapsulants are formulated with photoinitiators that absorb here; 405 nm LEDs exist for the same reason. UVV does nothing for a surface and needs a matched photoinitiator, but for a thick section it is the band that finishes the job.

## Why a broad-spectrum lamp is filtered

A 200 W mercury short-arc lamp such as the one in the OmniCure S2000 Elite emits continuously from 250 to 600 nm. Used unfiltered it delivers all four bands at once, plus visible light and infrared. That is the right thing for an aggressive, all-purpose cure and the wrong thing for most real parts: the UVC damages substrates, the infrared heats them, and the visible light matters to some photoinitiators and to none of the others.

A bandpass filter selects the slice the process needs and discards the rest, and the S2000 Elite's filters are user-interchangeable so the same lamp serves different work:

| Filter | Band | What it is for |
|---|---|---|
| 250–450 nm | UVC + UVB + UVA + UVV | Maximum cure, surface and depth — laboratory and photorheology work, robust formulations on tolerant substrates |
| 320–390 nm | UVA (narrow) | The standard adhesive filter: depth cure of clear acrylates, minimal heat, minimal substrate damage — most medical and optical bonding |
| 320–500 nm | UVA + UVV | Depth cure into pigmented or thick materials, encapsulants, cationic epoxies that need the long wavelengths |
| 365 nm | Narrow UVA | Matching a 365 nm-specified formulation, or comparing a lamp process with a 365 nm LED |
| 400–500 nm | UVV / visible | Visible-light photoinitiators, dental-type and biocompatible formulations, light-sensitive substrates |

The choice is made from the formulation's technical data sheet, which states the wavelength the photoinitiator was chosen for, and confirmed with a radiometer whose band matches the filter — the OmniCure R2000 for the S-Series. A reading taken through the wrong band is a number that means nothing.

## Lamp or LED, seen through the bands

The bands explain the practical difference between the two families of source. A **lamp with a filter** can deliver any band, or several together, at high irradiance: it is the flexible tool, right for a laboratory, a job shop or a process that needs surface and depth cure at once. An **LED** delivers one band in the UVA or UVV, very efficiently, with no heat and no UVC: it is the production tool for a formulation that has been matched to it. Neither is the "better" source; they are answers to different absorption spectra.

## Three questions before choosing a band

1. **What does the photoinitiator absorb?** From the data sheet; if it is not stated, ask the supplier for the absorption spectrum.
2. **How deep and how opaque is the layer?** Thin and clear can use anything; thick, filled or pigmented needs UVA or UVV.
3. **What must the surface be, and what can the substrate take?** A tack-free surface wants some UVC or inerting; a polycarbonate or a plated part wants none.

ETIA's application lab keeps the S2000 Elite with the full filter set, the LX500 with 365/385/395/405 nm heads and the matching radiometers, so a customer's adhesive can be cured through each band on the real substrate and the answer measured rather than argued. The right band is usually obvious after an afternoon.

*Sources: Excelitas Noblelight UV & IR Academy glossary and UV curing process notes; OmniCure S2000 Elite and LX500 specifications; ETIA application-lab practice.*
