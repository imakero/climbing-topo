export const removeLine = (id: number) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/lines/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

type LinePayload = {
  problem: number;
  locationImage: number;
  points: {
    type: "LineString";
    coordinates: [number, number][];
  };
};

export const addLine = (data: LinePayload) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/lines/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
