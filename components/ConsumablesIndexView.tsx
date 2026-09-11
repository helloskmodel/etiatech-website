"use client";
import Link from "next/link";
import { ArrowRight, Boxes, Gauge, ShieldAlert } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import FinalCta from "@/components/FinalCta";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { inquiryMailto } from "@/components/contact";
import {
  consumableMachines,
  consumablesFor,
  consumableKinds,
  consumablesHref,
} from "@/components/consumables";

/**
 * The way in for the visitor who is not shopping for a machine — they already
 * own one, something has stopped curing the way it used to, and they need a
 * part number today. So the page asks one question, which machine, and gets
 * out of the way.
 */
export default function ConsumablesIndexView() {
  const { locale } = useLocale();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white">
        <HeroBanner src={PAGE_BANNERS.support} />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#41A62A]">
            {t({ en: "Consumables & Spare Parts", zh: "耗材与备件", th: "วัสดุสิ้นเปลืองและอะไหล่", vi: "Vật tư tiêu hao & phụ tùng" }, locale)}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-[#102A43] sm:text-4xl lg:text-5xl">
            {t(
              {
                en: "Find the part by the machine it belongs to",
                zh: "从机型找耗材",
                th: "ค้นหาอะไหล่จากเครื่องที่ใช้",
                vi: "Tìm phụ tùng theo máy đang dùng",
              },
              locale
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600">
            {t(
              {
                en: "Lamps, filter cartridges, light guides, lenses, windows and air filters — with the part number, what its published service life is, and the signs that say it is due. Pick your machine.",
                zh: "灯泡、滤片、导光管、镜头、视窗、空气滤网——给出料号、公布的使用寿命，以及该换了的判断依据。先选机型。",
                th: "หลอดไฟ คาร์ทริดจ์ฟิลเตอร์ ท่อนำแสง เลนส์ หน้าต่าง และไส้กรองอากาศ — พร้อมรหัสอะไหล่ อายุใช้งานที่ประกาศไว้ และสัญญาณที่บอกว่าถึงเวลาเปลี่ยน เลือกเครื่องของคุณ",
                vi: "Đèn, hộp kính lọc, ống dẫn sáng, thấu kính, cửa sổ và lọc gió — kèm mã hàng, tuổi thọ được công bố, và những dấu hiệu cho biết đã tới lúc thay. Hãy chọn máy của bạn.",
              },
              locale
            )}
          </p>
        </div>
      </section>

      {/* Machine picker */}
      <section className="bg-[#F7F9FC] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#102A43] sm:text-3xl">
            {t({ en: "Which machine?", zh: "哪一台机器？", th: "เครื่องรุ่นไหน?", vi: "Máy nào?" }, locale)}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {consumableMachines.map((m) => {
              const items = consumablesFor(m.slug);
              return (
                <Link
                  key={m.slug}
                  href={localizeHref(consumablesHref(m.slug), locale)}
                  className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#1A56DB]/30 hover:shadow-md"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{t(m.tech, locale)}</p>
                  <h3 className="mt-1 text-base font-bold leading-snug text-[#102A43] group-hover:text-[#1A56DB]">{m.name}</h3>
                  <ul className="mt-4 flex-1 space-y-1 text-xs text-gray-500">
                    {items.map((c) => (
                      <li key={c.id}>· {t(consumableKinds[c.kind], locale)}</li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#1A56DB]">
                    {t({ en: "Parts & service life", zh: "料号与使用寿命", th: "อะไหล่และอายุใช้งาน", vi: "Phụ tùng & tuổi thọ" }, locale)}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-gray-500">
            {t(
              {
                en: "Running a model that is not listed — an S1000, an F300S, a third-party system? Send us the model plate and we will tell you what we can supply.",
                zh: "机型不在上面——S1000、F300S，或者别家的系统？把铭牌发给我们，我们告诉你哪些能供。",
                th: "ใช้รุ่นที่ไม่อยู่ในรายการ — S1000, F300S หรือระบบของยี่ห้ออื่น? ส่งป้ายรุ่นมาให้เรา แล้วเราจะบอกว่าจัดหาอะไรให้ได้บ้าง",
                vi: "Đang dùng model không có trong danh sách — S1000, F300S, hay hệ của hãng khác? Gửi cho chúng tôi ảnh nhãn máy, chúng tôi sẽ cho biết có thể cung cấp những gì.",
              },
              locale
            )}
          </p>
        </div>
      </section>

      {/* How to read these pages */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#102A43] sm:text-3xl">
            {t({ en: "How to read a service-life figure", zh: "怎么看使用寿命这一栏", th: "วิธีอ่านค่าอายุใช้งาน", vi: "Cách đọc con số tuổi thọ" }, locale)}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Gauge,
                title: { en: "Rated in hours", zh: "按小时标称", th: "กำหนดเป็นชั่วโมง", vi: "Định mức theo giờ" },
                body: {
                  en: "Where the manufacturer publishes hours, we print the hours and the document they come from. A lamp is the clearest case: the machine counts the hours for you.",
                  zh: "厂家公布了小时数的，我们就把小时数和出处文档一起写出来。灯泡是最清楚的一种：机器自己替你计时。",
                  th: "เมื่อผู้ผลิตประกาศจำนวนชั่วโมง เราจะพิมพ์ชั่วโมงและเอกสารที่มาของตัวเลขนั้น หลอดไฟเป็นกรณีที่ชัดที่สุด: เครื่องนับชั่วโมงให้คุณเอง",
                  vi: "Ở đâu nhà sản xuất công bố số giờ, chúng tôi in số giờ và tài liệu nguồn. Đèn là trường hợp rõ nhất: máy tự đếm giờ cho bạn.",
                },
              },
              {
                icon: Boxes,
                title: { en: "Measured, not rated", zh: "按实测，不按小时", th: "วัดเอา ไม่ได้กำหนดไว้", vi: "Đo, không định mức" },
                body: {
                  en: "A filter, a window, an air filter: nobody rates these in hours because they age by what lands on them. We say so, and give the measurement or the inspection that decides it instead of a number we would be inventing.",
                  zh: "滤片、视窗、空气滤网：没人按小时标它们，因为它们是被脏东西弄老的。我们直说，并给出判断用的实测或目检方法，而不是编一个数出来。",
                  th: "ฟิลเตอร์ หน้าต่าง ไส้กรองอากาศ: ไม่มีใครกำหนดเป็นชั่วโมง เพราะมันเสื่อมตามสิ่งที่มาเกาะ เราจึงบอกตรง ๆ และให้วิธีวัดหรือวิธีตรวจที่ใช้ตัดสินแทนตัวเลขที่เราจะต้องแต่งขึ้น",
                  vi: "Kính lọc, cửa sổ, lọc gió: không ai định mức chúng theo giờ vì chúng già đi theo thứ bám lên chúng. Chúng tôi nói thẳng, và đưa ra phép đo hoặc cách kiểm tra để quyết định, thay vì một con số bịa ra.",
                },
              },
              {
                icon: ShieldAlert,
                title: { en: "Measure before you order", zh: "先测，再下单", th: "วัดก่อนสั่ง", vi: "Đo trước khi đặt" },
                body: {
                  en: "A cure that has gone soft can be the lamp, the filter, the guide or the lens, and they sit in series. A radiometer reading at the cure site tells you which — and a radiometer whose own calibration has lapsed tells you nothing.",
                  zh: "固化变软，可能是灯泡、滤片、导光管或镜头，它们串在一条光路上。在固化点量一下辐射计就知道是哪一个——而校准已过期的辐射计什么也说明不了。",
                  th: "การบ่มที่อ่อนลงอาจมาจากหลอด ฟิลเตอร์ ท่อนำแสง หรือเลนส์ ซึ่งเรียงต่อกันอยู่ ค่าที่อ่านจากเครื่องวัดรังสีที่จุดบ่มจะบอกว่าเป็นตัวไหน — และเครื่องวัดที่การสอบเทียบหมดอายุแล้วบอกอะไรไม่ได้เลย",
                  vi: "Mẻ đóng rắn bị mềm có thể do đèn, kính lọc, ống dẫn sáng hoặc thấu kính, và chúng nối tiếp nhau. Số đọc của máy đo bức xạ tại điểm đóng rắn cho biết là cái nào — còn máy đo đã hết hạn hiệu chuẩn thì chẳng cho biết gì.",
                },
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title.en} className="rounded-2xl border border-gray-100 bg-[#F7F9FC] p-6">
                <Icon className="h-6 w-6 text-[#1A56DB]" />
                <h3 className="mt-3 text-base font-bold text-[#102A43]">{t(title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(body, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        heading={t(
          { en: "Not sure which part it is?", zh: "不确定该换哪一个？", th: "ไม่แน่ใจว่าเป็นชิ้นไหน?", vi: "Chưa chắc là chi tiết nào?" },
          locale
        )}
        body={t(
          {
            en: "Send us the model, the lamp hours and what the cure is doing. An ETIA engineer will tell you which part to change before you buy one.",
            zh: "把机型、灯时和固化现在的表现发给我们。ETIA 工程师会先告诉你该换哪一个，再谈买。",
            th: "ส่งรุ่นเครื่อง ชั่วโมงหลอด และอาการของการบ่มมาให้เรา วิศวกร ETIA จะบอกว่าควรเปลี่ยนชิ้นไหนก่อนที่คุณจะซื้อ",
            vi: "Gửi cho chúng tôi model máy, số giờ đèn và tình trạng đóng rắn hiện tại. Kỹ sư ETIA sẽ cho biết nên thay chi tiết nào trước khi bạn mua.",
          },
          locale
        )}
        primary={{
          label: t({ en: "Ask an engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Hỏi kỹ sư" }, locale),
          href: localizeHref("/contact", locale),
        }}
        secondary={{
          label: t({ en: "Email us", zh: "发邮件", th: "ส่งอีเมล", vi: "Gửi email" }, locale),
          href: inquiryMailto(locale, { subject: "Consumables enquiry" }),
        }}
      />
    </>
  );
}
