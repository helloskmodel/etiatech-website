"use client";
import { useMemo, useState } from "react";
import { BRAND } from "./copy";
import { track } from "./track";
import { OFFICES, defaultOfficeId, officeById } from "./offices";
import type { LampLang } from "./s2000Lamp";

// The replacement-lamp page as a counter rather than a catalogue.
//
// A customer on this page already owns the machine. They do not need to be
// sold a technology or walked down a cascade of dropdowns — they need to say
// which lamp and how many, and hear back a price and a date. So: the four
// lamps as four cards with a quantity box, and one form that asks for the two
// things they came for.
//
// The office bar sits at the top of the page because the first question a
// buyer in this region asks is "where are you, and who do I call".

type L = LampLang;

const T = {
  officeTitle: { en: "Sales & service in your country", zh: "您所在国家的销售与服务", th: "ฝ่ายขายและบริการในประเทศของคุณ", vi: "Bán hàng & dịch vụ tại nước bạn" },
  pickCountry: { en: "Country / region", zh: "国家 / 地区", th: "ประเทศ / ภูมิภาค", vi: "Quốc gia / khu vực" },
  address: { en: "Address", zh: "地址", th: "ที่อยู่", vi: "Địa chỉ" },
  phone: { en: "Phone", zh: "电话", th: "โทรศัพท์", vi: "Điện thoại" },
  email: { en: "Email", zh: "邮箱", th: "อีเมล", vi: "Email" },
  noOffice: {
    en: "Served from our regional team — message or email us and you will have a named contact the same working day.",
    zh: "由区域团队服务——发消息或邮件给我们，当个工作日内会有专人对接。",
    th: "ดูแลโดยทีมประจำภูมิภาค — ส่งข้อความหรืออีเมลถึงเรา แล้วคุณจะได้ผู้ติดต่อประจำภายในวันทำการเดียวกัน",
    vi: "Được phục vụ bởi đội ngũ khu vực — nhắn tin hoặc gửi email, bạn sẽ có người phụ trách ngay trong ngày làm việc.",
  },

  shopTitle: { en: "Choose your lamp", zh: "选择灯泡", th: "เลือกหลอดของคุณ", vi: "Chọn đèn của bạn" },
  shopHint: {
    en: "Pick the part number and the quantity. One click and you get a price and a delivery date.",
    zh: "选料号，填数量。一次提交，拿到价格和交期。",
    th: "เลือกหมายเลขชิ้นส่วนและจำนวน กดครั้งเดียว รับราคาและกำหนดส่ง",
    vi: "Chọn mã hàng và số lượng. Một lần gửi, nhận giá và thời gian giao.",
  },
  fits: { en: "Fits", zh: "适用机型", th: "ใช้กับ", vi: "Dùng cho" },
  qty: { en: "Qty", zh: "数量", th: "จำนวน", vi: "SL" },
  genuine: { en: "Genuine Excelitas", zh: "Excelitas 原厂件", th: "ของแท้ Excelitas", vi: "Chính hãng Excelitas" },

  selected: { en: "Selected", zh: "已选", th: "ที่เลือก", vi: "Đã chọn" },
  nothing: { en: "Set a quantity on at least one lamp above.", zh: "请在上面至少给一支灯填个数量。", th: "กรุณาระบุจำนวนอย่างน้อยหนึ่งรายการด้านบน", vi: "Hãy nhập số lượng cho ít nhất một loại đèn ở trên." },
  askTitle: { en: "Ask for price and delivery time", zh: "问询价格与交期", th: "สอบถามราคาและกำหนดส่ง", vi: "Hỏi giá và thời gian giao" },
  name: { en: "Name", zh: "姓名", th: "ชื่อ", vi: "Họ tên" },
  company: { en: "Company", zh: "公司", th: "บริษัท", vi: "Công ty" },
  contact: { en: "Phone or email", zh: "电话或邮箱", th: "โทรศัพท์หรืออีเมล", vi: "Điện thoại hoặc email" },
  wanted: { en: "When do you need it?", zh: "希望什么时候拿到？", th: "ต้องการใช้เมื่อไร?", vi: "Bạn cần khi nào?" },
  wantedHint: { en: "e.g. within 2 weeks, before the shutdown, no rush", zh: "例如：两周内、停机检修前、不急", th: "เช่น ภายใน 2 สัปดาห์ ก่อนหยุดซ่อม ไม่เร่ง", vi: "vd: trong 2 tuần, trước kỳ dừng máy, không gấp" },
  note: { en: "Anything else (optional)", zh: "其他说明（选填）", th: "อื่น ๆ (ไม่บังคับ)", vi: "Ghi chú khác (không bắt buộc)" },
  submit: { en: "Ask for price & delivery", zh: "问询价格与交期", th: "สอบถามราคาและกำหนดส่ง", vi: "Hỏi giá & thời gian giao" },
  sending: { en: "Sending…", zh: "正在发送…", th: "กำลังส่ง…", vi: "Đang gửi…" },
  required: { en: "Please give your name and a phone number or email.", zh: "请填写姓名，以及电话或邮箱至少一项。", th: "กรุณากรอกชื่อ และโทรศัพท์หรืออีเมลอย่างน้อยหนึ่งอย่าง", vi: "Vui lòng nhập tên và số điện thoại hoặc email." },
  doneTitle: { en: "Sent — we will come back with a price and a date.", zh: "已发送——我们会带着价格和交期回复您。", th: "ส่งแล้ว — เราจะตอบกลับพร้อมราคาและกำหนดส่ง", vi: "Đã gửi — chúng tôi sẽ phản hồi kèm giá và thời gian giao." },
  doneBody: { en: "A sales engineer replies within 24 hours.", zh: "销售工程师将在 24 小时内回复。", th: "วิศวกรฝ่ายขายจะตอบกลับภายใน 24 ชั่วโมง", vi: "Kỹ sư kinh doanh sẽ trả lời trong vòng 24 giờ." },
} satisfies Record<string, Record<L, string>>;

const tr = (k: keyof typeof T, lang: L) => T[k][lang];

/** The four lamps ETIA supplies. Descriptions are the manufacturer's own. */
const LAMPS: {
  pn: string;
  name: string;
  fits: string;
  spectrum: Record<L, string>;
}[] = [
  {
    pn: "012-68000R",
    name: "S2000 Elite Lamp Module — Standard",
    fits: "S2000 Elite · S1500 Pro",
    spectrum: {
      en: "Broad spectrum — the widest range of UV adhesive bonding",
      zh: "宽光谱——适用范围最广的 UV 胶粘接",
      th: "สเปกตรัมกว้าง — งานยึดติดด้วยกาว UV ได้หลากหลายที่สุด",
      vi: "Phổ rộng — dải ứng dụng dán keo UV rộng nhất",
    },
  },
  {
    pn: "012-69000R",
    name: "S2000 Elite Lamp Module — Surface Cure",
    fits: "S2000 Elite · S1500 Pro",
    spectrum: {
      en: "Surface cure — tack-free finish on acrylic resins",
      zh: "表面固化——丙烯酸树脂表面不发粘",
      th: "บ่มผิว — ผิวเรซินอะคริลิกไม่เหนียวติด",
      vi: "Đóng rắn bề mặt — bề mặt acrylic không dính tay",
    },
  },
  {
    pn: "012-64000R",
    name: "S2000 Replacement Lamp — Standard (200 W)",
    fits: "S2000 · S2000-XLA",
    spectrum: {
      en: "Broad spectrum — the widest range of UV adhesive bonding",
      zh: "宽光谱——适用范围最广的 UV 胶粘接",
      th: "สเปกตรัมกว้าง — งานยึดติดด้วยกาว UV ได้หลากหลายที่สุด",
      vi: "Phổ rộng — dải ứng dụng dán keo UV rộng nhất",
    },
  },
  {
    pn: "012-65000R",
    name: "S2000 Replacement Lamp — Surface Cure (200 W)",
    fits: "S2000 · S2000-XLA",
    spectrum: {
      en: "Surface cure — tack-free finish on acrylic resins",
      zh: "表面固化——丙烯酸树脂表面不发粘",
      th: "บ่มผิว — ผิวเรซินอะคริลิกไม่เหนียวติด",
      vi: "Đóng rắn bề mặt — bề mặt acrylic không dính tay",
    },
  },
];

// ---------------------------------------------------------------------------

export function OfficeBar({ lang, officeId, onPick }: { lang: L; officeId: string; onPick: (id: string) => void }) {
  const office = officeById(officeId) ?? OFFICES[0];
  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:gap-8 lg:px-8">
        <label className="flex shrink-0 flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wide text-gray-400">{tr("pickCountry", lang)}</span>
          <select
            value={office.id}
            onChange={(e) => onPick(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-[#102A43]"
          >
            {OFFICES.map((o) => (
              <option key={o.id} value={o.id}>
                {o.country[lang]}
              </option>
            ))}
          </select>
        </label>

        <div className="min-w-0 flex-1 text-sm leading-relaxed text-gray-600">
          {office.address ? (
            <p>
              📍 {office.city ? `${office.city[lang]} — ` : ""}
              {office.address}
            </p>
          ) : office.city ? (
            <p>📍 {office.city[lang]}</p>
          ) : (
            <p className="text-gray-500">{tr("noOffice", lang)}</p>
          )}
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            {office.phone && office.phoneHref && (
              <a href={`tel:${office.phoneHref}`} className="font-semibold text-[#102A43] hover:underline">
                ☎ {office.phone}
              </a>
            )}
            <a href={`mailto:${office.email}`} className="hover:underline">
              ✉ {office.email}
            </a>
            {office.chat && (
              <a href={office.chat.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: BRAND.green }}>
                💬 {office.chat.label}
              </a>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

export function LampShop({ lang, officeId, page }: { lang: L; officeId: string; page: string }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  const chosen = useMemo(
    () => LAMPS.filter((l) => (qty[l.pn] ?? 0) > 0).map((l) => ({ ...l, n: qty[l.pn] })),
    [qty]
  );

  const bump = (pn: string, d: number) =>
    setQty((q) => ({ ...q, [pn]: Math.max(0, Math.min(999, (q[pn] ?? 0) + d)) }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const contact = get("contact");
    const office = officeById(officeId);

    if (!chosen.length) {
      setErr(tr("nothing", lang));
      setStatus("error");
      return;
    }
    if (!get("name") || !contact) {
      setErr(tr("required", lang));
      setStatus("error");
      return;
    }

    // One field for "phone or email" — the API needs at least one of the two,
    // so decide by whether it looks like an address rather than making the
    // customer choose which box to type in.
    const isEmail = contact.includes("@");
    const payload = {
      name: get("name"),
      company: get("company"),
      email: isEmail ? contact : "",
      phone: isEmail ? "" : contact,
      country: office?.country.en ?? "",
      leadTime: get("leadTime"),
      message: get("message"),
      website: get("website"), // honeypot
      page,
      lang,
      items: chosen.map((l) => ({ ref: l.pn, description: l.name, qty: l.n })),
    };

    setErr("");
    setStatus("sending");
    track("generate_lead", { page, lang, model: chosen.map((l) => l.pn).join(",") });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("done");
        return;
      }
    } catch {
      /* fall through to mailto */
    }
    // Delivery not configured or failed: open the mail client with the same
    // list so an inquiry is never silently dropped.
    const body = [
      `${tr("askTitle", lang)}`,
      "",
      ...chosen.map((l) => `${l.n} × ${l.pn} — ${l.name}`),
      "",
      `${tr("wanted", lang)} ${payload.leadTime}`,
      `${tr("name", lang)}: ${payload.name}`,
      `${tr("company", lang)}: ${payload.company}`,
      `${tr("contact", lang)}: ${contact}`,
      payload.message,
    ].join("\n");
    window.location.href = `mailto:${office?.email ?? "sales@etia-tech.com"}?subject=${encodeURIComponent(
      `Price & delivery — ${chosen.map((l) => l.pn).join(", ")}`
    )}&body=${encodeURIComponent(body)}`;
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-2xl font-bold" style={{ color: BRAND.blue }}>{tr("doneTitle", lang)}</p>
          <p className="mt-3 text-sm text-gray-600">{tr("doneBody", lang)}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="scroll-mt-20 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold md:text-3xl" style={{ color: BRAND.blue }}>{tr("shopTitle", lang)}</h2>
        <p className="mt-2 text-sm text-gray-500">{tr("shopHint", lang)}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {LAMPS.map((l) => {
            const n = qty[l.pn] ?? 0;
            return (
              <div
                key={l.pn}
                className={`flex flex-col rounded-2xl border bg-white p-5 transition ${
                  n > 0 ? "border-[#41A62A] shadow-sm" : "border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-base font-bold" style={{ color: BRAND.blue }}>{l.pn}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "#41A62A15", color: "#2F7A1E" }}>
                    {tr("genuine", lang)}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold leading-snug text-gray-900">{l.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{l.spectrum[lang]}</p>
                <p className="mt-2 text-xs text-gray-500">
                  <span className="font-semibold text-gray-600">{tr("fits", lang)}:</span> {l.fits}
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-400">{tr("qty", lang)}</span>
                  <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                    <button type="button" onClick={() => bump(l.pn, -1)} aria-label="-" className="px-3 py-1.5 text-lg leading-none text-gray-500 hover:bg-gray-50">
                      −
                    </button>
                    <input
                      value={n}
                      onChange={(e) => setQty((q) => ({ ...q, [l.pn]: Math.max(0, Math.min(999, Number(e.target.value.replace(/\D/g, "")) || 0)) }))}
                      inputMode="numeric"
                      className="w-12 border-x border-gray-300 py-1.5 text-center text-sm font-bold"
                      aria-label={`${l.pn} ${tr("qty", lang)}`}
                    />
                    <button type="button" onClick={() => bump(l.pn, 1)} aria-label="+" className="px-3 py-1.5 text-lg leading-none text-gray-500 hover:bg-gray-50">
                      ＋
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The ask */}
        <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="text-lg font-bold" style={{ color: BRAND.blue }}>{tr("askTitle", lang)}</h3>

          <p className="mt-2 min-h-[1.25rem] text-sm text-gray-600">
            {chosen.length ? (
              <>
                <span className="font-semibold text-gray-700">{tr("selected", lang)}:</span>{" "}
                {chosen.map((l) => `${l.n} × ${l.pn}`).join("  ·  ")}
              </>
            ) : (
              <span className="text-gray-400">{tr("nothing", lang)}</span>
            )}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{tr("name", lang)} *</span>
              <input name="name" required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{tr("company", lang)}</span>
              <input name="company" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{tr("contact", lang)} *</span>
              <input name="contact" required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{tr("wanted", lang)}</span>
              <input name="leadTime" placeholder={tr("wantedHint", lang)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{tr("note", lang)}</span>
            <textarea name="message" rows={2} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </label>

          {/* Honeypot — a human never sees or fills this. */}
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          {status === "error" && err && <p className="mt-4 text-sm font-semibold text-red-600">{err}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-5 w-full rounded-lg px-6 py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
            style={{ background: BRAND.green }}
          >
            {status === "sending" ? tr("sending", lang) : tr("submit", lang)}
          </button>
        </form>
      </div>
    </section>
  );
}

export { defaultOfficeId };
