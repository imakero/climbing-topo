export const removeLine = (id: number) =>
  fetch(`http://localhost:8009/api/v1/lines/${id}`, {
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
  fetch(`http://localhost:8009/api/v1/lines/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
