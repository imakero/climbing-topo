import LinkButton from "@/components/LinkButton";
import Link from "next/link";

type LocationImagesProps = {
  locationImages: WithId<LocationImage>[];
};

const LocationImages = ({ locationImages }: LocationImagesProps) => {
  return (
    <ul>
      {locationImages.map((locationImage) => (
        <li key={locationImage.id} className="my-4 ">
          <div className="flex flex-row justify-between">
            <Link href={`/admin/location-images/${locationImage.id}`}>
              {locationImage.location.name} ({locationImage.id})
            </Link>
            <div>
              <LinkButton
                href={`/admin/location-images/${locationImage.id}`}
                className="ml-4"
              >
                Edit
              </LinkButton>
              <LinkButton
                href={`/admin/location-images/${locationImage.id}`}
                className="ml-4"
              >
                Delete
              </LinkButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LocationImages;
