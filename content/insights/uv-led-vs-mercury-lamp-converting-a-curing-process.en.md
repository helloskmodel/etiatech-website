---
title: "UV LED or Mercury Lamp? What Actually Changes When You Convert a Curing Process"
description: "Photoinitiators, the missing infrared, surface cure, line speed, yellowing and radiometers — the six things that change when a lamp process moves to UV LED, and how to test each one before you commit."
date: 2026-09-10
tags: [UV LED, Mercury Lamp, Process Conversion, UV Curing Basics, OmniCure]
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/product/LX500.png
coverFit: contain
author: ETIA Technology
---

Over half of the UV spot-curing systems sold worldwide are now LED. The reasons are familiar — a fraction of the electricity, a cool part, a lamp that lasts ten times longer, no mercury and no ozone. What is discussed less often is what has to change in the *process* for the LED to deliver those numbers. A UV LED is not a drop-in lamp; it is a different light. This article walks through the six differences that decide whether a conversion goes smoothly, drawing on the conversion FAQs Excelitas Noblelight publishes for its own customers and on the conversions ETIA has supported across Southeast Asia.

## 1. The photoinitiator has to match the wavelength

A medium-pressure mercury lamp emits a continuous spectrum from about 250 nm to 600 nm, with strong lines through the UVB and UVC. A UV LED emits a single, nearly monochromatic band — 365, 385, 395 or 405 nm — 10 to 20 nm wide. Most photoinitiators developed for lamp curing absorb in the UVB and UVC, exactly where an LED emits nothing.

So the first question in any conversion is not about the equipment but about the chemistry: **has the adhesive or coating been formulated for LED?** If it has not, it will either cure slowly or not at all, however high the LED irradiance. The fix is a formulation with a long-wavelength photoinitiator, which every major adhesive supplier now offers. Ask the supplier for the LED grade of the same product before you test anything.

One exception helps: formulations already tuned to iron- or gallium-doped (metal halide) lamps absorb in the UVA and often convert to LED with little change, because those lamps were already emitting where the LED does.

## 2. The infrared is gone — and the formulation may have been relying on it

Roughly 30–40% of the energy from a medium-pressure lamp arrives as infrared. It heats the part, and that heat was doing quiet work: lowering the viscosity of the resin, speeding up the chemical kinetics, helping a cure go to completion. An LED delivers almost none.

For heat-sensitive parts — a catheter hub, a camera module, an OLED panel — this is the whole point of converting. But for a formulation that had been getting a free 20 °C from the lamp, the LED cure can come out slower or less complete than expected. The remedy is in the formulation and the dose, not in trying to add the heat back.

## 3. Surface cure and oxygen inhibition

The short UVC wavelengths of a mercury lamp are absorbed in the top few microns of a coating, which is where oxygen from the air competes with the polymerisation. Lamps cure the surface hard and tack-free; LEDs, emitting only long wavelengths, penetrate deeper and can leave a surface that is cured underneath but slightly tacky on top.

For adhesives inside a joint this does not matter — there is no exposed surface. For a coating or an exposed fillet it does, and there are three standard answers: an LED-specific formulation with an amine synergist or surface-active photoinitiator; nitrogen inerting of the cure zone; or a short second pass under a 254 nm source for the surface only. A hybrid line — LED for the depth, a small arc lamp for the skin — is a common configuration in coating and printing.

## 4. Line speed and the process window

Whether you keep your existing line speed depends on two things: how reactive the LED formulation is, and how much irradiance the LED actually delivers at the working distance. Dose is irradiance × time; halve the exposure time and you must double the irradiance to hold the same dose.

The practical method is to establish a process window on the bench before touching the line: measure the irradiance at the real working distance, find the minimum dose that gives full cure (by hardness, pull test or FTIR), then add a safety margin. Converting the window into line speed is then arithmetic. Many industries have converted at full speed — sheet-fed and web printing presses among them — but each formulation has its own window, and the window is not transferable from the lamp.

## 5. Yellowing and colour

Long-wavelength photoinitiators tend to yellow, and reducing their concentration to limit yellowing also slows the cure. For a structural adhesive this is irrelevant; for a clear coat over a white substrate, or an optical bond in the light path, it is a specification. The tools are photoinitiator selection (often blends), a slightly shorter wavelength (365 nm rather than 395 nm) and testing on the real substrate under the real ageing conditions.

## 6. Your radiometer probably cannot read an LED

A radiometer built for mercury lamps has a spectral response designed around the UVA/UVB/UVC bands; pointed at a 395 nm LED it will read something, but not the right thing. Comparing an LED process to the old lamp process with the old meter produces numbers that are precise, repeatable and wrong.

Use a radiometer specified for the LED band (RadTech North America calls it UVA2, 365–405 nm) and calibrated to the LED wavelength. OmniCure's LS200 is built for the LX500 LED heads for exactly this reason; the R2000 stays with the S-Series lamps. Check calibration on a schedule — weekly or monthly is normal — and record the reading with the date; the LED does not drift the way a lamp does, but the optics get dirty and the working distance creeps.

## What does not change

Two worries come up in every conversion and are not real. Switching an LED on and off many times a shift does not shorten its life; neither does running it dimmed. And LED adhesives, when properly cured, are not weaker than lamp-cured ones — the bond strength lives in the formulation and the dose, not in the light source.

## A conversion checklist

1. Get the LED grade of your adhesive or coating from the supplier.
2. Choose the wavelength the photoinitiator wants — usually 365 or 385 nm for adhesives, 395 or 405 nm for pigmented or thick sections.
3. Measure irradiance at the true working distance with an LED radiometer.
4. Establish the minimum dose for full cure on the bench, then add margin.
5. Check the surface: tack-free, or does it need inerting or a second source?
6. Age-test for colour if the bond or coating is visible.
7. Convert the dose to line speed, then run a pilot lot before committing the line.

ETIA runs steps 1–5 in its application lab with the customer's own parts and adhesive, on the OmniCure LX500 (365/385/395/405 nm heads) and the AC Series area arrays, and keeps the S2000 Elite on the same bench so that the lamp process can be measured under the same conditions. A conversion that has been characterised this way rarely surprises anyone on the line.

*Sources: Excelitas Noblelight UV & LED conversion FAQs and Knowledge Corner articles on UV LED adoption; OmniCure LX500 and LS200 specifications; ETIA application-lab records.*
