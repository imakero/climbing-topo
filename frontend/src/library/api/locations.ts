export const getLocations = async (): Promise<WithId<TopoLocation>[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/`, {
    cache: "no-cache",
  }).then((res) => res.json());

export const getLocation = async (
  locationId: number,
): Promise<WithId<TopoLocation>> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/${locationId}/`, {
    cache: "no-cache",
  }).then((res) => res.json());
