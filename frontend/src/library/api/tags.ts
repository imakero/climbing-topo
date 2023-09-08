export const getTags = async (): Promise<WithId<Tag>[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags/`, {
    cache: "no-cache",
  }).then((res) => res.json());
