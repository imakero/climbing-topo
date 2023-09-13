export const addLocationImage = (body: FormData) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/location-images/`, {
    method: "POST",
    body: body,
    credentials: "include",
  });

export const removeLocationImage = async (locationImageId: number) =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/location-images/${locationImageId}/`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

export const getLocationImages = async (
  searchParams: Record<string, string> | undefined = undefined,
): Promise<PaginatedApiResponse<WithId<LocationImage>[]>> =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/location-images/${
      searchParams ? "?" + new URLSearchParams(searchParams) : ""
    }`,
    {
      cache: "no-cache",
    },
  ).then((res) => res.json());

export const getLocationImage = async (
  locationImageId: number,
): Promise<WithId<LocationImage>> =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/location-images/${locationImageId}/`,
    {
      cache: "no-cache",
    },
  ).then((res) => res.json());
