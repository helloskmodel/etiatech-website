"use client";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Clock } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import FinalCta from "@/components/FinalCta";
import AddToInquiryButton from "@/components/inquiry/AddToInquiryButton";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { inquiryMailto } from "@/components/contact";
import {
  consumableKinds,
  consumableMachines,
  consumablesFor,
  consumablesHref,
  machineBySlug,
  partsFor,
  type Consumable,
} from "@/components/consumables";

/**
 * One machine's consumables, in the order they sit in the light path. Each one
 * gets the same four things and in the same order every time, because a
 * maintenance planner reads down the column, not across: what it is, what its
 * life is, how you know it is due, and the part numbers to order.
 */
export default function ConsumableMachineView({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const machine = machineBySlug.get(slug);
  const items = consumablesFor(slug);
  if (!machine) return null;
  const others = consumableMachines.filter((m) => m.slug !== slug);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 text-xs text-gray-400 sm:px-6 lg:px-8">
          <Link href={localizeHref(consumablesHref(), locale)} className="hover:text-[#1A56DB]">
            {t({ en: "Consumables", zh: "耗材", th: "วัสดุสิ้นเปลือง", vi: "Vật tư tiêu hao" }, locale)}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">{machine.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white">
        <HeroBanner src={PAGE_BANNERS.support} />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#41A62A]">{t(machine.tech, locale)}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-[#102A43] sm:text-4xl">
            {machine.name}
            <span className="block text-xl font-semibold text-gray-500 sm:text-2xl">
              {t({ en: "Consumables & service life", zh: "耗材与使用寿命", th: "วัสดุสิ้นเปลืองและอายุใช้งาน", vi: "Vật tư tiêu hao & tuổi thọ" }, locale)}
            </span>
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600">{t(machine.intro, locale)}</p>
          {machine.productHref && (
            <Link
              href={localizeHref(machine.productHref, locale)}
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#1A56DB] hover:underline"
            >
              {t({ en: "About the system itself", zh: "了解这台机器本身", th: "เกี่ยวกับตัวระบบเอง", vi: "Về bản thân hệ thống" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>

      {/* Jump list — a maintenance planner arrives looking for one row */}
      <nav className="border-b border-gray-100 bg-[#F7F9FC] py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 sm:px-6 lg:px-8">
          {items.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-[#1A56DB] hover:text-[#1A56DB]"
            >
              {t(c.name, locale)}
            </a>
          ))}
        </div>
      </nav>

      {/* The consumables */}
      <div className="bg-white">
        {items.map((c, i) => (
          <ConsumableBlock key={c.id} c={c} shaded={i % 2 === 1} />
        ))}
      </div>

      {/* Other machines */}
      <section className="border-t border-gray-100 bg-[#F7F9FC] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#102A43]">
            {t({ en: "Consumables for other machines", zh: "其他机型的耗材", th: "วัสดุสิ้นเปลืองของเครื่องรุ่นอื่น", vi: "Vật tư cho máy khác" }, locale)}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((m) => (
              <Link
                key={m.slug}
                href={localizeHref(consumablesHref(m.slug), locale)}
                className="group rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-[#1A56DB]/30 hover:shadow-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{t(m.tech, locale)}</p>
                <h3 className="mt-1 text-sm font-bold text-[#102A43] group-hover:text-[#1A56DB]">{m.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        heading={t(
          { en: "Order by part number, or ask first", zh: "按料号下单，或者先问", th: "สั่งด้วยรหัสอะไหล่ หรือถามก่อน", vi: "Đặt theo mã hàng, hoặc hỏi trước" },
          locale
        )}
        body={t(
          {
            en: "Add the part numbers you need to the inquiry list and send them in one message. If you are not sure which part has gone, tell us the model, the lamp hours and what the cure is doing — we will work it out before you buy anything.",
            zh: "把需要的料号加进询单，一次发过来。要是不确定坏的是哪一个，把机型、灯时和固化现在的表现告诉我们——买东西之前我们先帮你判断。",
            th: "เพิ่มรหัสอะไหล่ที่ต้องการลงในรายการสอบถามแล้วส่งมาในข้อความเดียว หากไม่แน่ใจว่าชิ้นไหนเสีย บอกรุ่นเครื่อง ชั่วโมงหลอด และอาการของการบ่มมา เราจะช่วยวิเคราะห์ก่อนที่คุณจะซื้ออะไร",
            vi: "Thêm các mã hàng bạn cần vào danh sách hỏi giá và gửi trong một tin nhắn. Nếu chưa chắc chi tiết nào hỏng, hãy cho biết model, số giờ đèn và tình trạng đóng rắn — chúng tôi sẽ xác định giúp trước khi bạn mua bất cứ thứ gì.",
          },
          locale
        )}
        primary={{
          label: t({ en: "View inquiry list", zh: "查看询单", th: "ดูรายการสอบถาม", vi: "Xem danh sách hỏi giá" }, locale),
          href: localizeHref("/inquiry", locale),
        }}
        secondary={{
          label: t({ en: "Email us", zh: "发邮件", th: "ส่งอีเมล", vi: "Gửi email" }, locale),
          href: inquiryMailto(locale, { subject: `${machine.name} consumables`, context: machine.name }),
        }}
      />
    </>
  );
}

function ConsumableBlock({ c, shaded }: { c: Consumable; shaded: boolean }) {
  const { locale } = useLocale();
  const rows = partsFor(c);

  return (
    <section id={c.id} className={`scroll-mt-24 border-t border-gray-100 py-12 ${shaded ? "bg-[#F7F9FC]" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* Left: what it is, its life, the signs */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              {t(consumableKinds[c.kind], locale)}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-[#102A43]">{t(c.name, locale)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{t(c.what, locale)}</p>

            {c.href && (
              <Link
                href={localizeHref(c.href, locale)}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1A56DB] hover:underline"
              >
                {t({ en: "Product details", zh: "产品详情", th: "รายละเอียดผลิตภัณฑ์", vi: "Chi tiết sản phẩm" }, locale)}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}

            {c.caution && (
              <div className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
                <p className="text-xs leading-relaxed text-amber-900">{t(c.caution, locale)}</p>
              </div>
            )}

            {c.life && (
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#1A56DB]">
                  <Clock className="h-4 w-4" />
                  {t({ en: "Service life", zh: "使用寿命", th: "อายุใช้งาน", vi: "Tuổi thọ" }, locale)}
                </p>
                {c.life.kind === "rated" ? (
                  <>
                    <dl className="mt-3 divide-y divide-gray-100">
                      {c.life.rows.map((r) => (
                        <div key={r.label.en} className="flex flex-wrap gap-x-4 gap-y-1 py-2">
                          <dt className="w-40 shrink-0 text-xs text-gray-500">{t(r.label, locale)}</dt>
                          <dd className="flex-1 text-sm font-semibold text-[#102A43]">{t(r.value, locale)}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-3 text-[11px] text-gray-400">
                      {t({ en: "Source", zh: "数据来源", th: "แหล่งข้อมูล", vi: "Nguồn" }, locale)}: {t(c.life.source, locale)}
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{t(c.life.basis, locale)}</p>
                )}
              </div>
            )}

            {c.signs && c.signs.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  {t({ en: "Replace it when", zh: "出现这些情况就该换", th: "เปลี่ยนเมื่อ", vi: "Thay khi" }, locale)}
                </p>
                <ul className="mt-3 space-y-2">
                  {c.signs.map((s) => (
                    <li key={s.en} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#41A62A]" />
                      {t(s, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: the part numbers */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              {t({ en: "Part numbers carried by ETIA", zh: "ETIA 备货料号", th: "รหัสอะไหล่ที่ ETIA จัดหา", vi: "Mã hàng ETIA cung cấp" }, locale)}
            </p>
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <ul className="divide-y divide-gray-100">
                {rows.map((p) => (
                  <li key={p.pn} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
                    <code className="w-32 shrink-0 font-mono text-xs font-bold text-[#1A56DB]">{p.pn}</code>
                    <span className="min-w-[12rem] flex-1 text-sm text-gray-700">
                      {p.desc}
                      {p.note && <em className="ml-1 not-italic text-xs text-gray-400">· {p.note}</em>}
                    </span>
                    <AddToInquiryButton item={{ kind: "part", pn: p.pn }} />
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-gray-400">
              {t(
                {
                  en: "These part numbers are on ETIA's item master — we buy and sell them in-region. Availability on the day is confirmed on the quotation.",
                  zh: "以上料号在 ETIA 的存货档案内，我们在区域内自行采购与销售。当日可供情况以报价单确认为准。",
                  th: "รหัสอะไหล่เหล่านี้อยู่ในทะเบียนสินค้าของ ETIA เราซื้อและขายภายในภูมิภาค ความพร้อมจ่ายในวันนั้นยืนยันในใบเสนอราคา",
                  vi: "Các mã hàng này nằm trong danh mục hàng hóa của ETIA — chúng tôi mua và bán trong khu vực. Khả năng cung cấp tại thời điểm đó được xác nhận trên báo giá.",
                },
                locale
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
