"use client";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, HelpCircle, Package } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { inquiryMailto } from "@/components/contact";
import { formatSerial, serialTypes, type SerialType } from "@/components/labels/serial";

/**
 * What a person sees after scanning an ETIA label. It is usually a phone, in a
 * plant, held by someone who wants one of three things: to know what this
 * thing is, to order another one, or to send this one back. So the page is
 * short, says what the code resolves to, and offers exactly those three doors.
 *
 * Four languages, because the label crosses borders and the scanner picks the
 * language, not us.
 */

export type ScanResult =
  | {
      status: "ok";
      code: string;
      type: SerialType;
      pn: string;
      name: string;
      issued: string;
      batch?: string;
      category?: string;
    }
  | { status: "unknown"; code: string }
  | { status: "invalid"; reason: "empty" | "format" | "type" | "check" };

export default function ScanResultView({ result }: { result: ScanResult }) {
  const { locale } = useLocale();

  if (result.status !== "ok") {
    return (
      <Shell>
        <div className="flex items-start gap-4">
          <HelpCircle className="mt-1 h-8 w-8 shrink-0 text-amber-500" />
          <div>
            <h1 className="text-2xl font-bold text-[#102A43]">
              {result.status === "unknown"
                ? t(
                    {
                      en: "This code is not in our register",
                      zh: "这个编码不在我们的登记里",
                      th: "ไม่พบรหัสนี้ในทะเบียนของเรา",
                      vi: "Mã này không có trong sổ đăng ký của chúng tôi",
                    },
                    locale
                  )
                : t(
                    {
                      en: "That is not an ETIA code",
                      zh: "这不是 ETIA 的编码",
                      th: "นี่ไม่ใช่รหัสของ ETIA",
                      vi: "Đây không phải mã của ETIA",
                    },
                    locale
                  )}
            </h1>
            {result.status === "unknown" && (
              <p className="mt-2 font-mono text-sm text-gray-500">{formatSerial(result.code)}</p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              {result.status === "unknown"
                ? t(
                    {
                      en: "The code is well formed but we have no record of issuing it. That can mean a label from a batch we have not registered yet — or a label that did not come from us. Send us a photograph of it and we will tell you which.",
                      zh: "编码格式是对的，但我们没有发出过它的记录。可能是还没登记的批次，也可能这张标签不是我们出的。把标签拍张照发给我们，我们帮你分辨。",
                      th: "รหัสมีรูปแบบถูกต้อง แต่เราไม่มีบันทึกว่าเคยออกรหัสนี้ อาจเป็นล็อตที่ยังไม่ได้ลงทะเบียน หรืออาจเป็นฉลากที่ไม่ได้มาจากเรา ส่งรูปฉลากมาให้เรา แล้วเราจะบอกได้ว่าเป็นกรณีไหน",
                      vi: "Mã đúng định dạng nhưng chúng tôi không có hồ sơ đã phát hành nó. Có thể là một lô chưa được đăng ký — hoặc là nhãn không do chúng tôi in. Hãy gửi cho chúng tôi ảnh chụp nhãn, chúng tôi sẽ cho biết là trường hợp nào.",
                    },
                    locale
                  )
                : t(
                    {
                      en: "Check the twelve characters printed under the barcode. If they match what you typed, the label may be damaged — send us a photograph.",
                      zh: "对一下条形码下面那十二位。如果和你输入的一致，可能是标签本身损坏了——把标签拍张照发给我们。",
                      th: "ตรวจอักขระสิบสองตัวที่พิมพ์ใต้บาร์โค้ด หากตรงกับที่พิมพ์เข้ามา ฉลากอาจเสียหาย — ส่งรูปมาให้เรา",
                      vi: "Hãy kiểm tra mười hai ký tự in dưới mã vạch. Nếu khớp với những gì bạn nhập thì có thể nhãn đã hỏng — hãy gửi cho chúng tôi ảnh chụp.",
                    },
                    locale
                  )}
            </p>
            <ContactRow context={result.status === "unknown" ? result.code : "unknown label"} />
          </div>
        </div>
      </Shell>
    );
  }

  const type = serialTypes[result.type];
  const isLamp = result.type === "L";
  const isGuide = result.type === "G";

  return (
    <Shell>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#41A62A]">
        <CheckCircle2 className="h-4 w-4" />
        {t(
          { en: "Registered with ETIA", zh: "已在 ETIA 登记", th: "ลงทะเบียนกับ ETIA แล้ว", vi: "Đã đăng ký với ETIA" },
          locale
        )}
      </div>

      <h1 className="mt-3 text-2xl font-bold leading-tight text-[#102A43] sm:text-3xl">{result.pn}</h1>
      <p className="mt-2 text-base leading-relaxed text-gray-600">{result.name}</p>

      <dl className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white">
        <Row label={{ en: "Code", zh: "编码", th: "รหัส", vi: "Mã" }} value={formatSerial(result.code)} mono />
        <Row label={{ en: "What it is", zh: "类别", th: "ประเภท", vi: "Loại" }} value={t(type.name, locale)} />
        {result.batch && (
          <Row label={{ en: "Batch", zh: "批次", th: "ล็อต", vi: "Lô" }} value={result.batch} />
        )}
        <Row
          label={{ en: "Registered", zh: "登记日期", th: "วันที่ลงทะเบียน", vi: "Ngày đăng ký" }}
          value={result.issued}
        />
      </dl>

      {isGuide && (
        <div className="mt-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm leading-relaxed text-amber-900">
            {t(
              {
                en: "Do not bend, kink, coil tightly or hang this light guide by its tip. Damage from bending is permanent and is usually invisible from the outside — the first sign is a cure that will not pass.",
                zh: "这根导光管不可弯折、不可打死弯、不可紧绕成盘、不可提着出光端吊挂。弯折造成的损伤不可逆，而且外表通常看不出来——第一个征兆是固化不合格。",
                th: "ห้ามดัด หักพับ ม้วนแน่น หรือแขวนท่อนำแสงนี้ด้วยปลายของมัน ความเสียหายจากการดัดเป็นแบบถาวรและมักมองไม่เห็นจากภายนอก — สัญญาณแรกคือการบ่มที่ไม่ผ่าน",
                vi: "Không uốn gập, làm gãy khúc, cuộn chặt hay treo ống dẫn sáng này bằng chính đầu của nó. Hư hỏng do uốn là vĩnh viễn và thường không nhìn thấy từ bên ngoài — dấu hiệu đầu tiên là mẻ đóng rắn không đạt.",
              },
              locale
            )}
          </p>
        </div>
      )}

      {isLamp && (
        <div className="mt-6 rounded-2xl border border-[#1A56DB]/20 bg-[#1A56DB]/5 p-5">
          <h2 className="flex items-center gap-2 text-sm font-bold text-[#1A56DB]">
            <Package className="h-4 w-4" />
            {t(
              { en: "Trade-in on this lamp", zh: "这支灯的以旧换新", th: "โปรแกรมเทิร์นหลอดนี้", vi: "Đổi cũ lấy mới cho đèn này" },
              locale
            )}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            {t(
              {
                en: "When this lamp reaches end of life, register it with us and we credit the return against the replacement. Mercury lamps are hazardous waste and rules differ by country, so tell us where the lamp is and we will arrange compliant disposal locally rather than shipping it across a border.",
                zh: "这支灯到寿命后，把它登记给我们，退回可抵扣新灯的货款。汞灯属于危险废物，各国规定不同，所以请告诉我们灯在哪个国家，我们就地安排合规处置，不做跨境运输。",
                th: "เมื่อหลอดนี้หมดอายุ ให้ลงทะเบียนกับเรา แล้วเราจะให้เครดิตจากการคืนหลอดไปหักกับหลอดใหม่ หลอดปรอทเป็นของเสียอันตรายและกฎระเบียบต่างกันไปในแต่ละประเทศ โปรดแจ้งว่าหลอดอยู่ที่ใด เราจะจัดการกำจัดอย่างถูกต้องในพื้นที่แทนการขนส่งข้ามพรมแดน",
                vi: "Khi đèn này hết tuổi thọ, hãy đăng ký với chúng tôi và chúng tôi sẽ ghi có khoản trả lại vào đèn thay thế. Đèn thủy ngân là chất thải nguy hại và quy định khác nhau theo từng nước, nên hãy cho biết đèn đang ở đâu — chúng tôi sẽ thu xếp xử lý hợp quy tại chỗ thay vì vận chuyển qua biên giới.",
              },
              locale
            )}
          </p>
          <a
            href={inquiryMailto(locale, {
              subject: `Lamp trade-in ${formatSerial(result.code)}`,
              context: `${result.pn} · ${formatSerial(result.code)}`,
              fields: ["Country where the lamp is installed", "Lamp hours on the system", "Replacement part number needed"],
            })}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#41A62A] px-5 py-2.5 text-sm font-bold text-white"
          >
            {t(
              { en: "Register this lamp", zh: "登记这支灯", th: "ลงทะเบียนหลอดนี้", vi: "Đăng ký đèn này" },
              locale
            )}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}

      <ContactRow context={`${result.pn} · ${formatSerial(result.code)}`} />

      <p className="mt-10 text-xs leading-relaxed text-gray-400">
        {t(
          {
            en: "This page shows what ETIA registered when the code was issued. It is not a warranty statement and does not record where the item has been since.",
            zh: "本页显示的是发码当时 ETIA 登记的信息。它不是保修凭证，也不记录该物件之后的流向。",
            th: "หน้านี้แสดงข้อมูลที่ ETIA ลงทะเบียนไว้ตอนออกรหัส ไม่ใช่เอกสารรับประกัน และไม่ได้บันทึกว่าสิ่งของนี้ผ่านที่ใดมาบ้าง",
            vi: "Trang này hiển thị những gì ETIA đã đăng ký khi cấp mã. Đây không phải là chứng từ bảo hành và không ghi lại nơi món hàng đã đi qua kể từ đó.",
          },
          locale
        )}
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#F7F9FC] py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">{children}</div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: { en: string; zh?: string; th?: string; vi?: string };
  value: string;
  mono?: boolean;
}) {
  const { locale } = useLocale();
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 px-5 py-3">
      <dt className="w-32 shrink-0 text-xs text-gray-500">{t(label, locale)}</dt>
      <dd className={`flex-1 text-sm font-semibold text-[#102A43] ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}

function ContactRow({ context }: { context: string }) {
  const { locale } = useLocale();
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link
        href={localizeHref("/consumables", locale)}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-[#1A56DB]"
      >
        {t(
          { en: "Order a replacement", zh: "订购替换件", th: "สั่งของทดแทน", vi: "Đặt hàng thay thế" },
          locale
        )}
        <ArrowRight className="h-4 w-4" />
      </Link>
      <a
        href={inquiryMailto(locale, { subject: "Scanned ETIA label", context })}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700"
      >
        {t({ en: "Ask ETIA", zh: "咨询 ETIA", th: "สอบถาม ETIA", vi: "Hỏi ETIA" }, locale)}
      </a>
    </div>
  );
}
