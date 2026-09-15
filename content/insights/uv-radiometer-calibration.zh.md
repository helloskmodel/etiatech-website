---
title: "UV 辐射计是什么？为什么固化工艺必须校准"
description: "UV 辐射计是把设备标称值变成实际工艺值的唯一途径。汞灯与 LED 需用不同校准的辐射计，测量必须在实际固化位置进行并溯源到国家标准。"
date: 2026-09-15
tags: [辐射计, 校准, 过程控制]
author: ETIA Technology
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/10-uv-led-beam-positioning-radiometer-calibration.png
---

**一句话答案：** UV 辐射计是测量固化位置辐照度（W/cm²）或光功率（W）的仪器，是把"设备标称值"变成"实际工艺值"的唯一途径。汞灯与 LED 需用不同校准的辐射计；测量必须在实际固化位置、正确焦距、光束对准探测器的条件下进行，并溯源到 NIST 等国家标准。

## 为什么标称值不可信

- 辐照度随距离衰减，标称值对应特定透镜与距离。
- 光路附件（光导、固化环、转角）都有损耗，固化环出口辐照度低于光导端口。
- 光源随时间衰减。

![UV LED 校准实拍：LED 头装在光束定位夹具上对准辐射计探测器，用于准确测量峰值辐照度](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/10-uv-led-beam-positioning-radiometer-calibration.png)

*LED 窄光束必须对准探测器中心与焦高，光束定位套件保证重复测量。图片来源：OmniCure LX500 手册。*

## 汞灯与 LED 的测量差异

| 项目 | 汞灯 | LED |
|---|---|---|
| 光谱 | 宽谱，需宽带响应探测器 | 单色，需按波长校准 |
| 光束 | 光导端面较大 | 窄光束，必须对准探测器中心与焦高 |
| 特殊测量 | 固化环探测器、固化位探测器直接在粘接位测 | 光束定位套件保证重复对准 |
| Excelitas 仪器 | OmniCure R2000（NIST 可追溯） | OmniCure LS200／LS200P（±10%，NIST/NRC 可追溯，校准周期 1 年） |

![OmniCure R2000 辐射计与固化位探测器、固化环探测器，可在粘接位或固化环出口直接测量辐照度](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/10b-r2000-radiometer-cure-site-cure-ring-detector.png)

*光路每次连接都有损耗，测量应在实际固化位置进行。图片来源：OmniCure 产品目录。*

## 校准流程建议

1. 新设备安装后测基准值，记录透镜、距离、强度设定。
2. 每班或每批点检，偏差超过 ±10% 触发调整。
3. 光导、透镜更换后重新测量。
4. 多台设备用同一辐射计横向比对。
5. 辐射计本身按周期送校（LS200 为 1 年）。

## 关联产品

[OmniCure S2000 Elite](/product/omnicure/s2000) 与 [R2000](/product/systems/r2000) 联动可实时显示辐照度并做 NIST 校准，是"唯一可实时校准"的汞灯点固化系统。[OmniCure LX500](/product/systems/lx500) 内置辐射计，配 [LS200](/product/systems/ls200) + 光束定位套件在线校准。[Phoseon 风冷光纤系统](/product/phoseon) FRU 预留辐照度监测安装位。

## 常见问题

**Q：用汞灯辐射计测 LED 行吗？**

A：不行，光谱响应不同，读数无意义；LED 需按 365/385/395/405 nm 校准的探测器。

**Q：辐照度和剂量都要测吗？**

A：辐射计测辐照度，剂量由辐照度 × 曝光时间（或线速）算出；两者都要写进工艺文件。
