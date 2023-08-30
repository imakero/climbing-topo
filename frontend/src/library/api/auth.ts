export const login = async (username: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    },
  );
  if (!response.ok) {
    throw response;
  }
  return await response.json();
};

export const logout = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw response;
  }
  return await response.json();
};

export const getUser = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/user/`,
    {
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw response.statusText;
  }
  return await response.json();
};
