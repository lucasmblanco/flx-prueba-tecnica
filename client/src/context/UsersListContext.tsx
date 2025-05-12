import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  status: "active" | "inactive";
}

interface UsersListContextType {
  usersList?: User[];
  setUsersList: Dispatch<SetStateAction<User[] | []>>;
}

const UsersListContext = createContext<UsersListContextType>({
  usersList: [],
  setUsersList: () => {},
});

const UsersListProvider = ({ children }) => {
  const [usersList, setUsersList] = useState<any[]>([]);

  return (
    <UsersListContext.Provider value={{ usersList, setUsersList }}>
      {children}
    </UsersListContext.Provider>
  );
};

export { UsersListContext, UsersListProvider };
