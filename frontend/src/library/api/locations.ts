import { NewLocationData } from "@/app/admin/locations/components/NewLocationForm";

export const addLocation = async (location: NewLocationData) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(location),
  });

export const getLocations = async (
  searchParams: Record<string, string> | undefined = undefined,
): Promise<PaginatedApiResponse<WithId<TopoLocation>[]>> =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/locations/${
      searchParams ? "?" + new URLSearchParams(searchParams) : ""
    }`,
    {
      cache: "no-cache",
    },
  ).then((res) => res.json());

export const getLocation = async (
  locationId: number,
): Promise<WithId<TopoLocation>> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/${locationId}/`, {
    cache: "no-cache",
  }).then((res) => res.json());

export const removeLocation = async (locationId: number) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/${locationId}/`, {
    method: "DELETE",
    credentials: "include",
  });
