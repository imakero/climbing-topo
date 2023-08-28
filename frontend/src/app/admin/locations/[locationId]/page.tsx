import LocationPage from "./components/LocationPage";

export async function generateStaticParams() {
  const locations = await fetch("http://localhost:8009/api/v1/locations/").then(
    (res) => res.json(),
  );

  return locations.map((location: WithId<Location>) => ({
    locationId: location.id.toString(),
  }));
}

async function getLocation(locationId: string) {
  const location = await fetch(
    `http://localhost:8009/api/v1/locations/${locationId}/`,
    {
      next: { revalidate: 1 },
    },
  ).then((res) => res.json());

  return location;
}

export default async function AdminLocation({
  params,
}: {
  params: { locationId: string };
}) {
  const location = await getLocation(params.locationId);

  return <LocationPage location={location} />;
}
