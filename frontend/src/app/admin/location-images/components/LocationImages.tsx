import Link from "next/link";

type LocationImagesProps = {
  locationImages: WithId<LocationImage>[];
};

const LocationImages = ({ locationImages }: LocationImagesProps) => {
  return (
    <ul>
      {locationImages.map((locationImage) => (
        <li key={locationImage.id}>
          <div className="flex flex-row justify-between">
            <Link href={`/admin/location-images/${locationImage.id}`}>
              {locationImage.id}
            </Link>
            <div>
              <Link
                href={`/admin/location-images/${locationImage.id}`}
                className="ml-4"
              >
                Edit
              </Link>
              <Link
                href={`/admin/location-images/${locationImage.id}`}
                className="ml-4"
              >
                Delete
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LocationImages;
