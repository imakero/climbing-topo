import LocationImagePage from "./components/LocationImagePage";

export async function generateStaticParams() {
  const locationImages = await fetch(
    "http://localhost:8009/api/v1/location-images/",
  ).then((res) => res.json());

  return locationImages.map((locationImage: WithId<LocationImage>) => ({
    locationImageId: locationImage.id.toString(),
  }));
}

async function getLocationImage(locationImageId: string) {
  const locationImages = await fetch(
    `http://localhost:8009/api/v1/location-images/${locationImageId}/`,
    {
      cache: "no-cache",
    },
  ).then((res) => res.json());

  return locationImages;
}

export default async function AdminLocationImage({
  params,
}: {
  params: { locationImageId: string };
}) {
  const locationImage = await getLocationImage(params.locationImageId);

  return (
    <>
      <LocationImagePage locationImage={locationImage} />
    </>
  );
}
