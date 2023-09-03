import CopyableCoordinates from "@/components/CopyableCoordinates";
import Topo from "@/components/Topo";

type LocationPageProps = {
  location: WithId<TopoLocation>;
};

const LocationPage = ({ location }: LocationPageProps) => {
  return (
    <div className="container mx-auto flex flex-col space-y-4">
      <h1 className="text-3xl">{location.name}</h1>
      <section>
        <h2 className="text-xl">Information</h2>
        <CopyableCoordinates>
          Location 📍 ({location.position.googleMapsString})
        </CopyableCoordinates>
      </section>
      <section>
        <h2 className="text-xl">Images</h2>
        {location.images.map((image) => (
          <Topo key={image.id} locationImage={image} />
        ))}
      </section>
    </div>
  );
};

export default LocationPage;
