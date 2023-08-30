export const addLocationImage = (body: FormData) =>
  fetch("http://localhost:8009/api/v1/location-images/", {
    method: "POST",
    body: body,
    credentials: "include",
  });

