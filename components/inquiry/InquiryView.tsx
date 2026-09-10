"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { getProduct, productImage, productHref } from "@/components/productCatalog";
import { partByPn, partsForModel, type PartFamilyId } from "@/components/omnicureParts";
import { localeSalesEmail } from "@/components/contact";
import { useInquiry, itemKey, type InquiryItem } from "./InquiryContext";
import PartPicker from "./PartPicker";

// Review and send. The basket as a table with quantities, a part-number
// picker scoped to whatever systems are already in it (an S2000 in the basket
// offers its lamps and light guides), and one short form. Everything is a
// quote request: name, one way to reach them, and the list.
//
// Delivery goes through /api/lead. If that is not configured, the browser's
// mail client opens with the same list, so nothing is lost.

function describe(item: InquiryItem): { title: string; sub: string; href?: string; img?: string } | null {
  if (item.kind === "product") {
    const p = getProduct(item.slug);
    if (!p) return null;
    return { title: p.name, sub: p.sub ?? p.tech, href: productHref(p), img: productImage(p) || undefined };
  }
  const part = partByPn(item.pn);
  if (!part) return null;
  return { title: part.pn, sub: part.desc };
}

export default function InquiryView() {
  const { locale } = useLocale();
  const { items, setQty, remove, clear, ready } = useInquiry();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  // Families the picker offers: those of every product in the basket, else all.
  const families = useMemo<PartFamilyId[] | undefined>(() => {
    const set = new Set<PartFamilyId>();
    for (const i of items) if (i.kind === "product") for (const f of partsForModel[i.slug] ?? []) set.add(f);
    return set.size ? Array.from(set) : undefined;
  }, [items]);
  const model = items.find((i) => i.kind === "product" && partsForModel[i.slug]);

  const rows = items.map((i) => ({ item: i, info: describe(i) })).filter((r) => r.info);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const payload = {
      name: get("name"),
      company: get("company"),
      email: get("email"),
      phone: get("phone"),
      country: get("country"),
      message: get("message"),
      website: get("website"), // honeypot
      page: "inquiry",
      lang: locale,
      items: rows.map(({ item, info }) => ({
        ref: item.kind === "product" ? info!.title : item.pn,
        description: item.kind === "product" ? info!.sub : info!.sub,
        qty: item.qty,
      })),
    };
    if (!payload.name || (!payload.email && !payload.phone)) {
      setErr(t({ en: "Please give your name and an email or phone number.", zh: "请填写姓名，以及邮箱或电话至少一项。", th: "กรุณากรอกชื่อ และอีเมลหรือหมายเลขโทรศัพท์อย่างน้อยหนึ่งอย่าง", vi: "Vui lòng nhập tên và email hoặc số điện thoại." }, locale));
      setStatus("error");
      return;
    }
    if (payload.items.length === 0) {
      setErr(t({ en: "Your inquiry is empty — add a product or part number first.", zh: "询单是空的——先加一个产品或料号。", th: "รายการสอบถามว่างเปล่า — เพิ่มผลิตภัณฑ์หรือหมายเลขชิ้นส่วนก่อน", vi: "Yêu cầu đang trống — hãy thêm sản phẩm hoặc mã linh kiện trước." }, locale));
      setStatus("error");
      return;
    }
    setErr("");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        setStatus("done");
        clear();
        return;
      }
    } catch {
      /* fall through to mailto */
    }
    const subject = `Quote request — ${payload.name}${payload.company ? `, ${payload.company}` : ""} (${payload.items.length} items)`;
    const head = [
      `Name: ${payload.name}`,
      payload.company && `Company: ${payload.company}`,
      payload.email && `Email: ${payload.email}`,
      payload.phone && `Phone: ${payload.phone}`,
      payload.country && `Country: ${payload.country}`,
      payload.message && `Message: ${payload.message}`,
    ].filter((l) => l !== "");
    const body = [
      ...head,
      "",
      "Items:",
      ...payload.items.map((i) => `  ${i.qty} × ${i.ref}${i.description ? ` — ${i.description}` : ""}`),
    ].join("\n");
    window.location.assign(`mailto:${localeSalesEmail(locale)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setStatus("done");
    clear();
  }

  const field = "w-full rounded-lg border border-[#D9E4EA] bg-white px-3 py-2.5 text-sm text-[#102038] focus:border-[#1A56DB] focus:outline-none focus:ring-2 focus:ring-[#1A56DB]/20";
  const label = "mb-1 block text-xs font-semibold text-[#667085]";

  if (status === "done") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#41A62A]" />
        <h1 className="mt-4 text-2xl font-bold text-[#143C96]">
          {t({ en: "Received — a sales engineer will reply within 24 hours.", zh: "已收到——销售工程师会在 24 小时内回复。", th: "ได้รับแล้ว — วิศวกรฝ่ายขายจะตอบกลับภายใน 24 ชั่วโมง", vi: "Đã nhận — kỹ sư bán hàng sẽ phản hồi trong 24 giờ." }, locale)}
        </h1>
        <p className="mt-3 text-sm text-[#667085]">
          {t({ en: "You will hear from a person, with pricing, lead time and a recommendation for your process.", zh: "回复你的会是具体的人，带着报价、交期和针对你工艺的建议。", th: "คุณจะได้รับการติดต่อจากบุคคลจริง พร้อมราคา ระยะเวลาส่งมอบ และคำแนะนำสำหรับกระบวนการของคุณ", vi: "Bạn sẽ nhận phản hồi từ một người thật, kèm giá, thời gian giao và khuyến nghị cho quy trình của bạn." }, locale)}
        </p>
        <Link href={localizeHref("/product", locale)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#143C96] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1A56DB]">
          <ArrowLeft className="h-4 w-4" />
          {t({ en: "Back to the shop", zh: "返回商城", th: "กลับไปที่ร้าน", vi: "Quay lại gian hàng" }, locale)}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#102038]">
      <section className="border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF] px-4 pt-10 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">
            {t({ en: "Your inquiry", zh: "你的询单", th: "รายการสอบถามของคุณ", vi: "Yêu cầu của bạn" }, locale)}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#143C96] md:text-4xl">
            {t({ en: "Review and send", zh: "确认并发送", th: "ตรวจสอบและส่ง", vi: "Xem lại và gửi" }, locale)}
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#41A62A]/30 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A]">
            <Clock className="h-4 w-4" />
            {t({ en: "Sales engineer reply within 24 hours", zh: "销售工程师 24 小时内回复", th: "วิศวกรฝ่ายขายตอบกลับภายใน 24 ชั่วโมง", vi: "Kỹ sư bán hàng phản hồi trong 24 giờ" }, locale)}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* The list */}
        <h2 className="text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">
          {t({ en: "Items", zh: "清单", th: "รายการ", vi: "Danh sách" }, locale)}
        </h2>
        {!ready ? null : rows.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-[#D9E4EA] p-8 text-center text-sm text-[#667085]">
            {t({ en: "Nothing here yet.", zh: "还没有加入任何项目。", th: "ยังไม่มีรายการ", vi: "Chưa có gì." }, locale)}{" "}
            <Link href={localizeHref("/product", locale)} className="font-bold text-[#1A56DB] hover:underline">
              {t({ en: "Browse the shop →", zh: "去商城看看 →", th: "ดูร้าน →", vi: "Xem gian hàng →" }, locale)}
            </Link>
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-2xl border border-[#D9E4EA]">
            <table className="w-full text-sm">
              <thead className="bg-[#F7FAFC] text-left text-[11px] font-bold uppercase tracking-[.1em] text-[#667085]">
                <tr>
                  <th className="px-4 py-2.5">{t({ en: "Item", zh: "项目", th: "รายการ", vi: "Mục" }, locale)}</th>
                  <th className="w-24 px-3 py-2.5">{t({ en: "Qty", zh: "数量", th: "จำนวน", vi: "SL" }, locale)}</th>
                  <th className="w-12 px-2 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {rows.map(({ item, info }) => (
                  <tr key={itemKey(item)} className="border-t border-[#EAF0F5]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {info!.img && (
                          <span className="relative hidden h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#F7FAFC] sm:block">
                            <Image src={info!.img} alt="" fill sizes="48px" className="object-contain p-1" />
                          </span>
                        )}
                        <div className="min-w-0">
                          {info!.href ? (
                            <Link href={localizeHref(info!.href, locale)} className="font-bold text-[#143C96] hover:underline">{info!.title}</Link>
                          ) : (
                            <span className="font-mono font-bold text-[#143C96]">{info!.title}</span>
                          )}
                          <p className="text-xs text-[#667085]">{info!.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="number"
                        min={1}
                        max={999}
                        value={item.qty}
                        onChange={(e) => setQty(item, Number(e.target.value))}
                        className="w-20 rounded-lg border border-[#D9E4EA] px-2 py-1.5 text-sm"
                        aria-label={t({ en: "Quantity", zh: "数量", th: "จำนวน", vi: "Số lượng" }, locale)}
                      />
                    </td>
                    <td className="px-2 py-3">
                      <button type="button" onClick={() => remove(item)} className="rounded-full p-2 text-[#667085] hover:bg-[#F7FAFC] hover:text-[#dc2626]" aria-label={t({ en: "Remove", zh: "移除", th: "ลบ", vi: "Xóa" }, locale)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add part numbers */}
        <h2 className="mt-10 text-xs font-bold uppercase tracking-[.14em] text-[#41A62A]">
          {t({ en: "Add lamps, light guides & part numbers", zh: "追加灯泡、导光管与料号", th: "เพิ่มหลอด ท่อนำแสง & หมายเลขชิ้นส่วน", vi: "Thêm đèn, ống dẫn sáng & mã linh kiện" }, locale)}
        </h2>
        <p className="mt-1 mb-3 text-xs text-[#667085]">
          {t({ en: "OmniCure part numbers from the current catalogue. Pick by what it is; the number is filled in for you.", zh: "OmniCure 现行目录料号。按用途逐项选，料号自动带出。", th: "หมายเลขชิ้นส่วน OmniCure จากแคตตาล็อกปัจจุบัน เลือกตามสิ่งที่เป็น หมายเลขจะถูกกรอกให้", vi: "Mã linh kiện OmniCure từ catalogue hiện hành. Chọn theo mô tả; mã sẽ tự điền." }, locale)}
        </p>
        <PartPicker families={families} model={model && model.kind === "product" ? model.slug : undefined} heading={false} />

        {/* The form */}
        <form onSubmit={onSubmit} className="mt-10 rounded-2xl border border-[#D9E4EA] bg-white p-5 sm:p-6">
          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="inq-website">Website</label>
            <input id="inq-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="inq-name" className={label}>{t({ en: "Name", zh: "姓名", th: "ชื่อ", vi: "Tên" }, locale)} *</label>
              <input id="inq-name" name="name" required className={field} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="inq-company" className={label}>{t({ en: "Company", zh: "公司", th: "บริษัท", vi: "Công ty" }, locale)}</label>
              <input id="inq-company" name="company" className={field} autoComplete="organization" />
            </div>
            <div>
              <label htmlFor="inq-email" className={label}>{t({ en: "Email", zh: "邮箱", th: "อีเมล", vi: "Email" }, locale)} *</label>
              <input id="inq-email" name="email" type="email" className={field} autoComplete="email" />
            </div>
            <div>
              <label htmlFor="inq-phone" className={label}>{t({ en: "Phone / WeChat / WhatsApp", zh: "电话 / 微信 / WhatsApp", th: "โทรศัพท์ / WhatsApp / Line", vi: "Điện thoại / Zalo / WhatsApp" }, locale)}</label>
              <input id="inq-phone" name="phone" type="tel" className={field} autoComplete="tel" />
            </div>
            <div>
              <label htmlFor="inq-country" className={label}>{t({ en: "Country / region", zh: "国家 / 地区", th: "ประเทศ / ภูมิภาค", vi: "Quốc gia / khu vực" }, locale)}</label>
              <input id="inq-country" name="country" className={field} autoComplete="country-name" />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="inq-message" className={label}>{t({ en: "Message (optional)", zh: "留言（可选）", th: "ข้อความ (ไม่บังคับ)", vi: "Lời nhắn (tùy chọn)" }, locale)}</label>
            <textarea id="inq-message" name="message" rows={3} className={field} />
          </div>

          {status === "error" && err && <p className="mt-3 text-xs text-[#dc2626]">{err}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-5 w-full rounded-full bg-[#41A62A] px-6 py-3 text-sm font-bold text-white hover:bg-[#368a22] disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? "…" : t({ en: "Send inquiry", zh: "发送询单", th: "ส่งรายการสอบถาม", vi: "Gửi yêu cầu báo giá" }, locale)}
          </button>
          <p className="mt-3 text-[11px] leading-4 text-[#98a2b3]">
            {t({ en: "By sending, you agree that ETIA may use these details to answer your inquiry. See our Privacy Policy.", zh: "发送即表示你同意 ETIA 使用这些信息回复你的询问。详见隐私政策。", th: "การส่งถือว่าคุณยินยอมให้ ETIA ใช้ข้อมูลนี้เพื่อตอบคำถามของคุณ ดูนโยบายความเป็นส่วนตัว", vi: "Khi gửi, bạn đồng ý để ETIA dùng các thông tin này để trả lời yêu cầu. Xem Chính sách quyền riêng tư." }, locale)}
          </p>
        </form>
      </div>
    </div>
  );
}
