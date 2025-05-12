import { createContext, useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";

interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  status: "active" | "inactive";
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
