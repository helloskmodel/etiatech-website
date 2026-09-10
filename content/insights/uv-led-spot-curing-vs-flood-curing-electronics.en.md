---
title: "Spot or Flood? When an Electronics Line Should Move from Spot Curing to a UV LED Array"
description: "Two signals that a PCB or module line has outgrown spot curing, what a flood array changes in throughput, consistency and cost, and how to pilot the change with the same LED wavelength you already run."
date: 2026-09-08
tags: [UV LED, Spot Curing, Flood Curing, Electronics Assembly, OmniCure AC Series]
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product/AC8.png
coverFit: contain
author: ETIA Technology
---

Spot curing is where most electronics assemblers meet UV: a light guide or an LED head aimed at one joint — a camera lens to its barrel, a wire tacked to a board, a coil staked in a micro-speaker, a component masked before wave solder, a dot of potting over a sensor. It is precise, it is cheap to start, and with UV LED heads it has become the majority of the market: over half of all UV spot-cure systems sold globally are now LED, and the reasons are the ones the whole industry knows — far less energy, a consistent output that makes the process predictable, little heat into the part, and a source that lasts up to ten times longer than an arc lamp.

But spot curing has a ceiling, and a line that has grown past it usually finds out through takt time or rework rather than through a review. Excelitas Noblelight's application note on converting from spot to flood in electronics gives two clear signals; this article adds what ETIA sees on lines in Thailand, Vietnam and China, and how to make the move without re-qualifying the chemistry.

## Signal 1: one assembly, many spots

A board or module that needs several spot cures — six components staked, four corners of a display tacked, a run of wire bonds masked — is being cured one spot at a time, each with its own head, its own positioning and its own cycle. Every additional spot is another head to buy, another exposure to sequence, another thing that can be out of position. A flood array cures the whole face of the board in one exposure. The number of spots stops mattering.

## Signal 2: few spots per part, but many parts

The other case is the opposite: a part with one or two cure points that is made in volume. Each part is a separate cycle for a spot head — load, position, expose, unload. On a conveyor under a flood array, parts run in batches or continuously, and the cure becomes a section of the line rather than a station in it. The cycle time collapses from seconds per part to parts per second.

## What the array changes

Manufacturers who have made the change report three things, in this order:

**Throughput.** Consolidating several spot cures into one flood exposure, or moving parts from a fixture onto a conveyor, raises the rate of boards through the cure step — often the largest single gain in the line.

**Consistency.** A spot head depends on where it is pointed; an array delivers a uniform irradiance field, and every part in it sees the same dose. The note's phrase is that most converters see "a significant improvement in process consistency" that shows up as better product quality and less rework. On a validated medical or automotive line, uniformity is also what makes the process easier to document.

**Cost.** One array replaces several heads and controllers; a segmented array can switch off the segments a narrow part does not need and dim to the irradiance the formulation needs, so the electricity follows the work. LED arrays switch on and off instantly, so there is no warm-up and no idling.

## What stays the same: the chemistry

The reason this conversion is easier than lamp-to-LED is that the wavelength does not change. If the line already spot-cures at 365 or 395 nm on an OmniCure LX500 head, the OmniCure AC Series arrays are available at the same wavelengths. The photoinitiator has already been chosen; the adhesive does not need to be re-qualified; the dose that gave full cure on the bench is the dose the array has to deliver. What changes is irradiance at the working distance and the exposure time, and both are measured, not guessed.

## Choosing the array

Three questions size it:

1. **How wide is the part, and how does it move?** The AC Series runs from the AC4 (a 50 mm window for a small part or a single lane) through the AC7 and AC8 to the AC9 Series at 225 mm. Arrays can be butted end to end for wider webs.
2. **What irradiance does the formulation need at the working distance?** Flood irradiance is lower than a focused spot — the AC8-HD reaches 12 W/cm² at the window, and falls with distance — so a thick or heavily filled material may need a slower pass or a closer array.
3. **How much heat can the part take?** LED arrays put little infrared into the part, but a long dwell under a high-irradiance array still warms it; the AC Series' dimming and the conveyor speed set the balance.

For light-sensitive components or shadowed geometry, spot heads do not disappear — they stay for the joint the flood cannot reach, and the array takes the rest.

## Piloting without disrupting the line

The note's advice is to pilot first and calculate the return on investment from real numbers, either in an application centre or with a loaned array on the production line. ETIA does both: the application lab holds the AC Series with the LC6 benchtop conveyor, so a customer's boards can run under the array at the intended speed and be tested for cure and for heat before anything is bought; and arrays are available on loan for a production trial. The measurement is made with the LS200 radiometer, at the working distance, so the pilot's numbers transfer to the line.

A typical outcome for a module line that had four LX500 heads: one AC8 array on the existing conveyor, the same 395 nm adhesive, the same LS200 dose, and the cure step no longer the bottleneck. The heads went to the next new product.

*Sources: Excelitas Noblelight, "UV LED Curing in Electronic Applications: When to Convert from Spot Curing to Flood Curing"; OmniCure LX500 and AC Series specifications; ETIA application-lab records.*
