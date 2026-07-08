import type { LangText } from "@/components/LocaleContext";

// Structured, bilingual knowledge-base content for the OmniCure S2000 Elite
// Technical Support / Installation guide page. Kept as plain data so the client
// view (rendering) and the server page (JSON-LD: HowTo, FAQPage, TechArticle)
// share a single source of truth. Procedures, safety and regulatory notes are a
// quick reference distilled from the OmniCure S2000 Elite documentation — the
// product User Manual remains the authoritative source, and part numbers /
// model names are kept verbatim across languages.

export const SITE = "https://www.etiatech.com";
export const SUPPORT_PATH = "/product/omnicure/s2000/support";
export const PRODUCT_PATH = "/product/omnicure/s2000";
export const LAMP_PATH = "/product/omnicure/s2000-lamp";

// Keyword-rich filename to use when the printable guide is published to /public
// and submitted to Google Search Console. Until the PDF is hosted, the page
// offers the guide by email request instead of linking a missing file.
export const QUICK_START_PDF_FILENAME = "omnicure-s2000-elite-quick-start-guide.pdf";

export type Procedure = { id: string; title: LangText; intro?: LangText; steps: LangText[] };
export type RingRow = { color: LangText; swatch: string; state: LangText; meaning: LangText };
export type TroubleRow = { symptom: LangText; checks: LangText };
export type LampType = { name: LangText; module: string; spare: string; desc: LangText };
export type QA = { q: LangText; a: LangText };

// ── Installation & Quick Start procedures (numbered lists) ──────────────────
export const startUp: Procedure = {
  id: "start-up",
  title: { en: "Start Up", zh: "开机启动" },
  intro: {
    en: "Bring the OmniCure S2000 Elite from powered-off to ready-to-cure. Confirm the light guide and any optical filter are installed before you begin.",
    zh: "将 OmniCure S2000 Elite 从关机状态启动至可固化状态。开始前请确认导光管与光学滤光片（如使用）均已安装到位。",
  },
  steps: [
    { en: "Confirm your mains supply matches 100–240 V AC, 50/60 Hz, then connect the power cord.", zh: "确认市电符合 100–240 V AC、50/60 Hz，然后连接电源线。" },
    { en: "Make sure the liquid light guide and (if used) the optical band-pass filter are installed, and the lamp-module door is closed.", zh: "确保液体导光管以及（如使用）光学带通滤光片已安装，且灯管模块舱门已关闭。" },
    { en: "Turn on the main power switch at the rear of the unit.", zh: "打开设备后部的主电源开关。" },
    { en: "The S2000 Elite runs a self-test and the 200 W mercury lamp strikes automatically; the front status light ring shows the current state.", zh: "S2000 Elite 会执行自检，200 W 汞灯自动点亮；前面板状态光环显示当前状态。" },
    { en: "Allow the lamp to warm up and stabilise until the status ring shows Ready (green).", zh: "让灯管预热并稳定，直至状态光环显示“就绪”（绿色）。" },
    { en: "If access control is enabled, tap your Intelli-Tap NFC keycard (Admin or Supervisor) to unlock the functions you need.", zh: "如启用了权限控制，请刷 Intelli-Tap NFC 钥匙卡（管理员或主管卡）以解锁所需功能。" },
    { en: "Select the cure mode — Timer, Energy (dose) or StepCure 2.0 — and set the exposure time and intensity.", zh: "选择固化模式——定时、能量（剂量）或 StepCure 2.0——并设置曝光时间与强度。" },
    { en: "For absolute W/cm², calibrate against the OmniCure R2000 radiometer before production.", zh: "如需绝对 W/cm² 值，请在生产前使用 OmniCure R2000 辐射计进行校准。" },
    { en: "Trigger exposures from the touchscreen, a foot switch, or a PLC signal.", zh: "通过触摸屏、脚踏开关或 PLC 信号触发曝光。" },
  ],
};

export const lightGuide: Procedure = {
  id: "installing-the-light-guide",
  title: { en: "Installing the Light Guide", zh: "安装导光管" },
  intro: {
    en: "The liquid light guide delivers UV energy from the unit to your work point. Handle it by the fittings only and keep the optical ends clean.",
    zh: "液体导光管将 UV 能量从设备输送到工作点。请仅握持金属接头，并保持光学端面清洁。",
  },
  steps: [
    { en: "Switch the system off before installing or removing a light guide.", zh: "安装或拆卸导光管前，请先关闭系统电源。" },
    { en: "Remove the protective cap from the light-guide port on the front of the unit.", zh: "取下设备前面板导光管接口上的保护帽。" },
    { en: "Remove the dust caps from both ends of the liquid light guide, avoiding contact with the optical faces.", zh: "取下液体导光管两端的防尘帽，避免触碰光学端面。" },
    { en: "Insert the light guide straight into the port until it seats fully.", zh: "将导光管垂直插入接口，直至完全到位。" },
    { en: "Secure the retaining collar so the guide is locked in place and cannot back out.", zh: "拧紧固定环，使导光管锁定到位、不会松脱。" },
    { en: "Route the guide without kinks and never below the manufacturer's minimum bend radius — tight bends reduce output and damage the guide.", zh: "布线时避免打折，切勿小于厂家规定的最小弯曲半径——过度弯曲会降低输出并损坏导光管。" },
    { en: "Fit the output end into your focusing or aiming adapter at the bonding point.", zh: "将输出端装入粘接点处的聚焦或对准适配器。" },
  ],
};

export const lampModule: Procedure = {
  id: "installing-the-lamp-module",
  title: { en: "Installing or Replacing the Lamp Module", zh: "安装或更换灯管模块" },
  intro: {
    en: "The S2000 Elite uses a field-replaceable Intelli-Lamp® module that carries its own usage memory, so lamp hours transfer automatically. Choose the Standard (012-68000R) or Surface Cure (012-69000R) module for your process. Before you start, disconnect AC power, let a hot lamp cool completely, and handle the module only by the ceramic component and glass rim — never touch the bulb glass envelope or the reflector surface, as skin oils cause premature lamp failure.",
    zh: "S2000 Elite 采用现场可换的 Intelli-Lamp® 智能灯管模块，模块自带使用记录，灯管时长会自动转移。请根据工艺选择标准型（012-68000R）或表面固化型（012-69000R）模块。开始前请断开交流电源，让高温灯管完全冷却，并仅握持模块的陶瓷部件与玻璃边缘——切勿触碰灯泡玻璃外壳或反射镜表面，皮肤油脂会导致灯管过早失效。",
  },
  steps: [
    { en: "Disconnect power — turn the S2000 Elite off and unplug the AC power cord. Never open the lamp housing while the system is connected to power.", zh: "断开电源——关闭 S2000 Elite 并拔下交流电源线。切勿在系统接通电源时打开灯管舱。" },
    { en: "Allow the lamp to cool — if the system has been running, let the lamp module cool completely before opening the unit, for operator safety and to prevent handling damage.", zh: "让灯管冷却——若系统曾运行，请让灯管模块完全冷却后再打开设备，以保障操作者安全并避免搬运损伤。" },
    { en: "Remove the lamp access side panel — use the supplied 3 mm Allen key to loosen and remove the side-panel screws, then set the panel aside safely.", zh: "拆下灯管检修侧板——使用随附的 3 mm 内六角扳手拧松并取下侧板螺丝，然后将侧板妥善放置。" },
    { en: "Unpack the lamp module — remove it from its container, holding it only by the ceramic component and glass rim. Do not touch the bulb glass envelope, reflector surface, circuit board or connector areas.", zh: "取出灯管模块——从包装中取出，仅握持陶瓷部件与玻璃边缘。切勿触碰灯泡玻璃外壳、反射镜表面、电路板或连接器区域。" },
    { en: "Position the lamp module — face the lamp toward the front of the unit with the power leads toward you. Align the middle of the lamp with the spring clamp and slide it in until it snaps securely into place; the leading edge of the reflector should seat snugly in the lamp-holder recess.", zh: "放置灯管模块——使灯管朝向设备前方、电源引线朝向自己。将灯管中部对准弹簧夹，滑入直至牢固卡入；反射镜前缘应贴合嵌入灯座凹槽。" },
    { en: "Connect the Intelli-Lamp® sensor connector — join the 6-pin sensor connector at the rear of the module to the matching connector behind the lamp-housing wall (it fits only one way — rotate 180° if it resists). Then tuck the wires into the grommet on the divider wall; if the wires are not positioned correctly the door may not close and the system may not power on.", zh: "连接 Intelli-Lamp® 传感器接头——将模块后部的 6 针传感器接头与灯管舱壁后方的对应接头连接（只有一个正确方向——若插不进请旋转 180° 再试）。然后将线束塞入隔板上的护线圈；若线束位置不当，舱门可能无法关闭，系统也可能无法开机。" },
    { en: "Connect the lamp power connector — join the two-lead lamp power connector to its match at the bottom of the lamp-housing wall (also fits only one way — rotate 180° if needed).", zh: "连接灯管电源接头——将带两根引线的灯管电源接头与灯管舱壁底部的对应接头连接（同样只有一个正确方向——必要时旋转 180°）。" },
    { en: "Check lamp alignment — before closing, confirm the lamp anode cooling fin and the front lamp power lead are centred within the lamp-holder cutout; rotate the lamp slightly if required.", zh: "检查灯管对位——关闭前，确认灯管阳极散热片与前端灯管电源引线位于灯座开口正中；必要时轻微旋转灯管。" },
    { en: "Reinstall the side panel — refit the lamp-housing side panel and tighten the screws securely. If the panel is not fully secured, the system may not power on.", zh: "重装侧板——重新装上灯管舱侧板并拧紧螺丝。若侧板未完全固定，系统可能无法开机。" },
    { en: "Reconnect power and start up — reconnect the AC power cord, switch on at the rear, and allow the lamp to warm up fully before production exposure for stable, consistent optical output.", zh: "重新接通电源并启动——重新连接交流电源线，打开后部开关，并在正式曝光前让灯管充分预热，以获得稳定一致的光输出。" },
  ],
};

// Critical do-nots when handling the lamp module (shown as a callout).
export const lampHandling: LangText[] = [
  { en: "Do not touch the bulb glass envelope or the inside surface of the reflector — skin oils shorten lamp life.", zh: "请勿触碰灯泡玻璃外壳或反射镜内表面——皮肤油脂会缩短灯管寿命。" },
  { en: "Do not force any connector into place — if it resists, rotate it 180° and reconnect.", zh: "请勿强行插入任何接头——若插不进，请旋转 180° 后重新连接。" },
  { en: "Do not operate the system with the lamp-housing panel open.", zh: "请勿在灯管舱侧板打开的情况下运行系统。" },
  { en: "Do not look directly into the UV light output; always use UV protective eyewear and skin protection.", zh: "请勿直视紫外光输出；务必佩戴防紫外眼镜并做好皮肤防护。" },
  { en: "Use only genuine OmniCure lamps to preserve optical output, lamp tracking, system detection and process stability.", zh: "仅使用正品 OmniCure 灯管，以保持光输出、灯管追踪、系统识别与工艺稳定性。" },
];

export const quickStart: Procedure[] = [startUp, lightGuide, lampModule];

// ── Changing the optical filter ────────────────────────────────────────────
export const filterChange: Procedure = {
  id: "changing-the-optical-filter",
  title: { en: "Changing the Optical Filter", zh: "更换光学滤光片" },
  intro: {
    en: "The S2000 Elite accepts a selection of optical band-pass filters so you can tune the output spectrum to your photoinitiator. The system auto-detects the installed filter and adjusts its operating parameters.",
    zh: "S2000 Elite 可选配多种光学带通滤光片，让您根据光引发剂调整输出光谱。系统会自动识别所装滤光片并调整运行参数。",
  },
  steps: [
    { en: "Power the system off and allow the lamp and optics to cool.", zh: "关闭系统电源，让灯管与光学元件冷却。" },
    { en: "Note your current cure settings — the system re-detects the configuration on restart.", zh: "记录当前固化设置——系统重启后会重新识别配置。" },
    { en: "Open the filter access on the optics/light-guide module as shown in the manual.", zh: "按手册所示打开光学／导光管模块上的滤光片检修口。" },
    { en: "Withdraw the installed filter cartridge squarely (for example 019-00391R, 320–500 nm), without touching the optical surface.", zh: "垂直抽出已装滤光片盒（例如 019-00391R，320–500 nm），切勿触碰光学表面。" },
    { en: "Insert the new filter cartridge fully until it seats and secure it.", zh: "插入新滤光片盒直至到位并固定牢固。" },
    { en: "Close the access, power on — the S2000 Elite auto-detects the new filter and adjusts operating parameters.", zh: "关闭检修口并开机——S2000 Elite 会自动识别新滤光片并调整运行参数。" },
    { en: "Recalibrate with the R2000 radiometer before returning to production.", zh: "恢复生产前，请使用 R2000 辐射计重新校准。" },
  ],
};

// ── Status light ring / indicator colours (Featured-Snippet table) ─────────
export const ringColors: RingRow[] = [
  {
    color: { en: "Green", zh: "绿色" },
    swatch: "#22B14C",
    state: { en: "Ready / Running", zh: "就绪／运行" },
    meaning: { en: "Lamp on and Closed-Loop Feedback active — irradiance is held within ±5% of the set point. Safe to cure.", zh: "灯管点亮且闭环反馈激活——辐照度保持在设定值 ±5% 以内。可正常固化。" },
  },
  {
    color: { en: "Blue", zh: "蓝色" },
    swatch: "#1A56DB",
    state: { en: "Standby / Open-loop", zh: "待机／开环" },
    meaning: { en: "System powered and lamp on, but Closed-Loop Feedback inactive (manual / open-loop power mode) — output is not being auto-corrected.", zh: "系统通电、灯管点亮，但闭环反馈未激活（手动／开环功率模式）——输出不会自动校正。" },
  },
  {
    color: { en: "Yellow", zh: "黄色" },
    swatch: "#F5B301",
    state: { en: "Warning / Attention", zh: "警告／注意" },
    meaning: { en: "Lamp output is approaching the lower CLF limit or the lamp is nearing end of life — calibrate or plan a lamp change.", zh: "灯管输出接近闭环反馈下限或灯管接近寿命末期——请校准或计划更换灯管。" },
  },
  {
    color: { en: "Magenta", zh: "品红色" },
    swatch: "#C026D3",
    state: { en: "Calibration / Alignment", zh: "校准／对准" },
    meaning: { en: "The system is in calibration or alignment mode, for example when zeroing against the R2000 radiometer.", zh: "系统处于校准或对准模式，例如使用 R2000 辐射计归零时。" },
  },
  {
    color: { en: "Red", zh: "红色" },
    swatch: "#E11D2E",
    state: { en: "Alarm / Fault", zh: "报警／故障" },
    meaning: { en: "Fault condition — lamp failed to strike, over-temperature, interlock open, or output has dropped below the set point (CLF can no longer maintain the target). Exposure is inhibited.", zh: "故障状态——灯管点火失败、过温、联锁断开，或输出已跌破设定值（闭环反馈无法维持目标值）。曝光被禁止。" },
  },
];

// ── Troubleshooting ────────────────────────────────────────────────────────
export const troubleshooting: TroubleRow[] = [
  {
    symptom: { en: "Lamp will not strike / ignite", zh: "灯管无法点亮／点火" },
    checks: { en: "Confirm mains and the rear power switch are on; ensure the lamp module is fully seated and the door closed; let a hot lamp cool 3–5 minutes before re-striking; check the safety interlock. If it persists, the lamp may be at end of life — install a new module.", zh: "确认市电与后部电源开关已开启；确保灯管模块完全到位、舱门已关闭；热灯需冷却 3–5 分钟后再点火；检查安全联锁。若仍无法点亮，灯管可能已到寿命末期——请更换新模块。" },
  },
  {
    symptom: { en: "Red light ring / alarm at start-up", zh: "启动时红色光环／报警" },
    checks: { en: "Usually an interlock or over-temperature condition — check the light guide is installed and the vents are clear, then power-cycle. If the alarm returns, contact ETIA support.", zh: "通常为联锁或过温状态——检查导光管是否已安装、散热口是否通畅，然后重新上电。若报警再次出现，请联系 ETIA 支持。" },
  },
  {
    symptom: { en: "Low or dropping irradiance", zh: "辐照度偏低或持续下降" },
    checks: { en: "Recalibrate with the R2000; inspect the light guide for damage or clouding; a yellow ring means the lamp is aging — replace it; clean or replace the optical filter.", zh: "使用 R2000 重新校准；检查导光管是否损坏或发白；黄色光环表示灯管老化——请更换；清洁或更换光学滤光片。" },
  },
  {
    symptom: { en: "Lamp on but no output through the light guide", zh: "灯亮但导光管无输出" },
    checks: { en: "The shutter may not be opening — check the timer/trigger and cure mode; verify the light guide is fully inserted and the correct exposure mode is selected.", zh: "快门可能未打开——检查定时／触发与固化模式；确认导光管完全插入且已选择正确的曝光模式。" },
  },
  {
    symptom: { en: "\"Change Lamp\" / Intelli-Lamp alert", zh: "“更换灯管”／Intelli-Lamp 提示" },
    checks: { en: "The tracked lamp hours are exhausted — install a new lamp module (012-68000R Standard or 012-69000R Surface Cure) and the hours reset automatically.", zh: "记录的灯管时长已用尽——请安装新灯管模块（012-68000R 标准型或 012-69000R 表面固化型），时长会自动重置。" },
  },
];

// ── Safety precautions ─────────────────────────────────────────────────────
export const safety: LangText[] = [
  { en: "UV radiation hazard — never look at the light-guide output or exposed UV. Wear UV-blocking eyewear and cover exposed skin.", zh: "紫外辐射危害——切勿直视导光管输出或裸露的紫外光。请佩戴防紫外眼镜并遮盖裸露皮肤。" },
  { en: "High-intensity, high-temperature source — the 200 W mercury lamp and light-guide tip get very hot. Do not touch during or immediately after operation; allow to cool.", zh: "高强度、高温光源——200 W 汞灯与导光管端头温度极高。运行中及运行后请勿触碰，需待冷却。" },
  { en: "Ozone — high-energy UV can generate ozone. Operate with adequate ventilation.", zh: "臭氧——高能紫外光可能产生臭氧。请在通风良好的环境中使用。" },
  { en: "Electrical safety — high voltage inside. Disconnect mains before service; there are no user-serviceable parts beyond the lamp module and optical filter.", zh: "电气安全——内部存在高压。维修前请断开市电；除灯管模块与光学滤光片外，内部无用户可维修部件。" },
  { en: "Never defeat the safety interlocks or operate with covers removed.", zh: "切勿使安全联锁失效，也不要在拆除外壳的情况下运行。" },
  { en: "Mercury lamp handling & disposal — the lamp contains mercury. Handle with care and dispose of it in accordance with local regulations (WEEE / RoHS).", zh: "汞灯的处理与废弃——灯管含汞。请小心处理，并按当地法规（WEEE／RoHS）进行废弃处置。" },
  { en: "Use only genuine OmniCure lamps, filters and light guides to preserve safety, performance and warranty.", zh: "仅使用正品 OmniCure 灯管、滤光片与导光管，以保障安全、性能与保修。" },
];

// ── Lamp types & optical filters (E-E-A-T: authoritative part numbers) ──────
export const lampTypes: LampType[] = [
  {
    name: { en: "Standard Lamp Module", zh: "标准型灯管模块" },
    module: "012-68000R",
    spare: "012-64000R",
    desc: { en: "Broad-spectrum output for the widest range of UV adhesive bonding applications.", zh: "宽光谱输出，适用于最广泛的 UV 胶粘剂粘接应用。" },
  },
  {
    name: { en: "Surface Cure Lamp Module", zh: "表面固化型灯管模块" },
    module: "012-69000R",
    spare: "012-54000R",
    desc: { en: "Reshapes the power spectrum for a smooth, seamless, tack-free finish on acrylic resins — overcoming oxygen inhibition.", zh: "重塑功率光谱，让丙烯酸树脂获得光滑、无缝、不粘手的表面——克服氧阻聚。" },
  },
];

export const opticalFilters: { pn: string; range: LangText }[] = [
  { pn: "019-00387R", range: { en: "400–500 nm", zh: "400–500 nm" } },
  { pn: "019-00388R", range: { en: "365 nm", zh: "365 nm" } },
  { pn: "019-00389R", range: { en: "320–390 nm", zh: "320–390 nm" } },
  { pn: "019-00390R", range: { en: "250–450 nm", zh: "250–450 nm" } },
  { pn: "019-00391R", range: { en: "320–500 nm", zh: "320–500 nm" } },
  { pn: "019-00392R", range: { en: "Blank (full spectrum, no band-pass)", zh: "空白（全光谱，无带通）" } },
];

// ── Regulatory & compliance (E-E-A-T) ──────────────────────────────────────
export const regulatory: LangText[] = [
  { en: "CE Marked — conforms to the applicable European Union directives.", zh: "CE 认证——符合适用的欧盟指令。" },
  { en: "EMC Directive 2014/30/EU — electromagnetic compatibility.", zh: "EMC 指令 2014/30/EU——电磁兼容性。" },
  { en: "Low Voltage Directive 2014/35/EU — electrical safety.", zh: "低电压指令 2014/35/EU——电气安全。" },
  { en: "RoHS Directive 2011/65/EU (incl. 2015/863) — restriction of hazardous substances.", zh: "RoHS 指令 2011/65/EU（含 2015/863）——有害物质限制。" },
  { en: "WEEE Directive 2012/19/EU — waste electrical and electronic equipment.", zh: "WEEE 指令 2012/19/EU——废弃电子电气设备。" },
  { en: "FCC Part 15, Class A — radio-frequency emissions (USA).", zh: "FCC 第 15 部分 A 类——射频发射（美国）。" },
  { en: "IEC / CSA / UL 61010-1 — safety of electrical equipment for measurement, control and laboratory use.", zh: "IEC／CSA／UL 61010-1——测量、控制及实验室用电气设备安全。" },
];

// ── FAQ (long-tail keywords + FAQPage schema) ──────────────────────────────
export const faq: QA[] = [
  {
    q: { en: "How do I troubleshoot the OmniCure S2000 lamp not striking?", zh: "OmniCure S2000 灯管无法点亮如何排查？" },
    a: { en: "Confirm the mains and rear power switch are on, the lamp module is fully seated and its door closed, and the safety interlock is engaged. Let a hot lamp cool for 3–5 minutes before re-striking. If the lamp still will not strike after several attempts, it may have reached end of life — install a new lamp module (012-68000R or 012-69000R).", zh: "确认市电与后部电源开关已开启、灯管模块完全到位且舱门关闭、安全联锁已生效。热灯需冷却 3–5 分钟后再点火。若多次尝试仍无法点亮，灯管可能已到寿命末期——请安装新灯管模块（012-68000R 或 012-69000R）。" },
  },
  {
    q: { en: "What do the OmniCure S2000 light ring colours and error codes mean?", zh: "OmniCure S2000 光环颜色与错误代码分别代表什么？" },
    a: { en: "Green means ready with Closed-Loop Feedback active; blue means standby / open-loop (CLF inactive); yellow is a warning that the lamp is nearing its limit; magenta indicates calibration or alignment; red is an alarm/fault that inhibits exposure. See the colour table above and always confirm against your S2000 Elite User Manual.", zh: "绿色表示就绪且闭环反馈激活；蓝色表示待机／开环（闭环反馈未激活）；黄色为灯管接近极限的警告；品红色表示校准或对准；红色为报警／故障并禁止曝光。请参见上方颜色表，并始终以 S2000 Elite 用户手册为准。" },
  },
  {
    q: { en: "How do I change the optical filter on the OmniCure S2000 Elite?", zh: "如何更换 OmniCure S2000 Elite 的光学滤光片？" },
    a: { en: "Power off and let the optics cool, open the filter access, withdraw the installed filter cartridge squarely without touching the optical surface, insert the new filter until seated, then power on. The S2000 Elite auto-detects the new filter and adjusts operating parameters — recalibrate with the R2000 before production.", zh: "关闭电源并让光学元件冷却，打开滤光片检修口，垂直抽出已装滤光片盒（勿触碰光学表面），插入新滤光片直至到位，然后开机。S2000 Elite 会自动识别新滤光片并调整运行参数——生产前请用 R2000 重新校准。" },
  },
  {
    q: { en: "How do I install the S2000 Elite lamp module?", zh: "如何安装 S2000 Elite 灯管模块？" },
    a: { en: "Switch off and let the lamp cool, open the lamp-module door, withdraw the old Intelli-Lamp module, slide the new module (012-68000R Standard or 012-69000R Surface Cure) in until fully seated, close the door, and power on. The system reads the module and loads the correct lamp hours automatically.", zh: "关闭电源并让灯管冷却，打开灯管模块舱门，抽出旧的 Intelli-Lamp 模块，将新模块（012-68000R 标准型或 012-69000R 表面固化型）推入至完全到位，关闭舱门并开机。系统会读取模块并自动载入正确的灯管时长。" },
  },
  {
    q: { en: "Which lamp does the S2000 Elite use — Standard or Surface Cure?", zh: "S2000 Elite 该用哪种灯管——标准型还是表面固化型？" },
    a: { en: "Standard (module 012-68000R, spare 012-64000R) suits most UV adhesive bonding. Surface Cure (module 012-69000R, spare 012-54000R) reshapes the spectrum for a tack-free, seamless acrylic finish. If you are unsure, send ETIA your application and we will confirm the right part number.", zh: "标准型（模块 012-68000R，备用灯 012-64000R）适用于大多数 UV 胶粘剂粘接。表面固化型（模块 012-69000R，备用灯 012-54000R）重塑光谱，实现不粘手、无缝的丙烯酸表面。若不确定，请将应用告知 ETIA，我们会帮您确认正确的料号。" },
  },
  {
    q: { en: "Is 012-64000R the same as 012-68000R?", zh: "012-64000R 与 012-68000R 是同一个吗？" },
    a: { en: "No. 012-64000R is the standard spare 200 W lamp for the S2000 and S1500, while 012-68000R is the S2000 Elite Lamp Module – Standard. Always confirm the exact system model and part number before ordering.", zh: "不是。012-64000R 是 S2000 与 S1500 的标准备用 200 W 灯管，而 012-68000R 是 S2000 Elite 标准型灯管模块。订购前请务必确认确切的系统型号与料号。" },
  },
  {
    q: { en: "Why does the system not power on after a lamp replacement?", zh: "更换灯管后系统为何无法开机？" },
    a: { en: "Check that the lamp-housing side panel is fully secured, that the Intelli-Lamp wires are properly tucked into the grommet, and that every connector is fully seated in the correct orientation.", zh: "请检查灯管舱侧板是否完全固定、Intelli-Lamp 线束是否已正确塞入护线圈，以及每个接头是否以正确方向完全插到位。" },
  },
  {
    q: { en: "Why should I use a genuine OmniCure lamp?", zh: "为什么应使用正品 OmniCure 灯管？" },
    a: { en: "A genuine OmniCure lamp maintains correct optical output, lamp-hour tracking, system detection and curing process stability. Non-genuine or incorrectly installed lamps can affect curing performance, process repeatability and equipment reliability.", zh: "正品 OmniCure 灯管可保持正确的光输出、灯管时长追踪、系统识别与固化工艺稳定性。非正品或安装不当的灯管会影响固化性能、工艺可重复性与设备可靠性。" },
  },
  {
    q: { en: "Is the OmniCure S2000 Elite CE, RoHS and FCC compliant?", zh: "OmniCure S2000 Elite 是否符合 CE、RoHS 与 FCC？" },
    a: { en: "Yes — the S2000 Elite is CE marked and meets the EMC and Low Voltage Directives, RoHS and WEEE, FCC Part 15 Class A, and IEC/CSA/UL 61010-1 safety. Exact certificate, FCC ID and model/serial numbers are printed on the product rating label and listed in the User Manual.", zh: "是的——S2000 Elite 具备 CE 标志，符合 EMC 与低电压指令、RoHS 与 WEEE、FCC 第 15 部分 A 类，以及 IEC／CSA／UL 61010-1 安全标准。具体的证书、FCC ID 及型号／序列号印在产品铭牌上并列于用户手册中。" },
  },
  {
    q: { en: "Where can I get the OmniCure S2000 Elite quick start guide or manual?", zh: "在哪里可以获取 OmniCure S2000 Elite 快速入门指南或手册？" },
    a: { en: "Request the quick start guide and full user manual from ETIA — as an authorized OmniCure distributor we provide documentation, installation, calibration and local service in Southeast Asia.", zh: "可向 ETIA 索取快速入门指南与完整用户手册——作为 OmniCure 授权分销商，我们在东南亚提供文档、安装、校准与本地服务。" },
  },
];
