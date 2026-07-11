"use client";
import Link from "next/link";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { localeSalesEmail } from "@/components/contact";

const LAST_UPDATED: LangText = { en: "10 July 2026", zh: "2026年7月10日", th: "10 กรกฎาคม 2026", vi: "10 tháng 7 năm 2026" };

export default function TermsView() {
  const { locale } = useLocale();
  return (
    <>
      {/* Hero */}
      <section className="py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1241a3 0%, #1A56DB 100%)" }}>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#41A62A" }}>{t({ en: "Legal", zh: "法律条款", th: "ข้อกฎหมาย", vi: "Pháp lý" }, locale)}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{t({ en: "Terms of Use", zh: "使用条款", th: "ข้อกำหนดการใช้งาน", vi: "Điều khoản Sử dụng" }, locale)}</h1>
          <p className="text-sm text-gray-300">{t({ en: "Last updated:", zh: "最后更新:", th: "ปรับปรุงล่าสุด:", vi: "Cập nhật lần cuối:" }, locale)} {t(LAST_UPDATED, locale)}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm leading-relaxed space-y-8">
          <div>
            <p>
              {t({
                en: 'These Terms of Use ("Terms") govern your access to and use of this website operated by ETIA-TECH (ASIA) Co., Limited ("ETIA", "we", "us", or "our"), a company incorporated in Hong Kong. By accessing or using this website, you agree to be bound by these Terms. If you do not agree, please do not use the website.',
                zh: "本使用条款（「条款」）规范您对由 ETIA-TECH (ASIA) Co., Limited（「ETIA」「我们」，一家在中国香港注册成立的公司）运营之本网站的访问与使用。访问或使用本网站，即表示您同意受本条款约束。若您不同意，请勿使用本网站。",
                th: 'ข้อกำหนดการใช้งานนี้ ("ข้อกำหนด") ควบคุมการเข้าถึงและการใช้งานเว็บไซต์นี้ซึ่งดำเนินการโดย ETIA-TECH (ASIA) Co., Limited ("ETIA", "เรา", หรือ "ของเรา") ซึ่งเป็นบริษัทที่จดทะเบียนจัดตั้งในฮ่องกง การเข้าถึงหรือการใช้งานเว็บไซต์นี้ถือว่าท่านตกลงที่จะผูกพันตามข้อกำหนดเหล่านี้ หากท่านไม่ยอมรับ โปรดงดใช้งานเว็บไซต์',
                vi: 'Các Điều khoản Sử dụng này ("Điều khoản") điều chỉnh việc truy cập và sử dụng của quý vị đối với trang web này do ETIA-TECH (ASIA) Co., Limited ("ETIA", "chúng tôi" hoặc "của chúng tôi"), một công ty được thành lập tại Hồng Kông, vận hành. Bằng việc truy cập hoặc sử dụng trang web này, quý vị đồng ý chịu sự ràng buộc của các Điều khoản này. Nếu quý vị không đồng ý, vui lòng không sử dụng trang web.',
              }, locale)}
            </p>
          </div>

          <Section title={{ en: "1. Use of the Website", zh: "1. 网站的使用", th: "1. การใช้งานเว็บไซต์", vi: "1. Sử dụng Trang web" }} locale={locale}>
            <p>{t({ en: "You may use this website for lawful business and informational purposes only. You agree not to misuse the site, interfere with its operation, attempt unauthorised access, or use it in any way that could damage the site or infringe the rights of others.", zh: "您仅可将本网站用于合法的商业与信息用途。您同意不滥用本网站、不干扰其运行、不试图未经授权访问，亦不以任何可能损害本网站或侵犯他人权利的方式使用本网站。", th: "ท่านสามารถใช้งานเว็บไซต์นี้เพื่อวัตถุประสงค์ทางธุรกิจและการให้ข้อมูลที่ชอบด้วยกฎหมายเท่านั้น ท่านตกลงที่จะไม่ใช้งานเว็บไซต์ในทางที่ผิด ไม่รบกวนการทำงานของเว็บไซต์ ไม่พยายามเข้าถึงโดยไม่ได้รับอนุญาต และไม่ใช้งานในลักษณะใด ๆ ที่อาจก่อความเสียหายแก่เว็บไซต์หรือละเมิดสิทธิของผู้อื่น", vi: "Quý vị chỉ được sử dụng trang web này cho các mục đích kinh doanh và cung cấp thông tin hợp pháp. Quý vị đồng ý không lạm dụng trang web, không can thiệp vào hoạt động của trang web, không cố gắng truy cập trái phép, hoặc sử dụng theo bất kỳ cách nào có thể gây tổn hại đến trang web hoặc xâm phạm quyền của người khác." }, locale)}</p>
          </Section>

          <Section title={{ en: "2. Intellectual Property", zh: "2. 知识产权", th: "2. ทรัพย์สินทางปัญญา", vi: "2. Sở hữu Trí tuệ" }} locale={locale}>
            <p>{t({ en: "All content on this website — including text, graphics, logos, images, and layout — is the property of ETIA or its licensors and is protected by applicable intellectual property laws. Product names and trademarks such as OmniCure®, Phoseon®, and others are the property of their respective owners and are used for identification and reference only. You may not reproduce, distribute, or create derivative works from any content without prior written permission.", zh: "本网站的所有内容——包括文字、图形、标识、图像及版式——均为 ETIA 或其许可方的财产，受适用知识产权法律保护。OmniCure®、Phoseon® 等产品名称与商标均为其各自所有者的财产，仅用于识别与参考。未经事先书面许可，您不得复制、分发或据此制作衍生作品。", th: "เนื้อหาทั้งหมดบนเว็บไซต์นี้ — รวมถึงข้อความ ภาพกราฟิก โลโก้ รูปภาพ และการจัดวาง — เป็นทรัพย์สินของ ETIA หรือผู้ให้สิทธิของ ETIA และได้รับความคุ้มครองตามกฎหมายทรัพย์สินทางปัญญาที่เกี่ยวข้อง ชื่อผลิตภัณฑ์และเครื่องหมายการค้า เช่น OmniCure®, Phoseon® และอื่น ๆ เป็นทรัพย์สินของเจ้าของแต่ละราย และใช้เพื่อการระบุและอ้างอิงเท่านั้น ท่านไม่สามารถทำซ้ำ เผยแพร่ หรือสร้างงานดัดแปลงจากเนื้อหาใด ๆ โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรล่วงหน้า", vi: "Toàn bộ nội dung trên trang web này — bao gồm văn bản, hình ảnh đồ họa, biểu trưng, hình ảnh và bố cục — là tài sản của ETIA hoặc các bên cấp phép của ETIA và được bảo hộ theo luật sở hữu trí tuệ hiện hành. Tên sản phẩm và nhãn hiệu như OmniCure®, Phoseon® và các nhãn hiệu khác là tài sản của các chủ sở hữu tương ứng và chỉ được sử dụng cho mục đích nhận diện và tham chiếu. Quý vị không được sao chép, phân phối hoặc tạo ra các tác phẩm phái sinh từ bất kỳ nội dung nào mà không có sự cho phép trước bằng văn bản." }, locale)}</p>
          </Section>

          <Section title={{ en: "3. Product Information & Availability", zh: "3. 产品信息与可用性", th: "3. ข้อมูลผลิตภัณฑ์และความพร้อมจำหน่าย", vi: "3. Thông tin Sản phẩm & Tình trạng Sẵn có" }} locale={locale}>
            <p>{t({ en: "Product descriptions, specifications, images, and technical data are provided for general information and may be updated or changed without notice. They do not constitute a binding offer. Actual specifications, availability, and pricing should be confirmed with ETIA before purchase.", zh: "产品说明、规格、图片与技术数据仅供一般参考，可能在不另行通知的情况下更新或变更，且不构成具约束力的要约。实际规格、供货情况与价格应在购买前与 ETIA 确认。", th: "คำอธิบายผลิตภัณฑ์ ข้อกำหนดเฉพาะ รูปภาพ และข้อมูลทางเทคนิค จัดทำขึ้นเพื่อเป็นข้อมูลทั่วไป และอาจมีการปรับปรุงหรือเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า ข้อมูลดังกล่าวไม่ถือเป็นคำเสนอที่มีผลผูกพัน ข้อกำหนดเฉพาะ ความพร้อมจำหน่าย และราคาที่แท้จริงควรได้รับการยืนยันกับ ETIA ก่อนการซื้อ", vi: "Mô tả sản phẩm, thông số kỹ thuật, hình ảnh và dữ liệu kỹ thuật được cung cấp nhằm mục đích thông tin chung và có thể được cập nhật hoặc thay đổi mà không cần thông báo trước. Những thông tin này không cấu thành một đề nghị có tính ràng buộc. Thông số kỹ thuật, tình trạng sẵn có và giá cả thực tế cần được xác nhận với ETIA trước khi mua." }, locale)}</p>
          </Section>

          <Section title={{ en: "4. Authorized Distributor & Warranties", zh: "4. 授权代理与保修", th: "4. ตัวแทนจำหน่ายที่ได้รับอนุญาตและการรับประกัน", vi: "4. Nhà Phân phối Được Ủy quyền & Bảo hành" }} locale={locale}>
            <p>{t({ en: "ETIA may act as an authorized distributor, reseller, service provider, or product sourcing partner for selected products and territories shown on this website. Authorization status, supply channel, warranty and service scope may vary by brand, product model and country. Please confirm the applicable terms with ETIA before purchase. Product warranties, where applicable, are provided by the respective manufacturers in accordance with their own terms. Nothing on this website constitutes a warranty by ETIA beyond what is expressly agreed in a written sales contract.", zh: "对于本网站所示的部分产品及地区，ETIA 可能以授权经销商、经销商、服务提供商或产品采购伙伴的身份提供服务。授权状态、供应渠道、保修与服务范围可能因品牌、产品型号与国家/地区而异。购买前请向 ETIA 确认适用条款。适用的产品保修由各原厂制造商按其自身条款提供。除书面销售合同中明确约定者外，本网站的任何内容均不构成 ETIA 的保证。", th: "สำหรับผลิตภัณฑ์และพื้นที่บางส่วนที่แสดงบนเว็บไซต์นี้ ETIA อาจทำหน้าที่เป็นตัวแทนจำหน่ายที่ได้รับอนุญาต ผู้จัดจำหน่าย ผู้ให้บริการ หรือพันธมิตรจัดหาสินค้า สถานะการได้รับอนุญาต ช่องทางการจัดหา ขอบเขตการรับประกันและบริการอาจแตกต่างกันตามแบรนด์ รุ่นผลิตภัณฑ์ และประเทศ โปรดยืนยันเงื่อนไขที่เกี่ยวข้องกับ ETIA ก่อนการซื้อ การรับประกันผลิตภัณฑ์ (หากมี) จัดให้โดยผู้ผลิตแต่ละรายตามข้อกำหนดของผู้ผลิตนั้น ๆ ไม่มีสิ่งใดบนเว็บไซต์นี้ที่ถือเป็นการรับประกันโดย ETIA นอกเหนือจากที่ได้ตกลงกันไว้อย่างชัดแจ้งในสัญญาการขายที่เป็นลายลักษณ์อักษร", vi: "Đối với một số sản phẩm và khu vực được thể hiện trên trang web này, ETIA có thể đóng vai trò là nhà phân phối được ủy quyền, đại lý bán lại, nhà cung cấp dịch vụ hoặc đối tác tìm nguồn sản phẩm. Tình trạng ủy quyền, kênh cung ứng, phạm vi bảo hành và dịch vụ có thể khác nhau theo thương hiệu, mẫu sản phẩm và quốc gia. Vui lòng xác nhận các điều khoản áp dụng với ETIA trước khi mua. Bảo hành sản phẩm, nếu có, do các nhà sản xuất tương ứng cung cấp theo các điều khoản riêng của họ. Không có nội dung nào trên trang web này cấu thành một cam kết bảo hành của ETIA ngoài những gì đã được thỏa thuận rõ ràng trong hợp đồng mua bán bằng văn bản." }, locale)}</p>
          </Section>

          <Section title={{ en: "5. Information Provided “As Is”", zh: "5. 信息按「现状」提供", th: "5. ข้อมูลที่ให้ตาม「สภาพที่เป็นอยู่」", vi: "5. Thông tin Được Cung cấp “Nguyên trạng”" }} locale={locale}>
            <p>{t({ en: 'Information on this website is provided "as is" for general reference and does not constitute engineering, legal, or professional advice. You are responsible for evaluating the suitability of any product for your specific application. To the fullest extent permitted by law, ETIA disclaims all implied warranties, including those of merchantability and fitness for a particular purpose.', zh: "本网站的信息按「现状」提供，仅供一般参考，不构成工程、法律或专业意见。您有责任评估任何产品是否适合您的具体应用。在法律允许的最大范围内，ETIA 不提供任何默示保证，包括适销性与特定用途适用性的保证。", th: 'ข้อมูลบนเว็บไซต์นี้จัดให้ตาม「สภาพที่เป็นอยู่」เพื่อการอ้างอิงทั่วไป และไม่ถือเป็นคำแนะนำทางวิศวกรรม กฎหมาย หรือทางวิชาชีพ ท่านมีหน้าที่รับผิดชอบในการประเมินความเหมาะสมของผลิตภัณฑ์ใด ๆ สำหรับการใช้งานเฉพาะของท่าน ในขอบเขตสูงสุดที่กฎหมายอนุญาต ETIA ขอปฏิเสธการรับประกันโดยนัยทั้งปวง รวมถึงการรับประกันด้านความสามารถในการขายได้และความเหมาะสมสำหรับวัตถุประสงค์เฉพาะ', vi: 'Thông tin trên trang web này được cung cấp "nguyên trạng" nhằm mục đích tham khảo chung và không cấu thành tư vấn kỹ thuật, pháp lý hay chuyên môn. Quý vị có trách nhiệm đánh giá sự phù hợp của bất kỳ sản phẩm nào đối với ứng dụng cụ thể của mình. Trong phạm vi tối đa được pháp luật cho phép, ETIA từ chối mọi bảo đảm ngụ ý, bao gồm bảo đảm về khả năng thương mại và sự phù hợp cho một mục đích cụ thể.' }, locale)}</p>
          </Section>

          <Section title={{ en: "6. Third-Party Links", zh: "6. 第三方链接", th: "6. ลิงก์ของบุคคลภายนอก", vi: "6. Liên kết của Bên Thứ ba" }} locale={locale}>
            <p>{t({ en: "This website may contain links to third-party websites. ETIA does not control and is not responsible for the content, policies, or practices of those websites. Accessing them is at your own risk.", zh: "本网站可能包含指向第三方网站的链接。ETIA 不控制亦不对这些网站的内容、政策或做法负责。访问这些网站的风险由您自行承担。", th: "เว็บไซต์นี้อาจมีลิงก์ไปยังเว็บไซต์ของบุคคลภายนอก ETIA ไม่ได้ควบคุมและไม่รับผิดชอบต่อเนื้อหา นโยบาย หรือแนวปฏิบัติของเว็บไซต์เหล่านั้น การเข้าถึงเว็บไซต์ดังกล่าวถือเป็นความเสี่ยงของท่านเอง", vi: "Trang web này có thể chứa các liên kết đến các trang web của bên thứ ba. ETIA không kiểm soát và không chịu trách nhiệm về nội dung, chính sách hoặc thông lệ của các trang web đó. Việc truy cập các trang web đó là rủi ro của riêng quý vị." }, locale)}</p>
          </Section>

          <Section title={{ en: "7. Limitation of Liability", zh: "7. 责任限制", th: "7. การจำกัดความรับผิด", vi: "7. Giới hạn Trách nhiệm" }} locale={locale}>
            <p>{t({ en: "To the fullest extent permitted by law, ETIA shall not be liable for any indirect, incidental, special, or consequential damages arising from your access to, use of, or inability to use this website or any information on it.", zh: "在法律允许的最大范围内，对于因您访问、使用或无法使用本网站或其上任何信息而产生的任何间接、附带、特殊或后果性损害，ETIA 概不负责。", th: "ในขอบเขตสูงสุดที่กฎหมายอนุญาต ETIA จะไม่รับผิดต่อความเสียหายทางอ้อม ความเสียหายโดยบังเอิญ ความเสียหายพิเศษ หรือความเสียหายอันเป็นผลสืบเนื่องใด ๆ ที่เกิดจากการเข้าถึง การใช้งาน หรือการไม่สามารถใช้งานเว็บไซต์นี้หรือข้อมูลใด ๆ บนเว็บไซต์", vi: "Trong phạm vi tối đa được pháp luật cho phép, ETIA sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hay hệ quả nào phát sinh từ việc quý vị truy cập, sử dụng hoặc không thể sử dụng trang web này hay bất kỳ thông tin nào trên đó." }, locale)}</p>
          </Section>

          <Section title={{ en: "8. Governing Law", zh: "8. 适用法律", th: "8. กฎหมายที่ใช้บังคับ", vi: "8. Luật Điều chỉnh" }} locale={locale}>
            <p>{t({ en: "These Terms are governed by the laws of the Hong Kong Special Administrative Region, without regard to its conflict-of-law provisions. Any dispute arising from or relating to these Terms or the website shall be subject to the exclusive jurisdiction of the Hong Kong courts.", zh: "本条款受中国香港特别行政区法律管辖，并不适用其法律冲突规则。因本条款或本网站产生或与之相关的任何争议，均应受中国香港法院的专属管辖。", th: "ข้อกำหนดเหล่านี้อยู่ภายใต้บังคับของกฎหมายแห่งเขตบริหารพิเศษฮ่องกง โดยไม่คำนึงถึงหลักกฎหมายว่าด้วยการขัดกันแห่งกฎหมาย ข้อพิพาทใด ๆ ที่เกิดขึ้นจากหรือเกี่ยวข้องกับข้อกำหนดเหล่านี้หรือเว็บไซต์ ให้อยู่ภายใต้เขตอำนาจศาลของศาลฮ่องกงแต่เพียงผู้เดียว", vi: "Các Điều khoản này được điều chỉnh bởi luật pháp của Đặc khu Hành chính Hồng Kông, không xét đến các quy định về xung đột pháp luật của Đặc khu này. Mọi tranh chấp phát sinh từ hoặc liên quan đến các Điều khoản này hoặc trang web sẽ thuộc thẩm quyền tài phán riêng của các tòa án Hồng Kông." }, locale)}</p>
          </Section>

          <Section title={{ en: "9. Changes to These Terms", zh: "9. 条款的变更", th: "9. การเปลี่ยนแปลงข้อกำหนดเหล่านี้", vi: "9. Thay đổi Các Điều khoản Này" }} locale={locale}>
            <p>{t({ en: 'We may revise these Terms from time to time. The "Last updated" date above indicates the latest revision. Your continued use of the website after changes take effect constitutes acceptance of the revised Terms.', zh: "我们可能会不时修订本条款。上方的「最后更新」日期表明最近一次修订的时间。变更生效后您继续使用本网站，即视为接受修订后的条款。", th: 'เราอาจแก้ไขข้อกำหนดเหล่านี้เป็นครั้งคราว วันที่ 「ปรับปรุงล่าสุด」 ข้างต้นระบุถึงการแก้ไขครั้งล่าสุด การที่ท่านใช้งานเว็บไซต์ต่อไปหลังจากการเปลี่ยนแปลงมีผลบังคับใช้ ถือเป็นการยอมรับข้อกำหนดที่แก้ไขแล้ว', vi: 'Chúng tôi có thể sửa đổi các Điều khoản này theo từng thời điểm. Ngày "Cập nhật lần cuối" ở trên cho biết lần sửa đổi gần nhất. Việc quý vị tiếp tục sử dụng trang web sau khi các thay đổi có hiệu lực đồng nghĩa với việc chấp nhận các Điều khoản đã sửa đổi.' }, locale)}</p>
          </Section>

          <Section title={{ en: "10. Contact Us", zh: "10. 联系我们", th: "10. ติดต่อเรา", vi: "10. Liên hệ với Chúng tôi" }} locale={locale}>
            <p>{t({ en: "If you have any questions about these Terms, please contact:", zh: "如您对本条款有任何疑问，请联系:", th: "หากท่านมีคำถามใด ๆ เกี่ยวกับข้อกำหนดเหล่านี้ โปรดติดต่อ:", vi: "Nếu quý vị có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng liên hệ:" }, locale)}</p>
            <p className="mt-2">
              <strong>ETIA-TECH (ASIA) Co., Limited</strong><br />
              {t({ en: "Hong Kong", zh: "中国香港", th: "ฮ่องกง", vi: "Hồng Kông" }, locale)}<br />
              {t({ en: "Email:", zh: "邮箱:", th: "อีเมล:", vi: "Email:" }, locale)}{" "}
              <a href={`mailto:${localeSalesEmail(locale)}`} className="font-medium hover:underline" style={{ color: "#41A62A" }}>{localeSalesEmail(locale)}</a>
            </p>
          </Section>

          <div className="pt-4 border-t border-gray-100">
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>← {t({ en: "Back to Home", zh: "返回首页", th: "กลับสู่หน้าแรก", vi: "Về Trang chủ" }, locale)}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, locale, children }: { title: LangText; locale: "en" | "zh" | "vi" | "th"; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>{t(title, locale)}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
