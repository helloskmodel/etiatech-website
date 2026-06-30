# ETIA Website — Development Notes / 开发笔记

> Branch / 分支: `claude/product-image-assets-30ar7q`
> Last updated / 更新时间: 2026-06-30
> Scope / 范围: 产品图片接入、产品目录扩充、Application 页面文案与行业分类调整

---

## 1. 本次开发总览 / Summary

这一轮主要做了三件事:

1. **修复产品图片不显示的问题**(图片命名与代码不匹配)。
2. **扩充产品目录**——用官方资料新建 10 个产品并接好图片。
3. **Application(应用)页面优化**——文案改写 + 新增第 10 类行业「Photonics & Advanced Packaging」。

所有改动都已 commit + push 到分支 `claude/product-image-assets-30ar7q`,构建(`npm run build`)与类型检查(`tsc`)全部通过。**尚未开 Pull Request**(等你确认)。

---

## 2. 已完成 / Done

### 2.1 产品图片修复 (Product image fix)

- **根因**:`productImage()` 之前按 `IMAGE/products/<slug>.png` 拼 URL,但 COS 桶里的真实文件名不遵守 slug 规则且**区分大小写**(例如 `LX500.png`、`V3.png`、`S2E.png`、`6markII.png`、`fl400i.png`、`firejet one.png`),导致大部分图片 404。
- **解决**:在 `components/productCatalog.ts` 里建立 **slug → 真实文件名** 的显式映射 `productImageFile`,`productImage()` 改为查表返回。
- **兜底**:产品若暂无图片,详情页与列表页渲染**品牌占位符**而非破图(`app/product/systems/page.tsx`、`app/product/systems/[slug]/page.tsx`)。

> 注:本环境网络策略禁止访问 `myqcloud.com`(代理返回 403),无法在此直接验证图片 URL;映射依据是你提供的桶文件清单。

### 2.2 新增产品 (10 个,均已接图)

| # | 产品 | slug | 技术分类 | 图片文件 |
|---|---|---|---|---|
| 1 | FireJet ONE | `firejet-one` | Air-Cooled | `firejet one.png` |
| 2 | FireJet FJ100 Gen2 | `fj100` | Air-Cooled | `fj100.png` |
| 3 | FireJet FJ240 | `fj240` | Air-Cooled | `fj240.png` |
| 4 | AC7 Series | `ac7` | Air-Cooled | `AC7.png` |
| 5 | AC8 Series | `ac8` | Air-Cooled | `AC8.png` |
| 6 | AC8-HD | `ac8-hd` | Air-Cooled | `AC8-HD.png` |
| 7 | AC9225 (AC9) | `ac9225` | Air-Cooled | `ac9225.png` |
| 8 | R2000 Radiometer | `r2000` | UV Spot Curing | `R2000.png` |
| 9 | FireEdge FE100 | `fe100` | Air-Cooled (Small) | `fe100.png` |
| 10 | Semray 5000+ | `semray-5000` | Water-Cooled | `semray5000.png` |

- 每个产品含官方 intro / features / applications / 规格表。
- `/product` 选择页对应型号标签已链接到详情页;并修正占位标签 `ACT`→`AC7`、`ACN225-F`→`AC9225`。

### 2.3 既有产品接图 / 内容更新

- 接好之前缺图的:**VeriCure**(`vericure.jpg`)、**DRF / Optical Fiber**(`phoseon optical fiber.jpg`)、**FE400**(`fe400.png`)、**FE410**(`fe410.png`)。
- **VeriCure** 用官方资料重写了 intro/features/applications,并补全 5 个型号(750–1350 mm)的完整规格表。

**结果:目录共 32 个产品,全部接好图片,无破图/占位符。构建页面 43 个。**

### 2.4 Application 页面 (`app/application/page.tsx`)

- **Customer Success 板块**文案:
  - 标题改为 **"From Application Know-How to Real Results"**。
  - 副标题改为 **"Unmatched light-cure expertise — full system solutions where chemistry, material, and equipment work as one."**
- **新增第 10 类行业「Photonics & Advanced Packaging」**(青色标签 + CircuitBoard 图标),含 6 个应用:
  1. Optical Transceiver Assembly (400G/800G/1.6T)
  2. Photonic IC (PIC) Packaging
  3. Co-Packaged Optics (CPO)
  4. Silicon Photonics Manufacturing
  5. LiDAR Sensor Assembly
  6. Advanced Semiconductor Packaging (Chiplet / 2.5D / 3D)
  - 文案嵌入工程师真实搜索词(silicon photonics、co-packaged optics、chiplet、2.5D/3D 等)。

### 2.5 Application 页现状统计 / Current stats

**10 大行业,共 57 个应用点(apps):**

| 行业 / Industry | 应用点数 |
|---|---|
| Medical Device | 10 |
| Automotive | 7 |
| Electronics | 9 |
| Cable & Fiber | 6 |
| Precision Optics | 3 |
| UV Printing | 3 |
| Wood Coatings | 6 |
| Metal Coatings | 4 |
| Aerospace | 3 |
| Photonics & Advanced Packaging | 6 |
| **合计 / Total** | **57** |

---

## 3. 待办 / TODO（待你确认或下一步）

| 优先级 | 事项 | 状态 / 说明 |
|---|---|---|
| 高 | **改写 Application 页现有应用案例文案** | 你已确认要改"Application 页其他应用案例"。等你给方向(哪几个行业 / 改写重点)。 |
| 中 | **行业改名** | 待定:Cable & Fiber、Precision Optics、Electronics 三个名字对工程师搜索不友好。建议:Optical Fiber & Cable / Optics & Optical Assembly / Electronics & Semiconductor。等你拍板最终名字。 |
| 中 | **Photonics 行业配图** | 桶里暂无该行业照片,目前用图标兜底。如需照片,上传到 `IMAGE/industries/photonics-advanced-packaging.png` 后告诉我。 |
| 低 | **开 Pull Request** | 所有改动已 push,等你确认是否合并到 `main`。 |

---

## 4. 关键文件 / Key files

| 文件 | 作用 |
|---|---|
| `components/productCatalog.ts` | 产品数据、slug→图片映射(`productImageFile` / `productImage`)、型号→slug 映射(`modelToSlug`)。 |
| `app/product/systems/page.tsx` | 产品列表页(按技术分组)。 |
| `app/product/systems/[slug]/page.tsx` | 产品详情页。 |
| `app/product/page.tsx` | 品牌/型号选择页(标签链接)。 |
| `app/application/page.tsx` | 应用页:`apps`(应用案例)、`industries`(自动派生)、`industryColors`、`successStories`。 |
| `components/industryMedia.tsx` | 行业配图 URL 与图标兜底。 |

> 小贴士:**行业列表是数据驱动的**——`industries` 由 `apps` 自动去重派生。改行业名只需在 `apps` 里替换 + 同步 `industryColors`、`industryMedia.tsx` 两处映射,即可全站生效。

---

## 5. 验证 / How to verify

```bash
npm install
npm run build      # 应输出 43 个页面,无 error
npx tsc --noEmit   # 无类型错误
```
