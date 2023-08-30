export const removeLine = (id: number) =>
  fetch(`http://localhost:8009/api/v1/lines/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
