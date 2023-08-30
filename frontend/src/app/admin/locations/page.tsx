import { getLocations } from "@/library/api/locations";
import Locations from "./components/Locations";

type AdminLocationsProps = {};

export default async function AdminLocations({}: AdminLocationsProps) {
  const locations = await getLocations();

  return <Locations locations={locations} />;
}
