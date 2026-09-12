// Every orderable part number in the OmniCure UV Curing Product Catalog,
// section by section, so a customer can pick one from a dropdown and ask
// for it by number instead of describing it. Items sold only in North
// America (the CV300 conveyor) and the U.S.-only extended warranties are
// left out: ETIA cannot supply them.
//
// A family declares the dimensions its parts are picked by, in order; each
// part carries a value for every dimension of its family. The picker filters
// one dimension at a time until a single part number remains.
import type { LangText } from "./LocaleContext";

export type PartFamilyId =
  | "lamps"
  | "s2000-elite"
  | "elite-filters"
  | "radiometry-s"
  | "light-guides"
  | "optical"
  | "general"
  | "lx500"
  | "ls200"
  | "ac-heads"
  | "ac-bundles"
  | "ac-power"
  | "ac-spares";

export type PartFamily = {
  id: PartFamilyId;
  name: LangText;
  dims: { key: string; label: LangText }[];
};

export type Part = {
  pn: string;
  desc: string;
  family: PartFamilyId;
  attrs: Record<string, string>;
  // A qualifier that does not pick the part but the customer should know —
  // "10–12 week lead time", "UVC Series".
  note?: string;
  // Light guides only: catalogue-stocked or made to order.
  stocked?: boolean;
};

export const partFamilies: PartFamily[] = [
  {
    id: "lamps",
    name: {"en": "Replacement Lamps", "zh": "替换灯泡", "vi": "Đèn thay thế", "th": "หลอดเปลี่ยน"},
    dims: [
      { key: "system", label: {"en": "System", "zh": "机型", "vi": "Hệ thống", "th": "ระบบ"} },
      { key: "type", label: {"en": "Lamp type", "zh": "灯泡类型", "vi": "Loại đèn", "th": "ชนิดหลอด"} },
    ],
  },
  {
    id: "s2000-elite",
    name: {"en": "S2000 Elite Systems & Accessories", "zh": "S2000 Elite 整机与配件", "vi": "Hệ S2000 Elite & phụ kiện", "th": "ระบบ S2000 Elite & อุปกรณ์เสริม"},
    dims: [
      { key: "kind", label: {"en": "Kind", "zh": "类别", "vi": "Loại", "th": "ประเภท"} },
      { key: "item", label: {"en": "Item", "zh": "项目", "vi": "Mục", "th": "รายการ"} },
    ],
  },
  // The filter cartridges are their own family because two machines take them.
  // Excelitas ships one user guide for the S2000 Elite and the S1500 Pro
  // (035-00707 Rev.3) and Table 3-3 in it is a single list: the same seven
  // cartridges fit both. Leaving them inside the "S2000 Elite" family told an
  // S1500 Pro owner these were not his.
  {
    id: "elite-filters",
    name: {"en": "S2000 Elite / S1500 Pro Filter Cartridges", "zh": "S2000 Elite / S1500 Pro 滤片", "vi": "Hộp kính lọc S2000 Elite / S1500 Pro", "th": "คาร์ทริดจ์ฟิลเตอร์ S2000 Elite / S1500 Pro"},
    dims: [
      { key: "kind", label: {"en": "Kind", "zh": "类别", "vi": "Loại", "th": "ประเภท"} },
      { key: "item", label: {"en": "Item", "zh": "项目", "vi": "Mục", "th": "รายการ"} },
    ],
  },
  {
    id: "radiometry-s",
    name: {"en": "R2000 Radiometry (S Series)", "zh": "R2000 辐射计（S 系列）", "vi": "Đo bức xạ R2000 (S Series)", "th": "การวัดรังสี R2000 (S Series)"},
    dims: [
      { key: "kind", label: {"en": "Kind", "zh": "类别", "vi": "Loại", "th": "ประเภท"} },
      { key: "item", label: {"en": "Item", "zh": "项目", "vi": "Mục", "th": "รายการ"} },
    ],
  },
  {
    id: "light-guides",
    name: {"en": "Light Guides", "zh": "导光管", "vi": "Ống dẫn sáng", "th": "ท่อนำแสง"},
    dims: [
      { key: "type", label: {"en": "Type", "zh": "类型", "vi": "Loại", "th": "ชนิด"} },
      { key: "legs", label: {"en": "Legs", "zh": "分支数", "vi": "Số nhánh", "th": "จำนวนขา"} },
      { key: "tip", label: {"en": "Tip diameter", "zh": "管口直径", "vi": "Đường kính đầu", "th": "เส้นผ่านศูนย์กลางปลาย"} },
      { key: "length", label: {"en": "Length", "zh": "长度", "vi": "Chiều dài", "th": "ความยาว"} },
    ],
  },
  {
    id: "optical",
    name: {"en": "Optical Accessories (S Series)", "zh": "光学附件（S 系列）", "vi": "Phụ kiện quang (S Series)", "th": "อุปกรณ์เสริมออปติก (S Series)"},
    dims: [
      { key: "kind", label: {"en": "Kind", "zh": "类别", "vi": "Loại", "th": "ประเภท"} },
      { key: "item", label: {"en": "Item", "zh": "项目", "vi": "Mục", "th": "รายการ"} },
    ],
  },
  {
    id: "general",
    name: {"en": "General Accessories", "zh": "通用附件", "vi": "Phụ kiện chung", "th": "อุปกรณ์เสริมทั่วไป"},
    dims: [
      { key: "kind", label: {"en": "Kind", "zh": "类别", "vi": "Loại", "th": "ประเภท"} },
      { key: "item", label: {"en": "Item", "zh": "项目", "vi": "Mục", "th": "รายการ"} },
    ],
  },
  {
    id: "lx500",
    name: {"en": "LX500 V2 Controllers, LED Heads & Accessories", "zh": "LX500 V2 控制器、LED 灯头与配件", "vi": "Bộ điều khiển LX500 V2, đầu LED & phụ kiện", "th": "ตัวควบคุม LX500 V2 หัว LED & อุปกรณ์เสริม"},
    dims: [
      { key: "kind", label: {"en": "Kind", "zh": "类别", "vi": "Loại", "th": "ประเภท"} },
      { key: "item", label: {"en": "Item", "zh": "项目", "vi": "Mục", "th": "รายการ"} },
    ],
  },
  {
    id: "ls200",
    name: {"en": "LS200 Radiometry (LED)", "zh": "LS200 辐射计（LED）", "vi": "Đo bức xạ LS200 (LED)", "th": "การวัดรังสี LS200 (LED)"},
    dims: [
      { key: "kind", label: {"en": "Kind", "zh": "类别", "vi": "Loại", "th": "ประเภท"} },
      { key: "item", label: {"en": "Item", "zh": "项目", "vi": "Mục", "th": "รายการ"} },
    ],
  },
  {
    id: "ac-heads",
    name: {"en": "AC Series UV LED Heads", "zh": "AC 系列 UV LED 灯头", "vi": "Đầu UV LED AC Series", "th": "หัว UV LED AC Series"},
    dims: [
      { key: "series", label: {"en": "Series", "zh": "系列", "vi": "Dòng", "th": "ซีรีส์"} },
      { key: "model", label: {"en": "Model", "zh": "型号", "vi": "Model", "th": "รุ่น"} },
      { key: "wavelength", label: {"en": "Wavelength", "zh": "波长", "vi": "Bước sóng", "th": "ความยาวคลื่น"} },
    ],
  },
  {
    id: "ac-bundles",
    name: {"en": "AC Series Bundle Packages", "zh": "AC 系列套装", "vi": "Gói AC Series", "th": "ชุดแพ็กเกจ AC Series"},
    dims: [
      { key: "series", label: {"en": "Series", "zh": "系列", "vi": "Dòng", "th": "ซีรีส์"} },
      { key: "model", label: {"en": "Model", "zh": "型号", "vi": "Model", "th": "รุ่น"} },
      { key: "wavelength", label: {"en": "Wavelength", "zh": "波长", "vi": "Bước sóng", "th": "ความยาวคลื่น"} },
    ],
  },
  {
    id: "ac-power",
    name: {"en": "AC Series Power Supplies, Cables & Controllers", "zh": "AC 系列电源、线缆与控制器", "vi": "Nguồn, cáp & bộ điều khiển AC Series", "th": "แหล่งจ่ายไฟ สายเคเบิล & ตัวควบคุม AC Series"},
    dims: [
      { key: "kind", label: {"en": "Kind", "zh": "类别", "vi": "Loại", "th": "ประเภท"} },
      { key: "item", label: {"en": "Item", "zh": "项目", "vi": "Mục", "th": "รายการ"} },
    ],
  },
  {
    id: "ac-spares",
    name: {"en": "AC Series Spare Parts", "zh": "AC 系列备件", "vi": "Phụ tùng AC Series", "th": "อะไหล่ AC Series"},
    dims: [
      { key: "kind", label: {"en": "Kind", "zh": "类别", "vi": "Loại", "th": "ประเภท"} },
      { key: "item", label: {"en": "Item", "zh": "项目", "vi": "Mục", "th": "รายการ"} },
    ],
  },
];

export const parts: Part[] = [
  // ── lamps ──
  // Lamps: ETIA supplies the S2000 and S2000 Elite. Elite numbers from the
  // S2000 Elite user guide (035-00707 Rev 3, table 3-1); S2000 numbers from
  // the catalogue's S-Series compatibility table.
  { pn: "012-68000R", desc: "S2000 Elite / S1500 Pro Lamp Module – Standard", family: "lamps", attrs: {"system": "S2000 Elite / S1500 Pro", "type": "Standard"} },
  { pn: "012-69000R", desc: "S2000 Elite / S1500 Pro Lamp Module – Surface Cure", family: "lamps", attrs: {"system": "S2000 Elite / S1500 Pro", "type": "Surface Cure"} },
  { pn: "012-64000R", desc: "S2000 Replacement Lamp – Standard (200 W)", family: "lamps", attrs: {"system": "S2000", "type": "Standard"} },
  { pn: "012-65000R", desc: "S2000 Replacement Lamp – Surface Cure (200 W)", family: "lamps", attrs: {"system": "S2000", "type": "Surface Cure"} },
  // ── s2000-elite ──
  { pn: "010-00464R", desc: "S2000 Elite – System Only (lamp and bandpass filter ordered separately)", family: "s2000-elite", attrs: {"kind": "System", "item": "System only"} },
  { pn: "010-00529R", desc: "S2000 Elite – 320–500 nm (incl. 012-68000R Standard lamp + 320–500 nm filter cartridge)", family: "s2000-elite", attrs: {"kind": "System", "item": "320–500 nm bundle"} },
  { pn: "010-00530R", desc: "S2000 Elite – Surface Cure (incl. 012-69000R Surface Cure lamp + blank filter cartridge)", family: "s2000-elite", attrs: {"kind": "System", "item": "Surface Cure bundle"} },
  { pn: "010-00577R", desc: "S2000 Elite – Legacy Replacement Kit (Standard lamp, 320–500 nm filter, external PLC adapter)", family: "s2000-elite", attrs: {"kind": "System", "item": "Legacy Replacement Kit"} },
  { pn: "019-00387R", desc: "S2000 Elite Filter 400–500 nm", family: "elite-filters", attrs: {"kind": "Optical filter", "item": "400–500 nm"} },
  { pn: "019-00388R", desc: "S2000 Elite Filter 365 nm", family: "elite-filters", attrs: {"kind": "Optical filter", "item": "365 nm"} },
  { pn: "019-00389R", desc: "S2000 Elite Filter 320–390 nm", family: "elite-filters", attrs: {"kind": "Optical filter", "item": "320–390 nm"} },
  { pn: "019-00390R", desc: "S2000 Elite Filter 250–450 nm", family: "elite-filters", attrs: {"kind": "Optical filter", "item": "250–450 nm"} },
  { pn: "019-00391R", desc: "S2000 Elite Filter 320–500 nm", family: "elite-filters", attrs: {"kind": "Optical filter", "item": "320–500 nm"} },
  { pn: "019-00392R", desc: "S2000 Elite Blank Filter", family: "elite-filters", attrs: {"kind": "Optical filter", "item": "Blank"} },
  { pn: "019-00394R", desc: "S2000 Elite Custom Filter (band specified on order)", family: "elite-filters", attrs: {"kind": "Optical filter", "item": "Custom band"} },
  { pn: "019-00410R", desc: "S2000 Elite optical bandpass filter kit", family: "elite-filters", attrs: {"kind": "Optical filter", "item": "Filter kit"} },
  { pn: "019-00406R", desc: "S2000 Elite Intelli-Tap Supervisor NFC card", family: "s2000-elite", attrs: {"kind": "Accessory", "item": "Intelli-Tap Supervisor NFC card"} },
  { pn: "019-00407R", desc: "S2000 Elite Intelli-Tap Admin NFC card", family: "s2000-elite", attrs: {"kind": "Accessory", "item": "Intelli-Tap Admin NFC card"} },
  { pn: "019-00395R", desc: "S2000 to S2000 Elite External PLC adapter", family: "s2000-elite", attrs: {"kind": "Accessory", "item": "External PLC adapter"} },
  // ── radiometry-s ──
  { pn: "010-00208", desc: "OmniCure R2000 Radiometer", family: "radiometry-s", attrs: {"kind": "Radiometer", "item": "R2000 Radiometer"} },
  { pn: "019-01033", desc: "Radiometer lamp output adapter", family: "radiometry-s", attrs: {"kind": "Adapter", "item": "Lamp output adapter"} },
  { pn: "019-01041", desc: "Proximity measurement adapter", family: "radiometry-s", attrs: {"kind": "Adapter", "item": "Proximity measurement adapter"} },
  { pn: "019-01042", desc: "Light Guide Adapter, 8 mm (Green)", family: "radiometry-s", attrs: {"kind": "Adapter", "item": "Light guide adapter 8 mm"} },
  { pn: "019-01043", desc: "Light Guide Adapter, 2 mm (Gold)", family: "radiometry-s", attrs: {"kind": "Adapter", "item": "Light guide adapter 2 mm"} },
  { pn: "019-01050", desc: "Light Guide Adapter, 3 mm (Red)", family: "radiometry-s", attrs: {"kind": "Adapter", "item": "Light guide adapter 3 mm"} },
  { pn: "019-01051", desc: "Light Guide Adapter, 5 mm (Blue)", family: "radiometry-s", attrs: {"kind": "Adapter", "item": "Light guide adapter 5 mm"} },
  { pn: "010-00261R", desc: "Cure Site Radiometer, single detector system (detector 010-00255R + controller 010-00265R)", family: "radiometry-s", attrs: {"kind": "Cure Site / Cure Ring", "item": "Cure Site Radiometer"} },
  { pn: "010-00262R", desc: "Cure Ring Radiometer 10 mm, single detector system (010-00254R + 010-00256R)", family: "radiometry-s", attrs: {"kind": "Cure Site / Cure Ring", "item": "Cure Ring Radiometer 10 mm"} },
  { pn: "010-00263R", desc: "Cure Ring Radiometer 15 mm, single detector system (010-00253R + 010-00256R)", family: "radiometry-s", attrs: {"kind": "Cure Site / Cure Ring", "item": "Cure Ring Radiometer 15 mm"} },
  { pn: "010-00255R", desc: "Cure Site Detector", family: "radiometry-s", attrs: {"kind": "Detector", "item": "Cure Site Detector"} },
  { pn: "010-00254R", desc: "Cure Ring Detector, 10 mm", family: "radiometry-s", attrs: {"kind": "Detector", "item": "Cure Ring Detector 10 mm"} },
  { pn: "010-00253R", desc: "Cure Ring Detector, 15 mm", family: "radiometry-s", attrs: {"kind": "Detector", "item": "Cure Ring Detector 15 mm"} },
  { pn: "010-00256R", desc: "Cure Site Detector Controller", family: "radiometry-s", attrs: {"kind": "Detector", "item": "Detector Controller"} },
  // ── light-guides ──
  // These are the OmniCure catalogue numbers, kept because customers order by
  // them and ETIA stocks them. The light guides ETIA sells as its own product
  // line are the SR series in data/skuMaster.json; the product pages for light
  // guides in productCatalog.ts are ETIA-branded for that reason.
  { pn: "805-00002", desc: "Liquid Light Guide (5 mm x 1000 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "1000 mm"}, stocked: true },
  { pn: "805-00004", desc: "Liquid Light Guide (3 mm x 1000 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "3 mm", "length": "1000 mm"}, stocked: true },
  { pn: "805-00007", desc: "Liquid Light Guide (5 mm x 1500 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "1500 mm"}, stocked: true },
  { pn: "805-00008", desc: "Liquid Light Guide (5 mm x 3000 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "3000 mm"}, stocked: true },
  { pn: "805-00009", desc: "Liquid Light Guide (8 mm x 1000 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "8 mm", "length": "1000 mm"}, stocked: true },
  { pn: "805-00010", desc: "Liquid Light Guide (8 mm x 1500 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "8 mm", "length": "1500 mm"}, stocked: true },
  { pn: "805-00011", desc: "Liquid Light Guide (2 x 3 mm x 1000 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "1000 mm"}, stocked: true },
  { pn: "805-00012", desc: "Liquid Light Guide (2 x 3 mm x 1500 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "1500 mm"}, stocked: true },
  { pn: "805-00023", desc: "Liquid Light Guide (8 mm x 2000 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "8 mm", "length": "2000 mm"}, stocked: true },
  { pn: "805-00005", desc: "Liquid Light Guide (3 mm x 750 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "3 mm", "length": "750 mm"}, stocked: true },
  { pn: "805-00006", desc: "Liquid Light Guide (5 mm x 750 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "750 mm"}, stocked: true },
  { pn: "805-00036", desc: "Liquid Light Guide (2 x 3 mm x 2000 mm)", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "2000 mm"}, stocked: true },
  { pn: "805-00026", desc: "Liquid Light Guide (5 mm x 1000 mm), UVC Series", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "1000 mm"}, note: "UVC Series", stocked: true },
  { pn: "805-00041", desc: "Liquid Light Guide (8 mm x 1000 mm), UVC Series", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "8 mm", "length": "1000 mm"}, note: "UVC Series", stocked: true },
  { pn: "806-00005", desc: "High-Power Fiber Light Guide (2 x 3 mm x 1000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "1000 mm"}, stocked: true },
  { pn: "806-00006", desc: "High-Power Fiber Light Guide (4 x 3 mm x 1000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "4-leg", "tip": "3 mm", "length": "1000 mm"}, stocked: true },
  { pn: "806-00007", desc: "High-Power Fiber Light Guide (3 x 3 mm x 1000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "3-leg", "tip": "3 mm", "length": "1000 mm"}, stocked: true },
  { pn: "806-00010", desc: "High-Power Fiber Light Guide (2 x 3 mm x 1500 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "1500 mm"}, stocked: true },
  { pn: "806-00011", desc: "High-Power Fiber Light Guide (5 mm x 1000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "Single", "tip": "5 mm", "length": "1000 mm"}, stocked: true },
  { pn: "806-00012", desc: "High-Power Fiber Light Guide (3 mm x 1000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "Single", "tip": "3 mm", "length": "1000 mm"}, stocked: true },
  { pn: "806-00013", desc: "High-Power Fiber Light Guide (5 mm x 1500 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "Single", "tip": "5 mm", "length": "1500 mm"}, stocked: true },
  { pn: "806-00014", desc: "High-Power Fiber Light Guide (3 mm x 1500 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "Single", "tip": "3 mm", "length": "1500 mm"}, stocked: true },
  { pn: "806-00018", desc: "High-Power Fiber Light Guide (2 x 5 mm x 1000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "2-leg", "tip": "5 mm", "length": "1000 mm"}, stocked: true },
  { pn: "806-00019", desc: "High-Power Fiber Light Guide (2 x 3 mm x 2000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "2000 mm"}, stocked: true },
  { pn: "806-00015", desc: "High-Power Fiber Light Guide (8 mm x 1000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "Single", "tip": "8 mm", "length": "1000 mm"}, stocked: true },
  { pn: "806-00029", desc: "High-Power Fiber Light Guide (3 x 3 mm x 1500 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "3-leg", "tip": "3 mm", "length": "1500 mm"}, stocked: true },
  { pn: "806-00030", desc: "High-Power Fiber Light Guide (3 x 3 mm x 2000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "3-leg", "tip": "3 mm", "length": "2000 mm"}, stocked: true },
  { pn: "806-00033", desc: "High-Power Fiber Light Guide (4 x 3 mm x 1500 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "4-leg", "tip": "3 mm", "length": "1500 mm"}, stocked: true },
  { pn: "805-00001", desc: "Liquid Light Guide (3 x 3 mm x 1000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "3-leg", "tip": "3 mm", "length": "1000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00016", desc: "Liquid Light Guide (2 x 3 mm x 3000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "3000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00017", desc: "Liquid Light Guide (3 mm x 3000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "3 mm", "length": "3000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00019", desc: "Liquid Light Guide (2 x 3 mm x 750 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "750 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00021", desc: "Liquid Light Guide (5 mm x 2000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "2000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00022", desc: "Liquid Light Guide (3 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "3 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00027", desc: "ER Liquid Light Guide (2 x 3 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00028", desc: "ER Liquid Light Guide (5 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00030", desc: "ER Liquid Light Guide (2 x 3 mm x 1000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "1000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00031", desc: "ER Liquid Light Guide (3 mm x 1000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "Single", "tip": "3 mm", "length": "1000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00032", desc: "ER Liquid Light Guide (3 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "Single", "tip": "3 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00042", desc: "ER Liquid Light Guide (8 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "Single", "tip": "8 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00043", desc: "ER Liquid Light Guide (2 x 3 mm x 2000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "2000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00044", desc: "ER Liquid Light Guide (5 mm x 2000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "2000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00045", desc: "Liquid Light Guide (5 mm x 5000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "5000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00046", desc: "Liquid Light Guide (5 mm x 6000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "6000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00047", desc: "Liquid Light Guide (8 mm x 3000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "Single", "tip": "8 mm", "length": "3000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00049", desc: "Liquid Light Guide (2 x 3 mm x 2500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "2500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00050", desc: "Liquid Light Guide (2 x 3 mm x 5000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "5000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00051", desc: "Liquid Light Guide (3 x 3 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "3-leg", "tip": "3 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00052", desc: "ER Liquid Light Guide (5 mm x 3000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "Single", "tip": "5 mm", "length": "3000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00053", desc: "ER Liquid Light Guide (8 mm x 2000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "Single", "tip": "8 mm", "length": "2000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00054", desc: "ER Liquid Light Guide (3 x 3 mm x 1000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "ER Liquid Light Guide", "legs": "3-leg", "tip": "3 mm", "length": "1000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "805-00048", desc: "Liquid Light Guide (2 x 3 mm x 1500 mm), 2\" LG tip · 10–12 week lead time", family: "light-guides", attrs: {"type": "Liquid Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "1500 mm"}, note: "2\" LG tip · 10–12 week lead time", stocked: false },
  { pn: "806-00016", desc: "High-Power Fiber Light Guide (5 x 2 mm x 1000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "5-leg", "tip": "2 mm", "length": "1000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00017", desc: "High-Power Fiber Light Guide (6 x 2 mm x 1000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "6-leg", "tip": "2 mm", "length": "1000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00024", desc: "High-Power Fiber Light Guide (5 mm x 750 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "Single", "tip": "5 mm", "length": "750 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00025", desc: "High-Power Fiber Light Guide (8 mm x 2000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "Single", "tip": "8 mm", "length": "2000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00026", desc: "High-Power Fiber Light Guide (2 x 3 mm x 3000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "2-leg", "tip": "3 mm", "length": "3000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00027", desc: "High-Power Fiber Light Guide (2 x 5 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "2-leg", "tip": "5 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00028", desc: "High-Power Fiber Light Guide (2 x 5 mm x 2000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "2-leg", "tip": "5 mm", "length": "2000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00031", desc: "High-Power Fiber Light Guide (3 x 3 mm x 3000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "3-leg", "tip": "3 mm", "length": "3000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00032", desc: "High-Power Fiber Light Guide (4 x 2 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "4-leg", "tip": "2 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00034", desc: "High-Power Fiber Light Guide (4 x 3 mm x 2000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "4-leg", "tip": "3 mm", "length": "2000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00035", desc: "High-Power Fiber Light Guide (5 x 2 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "5-leg", "tip": "2 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00036", desc: "High-Power Fiber Light Guide (6 x 2 mm x 1500 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "6-leg", "tip": "2 mm", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00037", desc: "High-Power Fiber Light Guide (3 mm x 2000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "Single", "tip": "3 mm", "length": "2000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00008", desc: "High-Power Fiber Light Guide (4 x 3 mm x 1000 mm), 10–12 week lead time", family: "light-guides", attrs: {"type": "High-Power Fiber Light Guide", "legs": "4-leg", "tip": "3 mm", "length": "1000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00020", desc: "High-Power Fiber Light Line, Single (65 mm x 1500 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Line", "legs": "Single", "tip": "65 mm line", "length": "1500 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00021", desc: "High-Power Fiber Light Line, 2-leg (65 mm x 2000 mm)", family: "light-guides", attrs: {"type": "High-Power Fiber Light Line", "legs": "2-leg", "tip": "65 mm line", "length": "2000 mm"}, note: "10–12 week lead time", stocked: false },
  { pn: "806-00022", desc: "High-Power Fiber Light Line, 2-leg (65 mm x 2000 mm), incl. 2 focusing lens covers", family: "light-guides", attrs: {"type": "High-Power Fiber Light Line", "legs": "2-leg", "tip": "65 mm line", "length": "2000 mm"}, note: "incl. 2 focusing lens covers · 10–12 week lead time", stocked: false },
  { pn: "806-00023", desc: "High-Power Fiber Light Line, Single (65 mm x 1500 mm), incl. 1 focusing lens cover", family: "light-guides", attrs: {"type": "High-Power Fiber Light Line", "legs": "Single", "tip": "65 mm line", "length": "1500 mm"}, note: "incl. 1 focusing lens cover · 10–12 week lead time", stocked: false },
  { pn: "806-00043", desc: "High-Power Fiber Light Line, Single (65 mm x 1500 mm), dual row fibers", family: "light-guides", attrs: {"type": "High-Power Fiber Light Line", "legs": "Single", "tip": "65 mm line", "length": "1500 mm"}, note: "dual row fibers · 10–12 week lead time", stocked: false },
  // ── optical ──
  { pn: "809-00083", desc: "Quartz Rod Lens 3 mm (replacement for 810-00044)", family: "optical", attrs: {"kind": "Lens / light line", "item": "Quartz rod lens 3 mm"} },
  { pn: "810-00001", desc: "Lightguide angle adapter, 90° for 3 mm LG", family: "optical", attrs: {"kind": "Light guide angle adapter", "item": "90° for 3 mm LG"} },
  { pn: "810-00002", desc: "Lightguide angle adapter, 90° for 5 mm LG", family: "optical", attrs: {"kind": "Light guide angle adapter", "item": "90° for 5 mm LG"} },
  { pn: "810-00003", desc: "Lightguide angle adapter, 90° for 8 mm LG", family: "optical", attrs: {"kind": "Light guide angle adapter", "item": "90° for 8 mm LG"} },
  { pn: "810-00011", desc: "Lightguide angle adapter, 90° for 5 mm LG w/ single lens", family: "optical", attrs: {"kind": "Light guide angle adapter", "item": "90° for 5 mm LG, single lens"} },
  { pn: "810-00012", desc: "Lightguide angle adapter, 90° for 5 mm LG w/ dual lens", family: "optical", attrs: {"kind": "Light guide angle adapter", "item": "90° for 5 mm LG, dual lens"} },
  { pn: "810-00013", desc: "Light line assembly (50 mm × 0.1 mm)", family: "optical", attrs: {"kind": "Lens / light line", "item": "Light line assembly 50 × 0.1 mm"} },
  { pn: "810-00014", desc: "Large area collimating adapter, dual 1\" lenses for 5 mm LG", family: "optical", attrs: {"kind": "Collimating adapter", "item": "Large area, dual 1\" lenses, 5 mm LG"} },
  { pn: "810-00016", desc: "Collimating adapter for 3 mm LG (single lens)", family: "optical", attrs: {"kind": "Collimating adapter", "item": "3 mm LG, single lens"} },
  { pn: "810-00017", desc: "Collimating adapter for 5 mm LG (single lens)", family: "optical", attrs: {"kind": "Collimating adapter", "item": "5 mm LG, single lens"} },
  { pn: "810-00041", desc: "3 mm Adjustable Collimating Adapter (holder, lens, 2 thumb screws)", family: "optical", attrs: {"kind": "Collimating adapter", "item": "Adjustable, 3 mm LG"} },
  { pn: "810-00042", desc: "5 mm Adjustable Collimating Adapter (holder, lens, 2 thumb screws)", family: "optical", attrs: {"kind": "Collimating adapter", "item": "Adjustable, 5 mm LG"} },
  { pn: "810-00043", desc: "8 mm Adjustable Collimating Adapter (holder, lens, 2 thumb screws)", family: "optical", attrs: {"kind": "Collimating adapter", "item": "Adjustable, 8 mm LG"} },
  { pn: "810-00044", desc: "Focusing Lens Cover for 65 mm High-Power Fiber Light Line", family: "optical", attrs: {"kind": "Lens / light line", "item": "Focusing lens cover, 65 mm light line"} },
  { pn: "810-00048", desc: "Cure ring, slotted, 63.5 mm OD, 10 mm ID for 5 mm LG", family: "optical", attrs: {"kind": "Cure ring", "item": "Slotted, 10 mm ID, 5 mm LG"} },
  { pn: "810-00049", desc: "Cure ring, no-slot, 63.5 mm OD, 10 mm ID for 8 mm LG", family: "optical", attrs: {"kind": "Cure ring", "item": "No-slot, 10 mm ID, 8 mm LG"} },
  { pn: "810-00050", desc: "Cure ring, no-slot, 63.5 mm OD, 15 mm ID for 5 mm LG", family: "optical", attrs: {"kind": "Cure ring", "item": "No-slot, 15 mm ID, 5 mm LG"} },
  // The five internal filter cartridges for the S2000 / S2000-XLA and S1500,
  // in the order they are printed on the "Filter Option Installed" label on the
  // back of the machine — a technician reads the ticked box and finds the same
  // row here. Part numbers are off that label (919-00022 Rev.1).
  { pn: "019-01046R", desc: "S2000 / S1500 Filter 250–450 nm", family: "optical", attrs: {"kind": "Internal filter", "item": "250–450 nm"} },
  { pn: "019-01048R", desc: "S2000 / S1500 Filter 320–390 nm", family: "optical", attrs: {"kind": "Internal filter", "item": "320–390 nm"} },
  { pn: "019-01049R", desc: "S2000 / S1500 Filter 320–500 nm", family: "optical", attrs: {"kind": "Internal filter", "item": "320–500 nm"} },
  { pn: "019-01047R", desc: "S2000 / S1500 Filter 400–500 nm", family: "optical", attrs: {"kind": "Internal filter", "item": "400–500 nm"} },
  { pn: "019-01045R", desc: "S2000 / S1500 Filter 365 nm", family: "optical", attrs: {"kind": "Internal filter", "item": "365 nm"} },
  { pn: "019-00108", desc: "External Filter Adapter Kit", family: "optical", attrs: {"kind": "External filter", "item": "Adapter kit"} },
  { pn: "019-01022", desc: "320–480 nm External Filter", family: "optical", attrs: {"kind": "External filter", "item": "320–480 nm"} },
  { pn: "019-01023", desc: "320–390 nm External Filter", family: "optical", attrs: {"kind": "External filter", "item": "320–390 nm"} },
  { pn: "019-01024", desc: "365 nm External Filter", family: "optical", attrs: {"kind": "External filter", "item": "365 nm"} },
  { pn: "019-01025", desc: "Blank External Filter", family: "optical", attrs: {"kind": "External filter", "item": "Blank"} },
  { pn: "019-01026", desc: "400–500 nm External Filter", family: "optical", attrs: {"kind": "External filter", "item": "400–500 nm"} },
  // ── general ──
  { pn: "014-00070R", desc: "Foot Switch (audio jack)", family: "general", attrs: {"kind": "Misc", "item": "Foot switch"} },
  { pn: "018-00199R", desc: "Power cord, European, shielded", family: "general", attrs: {"kind": "Power cord / cable", "item": "Power cord, EU"} },
  { pn: "018-00200R", desc: "Power cord, North American, shielded", family: "general", attrs: {"kind": "Power cord / cable", "item": "Power cord, NA"} },
  { pn: "018-00203R", desc: "Power cord, UK, shielded", family: "general", attrs: {"kind": "Power cord / cable", "item": "Power cord, UK"} },
  { pn: "018-00577R", desc: "Category 5e Shielded Network Cable (2 m)", family: "general", attrs: {"kind": "Power cord / cable", "item": "Cat5e network cable 2 m"} },
  { pn: "018-00579R", desc: "Shielded Y-Splitter Power Cord", family: "general", attrs: {"kind": "Power cord / cable", "item": "Y-splitter power cord"} },
  { pn: "019-00052", desc: "Light guide cleaning kit (100 lens tissues, 20 pre-saturated tissues, 20 foam swabs, 250 mL wash bottle)", family: "general", attrs: {"kind": "Light guide care", "item": "Cleaning kit"} },
  { pn: "019-00090R", desc: "Protective End Cap, 3 mm (Red)", family: "general", attrs: {"kind": "Light guide care", "item": "End cap 3 mm"} },
  { pn: "019-00091R", desc: "Protective End Cap, 5 mm (Blue)", family: "general", attrs: {"kind": "Light guide care", "item": "End cap 5 mm"} },
  { pn: "019-00092R", desc: "Protective End Cap, 8 mm (Green)", family: "general", attrs: {"kind": "Light guide care", "item": "End cap 8 mm"} },
  { pn: "019-01010", desc: "Light guide locking kit (for dual liquid light guides)", family: "general", attrs: {"kind": "Light guide care", "item": "Locking kit"} },
  { pn: "854-00001R", desc: "Safety glasses, UV protection grey, CE rated", family: "general", attrs: {"kind": "Misc", "item": "UV safety glasses"} },
  // ── lx500 ──
  { pn: "010-00520R", desc: "LX500-2 V2 Controller, 2-channel", family: "lx500", attrs: {"kind": "Controller", "item": "LX500-2 (2-channel)"} },
  { pn: "010-00521R", desc: "LX500-4 V2 Controller, 4-channel", family: "lx500", attrs: {"kind": "Controller", "item": "LX500-4 (4-channel)"} },
  { pn: "019-00398R", desc: "LX500 365 nm × 55 mm UV LED head, HDMI, V3 (incl. clamp 019-00087R)", family: "lx500", attrs: {"kind": "V3 LED head", "item": "365 nm × 55 mm, with clamp"} },
  { pn: "019-00399R", desc: "LX500 365 nm × 125 mm UV LED head, HDMI, V3 (clamp not included)", family: "lx500", attrs: {"kind": "V3 LED head", "item": "365 nm × 125 mm, no clamp"} },
  { pn: "019-00400R", desc: "LX500 385 nm × 125 mm UV LED head, HDMI, V3 (incl. clamp 019-00087R)", family: "lx500", attrs: {"kind": "V3 LED head", "item": "385 nm × 125 mm, with clamp"} },
  { pn: "019-00401R", desc: "LX500 385 nm × 125 mm UV LED head, HDMI, V3 (clamp not included)", family: "lx500", attrs: {"kind": "V3 LED head", "item": "385 nm × 125 mm, no clamp"} },
  { pn: "019-00402R", desc: "LX500 395 nm × 55 mm UV LED head, HDMI, V3 (incl. clamp 019-00087R)", family: "lx500", attrs: {"kind": "V3 LED head", "item": "395 nm × 55 mm, with clamp"} },
  { pn: "019-00403R", desc: "LX500 395 nm × 125 mm UV LED head, HDMI, V3 (clamp not included)", family: "lx500", attrs: {"kind": "V3 LED head", "item": "395 nm × 125 mm, no clamp"} },
  { pn: "019-00404R", desc: "LX500 405 nm × 55 mm UV LED head, HDMI, V3 (incl. clamp 019-00087R)", family: "lx500", attrs: {"kind": "V3 LED head", "item": "405 nm × 55 mm, with clamp"} },
  { pn: "019-00405R", desc: "LX500 405 nm × 125 mm UV LED head, HDMI, V3 (clamp not included)", family: "lx500", attrs: {"kind": "V3 LED head", "item": "405 nm × 125 mm, no clamp"} },
  { pn: "810-00053R", desc: "3 mm Focusing Lens for LED heads", family: "lx500", attrs: {"kind": "Focusing lens", "item": "3 mm"} },
  { pn: "810-00054R", desc: "6 mm Focusing Lens for LED heads", family: "lx500", attrs: {"kind": "Focusing lens", "item": "6 mm"} },
  { pn: "810-00060R", desc: "8 mm Focusing Lens for LED heads", family: "lx500", attrs: {"kind": "Focusing lens", "item": "8 mm"} },
  { pn: "810-00061R", desc: "10 mm Focusing Lens for LED heads", family: "lx500", attrs: {"kind": "Focusing lens", "item": "10 mm"} },
  { pn: "810-00066R", desc: "12 mm Focusing Lens for LED heads", family: "lx500", attrs: {"kind": "Focusing lens", "item": "12 mm"} },
  { pn: "810-00078R", desc: "5 mm Cylindrical Lens for LED heads", family: "lx500", attrs: {"kind": "Focusing lens", "item": "5 mm cylindrical"} },
  { pn: "018-00642R", desc: "LX500 HDMI LED head extension cable, 1 m", family: "lx500", attrs: {"kind": "Extension cable", "item": "1 m"} },
  { pn: "018-00643R", desc: "LX500 HDMI LED head extension cable, 3 m", family: "lx500", attrs: {"kind": "Extension cable", "item": "3 m"} },
  { pn: "018-00644R", desc: "LX500 HDMI LED head extension cable, 5 m", family: "lx500", attrs: {"kind": "Extension cable", "item": "5 m"} },
  { pn: "018-00645R", desc: "LX500 HDMI LED head extension cable, 10 m", family: "lx500", attrs: {"kind": "Extension cable", "item": "10 m"} },
  { pn: "018-00651R", desc: "Cable assembly – LX400 UV LED head to HDMI LX500 controller adapter", family: "lx500", attrs: {"kind": "Extension cable", "item": "LX400 head → LX500 adapter"} },
  { pn: "810-00083R", desc: "90° Adapter, 6 mm spot, for LED heads", family: "lx500", attrs: {"kind": "90° adapter", "item": "6 mm spot"} },
  { pn: "810-00084R", desc: "90° Adapter, 8 mm spot, for LED heads", family: "lx500", attrs: {"kind": "90° adapter", "item": "8 mm spot"} },
  { pn: "810-00085R", desc: "90° Adapter, 10 mm spot, for LED heads", family: "lx500", attrs: {"kind": "90° adapter", "item": "10 mm spot"} },
  { pn: "019-00087R", desc: "Mounting clamp / heat sink (includes Allen key)", family: "lx500", attrs: {"kind": "Mounting clamp", "item": "Mounting clamp / heat sink"} },
  // ── ls200 ──
  { pn: "019-00412R", desc: "LS200 Calibration Kit – Irradiance (LS200 sensor + positioning device for V3 heads)", family: "ls200", attrs: {"kind": "Calibration kit", "item": "Irradiance kit"} },
  { pn: "019-00414R", desc: "LS200 Calibration Kit – Power (LS200P sensor + positioning device for V3 heads)", family: "ls200", attrs: {"kind": "Calibration kit", "item": "Power kit"} },
  { pn: "019-00413R", desc: "LS200 LED Light Sensor only – Irradiance", family: "ls200", attrs: {"kind": "Sensor only", "item": "LS200 irradiance sensor"} },
  { pn: "019-00415R", desc: "LS200 LED Light Sensor only – Power", family: "ls200", attrs: {"kind": "Sensor only", "item": "LS200P power sensor"} },
  { pn: "019-00409R", desc: "Beam Positioning Kit (BPK) for V3 UV LED heads", family: "ls200", attrs: {"kind": "Beam positioning kit", "item": "BPK for V3 heads"} },
  { pn: "019-00131R", desc: "Beam Positioning Kit (BPK) for MAX UV LED heads", family: "ls200", attrs: {"kind": "Beam positioning kit", "item": "BPK for MAX heads"} },
  { pn: "019-00427R", desc: "LS200 Light Meter System (LM2011 light meter + LS200 sensor)", family: "ls200", attrs: {"kind": "Light meter system", "item": "LM2011 + LS200"} },
  // ── ac-heads ──
  { pn: "019-00251R-04", desc: "AC275-365 UV LED head: 3 W/cm², 10×75 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC2", "model": "AC275", "wavelength": "365 nm"} },
  { pn: "019-00270R-04", desc: "AC275F-365 UV LED head: 2 W/cm², 10×75 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC2", "model": "AC275F", "wavelength": "365 nm"} },
  { pn: "019-00271R-04", desc: "AC2110-365 UV LED head: 3 W/cm², 10×114 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC2", "model": "AC2110", "wavelength": "365 nm"} },
  { pn: "019-00272R-04", desc: "AC2110F-365 UV LED head: 2 W/cm², 10×114 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC2", "model": "AC2110F", "wavelength": "365 nm"} },
  { pn: "019-00236R-04", desc: "AC275-395 UV LED head: 4 W/cm², 10×75 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC2", "model": "AC275", "wavelength": "395 nm"} },
  { pn: "019-00263R-04", desc: "AC275F-395 UV LED head: 4 W/cm², 10×75 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC2", "model": "AC275F", "wavelength": "395 nm"} },
  { pn: "019-00239R-04", desc: "AC2110-395 UV LED head: 4 W/cm², 10×114 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC2", "model": "AC2110", "wavelength": "395 nm"} },
  { pn: "019-00254R-04", desc: "AC2110F-395 UV LED head: 4 W/cm², 10×114 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC2", "model": "AC2110F", "wavelength": "395 nm"} },
  { pn: "019-00194R-04", desc: "AC450-365 UV LED head: 8 W/cm², 25×50 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC4", "model": "AC450", "wavelength": "365 nm"} },
  { pn: "019-00230R-04", desc: "AC450P-365 UV LED head: 8 W/cm², 25×50 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC4", "model": "AC450P", "wavelength": "365 nm"} },
  { pn: "019-00193R-04", desc: "AC475-365 UV LED head: 8 W/cm², 25×75 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC4", "model": "AC475", "wavelength": "365 nm"} },
  { pn: "019-00231R-04", desc: "AC475P-365 UV LED head: 8 W/cm², 25×75 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC4", "model": "AC475P", "wavelength": "365 nm"} },
  { pn: "019-00191R-04", desc: "AC450-395 UV LED head: 8 W/cm², 25×50 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC4", "model": "AC450", "wavelength": "395 nm"} },
  { pn: "019-00228R-04", desc: "AC450P-395 UV LED head: 8 W/cm², 25×50 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC4", "model": "AC450P", "wavelength": "395 nm"} },
  { pn: "019-00192R-04", desc: "AC475-395 UV LED head: 8 W/cm², 25×75 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC4", "model": "AC475", "wavelength": "395 nm"} },
  { pn: "019-00229R-04", desc: "AC475P-395 UV LED head: 8 W/cm², 25×75 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC4", "model": "AC475P", "wavelength": "395 nm"} },
  { pn: "019-00279R-04", desc: "AC550-395 UV LED head: 14 W/cm², 25×50 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC5", "model": "AC550", "wavelength": "395 nm"} },
  { pn: "019-00281R-04", desc: "AC550P-395 UV LED head: 14 W/cm², 25×50 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC5", "model": "AC550P", "wavelength": "395 nm"} },
  { pn: "019-00280R-04", desc: "AC575-395 UV LED head: 14 W/cm², 25×75 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC5", "model": "AC575", "wavelength": "395 nm"} },
  { pn: "019-00282R-04", desc: "AC575P-395 UV LED head: 14 W/cm², 25×75 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC5", "model": "AC575P", "wavelength": "395 nm"} },
  { pn: "019-00421R-04-04", desc: "AC575-405 UV LED head: 15 W/cm², 25×75 mm @ 405 nm", family: "ac-heads", attrs: {"series": "AC5", "model": "AC575", "wavelength": "405 nm"} },
  { pn: "019-00197R-04", desc: "AC7150-365 UV LED head: 3 W/cm², 15×150 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC7", "model": "AC7150", "wavelength": "365 nm"} },
  { pn: "019-00187R-04", desc: "AC7300-365 UV LED head: 3 W/cm², 15×300 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC7", "model": "AC7300", "wavelength": "365 nm"} },
  { pn: "019-00198R-04", desc: "AC7150-395 UV LED head: 5 W/cm², 15×150 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC7", "model": "AC7150", "wavelength": "395 nm"} },
  { pn: "019-00196R-04", desc: "AC7300-395 UV LED head: 5 W/cm², 15×300 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC7", "model": "AC7300", "wavelength": "395 nm"} },
  { pn: "019-00218R-04", desc: "AC8150-365 UV LED head: 8 W/cm², 25×150 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8150", "wavelength": "365 nm"} },
  { pn: "019-00276R-04", desc: "AC8150P-365 UV LED head: 8 W/cm², 25×150 mm @ 365 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8150P", "wavelength": "365 nm"} },
  { pn: "019-00219R-04", desc: "AC8225-365 UV LED head: 8 W/cm², 25×225 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8225", "wavelength": "365 nm"} },
  { pn: "019-00277R-04", desc: "AC8225P-365 UV LED head: 8 W/cm², 25×225 mm @ 365 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8225P", "wavelength": "365 nm"} },
  { pn: "019-00220R-04", desc: "AC8300-365 UV LED head: 8 W/cm², 25×300 mm @ 365 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8300", "wavelength": "365 nm"} },
  { pn: "019-00278R-04", desc: "AC8300P-365 UV LED head: 8 W/cm², 25×300 mm @ 365 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8300P", "wavelength": "365 nm"} },
  { pn: "019-00261R-04", desc: "AC8150-385 UV LED head: 8 W/cm², 25×150 mm @ 385 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8150", "wavelength": "385 nm"} },
  { pn: "019-00266R-04", desc: "AC8150P-385 UV LED head: 8 W/cm², 25×150 mm @ 385 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8150P", "wavelength": "385 nm"} },
  { pn: "019-00260R-04", desc: "AC8225-385 UV LED head: 8 W/cm², 25×225 mm @ 385 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8225", "wavelength": "385 nm"} },
  { pn: "019-00267R-04", desc: "AC8225P-385 UV LED head: 8 W/cm², 25×225 mm @ 385 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8225P", "wavelength": "385 nm"} },
  { pn: "019-00262R-04", desc: "AC8300-385 UV LED head: 8 W/cm², 25×300 mm @ 385 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8300", "wavelength": "385 nm"} },
  { pn: "019-00268R-04", desc: "AC8300P-385 UV LED head: 8 W/cm², 25×300 mm @ 385 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8300P", "wavelength": "385 nm"} },
  { pn: "019-00217R", desc: "AC8150-395 UV LED head: 8 W/cm², 25×150 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8150", "wavelength": "395 nm"} },
  { pn: "019-00221R", desc: "AC8150P-395 UV LED head: 8 W/cm², 25×150 mm @ 395 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8150P", "wavelength": "395 nm"} },
  { pn: "019-00212R", desc: "AC8225-395 UV LED head: 8 W/cm², 25×225 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8225", "wavelength": "395 nm"} },
  { pn: "019-00222R", desc: "AC8225P-395 UV LED head: 8 W/cm², 25×225 mm @ 395 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8225P", "wavelength": "395 nm"} },
  { pn: "019-00216R", desc: "AC8300-395 UV LED head: 8 W/cm², 25×300 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8300", "wavelength": "395 nm"} },
  { pn: "019-00244R", desc: "AC8300P-395 UV LED head: 8 W/cm², 25×300 mm @ 395 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8300P", "wavelength": "395 nm"} },
  { pn: "019-00273R", desc: "AC8150-405 UV LED head: 8 W/cm², 25×150 mm @ 405 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8150", "wavelength": "405 nm"} },
  { pn: "019-00290R", desc: "AC8150P-405 UV LED head: 8 W/cm², 25×150 mm @ 405 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8150P", "wavelength": "405 nm"} },
  { pn: "019-00274R", desc: "AC8225-405 UV LED head: 8 W/cm², 25×225 mm @ 405 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8225", "wavelength": "405 nm"} },
  { pn: "019-00291R", desc: "AC8225P-405 UV LED head: 8 W/cm², 25×225 mm @ 405 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8225P", "wavelength": "405 nm"} },
  { pn: "019-00275R", desc: "AC8300-405 UV LED head: 8 W/cm², 25×300 mm @ 405 nm", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8300", "wavelength": "405 nm"} },
  { pn: "019-00292R", desc: "AC8300P-405 UV LED head: 8 W/cm², 25×300 mm @ 405 nm (Print)", family: "ac-heads", attrs: {"series": "AC8", "model": "AC8300P", "wavelength": "405 nm"} },
  { pn: "019-00320R-04", desc: "AC8150P-HD-385 UV LED head: 15 W/cm², 30×150 mm @ 385 nm", family: "ac-heads", attrs: {"series": "AC8-HD", "model": "AC8150P-HD", "wavelength": "385 nm"} },
  { pn: "019-00321R-04", desc: "AC8225P-HD-385 UV LED head: 15 W/cm², 30×225 mm @ 385 nm", family: "ac-heads", attrs: {"series": "AC8-HD", "model": "AC8225P-HD", "wavelength": "385 nm"} },
  { pn: "019-00322R-04", desc: "AC8300P-HD-385 UV LED head: 15 W/cm², 30×300 mm @ 385 nm", family: "ac-heads", attrs: {"series": "AC8-HD", "model": "AC8300P-HD", "wavelength": "385 nm"} },
  { pn: "019-00310R-04", desc: "AC8150P-HD-395 UV LED head: 15 W/cm², 30×150 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC8-HD", "model": "AC8150P-HD", "wavelength": "395 nm"} },
  { pn: "019-00311R-04", desc: "AC8225P-HD-395 UV LED head: 15 W/cm², 30×225 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC8-HD", "model": "AC8225P-HD", "wavelength": "395 nm"} },
  { pn: "019-00312R-04", desc: "AC8300P-HD-395 UV LED head: 15 W/cm², 30×300 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC8-HD", "model": "AC8300P-HD", "wavelength": "395 nm"} },
  { pn: "019-00323R-04", desc: "AC8150P-HD-405 UV LED head: 15 W/cm², 30×150 mm @ 405 nm", family: "ac-heads", attrs: {"series": "AC8-HD", "model": "AC8150P-HD", "wavelength": "405 nm"} },
  { pn: "019-00324R-04", desc: "AC8225P-HD-405 UV LED head: 15 W/cm², 30×225 mm @ 405 nm", family: "ac-heads", attrs: {"series": "AC8-HD", "model": "AC8225P-HD", "wavelength": "405 nm"} },
  { pn: "019-00325R-04", desc: "AC8300P-HD-405 UV LED head: 15 W/cm², 30×300 mm @ 405 nm", family: "ac-heads", attrs: {"series": "AC8-HD", "model": "AC8300P-HD", "wavelength": "405 nm"} },
  { pn: "019-00315R-04", desc: "AC9150-385 UV LED head: 14 W/cm², 25×150 mm @ 385 nm", family: "ac-heads", attrs: {"series": "AC9", "model": "AC9150", "wavelength": "385 nm"} },
  { pn: "019-00316R-04", desc: "AC9225-385 UV LED head: 14 W/cm², 25×225 mm @ 385 nm", family: "ac-heads", attrs: {"series": "AC9", "model": "AC9225", "wavelength": "385 nm"} },
  { pn: "019-00317R-04", desc: "AC9300-385 UV LED head: 14 W/cm², 25×300 mm @ 385 nm", family: "ac-heads", attrs: {"series": "AC9", "model": "AC9300", "wavelength": "385 nm"} },
  { pn: "019-00241R-04", desc: "AC9150-395 UV LED head: 14 W/cm², 25×150 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC9", "model": "AC9150", "wavelength": "395 nm"} },
  { pn: "019-00252R-04", desc: "AC9150P-395 UV LED head: 14 W/cm², 25×150 mm @ 395 nm (Print)", family: "ac-heads", attrs: {"series": "AC9", "model": "AC9150P", "wavelength": "395 nm"} },
  { pn: "019-00255R-04", desc: "AC9225-395 UV LED head: 14 W/cm², 25×225 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC9", "model": "AC9225", "wavelength": "395 nm"} },
  { pn: "019-00253R-04", desc: "AC9225P-395 UV LED head: 14 W/cm², 25×225 mm @ 395 nm (Print)", family: "ac-heads", attrs: {"series": "AC9", "model": "AC9225P", "wavelength": "395 nm"} },
  { pn: "019-00247R-04", desc: "AC9300-395 UV LED head: 14 W/cm², 25×300 mm @ 395 nm", family: "ac-heads", attrs: {"series": "AC9", "model": "AC9300", "wavelength": "395 nm"} },
  { pn: "019-00246R-04", desc: "AC9300P-395 UV LED head: 14 W/cm², 25×300 mm @ 395 nm (Print)", family: "ac-heads", attrs: {"series": "AC9", "model": "AC9300P", "wavelength": "395 nm"} },
  { pn: "019-00356R-04", desc: "AC9225F-395 UV LED head: 20 W/cm², 15×225 mm @ 395 nm (Fiber)", family: "ac-heads", attrs: {"series": "AC9225-F", "model": "AC9225F", "wavelength": "395 nm"} },
  { pn: "019-00429R-04", desc: "AC9225F RS485-395 UV LED head: 20 W/cm², 15×225 mm @ 395 nm (Fiber, with RS485)", family: "ac-heads", attrs: {"series": "AC9225-F", "model": "AC9225F RS485", "wavelength": "395 nm"} },
  // ── ac-bundles ──
  { pn: "010-00356R-04", desc: "AC8150-365 UV LED Curing System bundle: head + SC2000 2000 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC8", "model": "AC8150", "wavelength": "365 nm"} },
  { pn: "010-00357R-04", desc: "AC8150-395 UV LED Curing System bundle: head + SC2000 2000 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC8", "model": "AC8150", "wavelength": "395 nm"} },
  { pn: "010-00358R-04", desc: "AC8225-365 UV LED Curing System bundle: head + SC2000 2000 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC8", "model": "AC8225", "wavelength": "365 nm"} },
  { pn: "010-00359R-04", desc: "AC8225-395 UV LED Curing System bundle: head + SC2000 2000 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC8", "model": "AC8225", "wavelength": "395 nm"} },
  { pn: "010-00360R-04", desc: "AC8300-365 UV LED Curing System bundle: head + SC3000 3000 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC8", "model": "AC8300", "wavelength": "365 nm"} },
  { pn: "010-00361R-04", desc: "AC8300-395 UV LED Curing System bundle: head + SC3000 3000 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC8", "model": "AC8300", "wavelength": "395 nm"} },
  { pn: "010-00334R-04", desc: "AC7150-365 UV LED Curing System bundle: head + SC0650 650 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC7", "model": "AC7150", "wavelength": "365 nm"} },
  { pn: "010-00335R-04", desc: "AC7150-395 UV LED Curing System bundle: head + SC0650 650 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC7", "model": "AC7150", "wavelength": "395 nm"} },
  { pn: "010-00336R-04", desc: "AC7300-365 UV LED Curing System bundle: head + SC0750 750 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC7", "model": "AC7300", "wavelength": "365 nm"} },
  { pn: "010-00337R-04", desc: "AC7300-395 UV LED Curing System bundle: head + SC0750 750 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC7", "model": "AC7300", "wavelength": "395 nm"} },
  { pn: "010-00330R-04", desc: "AC450-365 UV LED Curing System bundle: head + SC0650 650 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC4", "model": "AC450", "wavelength": "365 nm"} },
  { pn: "010-00331R-04", desc: "AC450-395 UV LED Curing System bundle: head + SC0650 650 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC4", "model": "AC450", "wavelength": "395 nm"} },
  { pn: "010-00332R-04", desc: "AC475-365 UV LED Curing System bundle: head + SC0650 650 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC4", "model": "AC475", "wavelength": "365 nm"} },
  { pn: "010-00333R-04", desc: "AC475-395 UV LED Curing System bundle: head + SC0650 650 W PSU + 5 m DC cable + PLC2000", family: "ac-bundles", attrs: {"series": "AC4", "model": "AC475", "wavelength": "395 nm"} },
  // ── ac-power ──
  { pn: "019-00195R", desc: "SC0650 – 650 W single-output Power Supply Unit", family: "ac-power", attrs: {"kind": "Power supply (SC Series)", "item": "SC0650 650 W"} },
  { pn: "019-00199R", desc: "SC0750 – 750 W dual-output Power Supply Unit", family: "ac-power", attrs: {"kind": "Power supply (SC Series)", "item": "SC0750 750 W"} },
  { pn: "019-00186R", desc: "SC1000 – 1000 W dual-output Power Supply Unit", family: "ac-power", attrs: {"kind": "Power supply (SC Series)", "item": "SC1000 1000 W"} },
  { pn: "019-00211R", desc: "SC2000 – 2000 W dual-output Power Supply Unit", family: "ac-power", attrs: {"kind": "Power supply (SC Series)", "item": "SC2000 2000 W"} },
  { pn: "019-00213R", desc: "SC3000 – 3000 W quadruple-output Power Supply Unit", family: "ac-power", attrs: {"kind": "Power supply (SC Series)", "item": "SC3000 3000 W"} },
  { pn: "018-00624R", desc: "AC2 Series power / control cable, 5 m", family: "ac-power", attrs: {"kind": "DC power cable", "item": "AC2 power/control cable 5 m"} },
  { pn: "018-00559R", desc: "5 m 5W5 DC power cable (AC4, AC5, AC7 & AC8F+)", family: "ac-power", attrs: {"kind": "DC power cable", "item": "5W5 DC cable 5 m (AC4/AC5/AC7)"} },
  { pn: "018-00595R", desc: "5 m 5C5W5 DC cable (AC8 & AC9 Series)", family: "ac-power", attrs: {"kind": "DC power cable", "item": "5C5W5 DC cable 5 m (AC8/AC9)"} },
  { pn: "018-00661R", desc: "5 m 5C5W5 8AWG DC cable (AC8-HD Series)", family: "ac-power", attrs: {"kind": "DC power cable", "item": "5C5W5 8AWG DC cable 5 m (AC8-HD)"} },
  { pn: "019-00214R", desc: "PLC2000 External PLC Controller (includes HD15 cable)", family: "ac-power", attrs: {"kind": "PLC controller / control cable", "item": "PLC2000"} },
  { pn: "018-00540R", desc: "HD15 M-F PLC control cable, 5 m (15 ft)", family: "ac-power", attrs: {"kind": "PLC controller / control cable", "item": "HD15 control cable 5 m"} },
  // ── ac-spares ──
  { pn: "019-00203R", desc: "Window protector kit, AC450 / AC550", family: "ac-spares", attrs: {"kind": "Kit", "item": "Window protector, AC450/AC550"} },
  { pn: "019-00204R", desc: "Window protector kit, AC475 / AC575", family: "ac-spares", attrs: {"kind": "Kit", "item": "Window protector, AC475/AC575"} },
  { pn: "019-00232R", desc: "Protective window – AC4 / AC5 Series", family: "ac-spares", attrs: {"kind": "Replacement window", "item": "Protective window, AC4/AC5"} },
  { pn: "019-00209R", desc: "AC4 / AC5 Series 100 PPI air filter kit, 10-pack", family: "ac-spares", attrs: {"kind": "Air filter", "item": "AC4/AC5 100 PPI filter, 10-pack"} },
  { pn: "019-00208R", desc: "AC4 / AC5 Series air deflector kit", family: "ac-spares", attrs: {"kind": "Kit", "item": "Air deflector, AC4/AC5"} },
  { pn: "020-00869", desc: "AC7150 replacement air filter, qty 1", family: "ac-spares", attrs: {"kind": "Air filter", "item": "AC7150"} },
  { pn: "020-00860", desc: "AC7300 replacement air filter, qty 1", family: "ac-spares", attrs: {"kind": "Air filter", "item": "AC7300"} },
  { pn: "020-00900", desc: "AC8150 / AC9150 replacement air filter, qty 1", family: "ac-spares", attrs: {"kind": "Air filter", "item": "AC8150/AC9150"} },
  { pn: "020-00901", desc: "AC8225 / AC9225 replacement air filter, qty 1", family: "ac-spares", attrs: {"kind": "Air filter", "item": "AC8225/AC9225"} },
  { pn: "020-00899", desc: "AC8300 / AC9300 replacement air filter, qty 1", family: "ac-spares", attrs: {"kind": "Air filter", "item": "AC8300/AC9300"} },
  { pn: "020-00922", desc: "AC8150P / AC9150P AR-coated replacement window", family: "ac-spares", attrs: {"kind": "Replacement window", "item": "AC8150P/AC9150P"} },
  { pn: "020-00923", desc: "AC8225P / AC9225P AR-coated replacement window", family: "ac-spares", attrs: {"kind": "Replacement window", "item": "AC8225P/AC9225P"} },
  { pn: "020-00924", desc: "AC8300P / AC9300P AR-coated replacement window", family: "ac-spares", attrs: {"kind": "Replacement window", "item": "AC8300P/AC9300P"} },
  { pn: "020-00967", desc: "AC8150P-HD AR-coated replacement window", family: "ac-spares", attrs: {"kind": "Replacement window", "item": "AC8150P-HD"} },
  { pn: "020-00968", desc: "AC8225P-HD AR-coated replacement window", family: "ac-spares", attrs: {"kind": "Replacement window", "item": "AC8225P-HD"} },
  { pn: "020-00969", desc: "AC8300P-HD AR-coated replacement window", family: "ac-spares", attrs: {"kind": "Replacement window", "item": "AC8300P-HD"} },
];

const byPn = new Map(parts.map((p) => [p.pn, p]));
export function partByPn(pn: string): Part | undefined {
  return byPn.get(pn);
}

export function partFamily(id: PartFamilyId): PartFamily {
  return partFamilies.find((f) => f.id === id)!;
}

// Which families a product page offers, keyed by catalogue slug. A page
// that is not listed shows no picker.
export const partsForModel: Record<string, PartFamilyId[]> = {"s2000-elite": ["lamps", "elite-filters", "s2000-elite", "light-guides", "optical", "radiometry-s", "general"], "s1500-pro": ["lamps", "elite-filters", "light-guides", "optical", "general"], "s2000-lamp": ["lamps"], "r2000": ["radiometry-s"], "s-liquid-light-guide": ["light-guides"], "s-fiber-light-guide": ["light-guides"], "s-fiber-light-line": ["light-guides"], "s2000-elite-filters": ["elite-filters"], "s-cure-ring-adapter": ["optical"], "s-light-line-adapter": ["optical"], "s-collimating-adapter": ["optical"], "lx500": ["lx500", "ls200"], "lx505": ["lx500", "ls200"], "v3-led-heads": ["lx500"], "ls200": ["ls200"], "ac2": ["ac-heads", "ac-power", "ac-spares"], "ac4": ["ac-heads", "ac-bundles", "ac-power", "ac-spares"], "ac5": ["ac-heads", "ac-power", "ac-spares"], "ac7": ["ac-heads", "ac-bundles", "ac-power", "ac-spares"], "ac8": ["ac-heads", "ac-bundles", "ac-power", "ac-spares"], "ac8-hd": ["ac-heads", "ac-power", "ac-spares"], "ac9225": ["ac-heads", "ac-power", "ac-spares"], "ac9225-f": ["ac-heads", "ac-power", "ac-spares"]};

// An AC model page shows only the heads and bundles of its own series.
export const seriesForModel: Record<string, string> = {"ac2": "AC2", "ac4": "AC4", "ac5": "AC5", "ac7": "AC7", "ac8": "AC8", "ac8-hd": "AC8-HD", "ac9225": "AC9", "ac9225-f": "AC9225-F"};

