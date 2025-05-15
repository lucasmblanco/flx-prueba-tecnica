import { useCallback, useContext } from "react";
import { UserContext } from "@context/UserContext";
import { dataProvider } from "@services/dataProvider";
import type { User } from "@sharedTypes/index";

const useActions = () => {
  const { user, setUser } = useContext(UserContext);

  const createUser = useCallback(async (values: User) => {
    await dataProvider.create("users", values);
  }, []);

  const updateUser = useCallback(
    async (values: User) => {
      await dataProvider.update("users", user?.id as string, values);
    },
    [user?.id],
  );

  const deleteUser = useCallback(async () => {
    await dataProvider.delete("users", user?.id as string);
  }, [user?.id]);

  const resetUser = () => {
    setUser(null);
  };

  return {
    user,
    createUser,
    updateUser,
    deleteUser,
    resetUser,
  };
};

export default useActions;
