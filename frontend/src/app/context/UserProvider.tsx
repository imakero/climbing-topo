import { getUser, logout } from "@/library/api/auth";
import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (e) {
        if (typeof e === "string") {
          await logout();
        }
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
