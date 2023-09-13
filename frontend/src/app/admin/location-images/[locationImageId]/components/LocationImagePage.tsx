import Link from "next/link";
import Editor from "./Editor";

type LocationImagePageProps = {
  locationImage: WithId<LocationImage>;
};

const LocationImagePage = ({ locationImage }: LocationImagePageProps) => {
  return (
    <>
      <h1 className="text-2xl">
        Location Image ({locationImage.id}) for{" "}
        <Link
          href={`/admin/locations/${locationImage.location.id}`}
          className="underline hover:text-teal-500"
        >
          {locationImage.location.name}
        </Link>
      </h1>
      <Editor locationImage={locationImage} />
    </>
  );
};

export default LocationImagePage;
