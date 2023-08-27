"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { logout } from "@/library/auth";

const Page = () => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      await logout();
      setUser(null);
      router.push("/login");
    })();
  }, [router, setUser]);

  return <p>Logging out...</p>;
};

export default Page;
