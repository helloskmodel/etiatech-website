import Image from "next/image";

// Shared "ETIA Service Commitment" cards (genuine products / application-driven
// solution / local supply chain / long-term service) with the service logos.
// Used on multiple pages — render just the card grid so each page keeps its own
// section heading and intro.
const LOGO = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo";

const commitments = [
  { title: "Genuine Products", img: `${LOGO}/etiaservice-geniue%20product.png`, body: "Authorized supply of genuine UV curing systems, lamps and accessories." },
  { title: "Application-Driven Solution", img: `${LOGO}/etiaservice-application-drive%20solution.png`, body: "Systems matched to your adhesive, substrate, cure area, wavelength and cycle time." },
  { title: "Local Supply Chain", img: `${LOGO}/etiaservice-local%20supply%20chain.png`, body: "Local stock and a dependable regional supply chain to reduce lead time and downtime." },
  { title: "Long-Term Service", img: `${LOGO}/etiaservice-long%20term%20service.png`, body: "Installation, training, troubleshooting, maintenance and repair for the long term." },
];

export default function ServiceCommitmentCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {commitments.map((c) => (
        <article key={c.title} className="flex flex-col items-center rounded-3xl border border-[#E6EAF0] bg-[#FAFBFC] p-6 text-center">
          <div className="relative h-20 w-20">
            <Image src={c.img} alt={c.title} fill sizes="80px" className="object-contain" />
          </div>
          <h3 className="mt-4 font-bold text-[#102A43]">{c.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#5F6C7B]">{c.body}</p>
        </article>
      ))}
    </div>
  );
}
