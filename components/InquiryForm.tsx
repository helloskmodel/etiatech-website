"use client";
import { useState } from "react";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { localeSalesEmail } from "@/components/contact";
import { track } from "@/components/omnicure/track";

// The inquiry form on /contact.
//
// Why this exists: every other contact CTA on the site is a mailto: link, and
// mailto fails silently for the many visitors browsing with webmail and no
// desktop mail client configured — they click, nothing happens, and the lead
// is lost without either side knowing. A real form keeps the visitor on the
// page and puts the enquiry in the sales inbox over SMTP (see /api/lead).
//
// mailto is kept, but only as the fallback for when server delivery is
// unavailable, so a submitted enquiry is never dropped on the floor.

type Status = "idle" | "sending" | "done" | "handoff";

export default function InquiryForm({ inquiryType }: { inquiryType: string }) {
  const { locale } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    if (!form.name.trim()) {
      setErr(t({ en: "Please tell us your name.", zh: "请填写您的姓名。", th: "กรุณากรอกชื่อของคุณ", vi: "Vui lòng cho biết tên của bạn." }, locale));
      return;
    }
    if (!form.email.trim() && !form.phone.trim()) {
      setErr(t({
        en: "Please leave an email or a phone number so we can reply.",
        zh: "请至少留下邮箱或电话，以便我们回复您。",
        th: "กรุณาระบุอีเมลหรือเบอร์โทรศัพท์ เพื่อให้เราติดต่อกลับได้",
        vi: "Vui lòng để lại email hoặc số điện thoại để chúng tôi liên hệ lại.",
      }, locale));
      return;
    }

    setErr("");
    setStatus("sending");
    track("generate_lead", { page: "contact", lang: locale, model: inquiryType });

    // The CTA that sent them here passes the product or technology page they
    // came from as ?topic= — it tells sales what the visitor was reading when
    // they decided to get in touch. Read at submit time rather than during
    // render, so there is no hydration mismatch and no Suspense boundary to
    // arrange around useSearchParams.
    const topic =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("topic")?.slice(0, 40) ?? ""
        : "";
    const payload = { ...form, inquiryType, model: topic, page: "contact", lang: locale };

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
      /* network error — fall through to the mail client */
    }

    // Server delivery unavailable: hand the enquiry to the visitor's mail
    // client with everything they typed already filled in, so the work they
    // just did is not thrown away.
    const body = [
      `Inquiry type: ${inquiryType}`,
      topic && `Topic: ${topic}`,
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      form.email && `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.message && `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.assign(
      `mailto:${localeSalesEmail(locale)}?subject=${encodeURIComponent(`Inquiry — ${inquiryType}`)}&body=${encodeURIComponent(body)}`,
    );
    setStatus("handoff");
  }

  if (status === "done" || status === "handoff") {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[#E6EAF0] bg-[#F6F8FB] p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#41A62A]" />
        <h3 className="mt-4 text-xl font-bold text-[#102A43]">
          {status === "done"
            ? t({ en: "Thank you — your inquiry is on its way.", zh: "感谢您的咨询，我们已收到。", th: "ขอบคุณ เราได้รับคำสอบถามของคุณแล้ว", vi: "Cảm ơn bạn — yêu cầu đã được gửi." }, locale)
            : t({ en: "Almost there — please send the email we just opened.", zh: "还差一步 —— 请发送刚刚打开的邮件。", th: "อีกนิดเดียว กรุณาส่งอีเมลที่เพิ่งเปิดขึ้น", vi: "Sắp xong — vui lòng gửi email vừa được mở." }, locale)}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[#5F6C7B]">
          {status === "done"
            ? t({
                en: "An ETIA engineer will get back to you, usually within one business day.",
                zh: "ETIA 工程师会尽快与您联系，通常在 1 个工作日内。",
                th: "วิศวกร ETIA จะติดต่อกลับ โดยปกติภายในหนึ่งวันทำการ",
                vi: "Kỹ sư ETIA sẽ liên hệ lại, thường trong vòng một ngày làm việc.",
              }, locale)
            : t({
                en: "If nothing opened, email us directly at the address below.",
                zh: "如果没有自动打开邮件，请直接发送到下方邮箱。",
                th: "หากไม่มีอะไรเปิดขึ้น กรุณาส่งอีเมลถึงเราตามที่อยู่ด้านล่าง",
                vi: "Nếu không có gì mở ra, vui lòng gửi email trực tiếp tới địa chỉ bên dưới.",
              }, locale)}
        </p>
        <p className="mt-4 text-xs text-[#7B8794]">
          <a href={`mailto:${localeSalesEmail(locale)}`} className="font-semibold text-[#41A62A] hover:underline">
            {localeSalesEmail(locale)}
          </a>
        </p>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-[#D4DFEC] bg-white px-4 py-3 text-sm text-[#102A43] outline-none transition focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/15";
  const label = "block text-xs font-bold uppercase tracking-wide text-[#1A56DB]";

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-6 max-w-xl space-y-4 text-left" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="iq-name" className={label}>
            {t({ en: "Name", zh: "姓名", th: "ชื่อ", vi: "Tên" }, locale)} <span className="text-[#41A62A]">*</span>
          </label>
          <input id="iq-name" name="name" value={form.name} onChange={set("name")} className={field} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="iq-company" className={label}>
            {t({ en: "Company", zh: "公司", th: "บริษัท", vi: "Công ty" }, locale)}
          </label>
          <input id="iq-company" name="company" value={form.company} onChange={set("company")} className={field} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="iq-email" className={label}>
            {t({ en: "Email", zh: "邮箱", th: "อีเมล", vi: "Email" }, locale)}
          </label>
          <input id="iq-email" name="email" type="email" inputMode="email" value={form.email} onChange={set("email")} className={field} autoComplete="email" />
        </div>
        <div>
          <label htmlFor="iq-phone" className={label}>
            {t({ en: "Phone / WhatsApp", zh: "电话 / 微信", th: "โทรศัพท์ / LINE", vi: "Điện thoại / Zalo" }, locale)}
          </label>
          <input id="iq-phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} className={field} autoComplete="tel" />
        </div>
      </div>

      <p className="text-xs text-[#7B8794]">
        {t({
          en: "Email or phone — either one is enough for us to reply.",
          zh: "邮箱或电话，留一个即可。",
          th: "อีเมลหรือเบอร์โทร อย่างใดอย่างหนึ่งก็เพียงพอ",
          vi: "Email hoặc điện thoại — chỉ cần một là đủ.",
        }, locale)}
      </p>

      <div>
        <label htmlFor="iq-message" className={label}>
          {t({ en: "Your application or question", zh: "您的应用或问题", th: "การใช้งานหรือคำถามของคุณ", vi: "Ứng dụng hoặc câu hỏi của bạn" }, locale)}
        </label>
        <textarea
          id="iq-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={set("message")}
          className={field}
          placeholder={t({
            en: "e.g. bonding a polycarbonate housing, 300 mm web, 20 m/min line speed",
            zh: "例如：聚碳酸酯外壳粘接，300mm 幅宽，线速 20 米/分钟",
            th: "เช่น การยึดติดชิ้นงาน polycarbonate, หน้ากว้าง 300 มม., ความเร็วสาย 20 ม./นาที",
            vi: "VD: dán vỏ polycarbonate, khổ 300 mm, tốc độ dây chuyền 20 m/phút",
          }, locale)}
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={set("website")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {err && <p className="text-sm font-medium text-[#C2410C]">{err}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t({ en: "Sending…", zh: "发送中…", th: "กำลังส่ง…", vi: "Đang gửi…" }, locale)}
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            {t({ en: "Send Inquiry", zh: "提交咨询", th: "ส่งคำสอบถาม", vi: "Gửi yêu cầu" }, locale)}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#7B8794]">
        {t({ en: "Goes to", zh: "发送至", th: "ส่งถึง", vi: "Gửi đến" }, locale)}{" "}
        <a href={`mailto:${localeSalesEmail(locale)}`} className="font-semibold text-[#41A62A] hover:underline">
          {localeSalesEmail(locale)}
        </a>
      </p>
    </form>
  );
}
