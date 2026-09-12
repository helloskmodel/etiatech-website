// The lamp trade-in: send us the dead lamp, take US$20 off the next one.
//
// Two things make this more than a discount.
//
// It is open to people who did not buy from ETIA. A factory running an S2000
// on a grey-market lamp still has a dead lamp in a bin, and registering it to
// claim US$20 tells ETIA the one thing a cold call never does: that plant has
// this machine, the lamp just died, and here is the person who ordered it.
// Twenty dollars for a qualified lead in this industry is cheap.
//
// And it closes the loop on the code system: a lamp registered for trade-in is
// marked 已回收 in the register, so if it ever turns up again with its label
// still on it, a scan says so.
//
// The return address is deliberately NOT published here. Mercury lamps are
// hazardous waste and shipping them across a border is, in most of this
// region, not allowed — so the address a customer gets is the one for their
// own country, sent in the confirmation after they register. Nobody is told to
// put a mercury lamp in a box until ETIA has told them where it may go.

import type { LangText } from "@/components/LocaleContext";

/** Per lamp, off the next order. Stated in USD because the four markets price in four currencies. */
export const TRADE_IN_VALUE_USD = 20;

/** Machines whose lamps ETIA takes back — every OmniCure spot system it supplies. */
export const TRADE_IN_MACHINES = [
  "OmniCure S2000 Elite",
  "OmniCure S1500 Pro",
  "OmniCure S2000 / S2000-XLA",
  "OmniCure S1500",
  "Other / not sure",
] as const;

export const TRADE_IN_COUNTRIES: { id: string; label: LangText }[] = [
  { id: "TH", label: { en: "Thailand", zh: "泰国", th: "ประเทศไทย", vi: "Thái Lan" } },
  { id: "VN", label: { en: "Vietnam", zh: "越南", th: "เวียดนาม", vi: "Việt Nam" } },
  { id: "SG", label: { en: "Singapore", zh: "新加坡", th: "สิงคโปร์", vi: "Singapore" } },
  { id: "MY", label: { en: "Malaysia", zh: "马来西亚", th: "มาเลเซีย", vi: "Malaysia" } },
  { id: "ID", label: { en: "Indonesia", zh: "印度尼西亚", th: "อินโดนีเซีย", vi: "Indonesia" } },
  { id: "CN", label: { en: "China", zh: "中国", th: "จีน", vi: "Trung Quốc" } },
  { id: "OTHER", label: { en: "Somewhere else", zh: "其他国家/地区", th: "ประเทศอื่น", vi: "Nơi khác" } },
];

/**
 * The registration reference a customer sees the moment they submit.
 *
 * It is a REFERENCE, not an authorisation: the same string goes in the email
 * to sales, who confirm it and send back the return address. Calling it an
 * authorisation would promise a register entry that does not exist yet — the
 * register is written when ETIA accepts the lamp, not when a form is filled in.
 *
 * Confusable characters (I, L, O, U) are left out: this gets read down a phone.
 */
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
export function tradeInReference(now = new Date()): string {
  const yy = String(now.getFullYear() % 100).padStart(2, "0");
  const bytes = new Uint8Array(6);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  const body = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `TR-${yy}-${body}`;
}

// ---------------------------------------------------------------------------
// Copy. Four languages, no claim that ETIA cannot keep.

export const TRADE_IN_COPY = {
  eyebrow: { en: "Lamp trade-in", zh: "灯泡以旧换新", th: "โครงการแลกหลอดเก่า", vi: "Đổi đèn cũ" },

  headline: {
    en: "Send back your dead lamp, take US$20 off the next one",
    zh: "把用完的旧灯寄回来，下一支立减 20 美元",
    th: "ส่งหลอดที่หมดอายุคืน รับส่วนลด 20 ดอลลาร์สหรัฐสำหรับหลอดถัดไป",
    vi: "Gửi lại đèn đã hết, giảm 20 USD cho đèn tiếp theo",
  },

  /** The line that makes this different from every other trade-in. */
  openToAll: {
    en: "You do not have to have bought it from us. If you run an OmniCure spot system, the lamp in your scrap bin is worth US$20 whoever sold it to you.",
    zh: "不限是否从我们这里买的。只要你用的是 OmniCure 点光源，废料桶里那支灯就值 20 美元——不管当初是谁卖给你的。",
    th: "ไม่จำเป็นต้องซื้อจากเรา ถ้าคุณใช้ระบบ OmniCure แบบจุด หลอดในถังทิ้งของคุณมีมูลค่า 20 ดอลลาร์สหรัฐ ไม่ว่าใครจะเป็นคนขายให้คุณ",
    vi: "Bạn không cần phải mua từ chúng tôi. Nếu bạn đang dùng hệ OmniCure điểm, bóng đèn trong thùng phế liệu của bạn đáng giá 20 USD, bất kể ai đã bán nó cho bạn.",
  },

  steps: [
    {
      title: { en: "Register online", zh: "线上登记", th: "ลงทะเบียนออนไลน์", vi: "Đăng ký trực tuyến" },
      body: {
        en: "Tell us the machine, the lamp part number and how many. Two minutes, no account needed.",
        zh: "填机型、旧灯料号和支数。两分钟，不用注册账号。",
        th: "แจ้งรุ่นเครื่อง หมายเลขชิ้นส่วนของหลอด และจำนวน ใช้เวลาสองนาที ไม่ต้องสมัครสมาชิก",
        vi: "Cho biết model máy, mã hàng của đèn và số lượng. Hai phút, không cần tài khoản.",
      },
    },
    {
      title: { en: "Get your reference and the address", zh: "收到编号与寄回地址", th: "รับหมายเลขอ้างอิงและที่อยู่", vi: "Nhận mã tham chiếu và địa chỉ" },
      body: {
        en: "Within 24 hours we send back a trade-in reference and the return address for your own country — a mercury lamp must not cross a border, so we tell you where it may go before you pack anything.",
        zh: "24 小时内，我们发回一个以旧换新编号和你所在国家的寄回地址——汞灯不可跨境运输，所以在你装箱之前，我们先告诉你它能寄到哪里。",
        th: "ภายใน 24 ชั่วโมง เราจะส่งหมายเลขอ้างอิงและที่อยู่สำหรับส่งคืนในประเทศของคุณ — หลอดปรอทห้ามข้ามพรมแดน เราจึงบอกคุณก่อนว่าส่งไปที่ไหนได้ ก่อนที่คุณจะบรรจุกล่อง",
        vi: "Trong vòng 24 giờ, chúng tôi gửi lại mã đổi cũ và địa chỉ trả hàng trong chính nước bạn — đèn thủy ngân không được qua biên giới, nên chúng tôi cho bạn biết nơi có thể gửi trước khi bạn đóng gói.",
      },
    },
    {
      title: { en: "Ship it back, the credit applies", zh: "寄回，抵扣生效", th: "ส่งกลับ แล้วรับส่วนลด", vi: "Gửi về, khấu trừ có hiệu lực" },
      body: {
        en: "When the lamp arrives, US$20 per lamp comes off your next order and the lamp is disposed of as hazardous waste, properly, on our account.",
        zh: "旧灯到货后，每支 20 美元从你的下一张订单里扣除；灯由我们按危险废物规范处置，费用我们出。",
        th: "เมื่อหลอดมาถึง จะหักส่วนลด 20 ดอลลาร์สหรัฐต่อหลอดจากคำสั่งซื้อครั้งถัดไป และเราจะกำจัดหลอดในฐานะของเสียอันตรายอย่างถูกต้องโดยเราเป็นผู้รับผิดชอบค่าใช้จ่าย",
        vi: "Khi đèn tới nơi, 20 USD mỗi bóng được trừ vào đơn hàng kế tiếp, và đèn được xử lý như chất thải nguy hại đúng quy định, chi phí do chúng tôi chịu.",
      },
    },
  ],

  rulesTitle: { en: "The rules, in full", zh: "规则，写全", th: "กติกาทั้งหมด", vi: "Quy định đầy đủ" },
  rules: [
    {
      en: "US$20 per lamp, credited against your next order. One lamp, one credit — credits are not pooled and cannot be exchanged for cash or for a system.",
      zh: "每支 20 美元，抵扣在你的下一张订单上。一支对一支——抵扣不累积，不折现，也不能用来抵整机。",
      th: "20 ดอลลาร์สหรัฐต่อหลอด หักจากคำสั่งซื้อครั้งถัดไป หนึ่งหลอดต่อหนึ่งส่วนลด ไม่สะสม ไม่แลกเป็นเงินสด และใช้แลกทั้งระบบไม่ได้",
      vi: "20 USD mỗi bóng, trừ vào đơn hàng kế tiếp. Một bóng một khoản — không cộng dồn, không quy đổi thành tiền mặt và không dùng để trừ vào cả hệ thống.",
    },
    {
      en: "Open to any OmniCure spot-system user, whether or not the lamp came from ETIA.",
      zh: "面向所有 OmniCure 点光源用户，不论旧灯是不是从 ETIA 买的。",
      th: "เปิดสำหรับผู้ใช้ระบบ OmniCure แบบจุดทุกราย ไม่ว่าหลอดจะซื้อจาก ETIA หรือไม่",
      vi: "Áp dụng cho mọi người dùng hệ OmniCure điểm, bất kể đèn có mua từ ETIA hay không.",
    },
    {
      en: "Register before you ship. A lamp that arrives without a trade-in reference cannot be matched to an order — and we would rather it never left your site than arrive somewhere it is not allowed to be.",
      zh: "先登记，再寄。没有以旧换新编号的灯到了我们这里也对不上是谁的订单——更重要的是，我们宁可它没离开你的厂区，也不要它被寄到一个不该到的地方。",
      th: "ลงทะเบียนก่อนส่ง หลอดที่มาถึงโดยไม่มีหมายเลขอ้างอิงจะจับคู่กับคำสั่งซื้อไม่ได้ — และเราอยากให้มันอยู่ในโรงงานคุณมากกว่าไปโผล่ในที่ที่ไม่ควรอยู่",
      vi: "Hãy đăng ký trước khi gửi. Đèn đến mà không có mã đổi cũ thì không khớp được với đơn hàng nào — và chúng tôi thà nó chưa rời nhà máy bạn còn hơn tới một nơi không được phép.",
    },
    {
      en: "The lamp must be the complete unit, not a broken envelope. A lamp that arrives shattered is a mercury spill in someone's hands.",
      zh: "必须是完整的灯，不能是碎的。碎灯到货，等于让接手的人面对一次汞泄漏。",
      th: "ต้องเป็นหลอดที่สมบูรณ์ ไม่ใช่หลอดแตก หลอดที่มาถึงในสภาพแตกคือการทำสารปรอทหกใส่มือของคนที่รับ",
      vi: "Phải là bóng nguyên vẹn, không phải bóng vỡ. Một bóng đến nơi trong tình trạng vỡ là một vụ tràn thủy ngân vào tay người nhận.",
    },
    {
      en: "A lamp we have already taken back is marked as recovered in our register. If that label ever turns up again on a lamp offered as new, a scan says so.",
      zh: "已回收的灯在我们登记表里会标记为「已回收」。如果那张标签以后又出现在一支当作新品出售的灯上，扫码就会显示出来。",
      th: "หลอดที่เรารับคืนแล้วจะถูกทำเครื่องหมายว่าเรียกคืนแล้วในทะเบียนของเรา หากฉลากนั้นไปปรากฏบนหลอดที่ขายเป็นของใหม่ การสแกนจะบอกได้",
      vi: "Đèn chúng tôi đã thu hồi được đánh dấu là đã thu hồi trong sổ đăng ký. Nếu nhãn đó sau này xuất hiện trên một bóng được bán như hàng mới, chỉ cần quét là biết.",
    },
  ],

  safetyTitle: { en: "Before you pack it", zh: "装箱之前", th: "ก่อนบรรจุ", vi: "Trước khi đóng gói" },
  safety: {
    en: "These lamps contain mercury. Let it cool completely, keep it in the box the new one came in, and do not ship it anywhere until you have our confirmation — the address depends on which country you are in.",
    zh: "这些灯含汞。等它完全冷却，装回新灯的原盒，在拿到我们的确认之前不要寄出——地址取决于你在哪个国家。",
    th: "หลอดเหล่านี้มีสารปรอท ปล่อยให้เย็นสนิท เก็บในกล่องที่หลอดใหม่มา และอย่าส่งไปที่ใดจนกว่าจะได้รับการยืนยันจากเรา — ที่อยู่ขึ้นอยู่กับว่าคุณอยู่ประเทศใด",
    vi: "Những bóng đèn này chứa thủy ngân. Hãy để nguội hoàn toàn, giữ trong hộp của bóng mới, và đừng gửi đi đâu cho tới khi có xác nhận của chúng tôi — địa chỉ tùy theo bạn ở nước nào.",
  },
} satisfies Record<string, unknown>;
