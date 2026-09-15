---
title: "为什么 UV 固化需要过程控制？闭环反馈与曝光程序"
description: "光源输出会随时间衰减、随温度波动，人工无法逐件保证剂量一致。过程控制通过光源稳定、曝光程序化、过程可追溯三件事解决。"
date: 2026-09-15
tags: [过程控制, 闭环反馈, 可追溯]
author: ETIA Technology
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/09-closed-loop-feedback-vs-no-feedback-lamp-output.png
---

**一句话答案：** 光源输出会随时间衰减、随温度波动，人工无法逐件保证剂量一致；过程控制通过三件事解决：光源稳定（闭环反馈、温度监测）、曝光程序化（多阶段 StepCure、PLC 触发）、过程可追溯（日志、权限、远程管理）。这是医疗、光学、汽车等行业实现批间一致与审计合规的基础。

## 光源为什么会漂移

- 汞灯：随使用时间衰减，未经补偿时后期辐照度可下降数十个百分点。
- LED：芯片温度上升导致输出下降，长期缓慢衰减。
- 光路：光导老化、透镜污染。

![闭环反馈对比曲线：无闭环反馈的汞灯辐照度在 2000 小时内持续下降，启用闭环反馈后辐照度保持恒定](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/09-closed-loop-feedback-vs-no-feedback-lamp-output.png)

*OmniCure S2000 Elite 闭环反馈技术通过内部传感器自动调节光阑，维持设定值 ±5%。图片来源：OmniCure S2000 Elite 手册。*

## 三层控制

### 一、光源稳定

- 闭环反馈：内部光传感器实时监测，自动调节光阑维持设定值 ±5%；灯无法达标时报警，灯可用到寿命末端而不需频繁人工测量。
- 温度／寿命监测：依灯温调整参数、记录工时、防热启动；LED 头温度监测维持曝光期间 ±5%。
- 高速快门（30 ms）：短曝光剂量精确。

### 二、曝光程序化

- 多阶段曲线：如 75% × 1.5 s 预定型 → 100% × 5 s 全固化 → 50% × 2 s 后固化，减少收缩应力、锁定对准位置。
- PLC／脚踏／USB 触发，程序存 SD 卡在多台间复制。

### 三、可追溯

- 事件日志（飞行记录仪）、实时数据记录。
- NFC 卡分级权限，防止操作员误改参数。
- Web UI 远程运行、下载日志、批量推送固件。

## 没有过程控制的代价

批间插损差异（光模块）、粘接强度不一致（医疗器械）、涂层表面发粘（印刷）——多数"胶水问题"追根溯源是剂量漂移。

## 关联产品

[OmniCure S2000 Elite](/product/omnicure/s2000)：闭环反馈 ±5%、30 ms 快门、StepCure 2.0、7 路 PLC、Web UI、飞行记录仪、NFC 卡。[OmniCure LX500](/product/systems/lx500)：Intelli-Lamp LED ±5%、StepCure 2.0、Micro SD 日志、PLC/USB。[Phoseon 风冷 LED](/product/phoseon)：控制盒使能与强度控制、线性强度调节。

## 常见问题

**Q：没有闭环反馈的汞灯怎么办？**

A：定期用辐射计测量并手动调整强度，记录在案；或升级到带闭环的机型。

**Q：多台设备怎么保持一致？**

A：同一辐射计校准、同一 StepCure 程序、同一固件版本。
