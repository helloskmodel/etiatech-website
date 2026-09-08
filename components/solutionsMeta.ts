import type { LangText } from "@/components/LocaleContext";

// ─────────────────────────────────────────────────────────────────────────
// Industry solutions — the five verticals in the "行业解决方案" menu.
//
// Buyers search by their own industry ("光模块 UV固化", "半导体封装 UV"),
// not by our brand or by our internal application taxonomy. Each solution is
// an ENTRY POINT that gathers what we already publish for that vertical:
//
//   applicationSlugs — live /applications/{slug} pages. These are the only
//                      application URLs that exist; they carry the SEO value,
//                      so they lead the page.
//   noteIndustries   — industries in applicationNotes. Those notes render as
//                      content on /application but have no individual URLs of
//                      their own (next.config redirects /application/:path*),
//                      so they are shown as text, never as links.
//   productSlugs     — the systems we actually recommend for the vertical.
//
// `id` is the public URL slug and is linked from the WeChat official account
// menu — treat these as PERMANENT.
//
// This file holds the metadata ONLY, with no data imports, because Nav renders
// on every page: pulling the application datasets in here would ship them in
// the client bundle site-wide. The lookups that touch the data live in
// solutions.ts.
// ─────────────────────────────────────────────────────────────────────────
export type SolutionId =
  | "optical-module"
  | "semiconductor"
  | "automotive"
  | "medical-device"
  | "scientific-instruments";

export type Solution = {
  id: SolutionId;
  label: LangText;
  blurb: LangText;
  intro: LangText;
  applicationSlugs: string[];
  noteIndustries: string[];
  productSlugs: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "optical-module",
    label: { en: "Optical Modules", zh: "光模块行业", vi: "Module quang", th: "อุตสาหกรรมออปติคอลโมดูล" },
    blurb: {
      en: "UV curing for optical transceiver, CPO fiber array, PIC packaging and fiber termination — sub-micron alignment held through cure.",
      zh: "面向光模块、CPO 光纤阵列、PIC 封装与光纤端接的 UV 固化 —— 固化全程保持亚微米对准精度。",
    },
    intro: {
      en: "Optical module assembly lives or dies on alignment. Every bond — fiber array to PIC, lens to TO-can, ferrule to connector — has to hold sub-micron position while the adhesive shrinks and cures. UV curing gives you an on-demand, low-heat cure you trigger the instant alignment is locked, with the dose control needed to keep shrinkage repeatable across a whole production lot.\n\nETIA supplies spot, small-area and 360° fiber systems for these lines, plus NIST-traceable radiometry so the dose you validated on day one is the dose you are still delivering a year later.",
      zh: "光模块装配的成败取决于对准精度。每一处粘接 —— 光纤阵列到 PIC、透镜到 TO-can、插芯到连接器 —— 都必须在胶水收缩固化的全过程中保持亚微米级位置。UV 固化提供按需触发、低热量的固化方式，可在对准锁定的瞬间触发，并通过剂量控制让整批产品的收缩量保持一致。\n\nETIA 为这类产线提供点光源、小面积及 360° 光纤固化系统，并配套 NIST 可溯源的辐射测量设备 —— 让您第一天验证通过的剂量，一年后依然如此。",
    },
    applicationSlugs: [
      "uv-curing-optical-transceiver-manufacturing",
      "uv-curing-co-packaged-optics-fiber-array-bonding",
      "uv-curing-photonic-integrated-circuit-packaging",
      "uv-spot-curing-fiber-optic-connector-termination",
      "uv-led-curing-optical-fiber-draw-tower-coating",
    ],
    noteIndustries: ["Photonics & Advanced Packaging", "Optical Fiber & Cable Manufacturing"],
    productSlugs: ["s2000-elite", "lx500", "ac4", "semray-pc6003", "drf-series", "r2000"],
  },
  {
    id: "semiconductor",
    label: { en: "Semiconductor", zh: "半导体行业", vi: "Bán dẫn", th: "อุตสาหกรรมเซมิคอนดักเตอร์" },
    blurb: {
      en: "UV curing for advanced packaging, underfill, glob-top, dicing tape release, conformal coating and panel sealing.",
      zh: "面向先进封装、底部填充、灌封胶、切割膜解粘、三防漆与面板封装的 UV 固化。",
    },
    intro: {
      en: "Semiconductor packaging keeps moving to chiplet, 2.5D and 3D stacks, and every added interface is another bond that has to cure fast, cold and clean. UV curing avoids the thermal budget of oven cure — critical once you are bonding onto a populated substrate — and cures in seconds rather than minutes, so the cure step stops being the bottleneck in the line.\n\nETIA supplies LED spot systems for targeted underfill and staking, small- and large-area LED systems for panel-level work and conformal coating, and the radiometry to keep the process validated.",
      zh: "半导体封装持续向 chiplet、2.5D 与 3D 堆叠演进，每增加一层界面，就多一处必须快速、低温、洁净固化的粘接。UV 固化避开了烘箱固化的热预算 —— 这在已贴装元件的基板上作业时尤为关键 —— 且固化时间以秒计而非分钟，使固化工序不再成为产线瓶颈。\n\nETIA 提供用于定点底填与打线固定的 LED 点光源系统、用于面板级作业与三防漆的小面积及大面积 LED 系统，并配套工艺验证所需的辐射测量设备。",
    },
    applicationSlugs: [
      "uv-curing-advanced-semiconductor-packaging",
      "uv-led-curing-pcb-conformal-coating",
      "uv-led-curing-display-module-oca-bonding",
      "uv-led-curing-oled-panel-edge-sealing",
      "uv-led-curing-wire-tacking-component-staking",
      "uv-curing-electronics-potting-encapsulation",
    ],
    noteIndustries: ["Electronics & PCB Assembly"],
    productSlugs: ["lx500", "ac5", "ac8", "s2000-elite", "v3-led-heads", "ls200"],
  },
  {
    id: "automotive",
    label: { en: "Automotive", zh: "汽车行业", vi: "Ô tô", th: "อุตสาหกรรมยานยนต์" },
    blurb: {
      en: "UV curing across the vehicle — EV battery assembly, ADAS sensors and camera modules, LiDAR, headlamps, connector sealing and interior trim coating.",
      zh: "覆盖整车的 UV 固化 —— 动力电池装配、ADAS 传感器与摄像头模组、LiDAR、车灯、连接器密封与内饰件涂装。",
    },
    intro: {
      en: "Automotive is where UV curing meets its hardest brief: bonds that have to survive fifteen years of vibration, heat cycling and humidity, produced at a line rate that leaves no room for an oven. Electrification and ADAS have made it harder still — you are now bonding onto lithium cells and onto aligned optical sensors, neither of which tolerates the thermal budget a thermal cure demands.\n\nUV curing answers both: an on-demand, low-heat cure you trigger the moment the part is in position, with dose logging that stands up to IATF 16949 and PPAP documentation. ETIA supplies the spot systems used for sensor potting and camera-module bonding, and the large-area systems used for trim panel and coating lines.",
      zh: "汽车行业对 UV 固化提出了最严苛的要求：粘接必须承受十五年的振动、冷热循环与湿热考验，同时产线节拍又容不下烘箱。电动化与 ADAS 让难度进一步提高 —— 如今要在锂电芯上粘接、在已对准的光学传感器上粘接，二者都无法承受热固化所需的热预算。\n\nUV 固化同时解决了这两点：按需触发、低热量，零件到位即可固化，并可产出满足 IATF 16949 与 PPAP 文档要求的剂量记录。ETIA 提供用于传感器灌封与摄像头模组粘接的点光源系统，以及用于内饰件与涂装产线的大面积系统。",
    },
    applicationSlugs: [
      "uv-curing-ev-battery-manufacturing",
      "uv-spot-curing-adas-camera-module-assembly",
      "uv-led-curing-automotive-lidar-sensor-assembly",
    ],
    noteIndustries: ["Automotive & ADAS"],
    productSlugs: ["s2000-elite", "lx500", "ac8", "ac8-hd", "fl400", "lighthammer-6"],
  },
  {
    id: "medical-device",
    label: { en: "Class III Medical Devices", zh: "三类医疗器械行业", vi: "Thiết bị y tế nhóm III", th: "เครื่องมือแพทย์ประเภทที่ 3" },
    blurb: {
      en: "Validated UV curing for catheter, needle, diagnostic and implantable device assembly — NIST-traceable dose documentation.",
      zh: "面向导管、针头、诊断与植入器械装配的可验证 UV 固化 —— 提供 NIST 可溯源剂量记录。",
    },
    intro: {
      en: "Class III device manufacturing does not just need a good bond, it needs a documented one. UV curing is the established route for catheter, needle-hub and cartridge assembly because it is solvent-free, cures in under a second, and — with closed-loop feedback and a NIST-traceable radiometer — produces a dose record you can put in front of an auditor.\n\nETIA supplies the mercury lamp and LED spot systems used across these lines, the area systems used for microfluidic cartridge sealing, and the radiometry that keeps every station on the same validated dose.",
      zh: "三类医疗器械制造需要的不只是可靠的粘接，而是有据可查的粘接。UV 固化之所以成为导管、针座与诊断卡匣装配的成熟路线，在于它无溶剂、亚秒级固化，并且配合闭环反馈与 NIST 可溯源辐射计后，能产出可直接提交审核的剂量记录。\n\nETIA 提供这些产线普遍采用的汞灯与 LED 点光源系统、用于微流控卡匣封装的面固化系统，以及让每个工位维持同一验证剂量的辐射测量设备。",
    },
    applicationSlugs: [
      "uv-spot-curing-cardiovascular-catheter-bonding",
      "uv-led-curing-hypodermic-needle-cannula-assembly",
      "uv-curing-pcr-microfluidic-diagnostic-card-sealing",
    ],
    noteIndustries: ["Medical Device Assembly"],
    productSlugs: ["s2000-elite", "lx500", "ac4", "ac5", "r2000", "s-series-light-guides"],
  },
  {
    id: "scientific-instruments",
    label: { en: "Scientific Instruments", zh: "科学仪器", vi: "Thiết bị khoa học", th: "เครื่องมือวิทยาศาสตร์" },
    blurb: {
      en: "UV curing for lens element bonding, prism and beamsplitter assembly and protective optical overlays.",
      zh: "面向镜片粘接、棱镜与分光镜装配及光学保护镀层的 UV 固化。",
    },
    intro: {
      en: "Optical assemblies in analytical and imaging instruments are built from stacks of elements whose alignment tolerance is tighter than the shrinkage of most adhesives. UV curing lets you fix the element the moment alignment is verified, with a low-heat, dose-controlled exposure that does not drive thermal drift through the stack while it cures.\n\nETIA supplies spot systems with fiber light guides for element-level bonding, plus radiometry for the dose repeatability these tolerances demand.",
      zh: "分析与成像仪器中的光学组件由多层元件堆叠而成，其对准公差往往比多数胶粘剂的收缩量还要小。UV 固化让您在对准确认的瞬间即可定位元件，低热量、剂量可控的曝光不会在固化过程中引起整个镜组的热漂移。\n\nETIA 提供配备光纤导光的点光源系统用于元件级粘接，并配套满足此类公差所需剂量重复性的辐射测量设备。",
    },
    applicationSlugs: [],
    noteIndustries: ["Optics & Imaging Systems"],
    productSlugs: ["s2000-elite", "lx500", "r2000", "ls200", "ac2"],
  },
];

const BY_ID: Record<string, Solution> = Object.fromEntries(SOLUTIONS.map((s) => [s.id, s]));

export function getSolution(id: string): Solution | undefined {
  return BY_ID[id];
}
