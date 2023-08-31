import { getLocations } from "@/library/api/locations";
import LocationsPage from "./components/Locations";
import NewLocationForm from "./components/NewLocationForm";

type AdminLocationsProps = {};

export default async function AdminLocations({}: AdminLocationsProps) {
  const locations = await getLocations();

  return (
    <>
      <LocationsPage locations={locations} />
    </>
  );
}
