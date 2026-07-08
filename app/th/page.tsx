import LocalizedHome from "@/components/LocalizedHome";
import { localizedHomeMetadata, localizedOrganizationJsonLd } from "@/components/localizedSeo";

export const metadata = localizedHomeMetadata("th");

export default function ThaiHome() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedOrganizationJsonLd("th")) }} /><LocalizedHome locale="th" /></>;
}
