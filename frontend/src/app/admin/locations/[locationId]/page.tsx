import { getLocation, getLocations } from "@/library/api/locations";
import LocationPage from "./components/LocationPage";

export async function generateStaticParams() {
  const { results: locations } = await getLocations();

  return locations.map((location) => ({
    locationId: location.id.toString(),
  }));
}

export default async function AdminLocation({
  params,
}: {
  params: { locationId: string };
}) {
  const location = await getLocation(parseInt(params.locationId));

  return <LocationPage location={location} />;
}
