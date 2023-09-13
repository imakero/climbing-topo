import { getLocations } from "@/library/api/locations";
import LocationsPage from "./components/LocationsPage";

export default async function AdminLocations({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let params: Record<string, string> = {};
  if (searchParams["page"]) {
    params["page"] = searchParams["page"] as string;
  }
  const { results, ...props } = await getLocations(params);

  return <LocationsPage locations={results} {...props} />;
}
