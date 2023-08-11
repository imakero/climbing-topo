"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";

const Page = () => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8009/api/v1/auth/logout/", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      router.push("/login");
    })();
  }, [router, setUser]);

  return <p>Logging out...</p>;
};

export default Page;
