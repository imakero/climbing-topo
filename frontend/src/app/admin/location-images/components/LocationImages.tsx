import LinkButton from "@/components/LinkButton";
import PaginationController from "@/components/PaginationController";
import Link from "next/link";

type LocationImagesProps = PaginatedPageProps<{
  locationImages: WithId<LocationImage>[];
}>;

const LocationImages = ({
  locationImages,
  page,
  count,
  next,
  previous,
}: LocationImagesProps) => {
  return (
    <>
      <h1 className="text-2xl">Location Images Admin</h1>
      <PaginationController
        baseUrl={"/admin/location-images"}
        count={count}
        next={next}
        previous={previous}
        page={page}
      />
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
    </>
  );
};

export default LocationImages;
