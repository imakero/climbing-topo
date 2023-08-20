type WithId<T> = T & { id: number };

type User = {
  pk: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

type Problem = {
  name: string;
  description: string;
  grade: string;
  location: WithId<TopoLocation>;
  tags: string[];
  ascents: number;
  rating: number;
};

type TopoLocation = {
  name: string;
  type: string;
  position: Position;
  images: WithId<LocationImage>[];
};

type LocationImage = {
  location: number;
  image: string;
  imageWidth: number;
  imageHeight: number;
};

type Position = {
  lon: number;
  lat: number;
  googleMapsString: string;
};

type Tag = {
  name: string;
};
