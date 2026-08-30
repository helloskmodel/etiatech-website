import "server-only";

export const MY_LOCALES = ["my", "en"] as const;
export type MyLocale = (typeof MY_LOCALES)[number];

export function isMyLocale(x: string): x is MyLocale {
  return (MY_LOCALES as readonly string[]).includes(x);
}

export const HTML_LANG: Record<MyLocale, string> = {
  my: "ms",
  en: "en",
};

type Bilingual = Record<MyLocale, string>;

// Home page strings
const tri = {
  metaTitle: {
    en: "UV Curing Systems & Solutions Distributor | ETIA",
    my: "Pengedar Sistem & Penyelesaian UV Curing | ETIA",
  } as Bilingual,
  metaDescription: {
    en: "Authorized distributor of industrial UV curing systems from established manufacturers. 20 years of application expertise across 10 industries.",
    my: "Pengedar sah sistem UV curing industri daripada pengilang terkemuka. 20 tahun kepakaran aplikasi merentasi 10 industri.",
  } as Bilingual,
  navHome: { en: "Home", my: "Utama" } as Bilingual,
  navProducts: { en: "Products", my: "Produk" } as Bilingual,
  navApplications: { en: "Applications", my: "Aplikasi" } as Bilingual,
  navInsights: { en: "Insights", my: "Info Teknikal" } as Bilingual,
  navService: { en: "Service & Support", my: "Servis & Sokongan" } as Bilingual,
  navAbout: { en: "About ETIA", my: "Tentang ETIA" } as Bilingual,
};

export type MyDict = {
  metaTitle: string;
  metaDescription: string;
  nav: Record<string, string>;
};

export function getDict(lang: MyLocale): MyDict {
  return {
    metaTitle: tri.metaTitle[lang],
    metaDescription: tri.metaDescription[lang],
    nav: {
      home: tri.navHome[lang],
      products: tri.navProducts[lang],
      applications: tri.navApplications[lang],
      insights: tri.navInsights[lang],
      service: tri.navService[lang],
      about: tri.navAbout[lang],
    },
  };
}

// Home page copy
const homeTri = {
  heroEyebrow: {
    en: "Authorized Distributor · Genuine Products Through Official Channels",
    my: "Pengedar Sah · Produk Asli Melalui Saluran Rasmi",
  } as Bilingual,
  heroTitle: {
    en: "Your UV Curing Solution Partner. From Selection to Support.",
    my: "Rakan Penyelesaian UV Curing Anda. Dari Pemilihan Hingga Sokongan.",
  } as Bilingual,
  heroSubtitle: {
    en: "20 years of application expertise. Proven solutions across medical, electronics, photonics, automotive, and industrial manufacturing.",
    my: "20 tahun kepakaran aplikasi. Penyelesaian terbukti merentasi perubatan, elektronik, fotonik, automotif dan pembuatan industri.",
  } as Bilingual,
  exploreProducts: { en: "Explore Products", my: "Terokai Produk" } as Bilingual,
  talkEngineer: { en: "Talk to an Engineer", my: "Berbincang dengan Jurutera" } as Bilingual,

  trustBar: {
    en: "Genuine Products Through Official Channels · Application-Driven Solutions · Local Supply Chain · Long-Term Service",
    my: "Produk Asli Melalui Saluran Rasmi · Penyelesaian Berasaskan Aplikasi · Rantaian Bekalan Tempatan · Perkhidmatan Jangka Panjang",
  } as Bilingual,

  productsHeading: {
    en: "UV Curing Systems",
    my: "Sistem UV Curing",
  } as Bilingual,
  productsSubheading: {
    en: "Industry-Leading UV Curing Brands",
    my: "Jenama UV Curing Terunggul dalam Industri",
  } as Bilingual,

  omnicureHeading: {
    en: "Precision Manufacturing",
    my: "Pembuatan Berketepatan Tinggi",
  } as Bilingual,
  omnicureDesc: {
    en: "OmniCure UV Curing Systems — Precision UV curing for assembly, bonding, medical devices and electronics.",
    my: "Sistem UV Curing OmniCure — UV curing berketepatan tinggi untuk pemasangan, bonding, peranti perubatan dan elektronik.",
  } as Bilingual,

  phoseonHeading: {
    en: "Industrial UV LED",
    my: "UV LED Industri",
  } as Bilingual,
  phoseonDesc: {
    en: "Phoseon UV LED Curing Systems — Industrial UV LED curing for inks, coatings, printing, packaging and production lines.",
    my: "Sistem UV LED Curing Phoseon — UV LED curing industri untuk dakwat, salutan, percetakan, pembungkusan dan barisan pengeluaran.",
  } as Bilingual,

  exploreOmnicure: { en: "Explore OmniCure", my: "Terokai OmniCure" } as Bilingual,
  explorePhoseon: { en: "Explore Phoseon", my: "Terokai Phoseon" } as Bilingual,

  casesHeading: {
    en: "Case Studies",
    my: "Kajian Kes",
  } as Bilingual,
  casesSubtitle: {
    en: "Real production applications — see the system, the process and the results.",
    my: "Aplikasi pengeluaran sebenar — lihat sistemnya, prosesnya dan hasilnya.",
  } as Bilingual,
  allCases: { en: "All Case Studies", my: "Semua Kajian Kes" } as Bilingual,
  readCase: { en: "Read case", my: "Baca kajian kes" } as Bilingual,

  trustedBy: {
    en: "Trusted By",
    my: "Dipercayai Oleh",
  } as Bilingual,
  trustedDesc: {
    en: "Trusted by leading medical, photonics & electronics manufacturers",
    my: "Dipercayai oleh pengilang terkemuka dalam bidang perubatan, fotonik dan elektronik",
  } as Bilingual,

  whyHeading: {
    en: "Why Manufacturers Choose ETIA",
    my: "Mengapa Pengilang Memilih ETIA",
  } as Bilingual,

  whyCard1Title: { en: "Genuine Products / Authorized supply", my: "Produk Asli / Bekalan sah" } as Bilingual,
  whyCard2Title: { en: "Application Support / Engineer-led selection", my: "Sokongan Aplikasi / Pemilihan dipandu jurutera" } as Bilingual,
  whyCard3Title: { en: "In-House Repair / Lifecycle support", my: "Pembaikan Dalaman / Sokongan sepanjang hayat" } as Bilingual,

  needHelp: {
    en: "Need help choosing the right UV curing system?",
    my: "Perlukan bantuan memilih sistem UV curing yang tepat?",
  } as Bilingual,
  needHelpDesc: {
    en: "Tell us your application, adhesive, curing area, wavelength, and production requirements. ETIA engineers will help you find the right solution.",
    my: "Beritahu kami aplikasi, pelekat, kawasan curing, panjang gelombang dan keperluan pengeluaran anda. Jurutera ETIA akan bantu anda cari penyelesaian yang tepat.",
  } as Bilingual,
  sendApplication: { en: "Send Your Application", my: "Hantar Butiran Aplikasi Anda" } as Bilingual,
};

export type MyHomeDict = {
  hero: { eyebrow: string; title: string; subtitle: string };
  buttons: { exploreProducts: string; talkEngineer: string };
  trustBar: string;
  products: { heading: string; subheading: string };
  omnicure: { heading: string; desc: string; cta: string };
  phoseon: { heading: string; desc: string; cta: string };
  cases: { heading: string; subtitle: string; all: string; read: string };
  trusted: { heading: string; desc: string };
  why: {
    heading: string;
    card1: { title: string };
    card2: { title: string };
    card3: { title: string };
  };
  cta: { heading: string; desc: string; button: string };
};

export function getHomeDict(lang: MyLocale): MyHomeDict {
  return {
    hero: {
      eyebrow: homeTri.heroEyebrow[lang],
      title: homeTri.heroTitle[lang],
      subtitle: homeTri.heroSubtitle[lang],
    },
    buttons: {
      exploreProducts: homeTri.exploreProducts[lang],
      talkEngineer: homeTri.talkEngineer[lang],
    },
    trustBar: homeTri.trustBar[lang],
    products: {
      heading: homeTri.productsHeading[lang],
      subheading: homeTri.productsSubheading[lang],
    },
    omnicure: {
      heading: homeTri.omnicureHeading[lang],
      desc: homeTri.omnicureDesc[lang],
      cta: homeTri.exploreOmnicure[lang],
    },
    phoseon: {
      heading: homeTri.phoseonHeading[lang],
      desc: homeTri.phoseonDesc[lang],
      cta: homeTri.explorePhoseon[lang],
    },
    cases: {
      heading: homeTri.casesHeading[lang],
      subtitle: homeTri.casesSubtitle[lang],
      all: homeTri.allCases[lang],
      read: homeTri.readCase[lang],
    },
    trusted: {
      heading: homeTri.trustedBy[lang],
      desc: homeTri.trustedDesc[lang],
    },
    why: {
      heading: homeTri.whyHeading[lang],
      card1: { title: homeTri.whyCard1Title[lang] },
      card2: { title: homeTri.whyCard2Title[lang] },
      card3: { title: homeTri.whyCard3Title[lang] },
    },
    cta: {
      heading: homeTri.needHelp[lang],
      desc: homeTri.needHelpDesc[lang],
      button: homeTri.sendApplication[lang],
    },
  };
}

// Case study titles
const caseTitles = {
  medicalDevice: {
    en: "Medical Device Assembly — OmniCure S2000 Elite Supports 360° Bonding in Cardiovascular Catheter Manufacturing",
    my: "Pemasangan Peranti Perubatan — OmniCure S2000 Elite Menyokong Bonding 360° dalam Pembuatan Kateter Kardiovaskular",
  } as Bilingual,
  automotive: {
    en: "Automotive & ADAS — OmniCure S2000 Elite Supports Stable Focus-Lock Bonding in ADAS Camera Module Assembly",
    my: "Automotif & ADAS — OmniCure S2000 Elite Menyokong Bonding Focus-Lock yang Stabil dalam Pemasangan Modul Kamera ADAS",
  } as Bilingual,
  electronics: {
    en: "Electronics & PCB Assembly — OmniCure LX500 Improves Fast Fixing Efficiency in PCB Micro-Component Assembly",
    my: "Elektronik & Pemasangan PCB — OmniCure LX500 Meningkatkan Kecekapan Fast-Fixing dalam Pemasangan Komponen Mikro PCB",
  } as Bilingual,
  photonics: {
    en: "Photonics & Advanced Packaging — OmniCure LX500 Supports Multi-Channel Precision Curing for High-Speed Optical Transceivers",
    my: "Fotonik & Pembungkusan Termaju — OmniCure LX500 Menyokong Curing Berketepatan Tinggi Berbilang Saluran untuk Transceiver Optik Berkelajuan Tinggi",
  } as Bilingual,
  fiber: {
    en: "Fiber Optic & Cable Manufacturing — OmniCure AC Large Supports High-Speed Coating Cure in Optical Fiber Draw Towers",
    my: "Pembuatan Gentian Optik & Kabel — OmniCure AC Large Menyokong Curing Salutan Berkelajuan Tinggi di Menara Penarikan Gentian Optik",
  } as Bilingual,
};

export function getCaseTitle(caseKey: string, lang: MyLocale): string {
  const titles: Record<string, Bilingual> = {
    medicalDevice: caseTitles.medicalDevice,
    automotive: caseTitles.automotive,
    electronics: caseTitles.electronics,
    photonics: caseTitles.photonics,
    fiber: caseTitles.fiber,
  };
  return titles[caseKey]?.[lang] || caseKey;
}

// Service & Support section
const serviceTri = {
  heading: {
    en: "Service & Support",
    my: "Servis & Sokongan",
  } as Bilingual,
  tagline: {
    en: "Expert Guidance. We're Here to Help.",
    my: "Panduan Pakar. Kami Sedia Membantu.",
  } as Bilingual,
  intro: {
    en: "From product selection and process advice to custom solutions and equipment service, ETIA's team helps customers get the right answers and keep production running.",
    my: "Daripada pemilihan produk dan nasihat proses sehingga penyelesaian tersuai dan servis peralatan, pasukan ETIA membantu pelanggan mendapatkan jawapan yang tepat dan memastikan pengeluaran terus berjalan.",
  } as Bilingual,

  salesInquiry: { en: "Sales Inquiry", my: "Pertanyaan Jualan" } as Bilingual,
  serviceRepair: { en: "Service & Repair", my: "Servis & Pembaikan" } as Bilingual,
  office: { en: "Our Office", my: "Pejabat Kami" } as Bilingual,

  salesDesc: {
    en: "Looking for the right UV curing system? Our engineers will assess your application, recommend the best solution, and guide you through the selection process.",
    my: "Mencari sistem UV curing yang sesuai? Jurutera kami akan menilai aplikasi anda, mengesyorkan penyelesaian terbaik dan menemani anda sepanjang proses pemilihan.",
  } as Bilingual,

  repairFactoryDesc: {
    en: "Our in-house repair factory and certified technicians ensure your UV curing equipment operates at peak performance — reducing downtime and maximizing production reliability.",
    my: "Kilang pembaikan dalaman dan juruteknik bertauliah kami memastikan peralatan UV curing anda beroperasi pada prestasi terbaik — mengurangkan downtime dan memaksimumkan kebolehpercayaan pengeluaran.",
  } as Bilingual,

  quickResponse: { en: "Fast Response — Within 1 working day", my: "Tindak Balas Pantas — Dalam 1 hari bekerja" } as Bilingual,
  expertEngineer: { en: "Expert Engineer — 20 years UV curing expertise", my: "Jurutera Pakar — 20 tahun kepakaran UV curing" } as Bilingual,
  localStock: { en: "Local Stock — Ready for immediate delivery", my: "Stok Tempatan — Sedia untuk penghantaran segera" } as Bilingual,
};

export type MyServiceDict = {
  heading: string;
  tagline: string;
  intro: string;
  sections: { salesInquiry: string; serviceRepair: string; office: string };
  descriptions: { sales: string; repair: string };
  commitments: { quick: string; expert: string; stock: string };
};

export function getServiceDict(lang: MyLocale): MyServiceDict {
  return {
    heading: serviceTri.heading[lang],
    tagline: serviceTri.tagline[lang],
    intro: serviceTri.intro[lang],
    sections: {
      salesInquiry: serviceTri.salesInquiry[lang],
      serviceRepair: serviceTri.serviceRepair[lang],
      office: serviceTri.office[lang],
    },
    descriptions: {
      sales: serviceTri.salesDesc[lang],
      repair: serviceTri.repairFactoryDesc[lang],
    },
    commitments: {
      quick: serviceTri.quickResponse[lang],
      expert: serviceTri.expertEngineer[lang],
      stock: serviceTri.localStock[lang],
    },
  };
}

// Why ETIA section
const whyTri = {
  heading: {
    en: "Why Manufacturers Choose ETIA",
    my: "Mengapa Pengilang Memilih ETIA",
  } as Bilingual,
  intro: {
    en: "20 Years of Practical UV Curing Knowledge",
    my: "20 Tahun Pengalaman Aplikasi",
  } as Bilingual,

  card1Desc: {
    en: "Practical UV curing knowledge across medical, electronics, photonics, automotive and industrial manufacturing.",
    my: "Pengetahuan UV curing yang praktikal merentasi bidang perubatan, elektronik, fotonik, automotif dan pembuatan industri.",
  } as Bilingual,

  card2Title: { en: "Genuine Products & Authorized Supply", my: "Bekalan Sah & Asli" } as Bilingual,
  card2Desc: {
    en: "Systems, replacement lamps and accessories from authorized supply channels.",
    my: "Sistem, lampu gantian dan aksesori asli melalui saluran bekalan yang sah.",
  } as Bilingual,

  card3Title: { en: "Local Stock & Fast Response", my: "Stok Tempatan & Tindak Balas Pantas" } as Bilingual,
  card3Desc: {
    en: "Equipment and consumables stored locally to shorten lead times and reduce production risk.",
    my: "Peralatan dan bahan guna habis disimpan secara tempatan bagi memendekkan lead time serta mengurangkan risiko pengeluaran.",
  } as Bilingual,

  card4Title: { en: "In-House Repair & Lifecycle Support", my: "Pembaikan Dalaman & Sokongan Sepanjang Kitaran Hayat" } as Bilingual,
  card4Desc: {
    en: "Troubleshooting, maintenance and repair calibration to keep your process running.",
    my: "Penyelesaian masalah, penyelenggaraan dan penyelarasan pembaikan untuk memastikan proses anda terus berjalan.",
  } as Bilingual,
};

export type MyWhyDict = {
  heading: string;
  intro: string;
  cards: Array<{ title?: string; desc: string }>;
};

export function getWhyDict(lang: MyLocale): MyWhyDict {
  return {
    heading: whyTri.heading[lang],
    intro: whyTri.intro[lang],
    cards: [
      { desc: whyTri.card1Desc[lang] },
      { title: whyTri.card2Title[lang], desc: whyTri.card2Desc[lang] },
      { title: whyTri.card3Title[lang], desc: whyTri.card3Desc[lang] },
      { title: whyTri.card4Title[lang], desc: whyTri.card4Desc[lang] },
    ],
  };
}
