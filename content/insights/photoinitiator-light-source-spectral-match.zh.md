---
title: "光引发剂与光源光谱为什么必须匹配？"
description: "光引发剂只吸收特定波段的光，光源光谱与吸收谱不重叠时反应不会启动。宽谱汞灯几乎兼容所有配方；UV LED 光谱窄，必须用为该波长设计的配方。"
date: 2026-09-15
tags: [UV 固化基础, 光引发剂, 光谱匹配]
author: ETIA Technology
cover: https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/03-mercury-iron-gallium-lamp-spectral-output.png
---

**一句话答案：** 光引发剂只吸收特定波段的光，光源光谱与引发剂吸收谱不重叠时反应不会启动——这是 UV 固化的第一条规则。宽谱汞灯几乎兼容所有配方；UV LED 光谱窄（±10 nm），必须使用为该波长设计的 LED 配方。

![三种汞灯光谱对比：标准汞灯主峰 365 nm，碘化铁灯增强 380 nm，碘化镓灯在 403 与 417 nm 有强谱线](https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/insight%20/03-mercury-iron-gallium-lamp-spectral-output.png)

*同为汞灯，添加不同金属卤化物可把光谱推向长波，以匹配不同引发剂。图片来源：Noblelight Amba 汞弧灯手册。*

## 吸收谱与发射谱的重叠

把引发剂吸收曲线和光源发射曲线画在同一张图上，重叠面积越大，光子利用效率越高。汞灯在 254、313、365、405、436 nm 等多条谱线上都有输出，几乎总能与某个引发剂重叠；LED 只有一个峰，必须精确命中。

## 三类常见情况

| 情况 | 现象 | 对策 |
|---|---|---|
| 汞灯配方直接换 LED | 表面发粘或完全不固化 | 换 LED 版配方，或保留汞灯 |
| 含颜料/白色体系 | 颜料吸收 UV，深层不固化 | 用长波（385–405 nm）或金属卤化物灯 |
| 传统引发剂 | LED 单波长激活不足 | 补充 UVC，或双光源 |

## LED 配方已成主流

选型指南指出，LED 近单色输出"需要新的化学配方"，而今油墨、涂层、胶粘剂厂商普遍提供 LED 版本；切换光源前先向配方供应商确认推荐波长与最低辐照度。

## 关联产品

已有 LED 配方 → [OmniCure LX500](/product/systems/lx500)（点）、[Phoseon 风冷 LED](/product/phoseon)（面）。配方未定或需宽谱兼容 → [OmniCure S2000 Elite](/product/omnicure/s2000)，一台机器通过滤光片切换覆盖 250–500 nm，可在研发阶段模拟不同光源。

## 常见问题

**Q：胶水说明书写"UV 固化"就一定能用 LED 吗？**

A：不一定，需确认引发剂吸收峰在 365–405 nm 范围内。

**Q：365 nm 和 395 nm 引发剂有什么区别？**

A：365 nm 引发剂种类多、固化更彻底但穿透浅；395/405 nm 穿透深、LED 效率高，适合厚层与含颜料体系。
