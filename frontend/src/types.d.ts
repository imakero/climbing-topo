type WithId<T> = T & { id: number };

type User = {
  pk: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isSuperuser: boolean;
  groups: Group[];
};

type Group = {
  name: string;
};

type Point = {
  x: number;
  y: number;
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
  problems: LocationImageProblem[];
};

type Line = {
  locationImage: number;
  problem: {
    id: number;
    name: string;
    grade: string;
  };
  points: {
    type: "LineString";
    coordinates: [number, number][];
  };
};

type LocationImage = {
  location: Omit<TopoLocation, "images"> & { problems: LocationImageProblem[] };
  image: string;
  imageWidth: number;
  imageHeight: number;
  lines: LocationImageLine[];
};

type LocationImageProblem = Pick<WithId<Problem>, "id" | "name" | "grade">;
type LocationImageLine = Pick<WithId<Line>, "id" | "points" | "problem">;

type Position = {
  lon: number;
  lat: number;
  googleMapsString: string;
};

type Tag = {
  name: string;
};
