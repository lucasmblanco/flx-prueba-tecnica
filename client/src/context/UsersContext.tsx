import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  status: "active" | "inactive";
}

interface UsersContextType {
  users?: User[];
  setUsers: Dispatch<SetStateAction<User[] | undefined>>;
}

const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {},
});

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState<any[]>();

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
