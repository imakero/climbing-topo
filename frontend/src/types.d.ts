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
  distKm?: number;
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
    rating: number;
    description: string;
    ascents: number;
  };
  points: {
    type: "LineString";
    coordinates: [number, number][];
  };
};

type LocationImage = {
  location: Omit<WithId<TopoLocation>, "images"> & {
    problems: LocationImageProblem[];
  };
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

type Ascent = {
  user: WithId<AscentUser>;
  problem: number;
  comment: string;
  givenRating: number;
  createdAt: string;
  updatedAt: string;
};

type AscentUser = {
  username: string;
  firstName: string;
  lastName: string;
};

type PaginatedApiResponse<T> = {
  results: T;
  next: string | null;
  previous: string | null;
  count: string;
};

type PaginatedPageProps<T> = {
  page?: string;
  next: null | string;
  previous: null | string;
  count: string;
} & T;
