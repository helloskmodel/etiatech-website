---
title: "Troubleshooting the OmniCure S2000: Lamp Not Striking, Light-Ring Colours & Low Irradiance"
description: "A field guide to the three most common OmniCure S2000 issues — a lamp that won't strike, what the status light-ring colours mean, and irradiance that drops off — with the checks that fix them."
date: 2026-07-07
tags: [OmniCure, S2000 Elite, Troubleshooting, UV Curing]
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/insight-closed%20loop.jpg
author: ETIA Technology
---

When a UV spot curing system stops behaving, a production line stops with it. The good news is that the large majority of OmniCure S2000 issues fall into three buckets, and most can be resolved on the line in minutes. Here is how we work through them.

## 1. The lamp will not strike

A lamp that refuses to ignite is the most common call we get. Work through these checks in order:

1. **Power.** Confirm the mains supply and the rear power switch are both on.
2. **Lamp module seating.** Make sure the lamp module is fully seated and the access door/side panel is closed and secured — if the panel is not fully fastened, the system may not power on at all.
3. **Hot re-strike.** A hot mercury lamp will not re-strike immediately. Let it cool for 3–5 minutes, then try again.
4. **Interlocks.** Verify the safety interlock is engaged (door closed, panel fastened).
5. **End of life.** If it still will not strike after several attempts, the lamp has likely reached end of life — install a new lamp module (012-68000R Standard or 012-69000R Surface Cure).

If you recently changed the lamp and the system won't power on, re-check that the **Intelli-Lamp® wires are tucked into the grommet** and every connector is fully seated in the correct orientation. Mis-routed wires can stop the door closing — and a door that isn't closed keeps the system off.

## 2. Reading the status light-ring colours

The S2000 Elite signals its state through a front-panel status light ring, backed by an on-screen indicator and an audible alarm. Use this as a quick reference:

| Colour | Status | What it means |
| --- | --- | --- |
| 🟢 Green | Ready / Running | Lamp on, Closed-Loop Feedback active — irradiance held within ±5% of set point. Safe to cure. |
| 🔵 Blue | Standby / Open-loop | Powered and lamp on, but Closed-Loop Feedback inactive — output is not being auto-corrected. |
| 🟡 Yellow | Warning | Output approaching the lower CLF limit or lamp nearing end of life — calibrate or plan a lamp change. |
| 🟣 Magenta | Calibration / Alignment | The system is in calibration or alignment mode. |
| 🔴 Red | Alarm / Fault | Lamp failed to strike, over-temperature, interlock open, or output below set point. Exposure is inhibited. |

A **red ring at start-up** is usually an interlock or over-temperature condition: check the light guide is installed and the vents are clear, then power-cycle. If the alarm returns, it is time to call support.

> This is a quick reference. Always confirm indicator colours and any on-screen error codes against your OmniCure S2000 Elite User Manual.

## 3. Low or dropping irradiance

If cure quality is drifting or a radiometer reads low:

1. **Recalibrate** with the OmniCure R2000 radiometer — the fastest way to separate a real output drop from a calibration offset.
2. **Inspect the light guide** for damage, kinks or a clouded output tip — a degraded guide can lose a large fraction of output.
3. **Check lamp age.** A yellow ring means the lamp is aging; replace the module.
4. **Clean or replace the optical filter** if it is contaminated.

Because the S2000's Closed-Loop Feedback continuously corrects for lamp decay, a *sudden* drop usually points to the light guide or a calibration issue rather than the lamp itself.

## When to call in support

If a fault persists after these checks — a red ring that won't clear, repeated failure to strike, or output you can't recover with recalibration — stop and get help rather than guessing. As an authorized OmniCure distributor, ETIA provides troubleshooting, genuine replacement lamps and modules, R2000 calibration, and local service across Southeast Asia.

For the full step-by-step procedures, indicator table and safety guidance, see the [OmniCure S2000 Elite Installation & Support Guide](/product/omnicure/s2000/support). To order a genuine lamp by part number, visit the [S2000 lamp page](/product/omnicure/s2000-lamp).
