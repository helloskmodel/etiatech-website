import type { Metadata } from "next";
import type { LangText } from "@/components/LocaleContext";
import type { ProductCategorySlug } from "@/components/productCategories";
import { applicationsData } from "@/data/applicationsData";
import type { Application } from "@/data/applicationTypes";

const SITE = "https://www.etiatech.com";

// ─────────────────────────────────────────────────────────────────────────
// ETIA's five industry solutions.
//
// The counterpart to the product categories: customers who don't know which
// light source they need arrive by industry instead. Each industry page is an
// indexable hub that states the bonding problems in that sector, points at the
// product categories that solve them, and lists the application notes below.
//
// `applicationSlugs` re-groups the existing application notes under the five
// industries. It is an explicit list rather than a rule over
// `industryCategory`, because the old five categories don't map one-to-one
// onto these — see docs/PROJECT-STATUS.md.
// ─────────────────────────────────────────────────────────────────────────

export type IndustrySlug =
  | "optical-modules"
  | "semiconductor"
  | "automotive"
  | "medical-device"
  | "scientific-instruments";

export type IndustrySolution = {
  slug: IndustrySlug;
  accent: string;
  name: LangText;
  tagline: LangText;
  intro: LangText[];
  // The bonding / curing processes ETIA is asked about in this sector.
  processes: { title: LangText; body: LangText }[];
  // Product categories to steer this industry's visitors towards, in order.
  recommends: ProductCategorySlug[];
  // Application notes belonging to this industry, in display order.
  applicationSlugs: string[];
  metaTitle: string;
  metaDescription: string;
  // Set while the industry is still waiting on customer-supplied material.
  contentPending?: boolean;
};

export const industrySolutions: Record<IndustrySlug, IndustrySolution> = {
  // ────────────────────────── 1. 光模块行业 ──────────────────────────
  "optical-modules": {
    slug: "optical-modules",
    accent: "#0ea5e9",
    name: { en: "Optical Modules", zh: "光模块行业" },
    tagline: {
      en: "400G to 1.6T transceivers, co-packaged optics and fibre arrays — sub-micron bonds that must not move.",
      zh: "400G 至 1.6T 光模块、共封装光学与光纤阵列——亚微米级、不允许位移的粘接。",
    },
    intro: [
      {
        en: "In an optical transceiver, alignment is the product. A fibre array bonded a micron out of position costs insertion loss you can never recover, so the adhesive has to lock at the aligned position and stay there through reflow, thermal cycling and years in a hot switch cabinet.",
        zh: "在光模块中，对准精度就是产品本身。光纤阵列若偏离对准位置一微米，所造成的插入损耗将无法挽回。因此胶粘剂必须在对准位置瞬间锁定，并在回流焊、温度循环及交换机机柜内数年高温运行中保持稳定。",
      },
      {
        en: "That is a UV curing problem before it is an adhesive problem: cure too slowly and the alignment drifts; cure unevenly and shrinkage pulls the fibre off axis. ETIA specifies the spot head, wavelength and dose profile so the bond fixtures in the sub-second window your active alignment station allows.",
        zh: "这首先是紫外固化问题，其次才是胶水问题：固化过慢，对准会漂移；固化不均，收缩应力会将光纤拉离轴心。ETIA 为您选定点固化灯头、波长与剂量曲线，使粘接在主动对准工位所允许的亚秒级窗口内完成定位固定。",
      },
    ],
    processes: [
      {
        title: { en: "Fibre array & V-groove bonding", zh: "光纤阵列与 V 型槽粘接" },
        body: {
          en: "Sub-second tack at the aligned position, then full cure — without pulling the fibre off axis.",
          zh: "在对准位置亚秒级定位固化，再完成整体固化——且不将光纤拉离轴心。",
        },
      },
      {
        title: { en: "Lens & isolator attach", zh: "透镜与隔离器贴装" },
        body: {
          en: "Low-outgassing cures that keep the optical path clean over the module's service life.",
          zh: "低逸气固化，在模块服役期内保持光路洁净。",
        },
      },
      {
        title: { en: "Co-packaged optics assembly", zh: "共封装光学装配" },
        body: {
          en: "Localised UV energy next to temperature-sensitive ASICs and photonic dies.",
          zh: "在温度敏感的 ASIC 与光子芯片旁实现局部紫外能量投放。",
        },
      },
      {
        title: { en: "Connector termination", zh: "连接器端接" },
        body: {
          en: "Fast, repeatable ferrule bonding for high-volume patch cord and connector production.",
          zh: "快速、可重复的插芯粘接，适用于大批量跳线与连接器生产。",
        },
      },
      {
        title: { en: "Fibre draw & recoat", zh: "光纤拉丝与再涂覆" },
        body: {
          en: "High-intensity 360° curing of primary and secondary coatings at draw-tower line speeds.",
          zh: "在拉丝塔产线速度下，对一次与二次涂层进行 360° 高强度固化。",
        },
      },
    ],
    recommends: ["uv-led", "mercury-uv-lamp", "uv-measurement"],
    applicationSlugs: [
      "uv-curing-optical-transceiver-manufacturing",
      "uv-curing-co-packaged-optics-fiber-array-bonding",
      "uv-curing-photonic-integrated-circuit-packaging",
      "uv-spot-curing-fiber-optic-connector-termination",
      "uv-led-curing-optical-fiber-draw-tower-coating",
    ],
    metaTitle: "UV Curing for Optical Modules & Transceivers | 400G–1.6T | ETIA",
    metaDescription:
      "UV curing solutions for optical module manufacturing — fibre array bonding, co-packaged optics, lens attach, connector termination and fibre draw coating. Sub-micron alignment retention, specified by ETIA's engineers.",
  },

  // ────────────────────────── 2. 半导体行业 ──────────────────────────
  semiconductor: {
    slug: "semiconductor",
    accent: "#1A56DB",
    name: { en: "Semiconductor & Electronics", zh: "半导体行业" },
    tagline: {
      en: "Advanced packaging, display bonding and PCB protection — UV curing next to die that cannot take heat.",
      zh: "先进封装、显示贴合与 PCB 防护——在无法承受热应力的芯片旁完成紫外固化。",
    },
    intro: [
      {
        en: "Semiconductor and electronics assembly keeps asking the same question: how do you cure an adhesive fast, next to a die, a sensor or a flex circuit that will not tolerate the heat of a thermal cure. UV LED answers it — the energy goes into the photoinitiator, not into the substrate.",
        zh: "半导体与电子装配始终面临同一个问题：如何在芯片、传感器或柔性电路旁快速固化胶粘剂，而这些元件无法承受热固化的温度。UV LED 给出了答案——能量进入光引发剂，而非基材。",
      },
      {
        en: "From wafer-level underfill dams and advanced packaging to OCA display lamination, conformal coating and component staking, ETIA matches the source to the geometry: spot heads for point bonds, small-area arrays for sub-assemblies, and wide arrays for panel and web lines.",
        zh: "从晶圆级底部填充围坝、先进封装，到 OCA 显示贴合、三防漆涂覆与元件加固，ETIA 依据几何形状匹配光源：点固化头用于点位粘接，小面积阵列用于子组件，宽幅阵列用于面板与卷材产线。",
      },
    ],
    processes: [
      {
        title: { en: "Advanced packaging & underfill dams", zh: "先进封装与底填围坝" },
        body: {
          en: "Precise, localised cures that fix dam geometry without thermally stressing the die.",
          zh: "精确的局部固化，在不对芯片造成热应力的前提下固定围坝几何形状。",
        },
      },
      {
        title: { en: "Display OCA & edge sealing", zh: "显示 OCA 与边框封装" },
        body: {
          en: "Uniform large-area dose for optically clear adhesive lamination and OLED edge seals.",
          zh: "均匀的大面积剂量，用于光学透明胶贴合与 OLED 边缘封装。",
        },
      },
      {
        title: { en: "PCB conformal coating", zh: "PCB 三防漆涂覆" },
        body: {
          en: "Seconds-scale cure of protective coatings, in line, with no oven footprint.",
          zh: "在线秒级固化防护涂层，无需烘箱占地。",
        },
      },
      {
        title: { en: "Component staking & wire tacking", zh: "元件加固与线材点胶固定" },
        body: {
          en: "Vibration-proof anchoring of tall components and loose wires on populated boards.",
          zh: "在已贴装板卡上对高元件与散线进行防振锚固。",
        },
      },
      {
        title: { en: "Potting & encapsulation", zh: "灌封与封装" },
        body: {
          en: "UV-cure encapsulants that protect assemblies without long thermal dwell times.",
          zh: "紫外固化封装材料，无需长时间热固化即可保护组件。",
        },
      },
    ],
    recommends: ["uv-led", "uv-measurement", "mercury-uv-lamp"],
    applicationSlugs: [
      "uv-curing-advanced-semiconductor-packaging",
      "uv-led-curing-display-module-oca-bonding",
      "uv-led-curing-oled-panel-edge-sealing",
      "uv-led-curing-pcb-conformal-coating",
      "uv-led-curing-wire-tacking-component-staking",
      "uv-curing-electronics-potting-encapsulation",
      "uv-curing-micro-speaker-assembly",
    ],
    metaTitle: "UV Curing for Semiconductor & Electronics Assembly | ETIA",
    metaDescription:
      "UV curing for semiconductor and electronics manufacturing — advanced packaging, underfill dams, display OCA bonding, OLED edge sealing, PCB conformal coating, staking and potting. Low-thermal UV LED systems from ETIA.",
  },

  // ────────────────────────── 3. 汽车行业 ──────────────────────────
  automotive: {
    slug: "automotive",
    accent: "#f59e0b",
    name: { en: "Automotive", zh: "汽车" },
    tagline: {
      en: "Sensors, displays, interior trim and battery assembly — bonds that survive a decade in a car, made at line takt.",
      zh: "传感器、显示屏、内饰件与电池装配——在整车上要撑十年的粘接，且必须在节拍内完成。",
    },
    intro: [
      {
        en: "A modern car is held together by adhesive as much as by fasteners. Camera and LiDAR modules are aligned and bonded, displays are bonded rather than clipped, trim panels carry light guides and ambient lighting, and battery components are joined next to cells that must not be heated. Every one of those joints has to survive a decade of heat soak, humidity and vibration — while being made at line takt.",
        zh: "现代汽车靠胶粘剂结合的部位，已不亚于靠紧固件。摄像头与激光雷达模组需要对准后粘接，显示屏由粘接取代卡扣固定，饰板集成了导光件与氛围灯，电池部件则要在不能受热的电芯旁完成连接。而每一处接合都必须在十年的高温暴晒、湿热与振动中保持可靠——同时还要在产线节拍内完成。",
      },
      {
        en: "UV curing is what makes those two demands compatible: a bond that fixtures in seconds instead of minutes in an oven, with the energy going into the adhesive rather than into the sensor, the display or the cell next to it. ETIA specifies the source and the dose for each of those joints.",
        zh: "紫外固化正是让这两项要求得以兼容的手段：几秒内定位固化，而非在烘箱中等待数分钟；能量进入胶粘剂本身，而不是旁边的传感器、显示屏或电芯。ETIA 为每一处这样的接合确定光源与剂量。",
      },
    ],
    processes: [
      {
        title: { en: "Interior trim & light guide bonding", zh: "内饰件与导光件粘接" },
        body: {
          en: "Fast fixturing of trim panels, light guides and ambient lighting assemblies.",
          zh: "对饰板、导光件与氛围灯组件进行快速定位固化。",
        },
      },
      {
        title: { en: "Display & cluster bonding", zh: "显示屏与仪表盘贴合" },
        body: {
          en: "Optically clear bonds for instrument clusters and centre-stack displays.",
          zh: "用于仪表盘与中控显示屏的光学透明粘接。",
        },
      },
      {
        title: { en: "ADAS camera & LiDAR assembly", zh: "ADAS 摄像与激光雷达装配" },
        body: {
          en: "Alignment-critical lens and sensor bonds that hold through thermal cycling.",
          zh: "对准精度关键的镜头与传感器粘接，可承受温度循环考验。",
        },
      },
      {
        title: { en: "EV battery components", zh: "动力电池部件" },
        body: {
          en: "Cell tab, sensor and housing bonding without heating the cell.",
          zh: "电芯极耳、传感器与外壳粘接，且不对电芯加热。",
        },
      },
    ],
    recommends: ["uv-led", "mercury-uv-lamp", "infrared-heating"],
    applicationSlugs: [
      "uv-spot-curing-adas-camera-module-assembly",
      "uv-led-curing-automotive-lidar-sensor-assembly",
      "uv-curing-ev-battery-manufacturing",
    ],
    metaTitle: "UV Curing for Automotive Manufacturing | ADAS, Display, Trim & EV Battery | ETIA",
    metaDescription:
      "UV curing for automotive manufacturing — ADAS camera and LiDAR sensor assembly, display and cluster bonding, interior trim and ambient lighting, and EV battery components. Seconds-scale fixturing at line takt, from ETIA.",
  },

  // ───────────────────── 4. 三类医疗器械行业 ─────────────────────
  "medical-device": {
    slug: "medical-device",
    accent: "#41A62A",
    name: { en: "Class III Medical Devices", zh: "三类医疗器械行业" },
    tagline: {
      en: "Catheters, needles and diagnostic consumables — where the cure has to be validated, not just visible.",
      zh: "导管、针头与诊断耗材——固化必须经过验证，而不只是看起来固化了。",
    },
    intro: [
      {
        en: "Class III device manufacturing is where UV curing is held to its strictest standard. The bond is inside a product that goes into a patient, so it is not enough for it to cure — the dose has to be measured, recorded and reproducible across every unit, shift and lamp change.",
        zh: "三类医疗器械制造对紫外固化提出了最严苛的要求。粘接部位位于植入或介入患者体内的产品之中，因此仅仅固化并不足够——剂量必须可测量、可记录，并在每一件产品、每个班次、每次换灯之后保持可重复。",
      },
      {
        en: "That is why ETIA sells radiometry alongside every medical installation. Closed-loop lamp systems hold intensity constant over lamp life, traceable radiometers document it, and the resulting numbers are what stand up in an ISO 13485 audit or an IQ/OQ/PQ package.",
        zh: "这正是 ETIA 在每一套医疗设备中同时配置辐照测量方案的原因。闭环灯式系统在整个灯泡寿命内保持光强恒定，可溯源辐照计对其加以记录，而这些数据正是 ISO 13485 审核或 IQ/OQ/PQ 文件中站得住脚的依据。",
      },
    ],
    processes: [
      {
        title: { en: "Catheter & balloon bonding", zh: "导管与球囊粘接" },
        body: {
          en: "360° bond-line curing of tip, hub, marker and balloon joints.",
          zh: "对导管头端、座、显影标记与球囊接合处进行 360° 粘接面固化。",
        },
      },
      {
        title: { en: "Needle & cannula assembly", zh: "针头与套管装配" },
        body: {
          en: "High-throughput hub bonding with repeatable dose on every unit.",
          zh: "高节拍针座粘接，每一件产品的剂量均可重复。",
        },
      },
      {
        title: { en: "Diagnostic & microfluidic sealing", zh: "诊断与微流控封合" },
        body: {
          en: "Card and cartridge sealing without heat-distorting the fluidic channels.",
          zh: "对检测卡与卡盒进行封合，且不因受热使流道变形。",
        },
      },
      {
        title: { en: "Process validation & documentation", zh: "工艺验证与记录" },
        body: {
          en: "Traceable radiometry for IQ/OQ/PQ, ISO 13485 and customer audits.",
          zh: "可溯源的辐照测量，满足 IQ/OQ/PQ、ISO 13485 与客户审核要求。",
        },
      },
    ],
    recommends: ["mercury-uv-lamp", "uv-led", "uv-measurement"],
    applicationSlugs: [
      "uv-spot-curing-cardiovascular-catheter-bonding",
      "uv-led-curing-hypodermic-needle-cannula-assembly",
      "uv-curing-pcr-microfluidic-diagnostic-card-sealing",
    ],
    metaTitle: "UV Curing for Class III Medical Device Manufacturing | ETIA",
    metaDescription:
      "Validated UV curing for Class III medical devices — catheter and balloon bonding, needle and cannula assembly, microfluidic diagnostic sealing, with traceable radiometry for IQ/OQ/PQ and ISO 13485. From ETIA.",
  },

  // ───────────────────────── 5. 科学实验 ─────────────────────────
  // Focused on rheometers, where the evidence is public and checkable: TA
  // Instruments specifies the Excelitas OmniCure S2000 as the source in its
  // rheometer UV light-guide accessory, and published photo-rheology on Anton
  // Paar MCR instruments uses OmniCure S1500/S2000 through a light guide.
  //
  // Photocalorimetry (photo-DSC) is deliberately left out for now: Mettler
  // Toledo's kit uses Hamamatsu and DELO sources and TA's PCA has its own
  // lamp, so there is no OmniCure claim to make there yet. Revisit when we
  // have a real installation to point at.
  "scientific-instruments": {
    slug: "scientific-instruments",
    accent: "#7c3aed",
    name: { en: "Laboratory & Research", zh: "科学实验" },
    tagline: {
      en: "The UV module inside the rheometer — light source, light guide and traceable irradiance for photo-rheology.",
      zh: "流变仪内部的那个紫外模块——为光流变提供光源、光导与可溯源的辐照测量。",
    },
    intro: [
      {
        en: "A rotational rheometer becomes a photo-instrument the moment you put UV light onto the sample. With a UV light-curing cell, it tracks the storage and loss moduli while the resin cures, and the crossover of G′ and G″ gives the gel point directly — the exact moment the material stops being a liquid. No other method reads that transition as cleanly.",
        zh: "当紫外光照射到样品上的那一刻，旋转流变仪就变成了一台光学仪器。配上紫外固化池后，它可以在树脂固化过程中追踪储能模量与损耗模量，而 G′ 与 G″ 的交叉点直接给出胶凝点——材料不再是液体的那一刻。没有别的方法能如此干净地读出这个转变。",
      },
      {
        en: "The instrument maker builds the cell; someone has to supply the light. That is ETIA's part of the job. The OmniCure® S2000 is the mercury lamp source specified in TA Instruments' UV light-guide accessory for its rheometers, and published photo-rheology on Anton Paar MCR instruments has been run with OmniCure S1500 and S2000 sources coupled through a light guide. We supply those sources, the light guides and adapters that couple them to the measuring cell, and the spare lamps that keep an instrument running years after it was commissioned.",
        zh: "测量池由仪器厂商制造，而光源需要有人提供——这正是 ETIA 承担的部分。OmniCure® S2000 是 TA Instruments 流变仪紫外光导附件所指定的汞灯光源；在 Anton Paar MCR 仪器上发表的光流变研究，也采用 OmniCure S1500 与 S2000 通过光导耦合。我们供应这些光源、将其耦合到测量池的光导与转接件，以及让仪器在验收多年之后仍能正常运转的备用灯管。",
      },
      {
        en: "The hard part is not making light — it is knowing how much of it reaches the sample plane. The kinetics scale with irradiance: raising it from 50 to 150 mW/cm² visibly shortens the time to the G′/G″ crossover. Because irradiance falls off with distance and drifts as a lamp ages, a reading taken at the source is not the number that acted on the sample. Traceable radiometry is therefore part of the instrument, not an afterthought — which is why we sell the OmniCure R2000 and LS200 alongside the sources rather than after them.",
        zh: "真正的难点不在于产生光，而在于知道究竟有多少光抵达了样品平面。反应动力学随辐照度而变：将辐照度从 50 提高到 150 mW/cm²，G′/G″ 交叉时间会明显缩短。而辐照度随距离衰减、随灯管老化漂移，因此在光源端测得的读数并不是作用于样品的数值。可溯源的辐照测量因此是仪器的组成部分，而非事后补充——这正是我们把 OmniCure R2000 与 LS200 与光源一同供应、而不是事后追加的原因。",
      },
      {
        en: "We work with instrument builders integrating a UV module into a new platform, and with laboratories keeping an installed rheometer in service — including replacing an ageing or discontinued source with one whose spectrum and irradiance can be matched to the method already validated.",
        zh: "我们既服务于将紫外模块集成进新平台的仪器制造商，也服务于维持已装机流变仪运转的实验室——包括为已老化或停产的光源寻找替代方案，并使其光谱与辐照度能够匹配既有的、已验证的测试方法。",
      },
    ],
    processes: [
      {
        title: { en: "Photo-rheology", zh: "光流变" },
        body: {
          en: "UV curing on a rotational rheometer — follow G′ and G″ through the cure and read the gel point off their crossover.",
          zh: "在旋转流变仪上进行紫外固化——追踪 G′ 与 G″ 的变化，由其交叉点读出胶凝点。",
        },
      },
      {
        title: { en: "Coupling light into the cell", zh: "将光耦合进测量池" },
        body: {
          en: "Light guides, collimators and adapters that carry the source to the quartz plate without losing uniformity.",
          zh: "光导、准直器与转接件，将光源引至石英板，同时不损失均匀性。",
        },
      },
      {
        title: { en: "Irradiance at the sample plane", zh: "样品平面辐照度" },
        body: {
          en: "Traceable radiometry so the mW/cm² written into the method is the mW/cm² the sample actually received.",
          zh: "可溯源的辐照测量，使方法中写下的 mW/cm² 就是样品实际接收到的 mW/cm²。",
        },
      },
      {
        title: { en: "Cure kinetics against irradiance", zh: "固化动力学与辐照度的关系" },
        body: {
          en: "Running the same formulation across an intensity series to see how gel time actually responds.",
          zh: "在一组辐照度条件下测试同一配方，观察胶凝时间的实际响应。",
        },
      },
      {
        title: { en: "Source replacement and retrofit", zh: "光源替换与改造" },
        body: {
          en: "Keeping an installed instrument in service when its original lamp source is ageing or discontinued.",
          zh: "当仪器原配光源老化或停产时，让已装机的设备继续可用。",
        },
      },
      {
        title: { en: "OEM integration", zh: "OEM 集成" },
        body: {
          en: "Specifying the source, optics and control for a UV module being built into a new instrument platform.",
          zh: "为集成进新仪器平台的紫外模块，确定光源、光学与控制方案。",
        },
      },
    ],
    recommends: ["mercury-uv-lamp", "uv-measurement", "uv-led"],
    applicationSlugs: [],
    metaTitle: "UV Modules for Rheometers | Photo-Rheology Light Sources & Radiometry | ETIA",
    metaDescription:
      "UV light sources, light guides and traceable radiometry for photo-rheology on rotational rheometers — OmniCure sources, spare lamps and irradiance measurement at the sample plane. Supplied and supported by ETIA.",
  },
};

// Menu / page order — the order the customer specified.
export const INDUSTRY_ORDER: IndustrySlug[] = [
  "optical-modules",
  "semiconductor",
  "automotive",
  "medical-device",
  "scientific-instruments",
];

export const industryList: IndustrySolution[] = INDUSTRY_ORDER.map((slug) => industrySolutions[slug]);

export function industryHref(slug: IndustrySlug): string {
  return `/solutions/${slug}`;
}

export function isIndustrySlug(s: string): s is IndustrySlug {
  return s in industrySolutions;
}

const BY_SLUG = new Map<string, Application>(
  (applicationsData as Application[]).map((a) => [a.slug, a])
);

// The application notes belonging to an industry, in the configured order.
// Silently skips slugs that no longer exist so a renamed note can't break the
// build — the page just shows one card fewer.
export function industryApplications(slug: IndustrySlug): Application[] {
  return industrySolutions[slug].applicationSlugs
    .map((s) => BY_SLUG.get(s))
    .filter((a): a is Application => Boolean(a));
}

export function industryMetadata(slug: IndustrySlug): Metadata {
  const i = industrySolutions[slug];
  return {
    title: i.metaTitle,
    description: i.metaDescription,
    alternates: { canonical: `${SITE}${industryHref(slug)}` },
  };
}

// Home > Industry Solutions > {Industry}
export function industryBreadcrumbJsonLd(slug: IndustrySlug) {
  const i = industrySolutions[slug];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Industry Solutions", item: `${SITE}/applications` },
      { "@type": "ListItem", position: 3, name: i.name.en, item: `${SITE}${industryHref(slug)}` },
    ],
  };
}
