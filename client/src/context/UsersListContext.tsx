import { createContext, useState } from "react";
import type { User, UsersListContextType } from "../types";

interface UsersListProviderProps {
  children: React.ReactNode;
}

const UsersListContext = createContext<UsersListContextType>({
  usersList: [],
  setUsersList: () => {},
});

const UsersListProvider: React.FC<UsersListProviderProps> = ({ children }) => {
  const [usersList, setUsersList] = useState<User[]>([]);

  return (
    <UsersListContext.Provider value={{ usersList, setUsersList }}>
      {children}
    </UsersListContext.Provider>
  );
};

export { UsersListContext, UsersListProvider };
