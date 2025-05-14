import { useEffect, useState, useCallback, useContext } from "react";
import { UsersListContext } from "../context/UsersListContext";
import { UserContext } from "../context/UserContext";
import { dataProvider } from "../services/dataProvider";
import useTableActions from "./useTableActions";
import { normalizeAndMergeUserData } from "../utils/tableUtils";
import type { User, FetchUsersListParams } from "../types";

type Result<T> = {
  data: T[];
  total: number;
};

const useTable = () => {
  const { usersList, setUsersList } = useContext(UsersListContext);
  const { setUser } = useContext(UserContext);

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchUsersList = useCallback(
    async ({
      page,
      limit,
      searchTerm = "",
      status = "",
    }: FetchUsersListParams) => {
      try {
        let result: Result<User>;
        if (searchTerm || status) {
          const [resultsByName, resultsByLastname] = await Promise.all(
            ["name", "lastname"].map((field) =>
              dataProvider.getList<User>("users", {
                pagination: {
                  page: page,
                  limit: limit,
                },
                filters: {
                  [field]: searchTerm,
                  status: status,
                },
              }),
            ),
          );

          const usersData = normalizeAndMergeUserData(
            resultsByName,
            resultsByLastname,
          );
          result = usersData;
        } else {
          const usersData = await dataProvider.getList<User>("users", {
            pagination: {
              page: page,
              limit: limit,
            },
          });
          result = usersData;
        }

        setTotal(result.total);
        setUsersList(result.data);
      } catch (error) {
        console.error(error);
      }
    },
    [setUsersList],
  );

  const {
    loading,
    pagination,
    statusFilter,
    inputFilter,
    fetchUsers,
    handleTableChange,
    handleSearchInput,
    handleStatusChange,
  } = useTableActions(fetchUsersList);

  const handleEdit = (record: User) => {
    setUser(record);
    setOpenFormModal(true);
  };

  const handleDelete = (record: User) => {
    setUser(record);
    setOpenDeleteModal(true);
  };

  function handleAddButtonModal() {
    setOpenFormModal(true);
  }

  useEffect(() => {
    fetchUsers(
      pagination.current,
      pagination.pageSize,
      inputFilter,
      statusFilter,
    );
  }, [fetchUsers, inputFilter, pagination, statusFilter]);

  return {
    handleAddButtonModal,
    handleDelete,
    handleEdit,
    handleSearchInput,
    handleStatusChange,
    handleTableChange,
    loading,
    openDeleteModal,
    openFormModal,
    pagination,
    setOpenDeleteModal,
    setOpenFormModal,
    total,
    usersList,
  };
};

export default useTable;
