import { getLocationImages } from "@/library/api/locationImages";
import LocationImages from "./components/LocationImages";

type AdminLocationsProps = {};

export default async function AdminLocations({}: AdminLocationsProps) {
  const locationImages = await getLocationImages();

  return (
    <>
      <h1 className="text-2xl">Location Images Admin</h1>
      <LocationImages locationImages={locationImages} />
    </>
  );
}
