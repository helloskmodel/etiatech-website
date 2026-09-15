// FAQ copy for the Thailand page.
//
// Deliberately NOT in the "use client" view: the page's FAQPage structured data
// is built on the server, and a named export from a client module reaches the
// server as a client reference rather than the array itself. Keeping the copy
// here means the visible FAQ and the structured data are the same source.

import type { LangText } from "@/components/LocaleContext";

export const TH_FAQ: { q: LangText; a: LangText }[] = [
  {
    q: {
      en: "Can I buy OmniCure in Thailand?",
      zh: "可以在泰国购买 OmniCure 吗？",
      th: "ซื้อ OmniCure ในประเทศไทยได้ไหม?",
      vi: "Có thể mua OmniCure tại Thái Lan không?",
    },
    a: {
      en: "Yes. ETIA supplies genuine OmniCure systems in Thailand through authorized channels, with stock held in Bangkok and local installation and service.",
      zh: "可以。ETIA 通过授权渠道在泰国供应 OmniCure 原厂正品，曼谷有现货，并提供本地安装与服务。",
      th: "ได้ ETIA จัดจำหน่ายระบบ OmniCure ของแท้ในประเทศไทยผ่านช่องทางที่ได้รับอนุญาต มีสต็อกในกรุงเทพฯ พร้อมการติดตั้งและบริการในพื้นที่",
      vi: "Có. ETIA cung cấp hệ thống OmniCure chính hãng tại Thái Lan qua kênh được ủy quyền, có sẵn hàng tại Bangkok cùng lắp đặt và dịch vụ tại chỗ.",
    },
  },
  {
    q: {
      en: "Do you stock replacement lamps and spare parts locally?",
      zh: "本地有替换灯管和备件现货吗？",
      th: "มีหลอดทดแทนและอะไหล่ในสต็อกในประเทศหรือไม่?",
      vi: "Có sẵn đèn thay thế và phụ tùng tại địa phương không?",
    },
    a: {
      en: "Yes. Lamps, filter cartridges and light guides for the S-Series are held in Bangkok, so a line that is down does not wait on an international shipment. Part numbers are listed on the consumables pages.",
      zh: "有。S 系列的灯管、滤片与导光管在曼谷备有现货，产线停机不必等国际运输。料号在耗材页面列出。",
      th: "มี หลอด คาร์ทริดจ์ฟิลเตอร์ และท่อนำแสงสำหรับ S-Series มีสต็อกในกรุงเทพฯ สายการผลิตที่หยุดจึงไม่ต้องรอการขนส่งระหว่างประเทศ รหัสอะไหล่ระบุไว้ในหน้าวัสดุสิ้นเปลือง",
      vi: "Có. Đèn, hộp kính lọc và ống dẫn sáng cho S-Series được giữ tại Bangkok, nên dây chuyền dừng không phải chờ vận chuyển quốc tế. Mã phụ tùng có trên các trang vật tư tiêu hao.",
    },
  },
  {
    q: {
      en: "Do you provide installation, training and calibration in Thailand?",
      zh: "在泰国提供安装、培训与校准吗？",
      th: "มีบริการติดตั้ง อบรม และสอบเทียบในประเทศไทยหรือไม่?",
      vi: "Có cung cấp lắp đặt, đào tạo và hiệu chuẩn tại Thái Lan không?",
    },
    a: {
      en: "Yes — installation and operator training on site, radiometer calibration, and repair coordination, handled by the Bangkok team in Thai and English.",
      zh: "提供——现场安装与操作培训、辐射计校准、维修协调，由曼谷团队以泰语和英语支持。",
      th: "มี — การติดตั้งและอบรมผู้ใช้งานหน้างาน การสอบเทียบเครื่องวัดรังสี และการประสานงานซ่อม โดยทีมกรุงเทพฯ ทั้งภาษาไทยและอังกฤษ",
      vi: "Có — lắp đặt và đào tạo vận hành tại hiện trường, hiệu chuẩn thiết bị đo bức xạ, và điều phối sửa chữa, do đội ngũ Bangkok phụ trách bằng tiếng Thái và tiếng Anh.",
    },
  },
  {
    q: {
      en: "How do I get a quote?",
      zh: "如何获取报价？",
      th: "ขอใบเสนอราคาอย่างไร?",
      vi: "Làm thế nào để nhận báo giá?",
    },
    a: {
      en: "Tell us the adhesive, the cure area and the wavelength your process needs — or simply send the part number off the label. LINE is the fastest channel in Thailand.",
      zh: "告诉我们工艺所需的胶粘剂、固化面积与波长——或者直接把标签上的料号发给我们。在泰国 LINE 是最快的渠道。",
      th: "แจ้งกาว พื้นที่บ่ม และความยาวคลื่นที่กระบวนการของคุณต้องการ — หรือส่งรหัสอะไหล่จากฉลากมาก็ได้ ในประเทศไทย LINE เป็นช่องทางที่เร็วที่สุด",
      vi: "Cho chúng tôi biết loại keo, diện tích đóng rắn và bước sóng quy trình của bạn cần — hoặc gửi thẳng mã phụ tùng trên nhãn. Tại Thái Lan, LINE là kênh nhanh nhất.",
    },
  },
];
