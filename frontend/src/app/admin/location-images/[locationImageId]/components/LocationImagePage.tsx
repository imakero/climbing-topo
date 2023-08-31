import Editor from "./Editor";

type LocationImagePageProps = {
  locationImage: WithId<LocationImage>;
};

const LocationImagePage = ({ locationImage }: LocationImagePageProps) => {
  return (
    <>
      <h1 className="text-2xl">
        Location Image ({locationImage.id}) for {locationImage.location.name}
      </h1>
      <Editor locationImage={locationImage} />
    </>
  );
};

export default LocationImagePage;
