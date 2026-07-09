// Hero images hosted on Tencent COS. Filenames contain spaces (URL-encoded as
// %20); note HERO- SUPPORT01 has a space right after "HERO-".
const BASE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/HERO%20IMAGE";

export const HERO_IMAGES = {
  // Carousels
  home: [
    `${BASE}/HERO-HOME01-S2000%20NFC.jpg`,
    `${BASE}/HERO-HOME02-LX505.jpeg`,
    `${BASE}/HERO-HOME03-AC9225-F.png`,
    `${BASE}/HERO-HOME04-nexusII.png`,
    `${BASE}/HERO-HOME05-S2000%20LAMP.png`,
  ],
  support: [
    `${BASE}/HERO-%20SUPPORT01-geniue%20product.png`,
    `${BASE}/HERO-SUPPORT02-application-drive%20solution.png`,
    `${BASE}/HERO-SUPPORT03-local%20supply%20chain.png`,
    `${BASE}/HERO-SUPPORT04-long%20term%20service.png`,
  ],
  application: [
    `${BASE}/HERO-APPLICATION-01%20AUTO.jpg`,
    `${BASE}/HERO-APPLICATION-02%20MEDICAL.jpg`,
    `${BASE}/HERO-APPLICATION-03%20CPO.jpg`,
    `${BASE}/HERO-APPLICATION-04%20OPTICAL.jpg`,
    `${BASE}/HERO-APPLICATION05-OPTICAL%20FIBRE.jpg`,
  ],
  // Fixed single images
  omnicure: [`${BASE}/HERO-OMNICURE-S2000.png`],
  phoseon: [`${BASE}/HERO-PHOSEON-NexusII.png`],
  insights: [`${BASE}/HERO-HOME-INSIGHT.jpg`],
} as const;
