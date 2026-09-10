# 合规审计：广告法、隐私安全及其他（2026-09-10）

范围：sitemap 全部 252 页的可见文本 + 元数据（四语），`content/` 与 `components/` 源码，依赖，生产站响应头。方法：脚本扫描 + 人工核对。

## 一、广告法（中国《广告法》§9/§12，泰国《消费者保护法》，越南《广告法》§8）

### 已修正（本次 PR）

| 问题 | 位置 | 改法 |
|---|---|---|
| "the only system with this capability" | R2000 | 删去"唯一" |
| "Most advanced and accurate" | R2000 | → "Purpose-built, accurate" |
| "Class-leading irradiance" | V3 LED 灯头 | → "High irradiance" |
| "industry's highest total UV energy"、"unbeatable uniformity"、"superior"、"State-of-the-art"、"Unique" ×3 | Phoseon / AC 系列 | 改为可验证的中性描述 |
| "Patented / 专利 / สิทธิบัตร / sáng chế"（41 处） | 全站产品文案、Phoseon 品牌页、S2000 灯泡页 | §12：宣传专利须标注专利号与种类；无号在案，一律改为"专有技术 / proprietary" |
| "Trusted by leading… / 头部 / ชั้นนำ / hàng đầu" | 首页客户 logo 标题 | → "服务亚洲…制造企业" |
| "完美适配 / 完美匹配 / 极致可靠" | 中文应用案例、Insight | → 适配 / 匹配 / 高可靠 |
| "our unique tube technology / 我们独有的" | S2000 灯泡页（官方文案） | → "其灯管技术" |
| "rộng nhất"（最广） | 越南语灯泡页 | → "rất rộng" |

### 扫描后确认无需改的

- "最高 40 W/cm²"、"最小 5%"、"5–100%"、"ที่สุด"（最近的仓库）、"nhất quán"（一致）——技术参数或普通用法，非绝对化宣传语。
- "Best For"栏目标题——非比较宣传。
- "2,000 h guaranteed / 保证 2000 小时"——Excelitas 对灯泡的厂家保证，事实陈述；Terms 已声明保修由厂家提供。

### 仍需业主决定

1. **"24 小时内回复"** —— 属承诺，须能兑现；建议改为"工作日 24 小时内"。
2. **"现货 / In stock"**（首页灯泡条、灯泡页）—— 必须属实；断货时应及时下线该措辞。
3. **"Authorized distributor / 授权经销商"** —— 应能出示 Excelitas 授权文件；Terms §4 已做范围声明。
4. 若希望保留"专利"表述，需向 Excelitas 索取专利号并按 §12 标注"专利号 + 种类"。

## 二、隐私与数据安全

### 现状（好的方面）

- Cookie 同意横幅：默认仅必要；GA4/GTM **仅在同意后加载**（`Analytics.tsx` / `GtmConsent.tsx`）；页脚有"Cookie 设置"可撤回。
- 询单接口 `/api/lead`：来源校验、速率限制、蜜罐字段、字段长度上限、纯文本邮件（无 HTML 注入面）。
- 生产站 HTTPS + HSTS（Vercel）。
- 仓库无提交的密钥；Google 站点验证码为公开值。
- 外链 `target=_blank` 均带 `noopener`。

### 已修正（本次 PR）

- **依赖漏洞**：Next.js 16.2.9 存在 1 个 critical（App Router 中间件绕过）+ 1 个 DoS；升级到 16.3.4，`npm audit` 清零（含 sharp / postcss / nanoid / js-yaml / browserslist / brace-expansion）。
- **安全响应头**（`next.config.ts`）：`X-Content-Type-Options: nosniff`、`X-Frame-Options: SAMEORIGIN`、`Referrer-Policy: strict-origin-when-cross-origin`、`Permissions-Policy`（关闭摄像头/麦克风/定位/支付/USB）。
- **隐私政策**（四语）：列明实际处理者（Vercel、Google GA4/GTM、Resend、腾讯云 COS、WhatsApp/微信）；保留期说明；撤回同意与投诉权；新增"法律依据与适用法律"（香港 PDPO、泰国 PDPA B.E. 2562、越南 13/2023/ND-CP、中国 PIPL）；更新日期。
- **Cookie 政策**（四语）：列明实际存储项 `etia-cookie-consent`、`etia-lang`、`etia-inquiry`、`_ga/_ga_*` 及其期限与触发条件；"Cookie 设置"撤回路径。

### 建议（未做，需决定）

1. **`/api/ask`**：站内没有任何页面调用这个 Anthropic 问答接口，但它仍对外可访问（有速率限制）。建议删除，或在启用前把"用户提问会发送至 Anthropic 处理"写入隐私政策。
2. **CSP**：未设 Content-Security-Policy。GTM/GA 与 Next 内联样式需要 nonce 方案（放在 `proxy.ts`），建议先以 `Content-Security-Policy-Report-Only` 上线观察。
3. **法律页面本地化路由**：隐私/Cookie/条款内容已是四语（按语言 Cookie 切换），但只有 `/privacy` 一个 URL；PDPA 建议以用户语言可直达，可加 `/th/privacy` 等路由。
4. **PDPA 合规动作**（泰国）：指定数据保护联系人并写入政策；与 Resend、Vercel 签订数据处理协议（两者均提供标准 DPA）。
5. **GA4 保留期**：在 GA 后台把数据保留期设为 2 个月或 14 个月，并与政策表述一致。
6. **速率限制**：当前为单实例内存计数，Serverless 下每个实例独立；流量上来后换 Upstash/Vercel KV。

## 三、其他检查

| 项目 | 结果 |
|---|---|
| 断链 / 失效图片 / hreflang / JSON-LD | 209 链接、141 图、170 hreflang 目标全部有效；JSON-LD 全部可解析 |
| `<html lang>` | en / zh-CN / th / vi 正确 |
| alt 文本 | 仅装饰性横幅为空 alt（正确做法） |
| 商标 | Terms §2 已声明 OmniCure®、Phoseon® 归属；产品名带 ® |
| 公司主体 | 页脚与法律页均为 ETIA-TECH (ASIA) Co., Limited（香港） |
| robots | 屏蔽百度/搜狗/360/字节爬虫（有意为之，保持） |

### 仍需业主处理

- **手册 PDF 托管**：COS 上托管的 Excelitas / Phoseon / Noblelight 手册属厂家版权物，确认经销协议允许再分发；否则改为链接到厂家官网。
- **EIR 培训资料**：已确认未出现在站内（仅用于学习，符合约束）。
- **灯泡保修小时数**（8,000 / 6,000）：已确认不在站内。
