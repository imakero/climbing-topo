import Image from "next/image";

type LocationProps = {
  location: WithId<TopoLocation>;
};

const Location = ({ location }: LocationProps) => {
  return (
    <div className="container mx-auto flex flex-col space-y-4">
      <h1 className="text-2xl">{location.name}</h1>

      <section>
        <h2 className="text-xl">Images</h2>
        {location.images.map((image) => {
          return (
            <Image
              key={image.id}
              src={image.image}
              alt={`Image of location ${location.name}`}
              width={image.imageWidth}
              height={image.imageHeight}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Location;
