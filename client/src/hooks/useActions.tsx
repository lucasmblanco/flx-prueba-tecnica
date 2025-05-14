import { useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UsersListContext } from "../context/UsersListContext";
import { dataProvider } from "../services/dataProvider";
import type { User } from "../types";

const useActions = () => {
	const { user, setUser } = useContext(UserContext);
	const { setUsersList } = useContext(UsersListContext);

	const createUser = useCallback(
		async (values: User) => {
			const newUser = await dataProvider.create("users", values);
			setUsersList((prev) => [...prev, newUser.data]);
		},
		[setUsersList],
	);

	const updateUser = useCallback(
		async (values: User) => {
			const updatedUser = await dataProvider.update(
				"users",
				user?.id as string,
				values,
			);
			setUsersList((prev) =>
				prev.map((u) => (u.id === updatedUser.data.id ? updatedUser.data : u)),
			);
		},
		[setUsersList, user?.id],
	);

	const deleteUser = useCallback(async () => {
		await dataProvider.delete("users", user?.id as string);
		setUsersList((prev) => prev.filter((u) => u.id !== user?.id));
	}, [setUsersList, user?.id]);

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
