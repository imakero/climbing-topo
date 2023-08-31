"use client";

import { useContext } from "react";
import { UserContext } from "../app/context/UserProvider";
import Link from "next/link";

const NavUser = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="mt-4 text-teal-200 lg:mt-0 lg:inline-block">
      {user ? (
        <span>
          <span className="font-bold">{user?.username}</span>(
          <Link href="/logout">log out</Link>)
          {(user?.isSuperuser ||
            user?.groups.find((group) => group.name === "moderator")) && (
            <Link href="/admin">Admin</Link>
          )}
        </span>
      ) : (
        <Link href="/login" className="hover:text-white">
          Login
        </Link>
      )}
    </div>
  );
};

export default NavUser;
