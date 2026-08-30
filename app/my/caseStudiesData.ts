export type CaseStudy = {
  id: string;
  slug: string;
  industry: string;
  title: string;
  overview: string[];
  challenge: string[];
  solution: string[];
  benefits: string[];
  systemUsed: string;
  engineerTip: string;
  etiaSupport: string;
  cta: string;
};

export const myCaseStudies: CaseStudy[] = [
  {
    id: "0901",
    slug: "omnicure-s2000-elite-catheter-bonding",
    industry: "Pemasangan Peranti Perubatan",
    title: "OmniCure S2000 Elite Menyokong Bonding 360° dalam Pembuatan Kateter Kardiovaskular",
    overview: [
      "Pembuatan kateter kardiovaskular melibatkan beberapa langkah bonding yang tepat, seperti bonding belon, bonding hab, dan bonding penanda. Kerana produk ini berkait langsung dengan keselamatan pesakit, proses mesti memberikan kekuatan bonding yang stabil, kebolehulangan, pengesahan, dan kebolehjelakkan.",
      "Dalam aplikasi ini, UV spot curing amat berharga bukan hanya kerana ia pantas, tetapi kerana ia memberikan proses curing yang terkawal, boleh diulang, dan bertekanan panas rendah untuk kawasan bonding kecil. Bonding belon amat mencabar kerana garis ikatan sering berbentuk bulat. Jika tenaga UV tidak diagihkan secara sama rata di sekeliling kateter, mungkin berlaku curing separa, kekuatan bonding tidak konsisten, atau risiko kebolehpercayaan.",
    ],
    challenge: [
      "Komponen kateter adalah kecil, halus, dan sering dibuat daripada plastik berbeza dengan tetingkap proses bonding yang sempit. Pelekat mesti dicuring dengan cepat tanpa memberikan tekanan terma berlebihan kepada bahan kateter.",
      "Bonding belon memerlukan pendedahan seragam mengelilingi tiub. Reka bentuk pendedahan titik tunggal yang tidak baik boleh mencipta kawasan bayang atau agihan tenaga yang tidak seragam.",
      "Pengeluaran peranti perubatan juga memerlukan kawalan proses. Pengilang perlu menunjukkan bahawa setiap barisan, setiap sistem, dan setiap langkah curing kekal dalam tetingkap proses yang telah disahkan.",
    ],
    solution: [
      "OmniCure S2000 Elite menyediakan platform UV spot curing yang stabil dan boleh dikawal untuk pembuatan kateter kardiovaskular. Teknologi Closed-Loop Feedback-nya membantu mengekalkan output UV yang konsisten dan mengurangkan variasi yang disebabkan oleh penuaan lampu, hanyutan output, atau pelarasan manual.",
      "Untuk garis ikatan bulat, S2000 Elite boleh dipasangkan dengan Cure Ring atau pemandu cahaya berbilang kaki untuk memberikan curing 360° sekeliling kateter. Ini membantu mengurangkan kawasan bayang dan meningkatkan kelengkapan curing di sepanjang garis ikatan.",
      "Apabila digunakan dengan Radiometer R2000, pengilang boleh mengkalibrasi output dan menyelaraskan tetapan proses merentasi berbilang sistem dan barisan pengeluaran.",
    ],
    benefits: [
      "Meningkatkan kebolehulangan bonding belon, hab, dan penanda",
      "Mengurangkan risiko kawasan bayang dan curing separa dengan pendedahan 360°",
      "Meminimumkan variasi yang disebabkan oleh pelarasan manual",
      "Menyokong kawalan proses yang sepadan merentasi berbilang barisan pengeluaran",
      "Meningkatkan pengesahan proses dan kebolehjelakkan kualiti bagi pembuatan peranti perubatan",
      "Memberikan bonding yang tepat dengan kesan termal yang terhad",
    ],
    systemUsed: "OmniCure S2000 Elite + Radiometer R2000",
    engineerTip: "Intensiti puncak sahaja tidak menentukan prestasi curing kateter. Kimia pelekat, ketebalan garis ikatan, bahan kateter, sudut pendedahan, konfigurasi pemandu cahaya, jarak kerja, dan masa takt semuanya harus disahkan dengan proses pengeluaran sebenar.",
    etiaSupport: "ETIA membantu pengilang menilai keperluan UV curing, memilih sistem OmniCure yang sesuai, menyelaraskan bekalan produk asli, dan menyediakan sokongan teknikal tempatan untuk ujian aplikasi, pemasangan, penyelesaian masalah, penyelenggaraan, dan perkhidmatan jangka panjang.",
    cta: "Perlukan proses UV curing yang stabil dan boleh dijelak untuk pembuatan kateter? Berbincang dengan jurutera aplikasi ETIA.",
  },
  {
    id: "0801",
    slug: "omnicure-s2000-elite-adas-camera-assembly",
    industry: "Automotif & ADAS",
    title: "OmniCure S2000 Elite Menyokong Bonding Focus-Lock yang Stabil dalam Pemasangan Modul Kamera ADAS",
    overview: [
      "Modul kamera ADAS digunakan untuk penjagaan lorong, pandangan sekeliling, pengecaman papan tanda jalan, tempat letak kereta automatik, dan pengesanan pejalan kaki. Seiring dengan peningkatan kecerdasan kenderaan, pengeluaran modul kamera bergerak daripada pemasangan kecil bertolak ansur kepada pengeluaran berkonsistensi tinggi.",
      "Bonding focus-lock kanta adalah langkah utama. Kedudukan relatif kanta-ke-laras mempengaruhi kualiti imej secara langsung. Pengecutan curing, variasi dos, atau hanyutan fokus semasa UV curing boleh menyebabkan penyimpangan pengimejan, kerja semula, atau risiko kualiti.",
    ],
    challenge: [
      "Selepas pelarasan fokus aktif, kedudukan kanta mesti dikunci dengan cepat dan konsisten. Curing yang perlahan mempengaruhi irama barisan, manakala pengecutan berlebihan boleh mengalihkan fokus.",
      "Persekitaran automotif adalah keras. Modul kamera mesti menahan perubahan suhu, kejutan, getaran, dan pendedahan luar jangka panjang.",
      "Sistem kualiti Tier-1 automotif memerlukan dos UV, status peralatan, dan tetingkap proses dikawal dan didokumentasikan untuk audit pelanggan dan penyerahan gaya PPAP.",
    ],
    solution: [
      "OmniCure S2000 Elite sesuai untuk bonding focus-lock kanta-ke-laras dalam modul kamera ADAS. Ia memberikan output UV yang stabil untuk mencuring pelekat dengan cepat selepas pelarasan fokus dan mengunci kedudukan kanta.",
      "Closed-Loop Feedback membantu mengurangkan variasi curing yang disebabkan oleh hanyutan output, meningkatkan konsistensi fokus dalam pengeluaran berkumpulan. Apabila dipasangkan dengan Radiometer R2000, sistem boleh menyokong kalibrasi dan pengesahan output merentasi berbilang stesen.",
      "Pendekatan ini amat berguna untuk barisan pengeluaran kamera ADAS yang memerlukan fokus yang stabil, bonding optik yang boleh diulang, dan kawalan proses yang terdokumentasi.",
    ],
    benefits: [
      "Meningkatkan konsistensi bonding kunci fokus kanta",
      "Mengurangkan penyimpangan pengimejan dan kerja semula yang disebabkan oleh variasi curing",
      "Menyokong kawalan dos UV merentasi berbilang stesen",
      "Meningkatkan kebolehjelakkan bagi sistem kualiti automotif",
      "Sesuai dengan bonding optik ketepatan tinggi dan pengeluaran berkumpulan",
      "Membantu membina proses curing modul kamera yang lebih stabil",
    ],
    systemUsed: "OmniCure S2000 Elite + Radiometer R2000",
    engineerTip: "Metrik utama bukan sekadar kelajuan curing, tetapi sama ada fokus kekal stabil selepas curing. Hanyutan fokus, kualiti imej selepas kitaran terma, dan konsistensi berkumpulan harus disahkan di bawah keadaan peralatan, pelekat, dan irama takt sebenar.",
    etiaSupport: "ETIA membantu pengilang menilai keperluan UV curing, memilih sistem OmniCure yang sesuai, menyelaraskan bekalan produk asli, dan menyediakan sokongan teknikal tempatan untuk ujian aplikasi, pemasangan, penyelesaian masalah, penyelenggaraan, dan perkhidmatan jangka panjang.",
    cta: "Perlukan peningkatan kestabilan focus-lock dalam pengeluaran modul kamera ADAS? Berbincang dengan jurutera aplikasi ETIA.",
  },
  {
    id: "0301",
    slug: "omnicure-lx500-pcb-assembly",
    industry: "Elektronik & Pemasangan PCB",
    title: "OmniCure LX500 Meningkatkan Kecekapan Fast-Fixing dalam Pemasangan Komponen Mikro PCB",
    overview: [
      "Dalam elektronik dan pemasangan PCB, banyak komponen kecil dipasang atau dikukuh dengan pemendakan pelekat diikuti UV curing. Contoh biasa termasuk penyambung, kabel fleksibel, penderia, modul kamera kecil, komponen elektronik, dan titik pengikat wayar.",
      "Seiring reka bentuk PCB menjadi lebih padat dan kecil, curing terma atau proses menunggu panjang boleh mengehadkan throughput dan memperkenalkan tekanan terma kepada peranti peka. UV LED spot curing menawarkan pilihan fleksibel untuk kawasan ikatan kecil dan stesen kerja automatik.",
    ],
    challenge: [
      "Susun atur PCB adalah padat dan ruang komponen terhad. Rasuk UV mesti dihalakan dengan tepat ke kawasan pelekat tanpa mempengaruhi komponen peka berdekatan.",
      "Irama takt pengeluaran adalah kritikal. Pengilang mahu pelekat dicuring dengan cepat selepas pemendakan untuk mencegah pergerakan semasa pengendalian atau langkah pemasangan seterusnya.",
      "Integrasi otomasi semakin penting. Unit UV curing mesti berfungsi dengan pendispenso, robot, sistem penjaitan penglihatan, atau stesen kerja automatik.",
    ],
    solution: [
      "OmniCure LX500 adalah platform UV LED spot curing yang sesuai untuk pemasangan komponen mikro PCB. Ia boleh digunakan untuk titik kecil, kawasan setempat, dan tugas curing berbilang stesen.",
      "Output UV LED memberikan kawalan buka/tutup yang pantas, kesan terma rendah, output yang stabil, dan integrasi mudah. Dalam bonding penyambung, pengikat wayar, paku komponen, dan pemasangan peranti kecil, LX500 membantu mengunci komponen dengan cepat selepas pemendakan.",
      "Untuk barisan automatik, keupayaan berbilang saluran LX500 boleh menyokong titik curing berganda atau stesen kerja, meningkatkan penggunaan peralatan dan kecekapan pemasangan.",
    ],
    benefits: [
      "Memendekkan masa menunggu selepas pemendakan, meningkatkan irama barisan",
      "Mengurangkan kesan terma kepada komponen peka",
      "Meningkatkan konsistensi curing titik kecil dan pemasangan komponen mikro",
      "Menyokong stesen pemendakan dan curing automatik terintegrasi",
      "Mengurangkan risiko pergerakan komponen semasa pengendalian",
      "Sesuai dengan PCB kepadatan tinggi dan pemasangan elektronik kecil",
    ],
    systemUsed: "OmniCure LX500",
    engineerTip: "UV curing PCB memerlukan perhatian kepada saiz spot, kedudukan pelekat, struktur penutup bayang, dan pantulan bahan. Uji dengan PCB, pelekat, dan perlengkapan sebenar untuk mengesahkan kedalaman curing, kekuatan ikatan, dan kenaikan suhu komponen berdekatan.",
    etiaSupport: "ETIA membantu pengilang menilai keperluan UV curing, memilih sistem OmniCure yang sesuai, menyelaraskan bekalan produk asli, dan menyediakan sokongan teknikal tempatan untuk ujian aplikasi, pemasangan, penyelesaian masalah, penyelenggaraan, dan perkhidmatan jangka panjang.",
    cta: "Perlukan peningkatan kecekapan pemasangan komponen mikro PCB? Berbincang dengan jurutera aplikasi ETIA.",
  },
  {
    id: "0401",
    slug: "omnicure-lx500-optical-transceiver-assembly",
    industry: "Fotonik & Pembungkusan Termaju",
    title: "OmniCure LX500 Menyokong Curing Berketepatan Tinggi Berbilang Saluran untuk Transceiver Optik Berkelajuan Tinggi",
    overview: [
      "Transceiver optik adalah 'aplikasi pembunuh' yang memacu pasaran fotonik silikon dan PIC, mengikut penyelidikan IDTechEx. Kadar data telah berlipat ganda kira-kira setiap beberapa tahun — tahun 2026 menyaksikan pengkomersialan transceiver optik 1.6 Tbps, membolehkan seni bina pemecut AI generasi terbaharu dengan komunikasi cip-ke-cip lebar jalur tinggi dan kependaman rendah.",
      "Setiap modul transceiver — sama ada boleh cabul atau bersama-pakej — bergantung pada bonding UV-cured ketepatan tinggi antara laser, fotodiod, kanta, dan gentian optik.",
    ],
    challenge: [
      "Apabila kadar data meningkat daripada 400G kepada 800G kemudian 1.6T, toleransi penjaitan optik yang diperlukan antara laser/fotodiod dengan gentian menjadi lebih ketat. Pengecutan akibat curing pelekat UV — yang sebelum ini hanya penyumbang toleransi kecil — kini mewakili bahagian ketara daripada jumlah keseluruhan bajet penjaitan.",
      "Pengilang juga menghadapi tekanan meningkat untuk menaikkan throughput apabila hyperscaler memesan transceiver dalam berpuluh juta unit setahun, sambil mengekalkan kebolehpercayaan lapangan melebihi 5 tahun di bawah keadaan operasi pusat data yang berterusan.",
    ],
    solution: [
      "OmniCure LX500 V2 dengan Kepala UV LED V3 365nm menyediakan platform curing berbilang saluran dan berkestabilan tinggi yang diperlukan untuk bonding gentian array transceiver optik.",
      "Digabungkan dengan Sistem Radiometri dan Kalibrasi UV LED OmniCure LS200, pengilang boleh mengesahkan dos UV dalam proses di setiap tapak bonding individu — mewujudkan disiplin kawalan proses yang dituntut oleh toleransi transceiver optik berkelajuan tinggi.",
    ],
    benefits: [
      "Penjaitan optik yang stabil dikekalkan melalui operasi pusat data berterusan melebihi 5 tahun",
      "Curing serentak berbilang saluran mengurangkan masa kitaran seunit pada volum pengeluaran hyperscaler",
      "Dokumentasi proses boleh dijejak NIST menyokong keperluan kelayakan pembekal hyperscaler",
      "Boleh diskala daripada barisan legasi 400G kepada platform transceiver generasi baharu 1.6T dan 3.2T",
    ],
    systemUsed: "OmniCure LX500 V2 + LS200 Radiometer",
    engineerTip: "Kestabilan jangka panjang bonding gentian optik adalah kritikal. Uji dengan gentian sebenar, pelekat, dan keadaan curing sebenar untuk mengesahkan bahawa penjaitan optik dan kestabilan indeks biasan kekal dalam spesifikasi merentasi thermal cycling dan kitaran operasi.",
    etiaSupport: "ETIA membantu pengilang menilai keperluan UV curing, memilih sistem OmniCure yang sesuai, menyelaraskan bekalan produk asli, dan menyediakan sokongan teknikal tempatan untuk ujian aplikasi, pemasangan, penyelesaian masalah, penyelenggaraan, dan perkhidmatan jangka panjang.",
    cta: "Perlukan peningkatan kestabilan curing transceiver optik berkelajuan tinggi? Berbincang dengan jurutera aplikasi ETIA.",
  },
  {
    id: "0701",
    slug: "omnicure-ac-large-fiber-coating",
    industry: "Pembuatan Gentian Optik & Kabel",
    title: "OmniCure AC Large Menyokong Curing Salutan Berkelajuan Tinggi di Menara Penarikan Gentian Optik",
    overview: [
      "Pengeluaran gentian optik bermula dengan menarik gentian kaca daripada preform yang dipanaskan pada kelajuan sehingga 3,500 m/min, kemudian terus menyalut gentian bogel dengan dua lapisan akrilat UV-curable (salutan primer dan sekunder) di dalam menara tarikan.",
      "Permintaan gentian optik global sedang meningkat pesat berikutan tiga trend yang bertemu: pemadatan rangkaian 5G, pembinaan pusat data hiperskala untuk infrastruktur latihan AI, dan program pengembangan jalur lebar kebangsaan.",
    ],
    challenge: [
      "Langkah UV curing adalah halangan throughput kritikal dalam pengeluaran gentian: curing yang tidak mencukupi menyebabkan delaminasi salutan; masa curing berlebihan mengehadkan kelajuan tarikan yang boleh dicapai.",
      "Mencapai curing 360° yang lengkap dan seragam pada kelajuan barisan setinggi mungkin — sambil mengekalkan operasi 24/7 berterusan — adalah cabaran prestasi utama bagi sistem UV curing dalam pengeluaran gentian.",
    ],
    solution: [
      "Sistem menara tarikan gentian UV LED OmniCure AC Large memberikan pendedahan seragam 360° yang direka khusus untuk tuntutan berterusan dan berkelajuan tinggi dalam curing salutan gentian, menyokong kelajuan tarikan melebihi 3,000 m/min.",
      "Platform UV LED OmniCure menawarkan peningkatan kecekapan tenaga yang ketara dan selang servis yang lebih panjang berbanding sistem legasi, mengurangkan jumlah kos pemilikan bagi barisan pengeluaran gentian 24/7.",
    ],
    benefits: [
      "Curing salutan yang lengkap dan seragam pada kelajuan tarikan maksimum menyokong pengembangan kapasiti bagi permintaan gentian 5G dan pusat data AI",
      "Pendedahan seragam 360° menghalang ketidaksimetrian salutan",
      "Platform UV LED cekap tenaga mengurangkan jumlah kos pemilikan berbanding sistem gelombang mikro legasi",
      "Menyokong pengeluaran berterusan 24/7 dengan downtime penyelenggaraan terancang yang minimum",
    ],
    systemUsed: "OmniCure AC Large UV LED",
    engineerTip: "Seragaman curing merentasi lilitan gentian adalah penting. Sebarang ketidaksimetrian akan menyebabkan tekanan baki dan dwibiasan pada gentian siap, menurunkan prestasi optik. Uji sistem dengan preform sebenar dan formulasi salutan untuk mengesahkan seragaman salutan di sepanjang panjang gentian.",
    etiaSupport: "ETIA membantu pengilang menilai keperluan UV curing, memilih sistem OmniCure yang sesuai, menyelaraskan bekalan produk asli, dan menyediakan sokongan teknikal tempatan untuk ujian aplikasi, pemasangan, penyelesaian masalah, penyelenggaraan, dan perkhidmatan jangka panjang.",
    cta: "Perlukan peningkatan curing salutan gentian optik pada barisan berkelajuan tinggi? Berbincang dengan jurutera aplikasi ETIA.",
  },
];
