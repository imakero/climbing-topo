export const addLocationImage = (body: FormData) =>
  fetch("http://localhost:8009/api/v1/location-images/", {
    method: "POST",
    body: body,
    credentials: "include",
  });

export const removeLocationImage = async (locationImageId: number) =>
  fetch(`http://localhost:8009/api/v1/location-images/${locationImageId}/`, {
    method: "DELETE",
    credentials: "include",
  });
