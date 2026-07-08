import LocalizedHome from "@/components/LocalizedHome";
import { localizedHomeMetadata, localizedOrganizationJsonLd } from "@/components/localizedSeo";

export const metadata = localizedHomeMetadata("zh");

export default function ChineseHome() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedOrganizationJsonLd("zh")) }} /><LocalizedHome locale="zh" /></>;
}
