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

// Complete Malay (ms-MY) translation dictionary
// Technical terms (UV curing, bonding, lead time, downtime, spot curing, ADAS, PCB) preserved in English
// per user's localization strategy

export const MY_STRINGS = {
  meta: {
    title: "ETIA Technology | Pengedar Sistem & Penyelesaian UV Curing",
    description: "Pengedar sah OmniCure UV curing di Asia Tenggara — Malaysia, Thailand, Vietnam, Singapura dan Indonesia. Turut membekalkan sistem Phoseon, Fusion & NobleLight. 20 tahun kepakaran aplikasi, stok tempatan dan pembaikan dalaman merentasi 10 industri.",
    ogTitle: "ETIA Technology — Rakan Penyelesaian UV Curing Anda",
    ogDescription: "Sistem UV curing OmniCure dan Phoseon, disokong oleh jurutera aplikasi, stok tempatan dan pembaikan dalaman.",
  },
  locale: { code: "ms", label: "MS", name: "Bahasa Melayu" },
  nav: {
    home: "Utama",
    omnicure: "OmniCure",
    phoseon: "Phoseon",
    products: "Produk",
    applications: "Aplikasi",
    insights: "Info Teknikal",
    about: "Tentang ETIA",
    caseStudies: "Kajian Kes",
    serviceSupport: "Servis & Sokongan",
    salesSupport: "Jualan & Sokongan",
  },
  cta: {
    talkToEngineer: "Berbincang dengan Jurutera",
    exploreProducts: "Terokai Produk",
    sendApplication: "Hantar Butiran Aplikasi Anda",
    readCase: "Baca kajian kes",
    allCaseStudies: "Semua Kajian Kes",
    learnMore: "Ketahui Lanjut",
    contactUs: "Hubungi Kami",
  },
  home: {
    eyebrow: "Pengedar Sah · Produk Asli Melalui Saluran Rasmi",
    eyebrowAlt: "Pembekal Rasmi · Produk Asli Melalui Saluran Rasmi",
    h1Line1: "Rakan Penyelesaian UV Curing Anda.",
    h1Line2: "Dari Pemilihan Hingga Sokongan.",
    heroImageAlt: "Sistem UV spot curing OmniCure S1500 Pro",
    pillars: [
      { title: "Produk Asli", sub: "Bekalan sah" },
      { title: "Sokongan Aplikasi", sub: "Pemilihan dipandu jurutera" },
      { title: "Pembaikan Dalaman", sub: "Sokongan sepanjang hayat" },
    ],
    ticker: [
      "Produk Asli Melalui Saluran Rasmi",
      "Penyelesaian Berasaskan Aplikasi",
      "Rantaian Bekalan Tempatan",
      "Perkhidmatan Jangka Panjang",
    ],
    badges: { newProduct: "PRODUK BAHARU", newPromotion: "PROMOSI BAHARU" },
    news: [
      { badge: "PRODUK BAHARU", text: "Lampu gantian OmniCure S2000 Elite (012-64000R) — stok asli, penghantaran pantas" },
      { badge: "PRODUK BAHARU", text: "OmniCure LX500 — spot curing UV LED ultra padat dengan hasil konsisten dan boleh diulang" },
      { badge: "PROMOSI BAHARU", text: "Konsultasi proses UV curing percuma — berbincang dengan jurutera ETIA tentang aplikasi anda" },
    ],
    why: {
      heading: "Mengapa Pengilang Memilih ETIA",
      items: [
        { title: "20 Tahun Pengalaman Aplikasi", body: "Pengetahuan UV curing yang praktikal merentasi bidang perubatan, elektronik, fotonik, automotif dan pembuatan industri." },
        { title: "Bekalan Sah & Asli", body: "Sistem, lampu gantian dan aksesori asli melalui saluran bekalan yang sah." },
        { title: "Stok Tempatan & Tindak Balas Pantas", body: "Peralatan dan bahan guna habis disimpan secara tempatan bagi memendekkan lead time serta mengurangkan risiko pengeluaran." },
        { title: "Pembaikan Dalaman & Sokongan Sepanjang Kitaran Hayat", body: "Penyelesaian masalah, penyelenggaraan dan penyelarasan pembaikan untuk memastikan proses anda terus berjalan." },
      ],
    },
    brands: {
      eyebrow: "Penyelesaian Jenama UV Curing",
      heading: "Jenama UV Curing Terunggul dalam Industri",
      omnicure: {
        tag: "Pembuatan Berketepatan Tinggi",
        title: "Sistem UV Curing OmniCure",
        body: "UV curing berketepatan tinggi untuk pemasangan, bonding, peranti perubatan dan elektronik.",
        cta: "Terokai OmniCure",
        imageAlt: "Sistem UV curing OmniCure",
      },
      phoseon: {
        tag: "UV LED Industri",
        title: "Sistem UV LED Curing Phoseon",
        body: "UV LED curing industri untuk dakwat, salutan, percetakan, pembungkusan dan barisan pengeluaran.",
        cta: "Terokai Phoseon",
        imageAlt: "Sistem UV LED curing industri Phoseon",
      },
    },
    cases: {
      heading: "Kajian Kes",
      sub: "Aplikasi pengeluaran sebenar — lihat sistemnya, prosesnya dan hasilnya.",
      items: [
        { industry: "Pemasangan Peranti Perubatan", title: "OmniCure S2000 Elite Menyokong Bonding 360° dalam Pembuatan Kateter Kardiovaskular" },
        { industry: "Automotif & ADAS", title: "OmniCure S2000 Elite Menyokong Bonding Focus-Lock yang Stabil dalam Pemasangan Modul Kamera ADAS" },
        { industry: "Elektronik & Pemasangan PCB", title: "OmniCure LX500 Meningkatkan Kecekapan Fast-Fixing dalam Pemasangan Komponen Mikro PCB" },
        { industry: "Fotonik & Pembungkusan Termaju", title: "OmniCure LX500 Menyokong Curing Berketepatan Tinggi Berbilang Saluran untuk Transceiver Optik Berkelajuan Tinggi" },
        { industry: "Pembuatan Gentian Optik & Kabel", title: "OmniCure AC Large Menyokong Curing Salutan Berkelajuan Tinggi di Menara Penarikan Gentian Optik" },
      ],
    },
    trust: {
      eyebrow: "Dipercayai Oleh",
      heading: "Dipercayai oleh pengilang terkemuka dalam bidang perubatan, fotonik dan elektronik",
    },
    closingCta: {
      heading: "Perlukan bantuan memilih sistem UV curing yang tepat?",
      body: "Beritahu kami aplikasi, pelekat, kawasan curing, panjang gelombang dan keperluan pengeluaran anda. Jurutera ETIA akan bantu anda cari penyelesaian yang tepat.",
    },
  },
  contactPage: {
    eyebrow: "Jualan & Sokongan",
    h1: "Panduan Pakar. Kami Sedia Membantu.",
    intro: "Daripada pemilihan produk dan nasihat proses sehingga penyelesaian tersuai dan servis peralatan, pasukan ETIA membantu pelanggan mendapatkan jawapan yang tepat dan memastikan pengeluaran terus berjalan.",
    anchors: { sales: "Pertanyaan Jualan", service: "Servis & Pembaikan", global: "Pejabat Kami" },
    partLabel: "Bahagian {n}",
    sales: {
      heading: "Pertanyaan Jualan",
      body: "Mencari sistem UV curing yang sesuai? Jurutera kami akan menilai aplikasi anda, mengesyorkan penyelesaian terbaik dan menemani anda sepanjang proses pemilihan.",
      cards: [
        { title: "Pertanyaan Produk", body: "Terokai sistem OmniCure, Phoseon, Fusion dan NobleLight yang sepadan dengan proses anda." },
        { title: "Konsultasi Aplikasi", body: "Sahkan proses UV curing anda — daripada pemilihan pelekat sehingga ujian dos dan iradians." },
        { title: "Kejuruteraan Tersuai", body: "Perlukan konfigurasi bukan standard? Kami merekayasa penyelesaian khusus untuk barisan pengeluaran yang kompleks." },
      ],
      directEmailLabel: "E-mel Terus",
      formHeading: "Hantar Pertanyaan Jualan",
    },
    service: {
      heading: "Servis & Pembaikan",
      body: "Kilang pembaikan dalaman dan juruteknik bertauliah kami memastikan peralatan UV curing anda beroperasi pada prestasi terbaik — mengurangkan downtime dan memaksimumkan kebolehpercayaan pengeluaran.",
      cards: [
        { title: "Pembaikan Peralatan", body: "Diagnosis dan pembaikan pantas untuk OmniCure, Phoseon dan semua sistem UV yang disokong. Masalah pengeluaran yang mendesak diberi keutamaan." },
        { title: "Kalibrasi Radiometer", body: "Kalibrasi boleh dijejak NIST untuk R2000, LS200 dan radiometer pihak ketiga. Sijil kalibrasi disertakan." },
        { title: "Penyelenggaraan Pencegahan", body: "Program penyelenggaraan berjadual untuk memanjangkan hayat peralatan dan mengelakkan kerosakan tidak dijangka pada barisan pengeluaran." },
      ],
      serviceEmailLabel: "E-mel Servis (Pengurus Teknikal)",
      formHeading: "Hantar Permintaan Servis",
    },
    global: {
      heading: "Pejabat Kami",
      regions: "Malaysia · Thailand · Vietnam · Singapura · Indonesia",
      offices: {
        malaysia: "Malaysia",
        china: "China · Shanghai",
        hongkong: "Hong Kong",
        thailand: "Thailand · Bangkok",
        vietnam: "Vietnam · Bac Ninh",
        singapore: "Singapura",
        indonesia: "Indonesia",
      },
      phoneNote: "* Nombor telefon akan disahkan. Hubungi kami melalui e-mel untuk maklum balas segera.",
    },
    commitments: [
      { title: "Tindak Balas Pantas", sub: "Dalam 1 hari bekerja" },
      { title: "Jurutera Pakar", sub: "20 tahun kepakaran UV curing" },
      { title: "Stok Tempatan", sub: "Sedia untuk penghantaran segera" },
    ],
  },
  form: {
    name: "Nama",
    company: "Syarikat",
    email: "E-mel",
    phone: "Telefon",
    industry: "Industri",
    requestType: "Jenis Permintaan",
    message: "Mesej",
    select: "Pilih…",
    submit: "Hantar",
    required: "Wajib diisi",
    invalidEmail: "Sila masukkan alamat e-mel yang sah",
    success: "Terima kasih. Pertanyaan anda telah dihantar — pasukan kami akan menghubungi anda dalam 1 hari bekerja.",
    error: "Maaf, penghantaran tidak berjaya. Sila cuba lagi atau e-mel terus kepada kami.",
    industries: [
      "Pemasangan Peranti Perubatan",
      "Automotif & ADAS",
      "Elektronik & Pemasangan PCB",
      "Fotonik & Pembungkusan Termaju",
      "Pembuatan Gentian Optik & Kabel",
      "Sistem Optik & Pengimejan",
      "Percetakan & Seni Grafik",
      "Salutan Kayu & Perabot",
      "Salutan Logam & Industri",
      "Aeroangkasa & Pertahanan",
      "Lain-lain",
    ],
    requestTypes: [
      "Pembaikan Peralatan",
      "Kalibrasi Radiometer",
      "Penyelenggaraan Pencegahan",
      "Alat Ganti",
      "Lain-lain",
    ],
  },
  footer: {
    tagline: "Pengedar sah sistem UV curing bertaraf dunia. 20 tahun kepakaran aplikasi merentasi 9 industri.",
    navigation: "Navigasi",
    legal: "Perundangan",
    contact: "Hubungi",
    privacyPolicy: "Dasar Privasi",
    cookiePolicy: "Dasar Kuki",
    termsOfUse: "Terma Penggunaan",
    cookieSettings: "Tetapan Kuki",
    privacy: "Privasi",
    cookies: "Kuki",
    rights: "© 2026 ETIA-TECH (ASIA) Co., Limited. Hak cipta terpelihara.",
  },
  cookieBanner: {
    text: "Kami menggunakan kuki untuk meningkatkan pengalaman anda di laman web ini.",
    accept: "Terima",
    reject: "Tolak",
    settings: "Tetapan",
  },
  common: {
    loading: "Memuatkan…",
    notFound: "Halaman tidak dijumpai",
    backHome: "Kembali ke Laman Utama",
  },
  productPages: {
    omnicure: {
      meta: {
        title: "Sistem UV Curing OmniCure — Pengedar Sah | ETIA",
        description: "Sistem UV curing berketepatan tinggi OmniCure untuk pemasangan, bonding, peranti perubatan dan elektronik. ETIA membekalkan sistem asli, lampu, sokongan aplikasi dan servis.",
      },
      hero: {
        eyebrow: "Pengedar Sah OmniCure®",
        h1Line1: "Penyelesaian UV Curing OmniCure",
        h1Line2: "Curing Berketepatan Tinggi. Kawalan Menyeluruh.",
        ctaPrimary: "Pilih Teknologi Anda",
        ctaSecondary: "Berbincang dengan Jurutera",
      },
    },
    phoseon: {
      meta: {
        title: "Sistem UV LED Curing Phoseon | ETIA",
        description: "UV LED curing berkuasa tinggi Phoseon — FireJet/FireEdge penyejukan udara dan FireLine/VeriCure/Nexus II penyejukan air untuk percetakan dan barisan industri. Dibekal dan disokong oleh ETIA di Malaysia, Thailand dan Vietnam.",
      },
      hero: {
        eyebrow: "Penyelesaian UV LED Curing Phoseon®",
        h1Line1: "Penyelesaian UV Curing Phoseon",
        h1Line2: "Dibina untuk Prestasi Pengeluaran.",
        ctaPrimary: "Terokai Penyelesaian Phoseon",
        ctaSecondary: "Berbincang dengan Jurutera",
      },
    },
  },
  caseStudies: {
    heading: "Kajian Kes",
    sub: "Aplikasi pengeluaran sebenar — lihat sistemnya, prosesnya dan hasilnya.",
    all: "Semua Kajian Kes",
    read: "Baca kajian kes",
    sections: {
      challenge: "Cabaran Pelanggan",
      configuration: "Konfigurasi yang Disyorkan",
      benefits: "Manfaat yang Dijangka",
      support: "Sokongan ETIA",
      industry: "Industri",
      systemUsed: "Sistem yang Digunakan",
      application: "Aplikasi",
      related: "Kajian Kes Berkaitan",
    },
    cta: "Bincangkan Aplikasi Serupa",
  },
};

export type MyDict = typeof MY_STRINGS;

export function getDict(_lang: MyLocale = "my"): MyDict {
  return MY_STRINGS;
}
