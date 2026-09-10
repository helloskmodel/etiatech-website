"use client";
import Link from "next/link";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { localeSalesEmail } from "@/components/contact";

const LAST_UPDATED: LangText = { en: "10 September 2026", zh: "2026年9月10日", th: "10 กันยายน 2026", vi: "10 tháng 9 năm 2026" };

export default function PrivacyView() {
  const { locale } = useLocale();
  return (
    <>
      {/* Hero */}
      <section className="py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1241a3 0%, #1A56DB 100%)" }}>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#41A62A" }}>{t({ en: "Legal", zh: "法律条款", th: "ข้อกฎหมาย", vi: "Pháp lý" }, locale)}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{t({ en: "Privacy Policy", zh: "隐私政策", th: "นโยบายความเป็นส่วนตัว", vi: "Chính sách Bảo mật" }, locale)}</h1>
          <p className="text-sm text-gray-300">{t({ en: "Last updated:", zh: "最后更新:", th: "ปรับปรุงล่าสุด:", vi: "Cập nhật lần cuối:" }, locale)} {t(LAST_UPDATED, locale)}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm leading-relaxed space-y-8">
          <div>
            <p>
              {t({
                en: 'This Privacy Policy explains how ETIA-TECH (ASIA) Co., Limited ("ETIA", "we", "us", or "our") collects, uses, discloses, and safeguards your information when you visit this website. ETIA-TECH (ASIA) Co., Limited is a company incorporated in Hong Kong under the Companies Ordinance (Cap. 622).',
                zh: "本隐私政策说明 ETIA-TECH (ASIA) Co., Limited（「ETIA」「我们」）在您访问本网站时如何收集、使用、披露及保护您的信息。ETIA-TECH (ASIA) Co., Limited 是一家根据香港《公司条例》（第 622 章）注册成立的公司。",
                th: 'นโยบายความเป็นส่วนตัวฉบับนี้อธิบายว่า ETIA-TECH (ASIA) Co., Limited ("ETIA" "เรา" หรือ "ของเรา") เก็บรวบรวม ใช้ เปิดเผย และคุ้มครองข้อมูลของท่านอย่างไรเมื่อท่านเข้าใช้งานเว็บไซต์นี้ ETIA-TECH (ASIA) Co., Limited เป็นบริษัทที่จดทะเบียนจัดตั้งขึ้นในฮ่องกงภายใต้กฎหมายบริษัท (Companies Ordinance บทที่ 622)',
                vi: 'Chính sách Bảo mật này giải thích cách ETIA-TECH (ASIA) Co., Limited ("ETIA", "chúng tôi") thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn truy cập trang web này. ETIA-TECH (ASIA) Co., Limited là một công ty được thành lập tại Hồng Kông theo Pháp lệnh Công ty (Chương 622).',
              }, locale)}
            </p>
          </div>

          <Section title={{ en: "1. Information We Collect", zh: "1. 我们收集的信息", th: "1. ข้อมูลที่เราเก็บรวบรวม", vi: "1. Thông tin Chúng tôi Thu thập" }} locale={locale}>
            <p>{t({ en: "We collect information you provide directly to us and information collected automatically:", zh: "我们收集您直接提供给我们的信息，以及自动收集的信息:", th: "เราเก็บรวบรวมข้อมูลที่ท่านให้แก่เราโดยตรง และข้อมูลที่เก็บรวบรวมโดยอัตโนมัติ ดังนี้:", vi: "Chúng tôi thu thập thông tin bạn cung cấp trực tiếp cho chúng tôi và thông tin được thu thập tự động:" }, locale)}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>{t({ en: "Information you provide — such as your name, company, email address, phone number, and the content of any enquiry when you contact us or request a quote.", zh: "您提供的信息——例如您在联系我们或索取报价时提供的姓名、公司、电子邮箱、电话号码及咨询内容。", th: "ข้อมูลที่ท่านให้ไว้ — เช่น ชื่อ บริษัท ที่อยู่อีเมล หมายเลขโทรศัพท์ และเนื้อหาของคำสอบถามใด ๆ เมื่อท่านติดต่อเราหรือขอใบเสนอราคา", vi: "Thông tin bạn cung cấp — chẳng hạn như tên, công ty, địa chỉ email, số điện thoại và nội dung của bất kỳ yêu cầu nào khi bạn liên hệ với chúng tôi hoặc yêu cầu báo giá." }, locale)}</li>
              <li>{t({ en: "Information collected automatically — such as your IP address, browser type, device information, pages visited, and referring URLs, collected through cookies and similar technologies.", zh: "自动收集的信息——例如通过 Cookie 及类似技术收集的 IP 地址、浏览器类型、设备信息、访问页面及来源网址。", th: "ข้อมูลที่เก็บรวบรวมโดยอัตโนมัติ — เช่น ที่อยู่ IP ประเภทเบราว์เซอร์ ข้อมูลอุปกรณ์ หน้าที่เข้าชม และ URL ที่อ้างอิงถึง ซึ่งเก็บรวบรวมผ่านคุกกี้และเทคโนโลยีที่คล้ายคลึงกัน", vi: "Thông tin được thu thập tự động — chẳng hạn như địa chỉ IP, loại trình duyệt, thông tin thiết bị, các trang đã truy cập và URL giới thiệu, được thu thập thông qua cookie và các công nghệ tương tự." }, locale)}</li>
            </ul>
          </Section>

          <Section title={{ en: "2. How We Use Your Information", zh: "2. 我们如何使用您的信息", th: "2. เราใช้ข้อมูลของท่านอย่างไร", vi: "2. Cách Chúng tôi Sử dụng Thông tin của Bạn" }} locale={locale}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t({ en: "To respond to your enquiries and provide sales, technical, and after-sales support.", zh: "回应您的咨询，并提供销售、技术及售后支持。", th: "เพื่อตอบข้อสอบถามของท่าน และให้การสนับสนุนด้านการขาย ด้านเทคนิค และหลังการขาย", vi: "Để phản hồi các yêu cầu của bạn và cung cấp hỗ trợ bán hàng, kỹ thuật và sau bán hàng." }, locale)}</li>
              <li>{t({ en: "To process and fulfil quote requests and orders.", zh: "处理并履行报价请求与订单。", th: "เพื่อดำเนินการและตอบสนองคำขอใบเสนอราคาและคำสั่งซื้อ", vi: "Để xử lý và thực hiện các yêu cầu báo giá và đơn đặt hàng." }, locale)}</li>
              <li>{t({ en: "To operate, maintain, and improve our website and services.", zh: "运营、维护及改进我们的网站与服务。", th: "เพื่อดำเนินการ บำรุงรักษา และปรับปรุงเว็บไซต์และบริการของเรา", vi: "Để vận hành, duy trì và cải thiện trang web và dịch vụ của chúng tôi." }, locale)}</li>
              <li>{t({ en: "To send you information you have requested and, where permitted, relevant product updates.", zh: "向您发送所请求的信息，并在获准的情况下发送相关产品更新。", th: "เพื่อส่งข้อมูลที่ท่านร้องขอ และส่งข้อมูลอัปเดตผลิตภัณฑ์ที่เกี่ยวข้องในกรณีที่ได้รับอนุญาต", vi: "Để gửi cho bạn thông tin bạn đã yêu cầu và, khi được phép, các thông tin cập nhật sản phẩm có liên quan." }, locale)}</li>
              <li>{t({ en: "To comply with legal obligations and protect our rights.", zh: "履行法律义务并保护我们的权利。", th: "เพื่อปฏิบัติตามภาระผูกพันทางกฎหมายและคุ้มครองสิทธิของเรา", vi: "Để tuân thủ các nghĩa vụ pháp lý và bảo vệ các quyền của chúng tôi." }, locale)}</li>
            </ul>
          </Section>

          <Section title={{ en: "3. Cookies", zh: "3. Cookie", th: "3. คุกกี้", vi: "3. Cookie" }} locale={locale}>
            <p>
              {t({ en: "We use cookies and similar technologies to operate the site and understand how it is used. You can manage your preferences at any time. For details, see our", zh: "我们使用 Cookie 及类似技术来运营网站并了解其使用情况。您可随时管理您的偏好设置。详情请参阅我们的", th: "เราใช้คุกกี้และเทคโนโลยีที่คล้ายคลึงกันเพื่อให้เว็บไซต์ทำงานและเพื่อทำความเข้าใจวิธีการใช้งาน ท่านสามารถจัดการการตั้งค่าตามความต้องการได้ตลอดเวลา สำหรับรายละเอียด โปรดดูที่", vi: "Chúng tôi sử dụng cookie và các công nghệ tương tự để vận hành trang web và hiểu cách trang web được sử dụng. Bạn có thể quản lý tùy chọn của mình bất cứ lúc nào. Để biết chi tiết, vui lòng xem" }, locale)}{" "}
              <Link href="/cookies" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Cookie Policy", zh: "Cookie 政策", th: "นโยบายคุกกี้", vi: "Chính sách Cookie" }, locale)}</Link>{locale === "zh" ? "。" : "."}
            </p>
          </Section>

          <Section title={{ en: "4. How We Share Information", zh: "4. 我们如何共享信息", th: "4. เราเปิดเผยข้อมูลอย่างไร", vi: "4. Cách Chúng tôi Chia sẻ Thông tin" }} locale={locale}>
            <p>{t({ en: "We do not sell your personal data. We may share information with trusted service providers who help us operate the website and our business (for example, hosting and analytics providers), with our principal manufacturers where necessary to fulfil your request, and where required by law or to protect our legal rights.", zh: "我们不会出售您的个人数据。我们可能与协助我们运营网站及业务的可信服务提供商（例如托管与分析服务商）共享信息，在必要时与我们的原厂制造商共享以履行您的请求，以及在法律要求或为保护我们的合法权利时共享信息。", th: "เราไม่ขายข้อมูลส่วนบุคคลของท่าน เราอาจเปิดเผยข้อมูลแก่ผู้ให้บริการที่เชื่อถือได้ซึ่งช่วยเราในการดำเนินงานเว็บไซต์และธุรกิจของเรา (ตัวอย่างเช่น ผู้ให้บริการโฮสติ้งและการวิเคราะห์ข้อมูล) แก่ผู้ผลิตต้นทางของเราในกรณีที่จำเป็นเพื่อตอบสนองคำขอของท่าน และในกรณีที่กฎหมายกำหนดหรือเพื่อคุ้มครองสิทธิตามกฎหมายของเรา", vi: "Chúng tôi không bán dữ liệu cá nhân của bạn. Chúng tôi có thể chia sẻ thông tin với các nhà cung cấp dịch vụ đáng tin cậy giúp chúng tôi vận hành trang web và hoạt động kinh doanh của mình (ví dụ: các nhà cung cấp dịch vụ lưu trữ và phân tích), với các nhà sản xuất chính của chúng tôi khi cần thiết để thực hiện yêu cầu của bạn, và khi pháp luật yêu cầu hoặc để bảo vệ các quyền hợp pháp của chúng tôi." }, locale)}</p>
                      <p className="mt-2">{t({ en: "The service providers currently used by this website are:", zh: "本网站目前使用的服务提供商包括:", th: "ผู้ให้บริการที่เว็บไซต์นี้ใช้อยู่ในปัจจุบัน ได้แก่:", vi: "Các nhà cung cấp dịch vụ hiện được website này sử dụng:" }, locale)}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>{t({ en: "Vercel Inc. — hosting and content delivery (servers outside your country may serve the site).", zh: "Vercel Inc.——网站托管与内容分发（服务器可能位于您所在国家/地区之外）。", th: "Vercel Inc. — โฮสติ้งและการส่งมอบเนื้อหา (เซิร์ฟเวอร์อาจอยู่นอกประเทศของท่าน)", vi: "Vercel Inc. — lưu trữ và phân phối nội dung (máy chủ có thể nằm ngoài quốc gia của bạn)." }, locale)}</li>
              <li>{t({ en: "Google (Google Analytics 4 via Google Tag Manager) — usage statistics, loaded only after you accept analytics cookies.", zh: "Google（通过 Google Tag Manager 运行的 Google Analytics 4）——使用统计，仅在您同意分析 Cookie 后加载。", th: "Google (Google Analytics 4 ผ่าน Google Tag Manager) — สถิติการใช้งาน โหลดเฉพาะเมื่อท่านยอมรับคุกกี้วิเคราะห์", vi: "Google (Google Analytics 4 qua Google Tag Manager) — thống kê sử dụng, chỉ tải sau khi bạn chấp nhận cookie phân tích." }, locale)}</li>
              <li>{t({ en: "Resend — delivers the inquiry and quote forms you submit to our sales team by email.", zh: "Resend——将您提交的询价与报价表单以邮件送达我们的销售团队。", th: "Resend — ส่งแบบฟอร์มสอบถามและขอใบเสนอราคาที่ท่านกรอกไปยังทีมขายของเราทางอีเมล", vi: "Resend — chuyển các biểu mẫu yêu cầu và báo giá bạn gửi đến đội ngũ bán hàng của chúng tôi qua email." }, locale)}</li>
              <li>{t({ en: "Tencent Cloud (COS, Singapore) — stores the images and documents shown on the site; no personal data is stored there.", zh: "腾讯云（COS，新加坡）——存放网站展示的图片与文档；不存放任何个人数据。", th: "Tencent Cloud (COS, สิงคโปร์) — เก็บรูปภาพและเอกสารที่แสดงบนเว็บไซต์ ไม่มีข้อมูลส่วนบุคคลเก็บไว้ที่นั่น", vi: "Tencent Cloud (COS, Singapore) — lưu hình ảnh và tài liệu hiển thị trên website; không lưu dữ liệu cá nhân." }, locale)}</li>
              <li>{t({ en: "WhatsApp and WeChat — only if you choose to contact us through them; their own privacy policies then apply.", zh: "WhatsApp 与微信——仅当您选择通过它们联系我们时使用，届时适用其各自的隐私政策。", th: "WhatsApp และ WeChat — เฉพาะเมื่อท่านเลือกติดต่อเราผ่านช่องทางเหล่านี้ ซึ่งจะอยู่ภายใต้นโยบายความเป็นส่วนตัวของผู้ให้บริการนั้น", vi: "WhatsApp và WeChat — chỉ khi bạn chọn liên hệ với chúng tôi qua các kênh này; khi đó chính sách bảo mật của họ được áp dụng." }, locale)}</li>
            </ul>
</Section>

          <Section title={{ en: "5. Data Retention", zh: "5. 数据保留", th: "5. การเก็บรักษาข้อมูล", vi: "5. Lưu giữ Dữ liệu" }} locale={locale}>
            <p>{t({ en: "We retain personal data only for as long as necessary to fulfil the purposes described in this policy, including to satisfy any legal, accounting, or reporting requirements.", zh: "我们仅在为实现本政策所述目的所必需的期间内保留个人数据，包括满足任何法律、会计或报告要求。", th: "เราเก็บรักษาข้อมูลส่วนบุคคลไว้เพียงเท่าที่จำเป็นเพื่อบรรลุวัตถุประสงค์ที่อธิบายไว้ในนโยบายฉบับนี้ รวมถึงเพื่อปฏิบัติตามข้อกำหนดทางกฎหมาย การบัญชี หรือการรายงานใด ๆ", vi: "Chúng tôi chỉ lưu giữ dữ liệu cá nhân trong thời gian cần thiết để thực hiện các mục đích được mô tả trong chính sách này, bao gồm cả việc đáp ứng bất kỳ yêu cầu pháp lý, kế toán hoặc báo cáo nào." }, locale)}</p>
                      <p>{t({ en: "In practice: inquiry and quote records are kept for as long as needed to handle the request and any business relationship that follows, and then for the period required by commercial and tax law; analytics data is held only in aggregated form for the retention period configured in the analytics tool.", zh: "具体而言：询价与报价记录在处理该请求及其后续业务关系所需的期间内保留，之后按商业与税务法规要求的期限保存；分析数据仅以汇总形式在分析工具设定的保留期内保存。", th: "ในทางปฏิบัติ: บันทึกการสอบถามและใบเสนอราคาจะเก็บไว้ตราบเท่าที่จำเป็นต่อการดำเนินการตามคำขอและความสัมพันธ์ทางธุรกิจที่ตามมา จากนั้นเก็บตามระยะเวลาที่กฎหมายพาณิชย์และภาษีกำหนด ข้อมูลวิเคราะห์เก็บในรูปแบบรวมเท่านั้นตามระยะเวลาที่ตั้งค่าในเครื่องมือวิเคราะห์", vi: "Trên thực tế: hồ sơ yêu cầu và báo giá được lưu trong thời gian cần thiết để xử lý yêu cầu và quan hệ kinh doanh phát sinh, sau đó theo thời hạn luật thương mại và thuế quy định; dữ liệu phân tích chỉ được lưu ở dạng tổng hợp trong thời hạn cấu hình của công cụ phân tích." }, locale)}</p>
</Section>

          <Section title={{ en: "6. Your Rights", zh: "6. 您的权利", th: "6. สิทธิของท่าน", vi: "6. Quyền của Bạn" }} locale={locale}>
            <p>{t({ en: "Subject to applicable law, you may request access to, correction of, or deletion of your personal data, and you may object to or restrict certain processing. To exercise these rights, contact us using the details below.", zh: "在适用法律的范围内，您可请求访问、更正或删除您的个人数据，并可反对或限制某些处理活动。如需行使这些权利，请通过下方联系方式与我们联系。", th: "ภายใต้ขอบเขตของกฎหมายที่ใช้บังคับ ท่านอาจขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของท่าน และอาจคัดค้านหรือจำกัดการประมวลผลบางประการได้ หากต้องการใช้สิทธิเหล่านี้ โปรดติดต่อเราตามรายละเอียดด้านล่าง", vi: "Theo quy định của pháp luật hiện hành, bạn có thể yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân của mình, và bạn có thể phản đối hoặc hạn chế một số hoạt động xử lý nhất định. Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi theo thông tin bên dưới." }, locale)}</p>
                      <p>{t({ en: 'Where processing is based on your consent — analytics cookies, for example — you may withdraw it at any time via "Cookie settings" in the page footer or by emailing us; withdrawal does not affect processing that took place before it. You also have the right to lodge a complaint with the data protection authority in your country.', zh: "凡基于您同意的处理（例如分析 Cookie），您可随时通过页脚的「Cookie 设置」或发送邮件撤回同意；撤回不影响撤回前的处理。您亦有权向所在国家/地区的数据保护机构投诉。", th: 'กรณีที่การประมวลผลอาศัยความยินยอมของท่าน เช่น คุกกี้วิเคราะห์ ท่านสามารถถอนความยินยอมได้ทุกเมื่อผ่าน "การตั้งค่าคุกกี้" ที่ส่วนท้ายของหน้าเว็บหรือทางอีเมล การถอนความยินยอมไม่กระทบการประมวลผลที่เกิดขึ้นก่อนหน้านั้น ท่านมีสิทธิร้องเรียนต่อหน่วยงานคุ้มครองข้อมูลส่วนบุคคลในประเทศของท่าน', vi: 'Khi việc xử lý dựa trên sự đồng ý của bạn — ví dụ cookie phân tích — bạn có thể rút lại bất cứ lúc nào qua "Cài đặt cookie" ở chân trang hoặc gửi email cho chúng tôi; việc rút lại không ảnh hưởng đến xử lý đã diễn ra trước đó. Bạn cũng có quyền khiếu nại lên cơ quan bảo vệ dữ liệu tại quốc gia của mình.' }, locale)}</p>
</Section>

          <Section title={{ en: "7. Data Security", zh: "7. 数据安全", th: "7. ความปลอดภัยของข้อมูล", vi: "7. Bảo mật Dữ liệu" }} locale={locale}>
            <p>{t({ en: "We implement reasonable technical and organisational measures designed to protect your information against unauthorised access, loss, or misuse. No method of transmission over the internet is completely secure, however, and we cannot guarantee absolute security.", zh: "我们采取合理的技术与组织措施，以保护您的信息免遭未经授权的访问、丢失或滥用。然而，互联网上没有任何传输方式是完全安全的，我们无法保证绝对的安全性。", th: "เราใช้มาตรการทางเทคนิคและเชิงองค์กรที่เหมาะสมเพื่อคุ้มครองข้อมูลของท่านจากการเข้าถึงโดยไม่ได้รับอนุญาต การสูญหาย หรือการใช้ในทางที่ผิด อย่างไรก็ตาม ไม่มีวิธีการส่งข้อมูลผ่านอินเทอร์เน็ตใดที่ปลอดภัยอย่างสมบูรณ์ และเราไม่สามารถรับประกันความปลอดภัยได้อย่างเด็ดขาด", vi: "Chúng tôi triển khai các biện pháp kỹ thuật và tổ chức hợp lý nhằm bảo vệ thông tin của bạn khỏi việc truy cập trái phép, mất mát hoặc sử dụng sai mục đích. Tuy nhiên, không có phương thức truyền tải nào qua internet là hoàn toàn an toàn, và chúng tôi không thể đảm bảo sự an toàn tuyệt đối." }, locale)}</p>
          </Section>

          <Section title={{ en: "8. International Transfers", zh: "8. 跨境传输", th: "8. การโอนข้อมูลระหว่างประเทศ", vi: "8. Chuyển giao Quốc tế" }} locale={locale}>
            <p>{t({ en: "ETIA operates across Asia. Your information may be processed in countries other than your own, where data protection laws may differ. We take steps to ensure your information receives an appropriate level of protection.", zh: "ETIA 在亚洲各地开展业务。您的信息可能在您所在国家/地区以外的国家/地区处理，当地的数据保护法律可能有所不同。我们将采取措施确保您的信息获得适当程度的保护。", th: "ETIA ดำเนินธุรกิจทั่วภูมิภาคเอเชีย ข้อมูลของท่านอาจได้รับการประมวลผลในประเทศอื่นนอกเหนือจากประเทศของท่าน ซึ่งกฎหมายคุ้มครองข้อมูลอาจแตกต่างกัน เราดำเนินมาตรการเพื่อให้มั่นใจว่าข้อมูลของท่านได้รับการคุ้มครองในระดับที่เหมาะสม", vi: "ETIA hoạt động trên khắp châu Á. Thông tin của bạn có thể được xử lý tại các quốc gia khác ngoài quốc gia của bạn, nơi luật bảo vệ dữ liệu có thể khác nhau. Chúng tôi thực hiện các biện pháp để đảm bảo thông tin của bạn nhận được mức độ bảo vệ thích hợp." }, locale)}</p>
          </Section>

          <Section title={{ en: "9. Legal Bases and Applicable Laws", zh: "9. 法律依据与适用法律", th: "9. ฐานทางกฎหมายและกฎหมายที่ใช้บังคับ", vi: "9. Cơ sở pháp lý và Luật áp dụng" }} locale={locale}>
            <p>{t({ en: "We process personal data to take steps at your request before and during a business relationship (quotes, orders, support), on the basis of your consent (analytics cookies, optional product updates), and for our legitimate interests in operating and securing this website. ETIA is established in Hong Kong and complies with the Personal Data (Privacy) Ordinance; for visitors in Thailand we act in accordance with the Personal Data Protection Act B.E. 2562 (2019), for visitors in Vietnam with Decree 13/2023/ND-CP, and for visitors in mainland China with the Personal Information Protection Law.", zh: "我们处理个人数据的依据是：应您的请求在建立及履行业务关系（报价、订单、支持）过程中采取的步骤；您的同意（分析 Cookie、可选的产品更新）；以及我们运营和保护本网站的正当利益。ETIA 设立于中国香港，遵守《个人资料（私隐）条例》；对泰国访客，我们依照《个人数据保护法》B.E. 2562（2019）；对越南访客，依照第 13/2023/ND-CP 号法令；对中国内地访客，依照《个人信息保护法》。", th: "เราประมวลผลข้อมูลส่วนบุคคลเพื่อดำเนินการตามคำขอของท่านก่อนและระหว่างความสัมพันธ์ทางธุรกิจ (ใบเสนอราคา คำสั่งซื้อ การสนับสนุน) โดยอาศัยความยินยอมของท่าน (คุกกี้วิเคราะห์ ข่าวสารผลิตภัณฑ์ที่เลือกรับ) และเพื่อประโยชน์โดยชอบด้วยกฎหมายในการดำเนินการและรักษาความปลอดภัยของเว็บไซต์นี้ ETIA จัดตั้งขึ้นในฮ่องกงและปฏิบัติตาม Personal Data (Privacy) Ordinance สำหรับผู้ใช้ในประเทศไทย เราดำเนินการตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 สำหรับผู้ใช้ในเวียดนามตาม Decree 13/2023/ND-CP และสำหรับผู้ใช้ในจีนแผ่นดินใหญ่ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PIPL)", vi: "Chúng tôi xử lý dữ liệu cá nhân để thực hiện các bước theo yêu cầu của bạn trước và trong quan hệ kinh doanh (báo giá, đơn hàng, hỗ trợ), trên cơ sở sự đồng ý của bạn (cookie phân tích, cập nhật sản phẩm tùy chọn), và vì lợi ích hợp pháp của chúng tôi trong việc vận hành và bảo mật website này. ETIA được thành lập tại Hồng Kông và tuân thủ Personal Data (Privacy) Ordinance; với người dùng tại Thái Lan chúng tôi tuân theo Đạo luật Bảo vệ Dữ liệu Cá nhân B.E. 2562 (2019), với người dùng tại Việt Nam theo Nghị định 13/2023/NĐ-CP, và với người dùng tại Trung Quốc đại lục theo Luật Bảo vệ Thông tin Cá nhân (PIPL)." }, locale)}</p>
          </Section>

          <Section title={{ en: "10. Changes to This Policy", zh: "10. 本政策的变更", th: "10. การเปลี่ยนแปลงนโยบายฉบับนี้", vi: "10. Thay đổi đối với Chính sách này" }} locale={locale}>
            <p>{t({ en: 'We may update this Privacy Policy from time to time. The "Last updated" date above indicates when it was last revised. Material changes will be posted on this page.', zh: "我们可能会不时更新本隐私政策。上方的「最后更新」日期表明其最近一次修订的时间。重大变更将在本页面公布。", th: 'เราอาจปรับปรุงนโยบายความเป็นส่วนตัวฉบับนี้เป็นครั้งคราว วันที่ "ปรับปรุงล่าสุด" ด้านบนระบุถึงเวลาที่มีการแก้ไขครั้งล่าสุด การเปลี่ยนแปลงที่มีสาระสำคัญจะได้รับการเผยแพร่บนหน้านี้', vi: 'Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Ngày "Cập nhật lần cuối" ở trên cho biết thời điểm chính sách được sửa đổi gần đây nhất. Những thay đổi quan trọng sẽ được đăng trên trang này.' }, locale)}</p>
          </Section>

          <Section title={{ en: "11. Contact Us", zh: "11. 联系我们", th: "11. ติดต่อเรา", vi: "11. Liên hệ với Chúng tôi" }} locale={locale}>
            <p>{t({ en: "If you have questions about this Privacy Policy or how we handle your data, please contact:", zh: "如您对本隐私政策或我们处理数据的方式有任何疑问，请联系:", th: "หากท่านมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวฉบับนี้ หรือวิธีที่เราจัดการข้อมูลของท่าน โปรดติดต่อ:", vi: "Nếu bạn có thắc mắc về Chính sách Bảo mật này hoặc cách chúng tôi xử lý dữ liệu của bạn, vui lòng liên hệ:" }, locale)}</p>
            <p className="mt-2">
              <strong>ETIA-TECH (ASIA) Co., Limited</strong><br />
              {t({ en: "Hong Kong", zh: "中国香港", th: "ฮ่องกง", vi: "Hồng Kông" }, locale)}<br />
              {t({ en: "Email:", zh: "邮箱:", th: "อีเมล:", vi: "Email:" }, locale)}{" "}
              <a href={`mailto:${localeSalesEmail(locale)}`} className="font-medium hover:underline" style={{ color: "#41A62A" }}>{localeSalesEmail(locale)}</a>
            </p>
          </Section>

          <div className="pt-4 border-t border-gray-100">
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>← {t({ en: "Back to Home", zh: "返回首页", th: "กลับสู่หน้าหลัก", vi: "Quay lại Trang chủ" }, locale)}</Link>
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
