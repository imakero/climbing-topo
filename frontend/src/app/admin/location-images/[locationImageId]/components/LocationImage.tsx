import Editor from "./Editor";

type LocationImageProps = {
  locationImage: WithId<LocationImage>;
};

const LocationImage = ({ locationImage }: LocationImageProps) => {
  return (
    <>
      <h1 className="text-2xl">
        Location Image ({locationImage.id}) for {locationImage.location.name}
      </h1>
      <Editor locationImage={locationImage} />
    </>
  );
};

export default LocationImage;
