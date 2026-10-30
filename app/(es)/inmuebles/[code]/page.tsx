import { PropertyRoute, propertyMetadata, propertyStaticParams } from "@/lib/property-route";

export const dynamicParams = false;
export const generateStaticParams = propertyStaticParams;

export function generateMetadata({ params }: PageProps<"/inmuebles/[code]">) {
  return propertyMetadata("es", params);
}

export default function Page({ params }: PageProps<"/inmuebles/[code]">) {
  return <PropertyRoute lang="es" params={params} />;
}
