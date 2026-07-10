"use client";
import Link from "next/link";
import Image from "next/image";
import { Microscope, Leaf, Zap } from "lucide-react";
import { modelToSlug, getProduct, productHref } from "@/components/productCatalog";
import { heroBannerImage } from "@/components/caseStudies";
import { useLocale, t } from "@/components/LocaleContext";
import { inquiryMailto } from "@/components/contact";
import FinalCta from "@/components/FinalCta";

// Chinese translations for the curated brand/family marketing copy, keyed by
// the English source string. Anything not present falls back to English.
const zhDict: Record<string, string> = {
  // taglines
  "UV Spot & Area Curing": "UV点固化与面固化",
  "UV LED Air & Water-Cooled": "UV LED风冷与水冷",
  "Microwave UV Curing": "微波UV Curing 紫外线固化",
  "UV LED High-Intensity Systems": "UV LED高强度系统",
  // category headers
  "UV SPOT CURING SYSTEMS": "UV点固化系统",
  "UV AREA CURING SYSTEMS": "UV面固化系统",
  "WATER-COOLED UV LED AREA CURING SYSTEMS": "水冷式UV LED面固化系统",
  "AIR-COOLED UV LED AREA CURING SYSTEMS": "风冷式UV LED面固化系统",
  "MICROWAVE UV CURING SYSTEMS": "微波UV Curing 紫外线固化系统",
  "WATER-COOLED UV LED SYSTEMS": "水冷式UV LED系统",
  "UV LED CURING SYSTEMS": "UV LED固化系统",
  // family names
  "UV Lamp Spot Curing": "UV灯式点固化",
  "UV LED Spot Curing": "UV LED点固化",
  "Air-Cooled UV LED Large Area": "风冷式UV LED大面积",
  "Air-Cooled UV LED Small Area": "风冷式UV LED小面积",
  "Water-Cooled UV LED": "水冷式UV LED",
  "Microwave UV · Optical Fiber": "微波UV · 光纤",
  "UV LED Curing": "UV LED固化",
  // family descriptions
  "Broad-spectrum 200W mercury high-pressure lamp spot curing. Industry-proven for medical devices and precision assembly.": "宽光谱200W高压汞灯点固化。在医疗器械与精密装配领域久经验证。",
  "Single-wavelength LED spot curing at 365 nm. 0 ms warm-up, 50,000h lifespan, Industry 4.0 ready.": "365nm单一波长LED点固化。0毫秒预热，50,000小时寿命，支持工业4.0。",
  "High-output LED area curing for wide substrates. Conveyor-integrated, uniform irradiance across full panel width.": "面向宽幅基材的高输出LED面固化。可集成传送带，整幅宽度辐照均匀。",
  "Compact LED area curing for inline PCB, display, and small component applications. Fast, consistent, zero warm-up.": "面向在线PCB、显示及小型元件的紧凑LED面固化。快速、一致、零预热。",
  "High-intensity water-cooled UV LED systems for demanding industrial processes. Stable output under extreme temperatures and debris environments.": "面向严苛工业工艺的高强度水冷UV LED系统。在极端温度与碎屑环境下输出稳定。",
  "Cost-effective air-cooled UV LED systems for wide-format and large-area curing. Conveyor-integrated, no chiller required.": "面向宽幅与大面积固化的高性价比风冷UV LED系统。可集成传送带，无需冷水机。",
  "Passively cooled, ultra-slim form factor. Ideal for digital inkjet pinning and space-limited inline applications.": "被动散热，超薄机身。适合数字喷墨点固化与空间受限的在线应用。",
  "Electrodeless microwave-powered UV systems for production lines. Modular design, Industry 4.0 ready, broad spectrum output. Easy retrofit into existing processes.": "面向生产线的无极微波UV系统。模块化设计，支持工业4.0，宽光谱输出，易于改造接入现有工艺。",
  "Modular 6- or 10-inch microwave UV systems for draw towers, coloring lines, and cable marking. Patented secondary reflector maximizes UV delivery to fiber.": "面向拉丝塔、着色线与线缆标识的模块化6英寸或10英寸微波UV系统。专利二次反射器最大化向光纤传递UV能量。",
  "Water-cooled high-intensity UV LED system with dedicated optics for even irradiance at large working distances. Designed for flexible industrial integration.": "水冷式高强度UV LED系统，配备专用光学，在大工作距离下保持辐照均匀。专为灵活的工业集成设计。",
  "UV LED systems for optical fiber draw, wire marking, and bespoke process requirements. 360° curing coverage and custom-engineered solutions available.": "面向光纤拉丝、线材标识及定制工艺需求的UV LED系统。提供360°固化覆盖与定制化方案。",
  // benefits
  "Speed": "高速",
  "Clean & Safe": "清洁与安全",
  "Precision": "精准",
  "UV curing converts liquid formulations to solid materials in seconds — eliminating thermal ovens, long cure queues, and handling delays that slow production lines.": "UV Curing 紫外线固化在数秒内将液态配方转化为固体材料——免去热风烤箱、漫长固化排队及拖慢产线的搬运延迟。",
  "UV curable materials are 100% solid with no solvents — zero VOC emissions, no hazardous waste disposal, and no fumes in the clean room.": "UV Curing 紫外线固化材料100%固含、无溶剂——零VOC排放、无危废处理、洁净室内无烟雾。",
  "Spectral output, peak irradiance, and energy dose precisely determine the physical properties of the cured material. The right equipment controls all three.": "光谱输出、峰值辐照度与能量剂量精确决定固化材料的物理性能。合适的设备可同时掌控这三者。",
  "UV curing is a photochemical process that converts liquid formulations — adhesives, coatings, inks — into fully solid materials instantly when exposed to high-intensity UV energy.": "UV Curing 紫外线固化是一种光化学过程，在高强度UV能量照射下，将胶粘剂、涂层、油墨等液态配方瞬间转化为完全固化的固体材料。",
};

// Vietnamese translations, keyed by the same English source strings as zhDict.
const viDict: Record<string, string> = {
  // taglines
  "UV Spot & Area Curing": "Đóng rắn UV điểm & vùng",
  "UV LED Air & Water-Cooled": "UV LED làm mát bằng khí & nước",
  "Microwave UV Curing": "Đóng rắn UV vi sóng",
  "UV LED High-Intensity Systems": "Hệ thống UV LED cường độ cao",
  // category headers
  "UV SPOT CURING SYSTEMS": "HỆ THỐNG ĐÓNG RẮN UV ĐIỂM",
  "UV AREA CURING SYSTEMS": "HỆ THỐNG ĐÓNG RẮN UV VÙNG",
  "WATER-COOLED UV LED AREA CURING SYSTEMS": "HỆ THỐNG ĐÓNG RẮN UV LED VÙNG LÀM MÁT BẰNG NƯỚC",
  "AIR-COOLED UV LED AREA CURING SYSTEMS": "HỆ THỐNG ĐÓNG RẮN UV LED VÙNG LÀM MÁT BẰNG KHÍ",
  "MICROWAVE UV CURING SYSTEMS": "HỆ THỐNG ĐÓNG RẮN UV VI SÓNG",
  "WATER-COOLED UV LED SYSTEMS": "HỆ THỐNG UV LED LÀM MÁT BẰNG NƯỚC",
  "UV LED CURING SYSTEMS": "HỆ THỐNG ĐÓNG RẮN UV LED",
  // family names
  "UV Lamp Spot Curing": "Đóng rắn điểm bằng đèn UV",
  "UV LED Spot Curing": "Đóng rắn điểm bằng UV LED",
  "Air-Cooled UV LED Large Area": "UV LED làm mát bằng khí diện tích lớn",
  "Air-Cooled UV LED Small Area": "UV LED làm mát bằng khí diện tích nhỏ",
  "Water-Cooled UV LED": "UV LED làm mát bằng nước",
  "Microwave UV · Optical Fiber": "UV vi sóng · Sợi quang",
  "UV LED Curing": "Đóng rắn UV LED",
  // family descriptions
  "Broad-spectrum 200W mercury high-pressure lamp spot curing. Industry-proven for medical devices and precision assembly.": "Đóng rắn điểm bằng đèn thủy ngân cao áp 200W phổ rộng. Đã được kiểm chứng trong ngành cho thiết bị y tế và lắp ráp chính xác.",
  "Single-wavelength LED spot curing at 365 nm. 0 ms warm-up, 50,000h lifespan, Industry 4.0 ready.": "Đóng rắn điểm bằng LED đơn bước sóng ở 365 nm. Khởi động 0 ms, tuổi thọ 50,000h, sẵn sàng cho Công nghiệp 4.0.",
  "High-output LED area curing for wide substrates. Conveyor-integrated, uniform irradiance across full panel width.": "Đóng rắn vùng bằng LED công suất cao cho vật liệu nền khổ rộng. Tích hợp băng tải, cường độ bức xạ đồng đều trên toàn chiều rộng tấm.",
  "Compact LED area curing for inline PCB, display, and small component applications. Fast, consistent, zero warm-up.": "Đóng rắn vùng bằng LED nhỏ gọn cho các ứng dụng PCB, màn hình và linh kiện nhỏ trên dây chuyền. Nhanh, ổn định, không cần khởi động.",
  "High-intensity water-cooled UV LED systems for demanding industrial processes. Stable output under extreme temperatures and debris environments.": "Hệ thống UV LED làm mát bằng nước cường độ cao cho các quy trình công nghiệp khắt khe. Đầu ra ổn định trong môi trường nhiệt độ khắc nghiệt và nhiều bụi bẩn.",
  "Cost-effective air-cooled UV LED systems for wide-format and large-area curing. Conveyor-integrated, no chiller required.": "Hệ thống UV LED làm mát bằng khí tiết kiệm chi phí cho đóng rắn khổ rộng và diện tích lớn. Tích hợp băng tải, không cần máy làm lạnh.",
  "Passively cooled, ultra-slim form factor. Ideal for digital inkjet pinning and space-limited inline applications.": "Làm mát thụ động, thiết kế siêu mỏng. Lý tưởng cho định hình mực in phun kỹ thuật số và các ứng dụng trên dây chuyền có không gian hạn chế.",
  "Electrodeless microwave-powered UV systems for production lines. Modular design, Industry 4.0 ready, broad spectrum output. Easy retrofit into existing processes.": "Hệ thống UV vi sóng không điện cực cho dây chuyền sản xuất. Thiết kế mô-đun, sẵn sàng cho Công nghiệp 4.0, đầu ra phổ rộng. Dễ dàng nâng cấp vào quy trình hiện có.",
  "Modular 6- or 10-inch microwave UV systems for draw towers, coloring lines, and cable marking. Patented secondary reflector maximizes UV delivery to fiber.": "Hệ thống UV vi sóng mô-đun 6 hoặc 10 inch cho tháp kéo sợi, dây chuyền tạo màu và đánh dấu cáp. Bộ phản xạ thứ cấp được cấp bằng sáng chế tối ưu hóa việc truyền UV tới sợi quang.",
  "Water-cooled high-intensity UV LED system with dedicated optics for even irradiance at large working distances. Designed for flexible industrial integration.": "Hệ thống UV LED cường độ cao làm mát bằng nước với hệ quang học chuyên dụng cho cường độ bức xạ đồng đều ở khoảng cách làm việc lớn. Được thiết kế để tích hợp công nghiệp linh hoạt.",
  "UV LED systems for optical fiber draw, wire marking, and bespoke process requirements. 360° curing coverage and custom-engineered solutions available.": "Hệ thống UV LED cho kéo sợi quang, đánh dấu dây và các yêu cầu quy trình đặt riêng. Cung cấp phạm vi đóng rắn 360° và các giải pháp thiết kế theo yêu cầu.",
  // benefits
  "Speed": "Tốc độ",
  "Clean & Safe": "Sạch & An toàn",
  "Precision": "Độ chính xác",
  "UV curing converts liquid formulations to solid materials in seconds — eliminating thermal ovens, long cure queues, and handling delays that slow production lines.": "UV Curing chuyển đổi các công thức lỏng thành vật liệu rắn trong vài giây — loại bỏ lò nhiệt, hàng chờ đóng rắn dài và sự chậm trễ trong xử lý làm chậm dây chuyền sản xuất.",
  "UV curable materials are 100% solid with no solvents — zero VOC emissions, no hazardous waste disposal, and no fumes in the clean room.": "Vật liệu đóng rắn bằng UV có hàm lượng rắn 100% không dung môi — không phát thải VOC, không xử lý chất thải nguy hại và không khói trong phòng sạch.",
  "Spectral output, peak irradiance, and energy dose precisely determine the physical properties of the cured material. The right equipment controls all three.": "Đầu ra phổ, cường độ bức xạ đỉnh và liều năng lượng quyết định chính xác các đặc tính vật lý của vật liệu đã đóng rắn. Thiết bị phù hợp kiểm soát cả ba yếu tố này.",
  "UV curing is a photochemical process that converts liquid formulations — adhesives, coatings, inks — into fully solid materials instantly when exposed to high-intensity UV energy.": "UV Curing là một quá trình quang hóa chuyển đổi các công thức lỏng — keo dán, lớp phủ, mực in — thành vật liệu rắn hoàn toàn ngay lập tức khi tiếp xúc với năng lượng UV cường độ cao.",
};

// Thai translations, keyed by the same English source strings as zhDict.
const thDict: Record<string, string> = {
  // taglines
  "UV Spot & Area Curing": "การบ่ม UV แบบจุดและแบบพื้นที่",
  "UV LED Air & Water-Cooled": "UV LED ระบายความร้อนด้วยอากาศและน้ำ",
  "Microwave UV Curing": "การบ่ม UV ด้วยไมโครเวฟ",
  "UV LED High-Intensity Systems": "ระบบ UV LED ความเข้มสูง",
  // category headers
  "UV SPOT CURING SYSTEMS": "ระบบบ่ม UV แบบจุด",
  "UV AREA CURING SYSTEMS": "ระบบบ่ม UV แบบพื้นที่",
  "WATER-COOLED UV LED AREA CURING SYSTEMS": "ระบบบ่ม UV LED แบบพื้นที่ ระบายความร้อนด้วยน้ำ",
  "AIR-COOLED UV LED AREA CURING SYSTEMS": "ระบบบ่ม UV LED แบบพื้นที่ ระบายความร้อนด้วยอากาศ",
  "MICROWAVE UV CURING SYSTEMS": "ระบบบ่ม UV ด้วยไมโครเวฟ",
  "WATER-COOLED UV LED SYSTEMS": "ระบบ UV LED ระบายความร้อนด้วยน้ำ",
  "UV LED CURING SYSTEMS": "ระบบบ่ม UV LED",
  // family names
  "UV Lamp Spot Curing": "การบ่มแบบจุดด้วยหลอด UV",
  "UV LED Spot Curing": "การบ่มแบบจุดด้วย UV LED",
  "Air-Cooled UV LED Large Area": "UV LED ระบายความร้อนด้วยอากาศ พื้นที่ขนาดใหญ่",
  "Air-Cooled UV LED Small Area": "UV LED ระบายความร้อนด้วยอากาศ พื้นที่ขนาดเล็ก",
  "Water-Cooled UV LED": "UV LED ระบายความร้อนด้วยน้ำ",
  "Microwave UV · Optical Fiber": "UV ไมโครเวฟ · ใยแก้วนำแสง",
  "UV LED Curing": "การบ่ม UV LED",
  // family descriptions
  "Broad-spectrum 200W mercury high-pressure lamp spot curing. Industry-proven for medical devices and precision assembly.": "การบ่มแบบจุดด้วยหลอดปรอทความดันสูง 200W สเปกตรัมกว้าง ได้รับการพิสูจน์ในอุตสาหกรรมสำหรับอุปกรณ์การแพทย์และการประกอบที่มีความแม่นยำ",
  "Single-wavelength LED spot curing at 365 nm. 0 ms warm-up, 50,000h lifespan, Industry 4.0 ready.": "การบ่มแบบจุดด้วย LED ความยาวคลื่นเดียวที่ 365 nm อุ่นเครื่อง 0 ms อายุการใช้งาน 50,000h พร้อมสำหรับ Industry 4.0",
  "High-output LED area curing for wide substrates. Conveyor-integrated, uniform irradiance across full panel width.": "การบ่มแบบพื้นที่ด้วย LED กำลังสูงสำหรับวัสดุรองรับหน้ากว้าง ผสานกับสายพานลำเลียง ความเข้มการฉายรังสีสม่ำเสมอตลอดความกว้างของแผงเต็มพื้นที่",
  "Compact LED area curing for inline PCB, display, and small component applications. Fast, consistent, zero warm-up.": "การบ่มแบบพื้นที่ด้วย LED ขนาดกะทัดรัดสำหรับงาน PCB จอแสดงผล และชิ้นส่วนขนาดเล็กบนสายการผลิต รวดเร็ว สม่ำเสมอ ไม่ต้องอุ่นเครื่อง",
  "High-intensity water-cooled UV LED systems for demanding industrial processes. Stable output under extreme temperatures and debris environments.": "ระบบ UV LED ความเข้มสูงระบายความร้อนด้วยน้ำสำหรับกระบวนการทางอุตสาหกรรมที่ต้องการความเข้มงวด ให้เอาต์พุตที่เสถียรภายใต้อุณหภูมิสุดขั้วและสภาพแวดล้อมที่มีเศษวัสดุ",
  "Cost-effective air-cooled UV LED systems for wide-format and large-area curing. Conveyor-integrated, no chiller required.": "ระบบ UV LED ระบายความร้อนด้วยอากาศที่คุ้มค่าสำหรับการบ่มหน้ากว้างและพื้นที่ขนาดใหญ่ ผสานกับสายพานลำเลียง ไม่ต้องใช้เครื่องทำความเย็น",
  "Passively cooled, ultra-slim form factor. Ideal for digital inkjet pinning and space-limited inline applications.": "ระบายความร้อนแบบพาสซีฟ ดีไซน์บางเป็นพิเศษ เหมาะอย่างยิ่งสำหรับการตรึงหมึกอิงก์เจ็ตดิจิทัลและงานบนสายการผลิตที่มีพื้นที่จำกัด",
  "Electrodeless microwave-powered UV systems for production lines. Modular design, Industry 4.0 ready, broad spectrum output. Easy retrofit into existing processes.": "ระบบ UV ขับเคลื่อนด้วยไมโครเวฟแบบไร้ขั้วอิเล็กโทรดสำหรับสายการผลิต ออกแบบเป็นโมดูล พร้อมสำหรับ Industry 4.0 เอาต์พุตสเปกตรัมกว้าง ติดตั้งเพิ่มเข้ากับกระบวนการที่มีอยู่ได้ง่าย",
  "Modular 6- or 10-inch microwave UV systems for draw towers, coloring lines, and cable marking. Patented secondary reflector maximizes UV delivery to fiber.": "ระบบ UV ไมโครเวฟแบบโมดูลขนาด 6 หรือ 10 นิ้วสำหรับหอดึงเส้นใย สายการย้อมสี และการทำเครื่องหมายบนสายเคเบิล ตัวสะท้อนแสงทุติยภูมิที่จดสิทธิบัตรช่วยเพิ่มการส่ง UV ไปยังเส้นใยให้สูงสุด",
  "Water-cooled high-intensity UV LED system with dedicated optics for even irradiance at large working distances. Designed for flexible industrial integration.": "ระบบ UV LED ความเข้มสูงระบายความร้อนด้วยน้ำ พร้อมชุดออปติกเฉพาะสำหรับความเข้มการฉายรังสีที่สม่ำเสมอที่ระยะทำงานไกล ออกแบบมาเพื่อการผสานรวมทางอุตสาหกรรมที่ยืดหยุ่น",
  "UV LED systems for optical fiber draw, wire marking, and bespoke process requirements. 360° curing coverage and custom-engineered solutions available.": "ระบบ UV LED สำหรับการดึงใยแก้วนำแสง การทำเครื่องหมายบนสายไฟ และความต้องการกระบวนการเฉพาะทาง ครอบคลุมการบ่ม 360° และมีโซลูชันที่ออกแบบตามความต้องการ",
  // benefits
  "Speed": "ความเร็ว",
  "Clean & Safe": "สะอาดและปลอดภัย",
  "Precision": "ความแม่นยำ",
  "UV curing converts liquid formulations to solid materials in seconds — eliminating thermal ovens, long cure queues, and handling delays that slow production lines.": "UV Curing เปลี่ยนสูตรของเหลวให้เป็นวัสดุแข็งภายในไม่กี่วินาที — ขจัดเตาอบความร้อน คิวการบ่มที่ยาวนาน และความล่าช้าในการจัดการที่ทำให้สายการผลิตช้าลง",
  "UV curable materials are 100% solid with no solvents — zero VOC emissions, no hazardous waste disposal, and no fumes in the clean room.": "วัสดุที่บ่มด้วย UV มีเนื้อของแข็ง 100% ไม่มีตัวทำละลาย — ปล่อย VOC เป็นศูนย์ ไม่มีการกำจัดของเสียอันตราย และไม่มีควันในห้องคลีนรูม",
  "Spectral output, peak irradiance, and energy dose precisely determine the physical properties of the cured material. The right equipment controls all three.": "เอาต์พุตเชิงสเปกตรัม ความเข้มการฉายรังสีสูงสุด และปริมาณพลังงานเป็นตัวกำหนดคุณสมบัติทางกายภาพของวัสดุที่บ่มแล้วอย่างแม่นยำ อุปกรณ์ที่เหมาะสมควบคุมทั้งสามอย่างนี้ได้",
  "UV curing is a photochemical process that converts liquid formulations — adhesives, coatings, inks — into fully solid materials instantly when exposed to high-intensity UV energy.": "UV Curing เป็นกระบวนการโฟโตเคมีที่เปลี่ยนสูตรของเหลว — กาว สารเคลือบ หมึก — ให้เป็นวัสดุแข็งอย่างสมบูรณ์ในทันทีเมื่อสัมผัสกับพลังงาน UV ความเข้มสูง",
};

const brands = [
  {
    id: "omnicure",
    name: "OmniCure",
    tagline: "UV Spot & Area Curing",
    logo: "●",
    color: "#1A56DB",
    available: true,
    families: [
      {
        category: "UV SPOT CURING SYSTEMS",
        items: [
          {
            series: "S SERIES · LAMP-BASED · 200W HG",
            name: "UV Lamp Spot Curing",
            desc: "Broad-spectrum 200W mercury high-pressure lamp spot curing. Industry-proven for medical devices and precision assembly.",
            models: ["OmniCure S2000 Elite", "OmniCure S1500 Pro", "OmniCure R2000 Radiometer", "OmniCure S2E Network Module", "OmniCure S Series Light Guide"],
            bg: "#166534",
          },
          {
            series: "LX SERIES · LED BASED · SINGLE WAVELENGTH",
            name: "UV LED Spot Curing",
            desc: "Single-wavelength LED spot curing at 365 nm. 0 ms warm-up, 50,000h lifespan, Industry 4.0 ready.",
            models: ["OmniCure LX500 V2", "OmniCure LS200 Radiometer", "OmniCure V3 UV LED Heads"],
            bg: "#44B549",
          },
        ],
      },
      {
        category: "UV AREA CURING SYSTEMS",
        items: [
          {
            series: "AC LARGE · AIR-COOLED LED · >75MM WIDTH",
            name: "Air-Cooled UV LED Large Area",
            desc: "High-output LED area curing for wide substrates. Conveyor-integrated, uniform irradiance across full panel width.",
            models: ["OmniCure AC7", "OmniCure AC8", "OmniCure AC8-HD", "OmniCure AC9225", "OmniCure AC UVC LED – 275nm"],
            bg: "#1A56DB",
          },
          {
            series: "AC SMALL · AIR-COOLED LED · UP TO 240MM",
            name: "Air-Cooled UV LED Small Area",
            desc: "Compact LED area curing for inline PCB, display, and small component applications. Fast, consistent, zero warm-up.",
            models: ["OmniCure AC2", "OmniCure AC4", "OmniCure AC5"],
            bg: "#60a5fa",
          },
        ],
      },
    ],
  },
  {
    id: "phoseon",
    name: "Phoseon",
    tagline: "UV LED Air & Water-Cooled",
    logo: "◆",
    color: "#0ea5e9",
    available: true,
    families: [
      {
        category: "WATER-COOLED UV LED AREA CURING SYSTEMS",
        items: [
          {
            series: "FIRELINE · VERICURE · SEMRAY · HIGH-POWER INDUSTRIAL",
            name: "Water-Cooled UV LED",
            desc: "High-intensity water-cooled UV LED systems for demanding industrial processes. Stable output under extreme temperatures and debris environments.",
            models: ["Phoseon Nexus II", "Phoseon FireLine FL200", "Phoseon FireLine FL400", "Phoseon FireLine FL400-i Industrial", "Phoseon FireLine FL440", "Phoseon VeriCure Water-Cooled"],
            bg: "#0d9488",
          },
        ],
      },
      {
        category: "AIR-COOLED UV LED AREA CURING SYSTEMS",
        items: [
          {
            series: "FIREJET · AIR-COOLED · LARGE AREA",
            name: "Air-Cooled UV LED Large Area",
            desc: "Cost-effective air-cooled UV LED systems for wide-format and large-area curing. Conveyor-integrated, no chiller required.",
            models: ["Phoseon Nexus II Air-Cooled", "Phoseon FireJet ONE", "Phoseon FireJet FJ100", "Phoseon FireJet FJ240", "Phoseon FireJet FJ800", "Phoseon FireJet FJ801"],
            bg: "#1A56DB",
          },
          {
            series: "FIREEDGE · PASSIVE COOLING · SMALL AREA",
            name: "Air-Cooled UV LED Small Area",
            desc: "Passively cooled, ultra-slim form factor. Ideal for digital inkjet pinning and space-limited inline applications.",
            models: ["Phoseon FireEdge FE100", "Phoseon FireEdge FE400", "Phoseon FireEdge FE410"],
            bg: "#60a5fa",
          },
        ],
      },
    ],
  },
  {
    id: "fusionuv",
    name: "Fusion",
    tagline: "Microwave UV Curing",
    logo: "▲",
    color: "#f59e0b",
    available: true,
    families: [
      {
        category: "MICROWAVE UV CURING SYSTEMS",
        items: [
          {
            series: "F SERIES · LIGHTHAMMER · INDUSTRIAL BROADBAND",
            name: "Microwave UV Curing",
            desc: "Electrodeless microwave-powered UV systems for production lines. Modular design, Industry 4.0 ready, broad spectrum output. Easy retrofit into existing processes.",
            models: ["Fusion UV LightHammer 6 Mark II", "Fusion UV LightHammer 10 Mark III", "Fusion UV F Series"],
            bg: "#b45309",
          },
          {
            series: "OPTICAL FIBER · DRAW TOWER · CABLE & WIRE",
            name: "Microwave UV · Optical Fiber",
            desc: "Modular 6- or 10-inch microwave UV systems for draw towers, coloring lines, and cable marking. Patented secondary reflector maximizes UV delivery to fiber.",
            models: ["Fusion UV Optical Fiber Curing Systems"],
            bg: "#f59e0b",
          },
        ],
      },
    ],
  },
  {
    id: "noblelight",
    name: "NobleLight",
    tagline: "UV LED High-Intensity Systems",
    logo: "■",
    color: "#7c3aed",
    available: true,
    families: [
      {
        category: "WATER-COOLED UV LED SYSTEMS",
        items: [
          {
            series: "SEMRAY UV5000+ · WATER-COOLED · HIGH INTENSITY",
            name: "Water-Cooled UV LED",
            desc: "Water-cooled high-intensity UV LED system with dedicated optics for even irradiance at large working distances. Designed for flexible industrial integration.",
            models: ["Noblelight Semray UV5000+"],
            bg: "#0d9488",
          },
        ],
      },
      {
        category: "UV LED CURING SYSTEMS",
        items: [
          {
            series: "UV PC6003 · CUSTOMIZED · UV LED SOLUTIONS",
            name: "UV LED Curing",
            desc: "UV LED systems for optical fiber draw, wire marking, and bespoke process requirements. 360° curing coverage and custom-engineered solutions available.",
            models: ["Noblelight Semray UV PC6003", "Noblelight Customized UV LED Solutions"],
            bg: "#44B549",
          },
        ],
      },
    ],
  },
];

// Ordered by ETIA's core buyers' primary driver: precision first, then
// clean/safe, then speed.
const uvCuringBenefits = [
  { Icon: Microscope, title: "Precision", desc: "Spectral output, peak irradiance, and energy dose precisely determine the physical properties of the cured material. The right equipment controls all three." },
  { Icon: Leaf, title: "Clean & Safe", desc: "UV curable materials are 100% solid with no solvents — zero VOC emissions, no hazardous waste disposal, and no fumes in the clean room." },
  { Icon: Zap, title: "Speed", desc: "UV curing converts liquid formulations to solid materials in seconds — eliminating thermal ovens, long cure queues, and handling delays that slow production lines." },
];

export default function ProductPage() {
  const { locale } = useLocale();
  const tr = (s: string) => (locale === "zh" ? zhDict[s] ?? s : locale === "vi" ? viDict[s] ?? s : locale === "th" ? thDict[s] ?? s : s);
  const availableBrands = brands.filter((b) => b.available);
  const scrollToId = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "#0f2444" }}>
        {heroBannerImage && <Image src={heroBannerImage} alt="" fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,30,58,0.94) 0%, rgba(18,65,163,0.82) 50%, rgba(26,86,219,0.45) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>{t({ en: "4 World-Class Brands · 6 Technology Routes", zh: "4大世界级品牌 · 6条技术路线", th: "4 แบรนด์ระดับโลก · 6 เส้นทางเทคโนโลยี", vi: "4 Thương hiệu đẳng cấp thế giới · 6 Lộ trình công nghệ" }, locale)}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              {t({ en: "Precision Selection.", zh: "精准选型", th: "การเลือกที่แม่นยำ", vi: "Lựa chọn chính xác." }, locale)}<br />
              <span style={{ color: "#44B549" }}>{t({ en: "Perfect Fit.", zh: "完美匹配", th: "ลงตัวสมบูรณ์แบบ", vi: "Phù hợp hoàn hảo." }, locale)}</span>
            </h1>
            <p className="text-base text-gray-200 mb-6 leading-relaxed">
              {t({ en: "OmniCure · Phoseon · Fusion UV · NobleLight — matched to your exact application by engineers with 20 years of field validation.", zh: "OmniCure · Phoseon · Fusion UV · NobleLight —— 由拥有20年经验的工程师，为您的具体应用精准匹配UV Curing 紫外线固化方案。", th: "OmniCure · Phoseon · Fusion UV · NobleLight — จับคู่กับการใช้งานเฉพาะของคุณอย่างแม่นยำ โดยวิศวกรที่มีประสบการณ์ตรวจสอบภาคสนามกว่า 20 ปี", vi: "OmniCure · Phoseon · Fusion UV · NobleLight — được các kỹ sư với 20 năm kinh nghiệm kiểm chứng thực địa lựa chọn phù hợp chính xác cho ứng dụng của bạn." }, locale)}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={inquiryMailto(locale, { subject: "Engineering Inquiry" })} className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
                {t({ en: "Talk to an Engineer →", zh: "咨询工程师 →", th: "ปรึกษาวิศวกร →", vi: "Trao đổi với kỹ sư →" }, locale)}
              </a>
              <Link href="/application" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">
                {t({ en: "Browse by Application →", zh: "按应用浏览 →", th: "เรียกดูตามการใช้งาน →", vi: "Duyệt theo ứng dụng →" }, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Selector + Products — light */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand tabs — smooth-scroll to each brand block */}
          <nav className="flex flex-wrap justify-center gap-2 mb-10">
            <button onClick={() => scrollToId("brand-top")} className="px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all">
              {t({ en: "All", zh: "全部", th: "ทั้งหมด", vi: "Tất cả" }, locale)}
            </button>
            {availableBrands.map((b) => (
              <button key={b.id} onClick={() => scrollToId(`brand-${b.id}`)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all">
                <span className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                {b.name}
              </button>
            ))}
          </nav>

          <div id="brand-top" className="scroll-mt-28" />

          {/* All brand blocks, stacked */}
          <div className="space-y-16">
            {availableBrands.map((brand) => (
              <div key={brand.id} id={`brand-${brand.id}`} className="scroll-mt-28">
                {/* Brand heading */}
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-lg font-bold flex-shrink-0" style={{ background: brand.color }}>{brand.logo}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold leading-tight" style={{ color: brand.color }}>{brand.name}</h2>
                    <p className="text-xs text-gray-400">{tr(brand.tagline)}</p>
                  </div>
                  <Link href={`/product/${brand.id === "fusionuv" ? "fusion-uv" : brand.id}`} className="text-xs font-semibold whitespace-nowrap hover:underline" style={{ color: brand.color }}>
                    {t({ en: "Brand page →", zh: "品牌主页 →", th: "หน้าแบรนด์ →", vi: "Trang thương hiệu →" }, locale)}
                  </Link>
                </div>
                {brand.families.map((group) => (
                  <div key={group.category} className="mb-10">
                    <span className="inline-block whitespace-nowrap text-xs font-bold px-3 py-1 rounded mb-5 text-white" style={{ background: "#1A56DB" }}>
                      {tr(group.category)}
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {group.items.map((item) => (
                        <div key={item.name} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                          {/* Card header */}
                          <div className="p-5 text-white" style={{ background: item.bg }}>
                            <p className="text-xs opacity-70 mb-1 tracking-wider font-medium">{item.series}</p>
                            <h3 className="text-lg font-bold">{tr(item.name)}</h3>
                          </div>
                          {/* Card body */}
                          <div className="p-5 bg-white">
                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tr(item.desc)}</p>
                            <div className="flex flex-wrap gap-2">
                              {item.models.map((m) => {
                                const slug = modelToSlug[m];
                                const product = slug ? getProduct(slug) : undefined;
                                return product ? (
                                  <Link
                                    key={m}
                                    href={productHref(product)}
                                    className="text-xs px-3 py-1 rounded-full border font-medium hover:text-white transition-colors"
                                    style={{ borderColor: item.bg, color: item.bg, background: `${item.bg}10` }}
                                  >
                                    {m} →
                                  </Link>
                                ) : (
                                  <span key={m} className="text-xs px-3 py-1 rounded-full border font-medium" style={{ borderColor: item.bg, color: item.bg, background: `${item.bg}10` }}>
                                    {m}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer note + full catalog link (moved to bottom per audit 3.6) */}
          <div className="text-center mt-14 space-y-5">
            <p className="text-sm text-gray-400">
              {t({ en: "*Custom Engineering Solutions Available ·", zh: "*提供定制工程解决方案 ·", th: "*มีโซลูชันวิศวกรรมออกแบบเฉพาะ ·", vi: "*Có sẵn giải pháp kỹ thuật tùy chỉnh ·" }, locale)}{" "}
              <a href={inquiryMailto(locale, { subject: "Engineering Inquiry" })} className="font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Talk to an Engineer →", zh: "咨询工程师 →", th: "ปรึกษาวิศวกร →", vi: "Trao đổi với kỹ sư →" }, locale)}</a>
            </p>
            <div>
              <Link href="/product/systems" className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
                {t({ en: "Browse the Full Product Catalog — All Models with Specs →", zh: "浏览完整产品目录——全部型号含规格 →", th: "เรียกดูแคตตาล็อกสินค้าฉบับเต็ม — ทุกรุ่นพร้อมสเปก →", vi: "Xem toàn bộ danh mục sản phẩm — Tất cả model kèm thông số →" }, locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why UV Curing — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "UV Curing Technology", zh: "UV Curing 紫外线固化技术", th: "เทคโนโลยี UV Curing", vi: "Công nghệ UV Curing" }, locale)}</p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Why UV Curing?", zh: "为何选择UV Curing 紫外线固化?", th: "ทำไมต้อง UV Curing?", vi: "Tại sao chọn UV Curing?" }, locale)}</h2>
          <div className="w-10 h-1 rounded mb-8" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-2xl mb-10">
            {tr("UV curing is a photochemical process that converts liquid formulations — adhesives, coatings, inks — into fully solid materials instantly when exposed to high-intensity UV energy.")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {uvCuringBenefits.map((b) => (
              <div key={b.title} className="rounded-xl p-6 border border-gray-100 bg-white hover:shadow-md transition-all">
                <b.Icon className="mb-3" size={28} strokeWidth={1.75} style={{ color: "#1A56DB" }} />
                <h3 className="font-semibold mb-2" style={{ color: "#1A56DB" }}>{tr(b.title)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tr(b.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        heading={t({ en: "Not sure which system is right for you?", zh: "不确定哪款系统适合您?", th: "ไม่แน่ใจว่าระบบใดเหมาะกับคุณ?", vi: "Chưa chắc hệ thống nào phù hợp với bạn?" }, locale)}
        body={t({ en: "Our engineers will match the right UV curing system to your exact application — from selection to validation.", zh: "我们的工程师将为您的具体应用匹配合适的UV Curing 紫外线固化系统——从选型到验证。", th: "วิศวกรของเราจะจับคู่ระบบ UV Curing ที่เหมาะสมกับการใช้งานเฉพาะของคุณ — ตั้งแต่การเลือกไปจนถึงการตรวจสอบ", vi: "Các kỹ sư của chúng tôi sẽ chọn hệ thống UV Curing phù hợp với đúng ứng dụng của bạn — từ khâu lựa chọn đến kiểm chứng." }, locale)}
        primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale), href: inquiryMailto(locale, { subject: "Sales Inquiry" }) }}
        secondary={{ label: t({ en: "Browse Applications", zh: "浏览应用", th: "ดูการใช้งาน", vi: "Xem ứng dụng" }, locale), href: "/application" }}
      />
    </>
  );
}
