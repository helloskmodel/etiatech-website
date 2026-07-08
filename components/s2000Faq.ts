import type { LangText } from "@/components/LocaleContext";

// OmniCure S2000 Elite FAQ — shared between the client view (bilingual render)
// and the server page (English FAQPage JSON-LD). Kept in a plain (non-client)
// module so the English answers can cross the server/client boundary.
export const s2000Faqs: { q: LangText; a: LangText }[] = [
  {
    q: { en: "Where can I download the OmniCure S2000 Elite user guide?", zh: "在哪里可以下载 OmniCure S2000 Elite 用户指南?" },
    a: {
      en: "You can download the OmniCure S2000 Elite User Guide, Quick Start Guide, and Brochure directly from the User Guides & Technical Resources section on this page. The User Guide covers safety, setup, calibration, Web UI, PLC integration, StepCure, maintenance, and troubleshooting.",
      zh: "您可以直接从本页面的“用户指南与技术资源”部分下载 OmniCure S2000 Elite 用户指南、快速入门指南与产品手册。用户指南涵盖安全、设置、校准、Web UI、PLC 集成、StepCure、维护与故障排除。",
    },
  },
  {
    q: { en: "How do I install the OmniCure S2000 Elite light guide?", zh: "如何安装 OmniCure S2000 Elite 导光管?" },
    a: {
      en: "Insert the light guide into the front light guide port until it clicks into place. The light ring confirms detection. See the OmniCure S2000 Elite Quick Start Guide for step-by-step installation.",
      zh: "将导光管插入前部导光管端口,直至卡入到位。光环会确认检测状态。分步安装请参阅 OmniCure S2000 Elite 快速入门指南。",
    },
  },
  {
    q: { en: "What do the OmniCure S2000 Elite light ring colors mean?", zh: "OmniCure S2000 Elite 光环颜色代表什么?" },
    a: {
      en: "The light ring color indicates system status — including light guide detection, warm-up, Closed-Loop Feedback status, and calibration condition. Refer to the OmniCure S2000 Elite User Guide for the full color reference.",
      zh: "光环颜色指示系统状态——包括导光管检测、预热、闭环反馈状态与校准状况。完整颜色对照请参阅 OmniCure S2000 Elite 用户指南。",
    },
  },
  {
    q: { en: "Why does the OmniCure S2000 Elite lamp not strike?", zh: "为什么 OmniCure S2000 Elite 灯管无法点亮?" },
    a: {
      en: "If the lamp does not strike, check lamp installation, optical filter installation, the lamp housing panel, the power connection, and system status. If the issue continues, contact ETIA technical support.",
      zh: "若灯管无法点亮,请检查灯管安装、光学滤光片安装、灯罩面板、电源连接与系统状态。如问题持续,请联系 ETIA 技术支持。",
    },
  },
  {
    q: { en: "How do I replace the OmniCure S2000 Elite lamp?", zh: "如何更换 OmniCure S2000 Elite 灯管?" },
    a: {
      en: "The OmniCure S2000 Elite uses a user-changeable lamp module. ETIA can supply genuine replacement lamps and provide lamp replacement, installation, and calibration guidance. Contact ETIA for OmniCure S2000 Elite lamp replacement support.",
      zh: "OmniCure S2000 Elite 采用用户可更换的灯管模块。ETIA 可提供正品替换灯管,并提供灯管更换、安装与校准指导。请联系 ETIA 获取 OmniCure S2000 Elite 灯管更换支持。",
    },
  },
  {
    q: { en: "How do I install an OmniCure S2000 Elite optical filter?", zh: "如何安装 OmniCure S2000 Elite 光学滤光片?" },
    a: {
      en: "Install the optical filter cartridge into the filter slot and ensure it is properly seated and fastened. If the filter is not properly installed, the system may not recognize it and the lamp may not strike.",
      zh: "将光学滤光片卡盒装入滤光片插槽,确保正确安装并固定。若滤光片未正确安装,系统可能无法识别,灯管也可能无法点亮。",
    },
  },
  {
    q: { en: "Does the OmniCure S2000 Elite support PLC automation?", zh: "OmniCure S2000 Elite 支持 PLC 自动化吗?" },
    a: {
      en: "Yes. The OmniCure S2000 Elite supports StepCure PLC control with programmable curing sequences and PLC output channels, enabling validated, repeatable automated production processes.",
      zh: "支持。OmniCure S2000 Elite 支持 StepCure PLC 控制,提供可编程固化序列与 PLC 输出通道,可实现经验证、可重复的自动化生产工艺。",
    },
  },
  {
    q: { en: "Can ETIA provide OmniCure S2000 Elite troubleshooting support?", zh: "ETIA 能否提供 OmniCure S2000 Elite 故障排除支持?" },
    a: {
      en: "Yes. ETIA provides OmniCure S2000 Elite troubleshooting, lamp replacement, optical filter and light guide support, calibration guidance, maintenance, and repair coordination across China, Thailand, Vietnam, and Southeast Asia.",
      zh: "可以。ETIA 在中国、泰国、越南及东南亚地区提供 OmniCure S2000 Elite 故障排除、灯管更换、光学滤光片与导光管支持、校准指导、维护与维修协调。",
    },
  },
];

// English-only Q&A for FAQPage JSON-LD (must mirror the on-page text).
export const S2000_FAQ = s2000Faqs.map((f) => ({ q: f.q.en, a: f.a.en }));
