import Image from "next/image";

// Shared "ETIA Service Commitment" cards (genuine products / application-driven
// solution / local supply chain / long-term service). Each source image is a
// self-contained card that already carries the title and all messaging, so we
// render the artwork only — no extra text title or description below it.
// Used on multiple pages — render just the card grid so each page keeps its own
// section heading and intro.
const LOGO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo";

const commitments = [
  { title: "Genuine Products", img: `${LOGO}/etiaservice-geniue%20product.png` },
  { title: "Application-Driven Solution", img: `${LOGO}/etiaservice-application-drive%20solution.png` },
  { title: "Local Supply Chain", img: `${LOGO}/etiaservice-local%20supply%20chain.png` },
  { title: "Long-Term Service", img: `${LOGO}/etiaservice-long%20term%20service.png` },
];

export default function ServiceCommitmentCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {commitments.map((c) => (
        <div key={c.title} className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          <Image src={c.img} alt={c.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-contain" />
        </div>
      ))}
    </div>
  );
}
