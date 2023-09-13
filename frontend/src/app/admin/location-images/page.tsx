import { getLocationImages } from "@/library/api/locationImages";
import LocationImages from "./components/LocationImages";

export default async function AdminLocationImages({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let params: Record<string, string> = {};
  if (searchParams["page"]) {
    params["page"] = searchParams["page"] as string;
  }
  const { results, ...props } = await getLocationImages(params);

  return <LocationImages locationImages={results} {...props} />;
}
