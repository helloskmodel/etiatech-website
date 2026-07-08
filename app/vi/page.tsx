import LocalizedHome from "@/components/LocalizedHome";
import { localizedHomeMetadata, localizedOrganizationJsonLd } from "@/components/localizedSeo";

export const metadata = localizedHomeMetadata("vi");

export default function VietnameseHome() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedOrganizationJsonLd("vi")) }} /><LocalizedHome locale="vi" /></>;
}
