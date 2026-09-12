"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, PackageCheck, Recycle, ShieldAlert } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { localeSalesEmail } from "@/components/contact";
import {
  TRADE_IN_COPY as C,
  TRADE_IN_COUNTRIES,
  TRADE_IN_MACHINES,
  TRADE_IN_VALUE_USD,
  tradeInReference,
} from "@/components/tradeIn";

// Register a dead lamp, get a reference, then ship it. No account: a customer
// who has never bought from ETIA should be able to claim the credit with
// nothing but the machine they own and an email address.
//
// Submitting goes through /api/lead like every other inquiry, tagged as a
// trade-in so sales can tell it from a quote request. If delivery is not
// configured the browser's mail client opens with the same details, so a
// registration is never silently dropped.

const STEP_ICONS = [ClipboardList, PackageCheck, Recycle];

export default function TradeInView() {
  const { locale } = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const [ref, setRef] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const contact = get("contact");
    const qty = Math.max(1, Math.min(99, Number(get("qty")) || 1));

    if (!get("name") || !contact) {
      setErr(
        t(
          { en: "Please give your name and a phone number or email.", zh: "请填写姓名，以及电话或邮箱至少一项。", th: "กรุณากรอกชื่อ และโทรศัพท์หรืออีเมล", vi: "Vui lòng nhập tên và số điện thoại hoặc email." },
          locale
        )
      );
      setStatus("error");
      return;
    }

    const reference = tradeInReference();
    const isEmail = contact.includes("@");
    const machine = get("machine");
    const payload = {
      name: get("name"),
      company: get("company"),
      email: isEmail ? contact : "",
      phone: isEmail ? "" : contact,
      country: get("country"),
      model: machine.slice(0, 40),
      kind: "trade-in",
      reference,
      message: [
        `Trade-in registration ${reference}`,
        `Machine: ${machine}`,
        `Old lamp part number / ETIA code: ${get("lamp") || "(not given)"}`,
        `Lamps: ${qty}`,
        `Bought from ETIA: ${get("origin")}`,
        `Hours on the lamp: ${get("hours") || "(not given)"}`,
        get("message") ? `Note: ${get("message")}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      website: get("website"), // honeypot
      page: "trade-in",
      lang: locale,
      items: [{ ref: get("lamp") || machine, description: `Trade-in — ${machine}`, qty }],
    };

    setErr("");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setRef(reference);
        setStatus("done");
        return;
      }
    } catch {
      /* fall through to mailto */
    }
    window.location.href = `mailto:${localeSalesEmail(locale)}?subject=${encodeURIComponent(
      `Lamp trade-in ${reference}`
    )}&body=${encodeURIComponent(`${payload.message}\n\n${payload.name} · ${payload.company}\n${contact}\n${payload.country}`)}`;
    setRef(reference);
    setStatus("done");
  }

  if (status === "done") {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#41A62A]" />
          <h1 className="mt-5 text-2xl font-bold text-[#102A43] sm:text-3xl">
            {t({ en: "Registered. Do not ship yet.", zh: "已登记。先别寄。", th: "ลงทะเบียนแล้ว ยังไม่ต้องส่ง", vi: "Đã đăng ký. Chưa gửi vội." }, locale)}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            {t(
              {
                en: "Your trade-in reference is below. Within 24 hours we send you the return address for your own country, and the credit is confirmed against it. A mercury lamp must not cross a border — please wait for that message before packing anything.",
                zh: "下面是你的以旧换新编号。24 小时内我们会发给你所在国家的寄回地址，抵扣按这个编号确认。汞灯不可跨境运输——请等到那封邮件再装箱。",
                th: "หมายเลขอ้างอิงของคุณอยู่ด้านล่าง ภายใน 24 ชั่วโมงเราจะส่งที่อยู่สำหรับส่งคืนในประเทศของคุณ และยืนยันส่วนลดตามหมายเลขนี้ หลอดปรอทห้ามข้ามพรมแดน โปรดรอข้อความนั้นก่อนบรรจุกล่อง",
                vi: "Mã đổi cũ của bạn ở dưới. Trong vòng 24 giờ chúng tôi gửi địa chỉ trả hàng tại nước bạn và xác nhận khoản trừ theo mã này. Đèn thủy ngân không được qua biên giới — vui lòng đợi thư đó trước khi đóng gói.",
              },
              locale
            )}
          </p>
          <p className="mt-8 inline-block rounded-2xl border-2 border-dashed border-[#41A62A] bg-[#F2FBF8] px-8 py-5 font-mono text-2xl font-bold tracking-wider text-[#102A43]">
            {ref}
          </p>
          <p className="mt-8">
            <Link href={localizeHref("/product/omnicure/s2000-lamp", locale)} className="inline-flex items-center gap-2 text-sm font-bold text-[#1A56DB] hover:underline">
              {t({ en: "Now pick the replacement", zh: "接着挑要换的新灯", th: "เลือกหลอดใหม่ต่อได้เลย", vi: "Chọn đèn thay thế" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-r from-[#F3F7FF] to-[#F2FBF8]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#41A62A]">{t(C.eyebrow, locale)}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-[#102A43] sm:text-4xl">
            {t(C.headline, locale)}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600">{t(C.openToAll, locale)}</p>
          <a href="#register" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#41A62A] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#358B22]">
            {t({ en: "Register a lamp", zh: "登记一支旧灯", th: "ลงทะเบียนหลอด", vi: "Đăng ký một bóng đèn" }, locale)}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Three steps */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ol className="grid gap-5 md:grid-cols-3">
            {C.steps.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <li key={s.title.en} className="rounded-2xl border border-gray-100 bg-[#F7F9FC] p-6">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-[#1A56DB]" />
                    <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                  </div>
                  <h2 className="mt-3 text-base font-bold text-[#102A43]">{t(s.title, locale)}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(s.body, locale)}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Register */}
      <section id="register" className="scroll-mt-20 bg-[#F7F9FC] py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#102A43] sm:text-3xl">
            {t({ en: "Register your old lamp", zh: "登记你的旧灯", th: "ลงทะเบียนหลอดเก่าของคุณ", vi: "Đăng ký đèn cũ của bạn" }, locale)}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {t(
              { en: "No account. Two minutes.", zh: "不用注册账号，两分钟。", th: "ไม่ต้องสมัครสมาชิก ใช้เวลาสองนาที", vi: "Không cần tài khoản. Hai phút." },
              locale
            )}
          </p>

          <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Machine", zh: "机型", th: "รุ่นเครื่อง", vi: "Model máy" }, locale)} *
                </span>
                <select name="machine" required defaultValue={TRADE_IN_MACHINES[0]} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
                  {TRADE_IN_MACHINES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Country", zh: "国家 / 地区", th: "ประเทศ", vi: "Quốc gia" }, locale)} *
                </span>
                <select name="country" required className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
                  {TRADE_IN_COUNTRIES.map((c) => (
                    <option key={c.id} value={c.id}>{t(c.label, locale)}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Old lamp part number or ETIA code", zh: "旧灯料号或 ETIA 码", th: "หมายเลขชิ้นส่วนหรือรหัส ETIA", vi: "Mã hàng cũ hoặc mã ETIA" }, locale)}
                </span>
                <input
                  name="lamp"
                  placeholder={t({ en: "012-68000R, or leave blank", zh: "012-68000R，不知道就留空", th: "012-68000R หรือเว้นว่าง", vi: "012-68000R, hoặc để trống" }, locale)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "How many lamps", zh: "几支", th: "จำนวนหลอด", vi: "Số bóng" }, locale)} *
                </span>
                <input name="qty" type="number" min={1} max={99} defaultValue={1} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Did you buy it from ETIA?", zh: "是从 ETIA 买的吗？", th: "ซื้อจาก ETIA หรือไม่?", vi: "Bạn mua từ ETIA?" }, locale)}
                </span>
                <select name="origin" className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
                  <option>{t({ en: "No / bought elsewhere", zh: "不是，从别处买的", th: "ไม่ใช่ ซื้อจากที่อื่น", vi: "Không, mua nơi khác" }, locale)}</option>
                  <option>{t({ en: "Yes", zh: "是", th: "ใช่", vi: "Có" }, locale)}</option>
                  <option>{t({ en: "Not sure", zh: "不确定", th: "ไม่แน่ใจ", vi: "Không chắc" }, locale)}</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Hours on the lamp (if known)", zh: "这支灯的灯时（知道就填）", th: "ชั่วโมงใช้งาน (ถ้าทราบ)", vi: "Số giờ đã dùng (nếu biết)" }, locale)}
                </span>
                <input name="hours" inputMode="numeric" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
            </div>

            <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Name", zh: "姓名", th: "ชื่อ", vi: "Họ tên" }, locale)} *
                </span>
                <input name="name" required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Company", zh: "公司", th: "บริษัท", vi: "Công ty" }, locale)}
                </span>
                <input name="company" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Phone or email", zh: "电话或邮箱", th: "โทรศัพท์หรืออีเมล", vi: "Điện thoại hoặc email" }, locale)} *
                </span>
                <input name="contact" required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Anything else (optional)", zh: "其他说明（选填）", th: "อื่น ๆ (ไม่บังคับ)", vi: "Ghi chú (không bắt buộc)" }, locale)}
                </span>
                <textarea name="message" rows={2} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </label>
            </div>

            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            {status === "error" && err && <p className="mt-4 text-sm font-semibold text-red-600">{err}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-xl bg-[#41A62A] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#358B22] disabled:opacity-60 sm:w-auto"
            >
              {status === "sending"
                ? t({ en: "Sending…", zh: "正在提交…", th: "กำลังส่ง…", vi: "Đang gửi…" }, locale)
                : t(
                    { en: `Register — US$${TRADE_IN_VALUE_USD} per lamp`, zh: `登记——每支 ${TRADE_IN_VALUE_USD} 美元`, th: `ลงทะเบียน — ${TRADE_IN_VALUE_USD} ดอลลาร์ต่อหลอด`, vi: `Đăng ký — ${TRADE_IN_VALUE_USD} USD mỗi bóng` },
                    locale
                  )}
            </button>
          </form>
        </div>
      </section>

      {/* Safety + rules */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <ShieldAlert className="h-6 w-6 shrink-0 text-amber-600" />
            <div>
              <h2 className="text-base font-bold text-amber-900">{t(C.safetyTitle, locale)}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-amber-900">{t(C.safety, locale)}</p>
            </div>
          </div>

          <h2 className="mt-12 text-xl font-bold text-[#102A43]">{t(C.rulesTitle, locale)}</h2>
          <ul className="mt-5 space-y-3">
            {C.rules.map((r) => (
              <li key={r.en} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#41A62A]" />
                {t(r, locale)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
