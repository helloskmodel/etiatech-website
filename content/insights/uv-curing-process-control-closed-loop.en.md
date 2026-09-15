---
title: "Why UV Curing Needs Process Control: Closed-Loop Feedback and Exposure Programs"
description: "Light source output drifts with time and temperature and no operator can guarantee dose piece by piece. Process control solves it in three layers: source stability, programmed exposure and traceability."
date: 2026-09-15
tags: [Process Control, Closed-Loop Feedback, Traceability]
author: ETIA Technology
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/09-closed-loop-feedback-vs-no-feedback-lamp-output.png
coverFit: contain
---

**One-sentence answer:** Light source output drifts with time and temperature, and no operator can guarantee dose consistency piece by piece; process control solves this in three layers — source stability (closed-loop feedback, temperature monitoring), programmed exposure (multi-step StepCure, PLC triggering) and traceability (logs, permissions, remote management). This is the basis of batch consistency and audit compliance in medical, optical and automotive production.

## Why sources drift

- Mercury lamps decay with hours of use; uncorrected, late-life irradiance can drop by tens of percent.
- LEDs lose output as chip temperature rises and degrade slowly over life.
- Light path: light-guide aging, lens contamination.

![Closed-loop feedback comparison: without feedback, mercury lamp irradiance falls continuously over 2,000 hours; with closed-loop feedback it stays constant](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/09-closed-loop-feedback-vs-no-feedback-lamp-output.png)

*OmniCure S2000 Elite closed-loop feedback uses an internal sensor to adjust the iris automatically and hold the set point within ±5%. Image source: OmniCure S2000 Elite brochure.*

## Three layers of control

### 1. Source stability

- Closed-loop feedback: an internal optical sensor monitors output in real time and adjusts the iris to hold the set point within ±5%; when the lamp can no longer reach the set point an alarm sounds, and the lamp can be used to end of life without frequent manual checks.
- Temperature and life monitoring: adjusts parameters by lamp temperature, records hours, prevents hot restarts; LED head temperature monitoring holds ±5% during exposure.
- High-speed shutter (30 ms): accurate dose for short exposures.

### 2. Programmed exposure

- Multi-step profiles such as 75% × 1.5 s pre-fix → 100% × 5 s full cure → 50% × 2 s post-cure to reduce shrinkage stress and lock alignment.
- PLC, footswitch or USB triggering; programs stored on SD cards and copied between units.

### 3. Traceability

- Event logs (flight recorder), real-time data logging.
- NFC key cards with tiered permissions to stop operators changing parameters.
- Web UI for remote runs, log downloads and batch firmware updates.

## The cost of no process control

Batch-to-batch insertion-loss variation (optical modules), inconsistent bond strength (medical devices), tacky print surfaces — most "adhesive problems" trace back to dose drift.

## Related products

[OmniCure S2000 Elite](/product/omnicure/s2000): closed-loop feedback ±5%, 30 ms shutter, StepCure 2.0, 7 PLC outputs, Web UI, flight recorder, NFC cards. [OmniCure LX500](/product/systems/lx500): Intelli-Lamp LED ±5%, StepCure 2.0, Micro SD logging, PLC/USB. [Phoseon air-cooled UV LED](/product/phoseon): control box enable and linear intensity control.

## FAQ

**Q: What if my mercury system has no closed-loop feedback?**

A: Measure regularly with a radiometer, adjust intensity manually and keep records, or upgrade to a closed-loop model.

**Q: How do I keep several systems consistent?**

A: Same radiometer calibration, same StepCure program, same firmware version.
