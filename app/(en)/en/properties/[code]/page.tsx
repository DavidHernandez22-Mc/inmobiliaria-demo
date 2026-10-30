import { PropertyRoute, propertyMetadata, propertyStaticParams } from "@/lib/property-route";

export const dynamicParams = false;
export const generateStaticParams = propertyStaticParams;

export function generateMetadata({ params }: PageProps<"/en/properties/[code]">) {
  return propertyMetadata("en", params);
}

export default function Page({ params }: PageProps<"/en/properties/[code]">) {
  return <PropertyRoute lang="en" params={params} />;
}
