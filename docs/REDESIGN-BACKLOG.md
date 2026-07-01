# ETIA 网站改版需求清单 (Redesign Backlog)

> 逐条实现、逐条勾选。每完成一块单独 build + PR + merge。
> 全站改动均保持中英双语(EN/CN),并为未来越南语/泰语预留(`LangText` 结构)。

---

## 首页 (Home)

- [x] **2. Case Study 区块:轮播 → 3列静态卡片网格** — **PR #46**
  - 固定展示 3 个案例,突出核心数字:
    - AUTOMOTIVE & EV — **Up to 80% Cost Reduction** — EV Battery Manufacturing (B1)
    - PHOTONICS — **±5% Dose Stability · 400G→1.6T** — Optical Transceiver (B2)
    - MEDICAL DEVICE — **NIST-Traceable 360° Cure · Patient Safety** — Cardiovascular Catheter (B9)
  - 底部按钮:`Explore All 10 Case Studies →`(点开仍可看全部案例)
  - 保留点击进案例详情弹窗的能力

---

## 产品列表页 (/product)

- [x] 3.1 Hero 差异化文案 — **PR #44**
- [x] 3.2 品牌 Tab 栏 + 平滑滚动 — **PR #44**
- [x] 3.3 四个品牌全部展示(堆叠) — **PR #44**
- [x] 3.5 Why-UV 顺序(精准→清洁→速度)+ lucide 图标 — **PR #44**
- [x] 3.6 完整目录链接移到底部 — **PR #44**
- [x] **3.4 产品"典型应用"标签** → 链接到应用页对应锚点 — **PR #51**(标签放在产品子页,数据驱动匹配)
- [ ] (可选)3.3 各品牌区块内容按审计原文精调

---

## 产品子页面 (/product/systems/[model] 及 S2000)  — §4

- [ ] 4.2 Breadcrumb 导航(Home > Products > Brand > Tech > Model)
- [ ] 4.3 H1 上方加 品牌 Badge + 技术路线 Badge
- [ ] 4.4 底部三模块:A 同系列产品 · B 适用应用场景(→应用页) · C 咨询工程师 CTA

---

## 品牌落地页(新增) — §5  ★SEO 价值最高 — **PR #49**

- [x] `/product/omnicure`、`/product/phoseon`、`/product/fusion-uv`、`/product/noblelight`
- [x] 每页结构:品牌 Logo + Authorized Distributor badge + 品牌介绍 + 技术路线分区(含型号,数据驱动自 catalog) + 典型应用行业 + 复用 Why ETIA
- [x] 中英双语
- [x] `/product/omnicure` 旧页已重做为品牌落地页结构 + 中文
- [x] 产品列表页各品牌加"品牌主页 →"链接

---

## SEO 架构 — §6

- [x] 6.1 Title 模板:品牌页 `{品牌} … Authorized Distributor | ETIA` — **PR #49**;产品子页模板待 §4
- [x] 6.2 Meta description(品牌页)— **PR #49**;产品子页待 §4
- [x] 6.3 Breadcrumb JSON-LD(品牌页)— **PR #49**;产品子页待 §4
- [x] 6.4 Product JSON-LD(产品子页,含 brand / category / manufacturer / offers.seller=ETIA / areaServed=[CN,HK,TH,VN])— **PR #51**(附 Breadcrumb JSON-LD)
- [x] 6.5 sitemap 加 4 个品牌落地页 — **PR #49**(产品子页已在 sitemap)

---

## 内链逻辑 — §7

- [x] 产品子页 ↔ 应用页 ↔ 品牌页 双向打通 — **PR #51**(产品子页→应用锚点/品牌页;应用弹窗推荐系统→产品子页)
- [x] **前置依赖**:应用页给 62 个 AN-note 加锚点(`#AN-MED-001` 等)+ `?ind=` 预筛选 — **PR #51**
- [ ] (余)首页 ↔ 产品列表 更细的双向内链(如首页按行业直达应用锚点)

---

## 其余中文化(i18n 收尾)

- [x] OmniCure 品牌页中文(并入 §5 一起做)— **PR #49**
- [x] 隐私 / Cookie 法律页中文 — **PR #54**
- [x] 产品规格表"标签"中文(数值通用,标签已中文化,172 条)— **PR #54**

---

## 内容 / SEO 博客(新增)

- [x] `/insights` 博客区块:Markdown 发文,每周一篇,自动上线 + 进 sitemap — **PR #53**
- [x] 每篇文章:Article + Breadcrumb JSON-LD、canonical、OpenGraph、中英双语
- [x] 作者流程文档 `content/insights/README.md` + 双语样板文

---

## 需要你操作(非代码)

- [ ] Google Search Console:HTML 标记验证(标记已在网站,待你点「验证」)
- [ ] GSC 提交 `sitemap.xml`
- [ ] PageSpeed 重测,确认性能
- [ ] 补 4 个办公室真实电话(已完成)/ 其他联系信息如有更新

---

### 建议实现顺序
1. **首页 Case Study 3列网格**(小、独立、见效快)
2. **§5 品牌落地页 + §6 SEO**(SEO 回报最高)
3. **§4 产品子页面模块**(Breadcrumb / Badge / 关联模块)
4. **应用页锚点** → 然后 **3.4 + §7 内链**
5. 法律页 + 规格标签中文收尾
