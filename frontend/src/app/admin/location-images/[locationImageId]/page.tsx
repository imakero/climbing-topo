import {
  getLocationImage,
  getLocationImages,
} from "@/library/api/locationImages";
import LocationImagePage from "./components/LocationImagePage";

export async function generateStaticParams() {
  const { results: locationImages } = await getLocationImages();

  return locationImages.map((locationImage) => ({
    locationImageId: locationImage.id.toString(),
  }));
}

export default async function AdminLocationImage({
  params,
}: {
  params: { locationImageId: string };
}) {
  const locationImage = await getLocationImage(
    parseInt(params.locationImageId),
  );

  return (
    <>
      <LocationImagePage locationImage={locationImage} />
    </>
  );
}
