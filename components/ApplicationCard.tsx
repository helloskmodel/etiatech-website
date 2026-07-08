import Image from "next/image";
import Link from "next/link";

export default function ApplicationCard({ application, compact = false }: { application: any; compact?: boolean }) {
  return (
    <Link href={`/applications/${application.slug}`} className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-[#1A56DB]/30 hover:shadow-md">
      {!compact && (
        <div className="relative aspect-video bg-gray-50">
          <Image src={application.image} alt={application.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      )}
      <div className="border-t border-gray-100 p-5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#44B549]">{Array.isArray(application.industry) ? application.industry[0] : application.industry}</p>
        <h3 className="text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#1A56DB]">{application.title}</h3>
        {!compact && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">{application.subtitle}</p>}
        <p className="mt-4 text-xs font-semibold text-[#1A56DB]">Read application →</p>
      </div>
    </Link>
  );
}
