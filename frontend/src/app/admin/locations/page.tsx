import Locations from "./components/Locations";

type AdminLocationsProps = {};

async function getLocations() {
  const locations = await fetch(`http://localhost:8009/api/v1/locations/`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  return locations;
}

export default async function AdminLocations({}: AdminLocationsProps) {
  const locations = await getLocations();

  return <Locations locations={locations} />;
}
