import LocationImages from "./components/LocationImages";

type AdminLocationsProps = {};

async function getLocationImages() {
  const locationImages = await fetch(
    `http://localhost:8009/api/v1/location-images/`,
    {
      next: { revalidate: 60 },
    },
  ).then((res) => res.json());

  return locationImages;
}

export default async function AdminLocations({}: AdminLocationsProps) {
  const locationImages = await getLocationImages();

  return (
    <>
      <h1 className="text-2xl">Location Images Admin</h1>
      <LocationImages locationImages={locationImages} />
    </>
  );
}
