import { useEffect, useState, useCallback, useContext } from "react";
import { UsersListContext } from "../context/UsersListContext";
import { UserContext } from "../context/UserContext";
import { dataProvider } from "../services/dataProvider";
import useTableActions from "./useTableActions";
import { normalizeAndMergeUserData } from "../utils/tableUtils";

const useTable = () => {
  const { usersList, setUsersList } = useContext(UsersListContext);
  const { setUser } = useContext(UserContext);

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [total, setTotal] = useState(0);

  const initialFetchUser = useCallback(
    async (page, limit, input, status) => {
      try {
        let users;
        let total;
        if (input !== "" || status !== "") {
          const [resultsByName, resultsByLastname] = await Promise.all(
            ["name", "lastname"].map((field) =>
              dataProvider.getList("users", {
                pagination: {
                  page: page,
                  limit: limit,
                },
                filters: {
                  [field]: input,
                  status: status,
                },
              }),
            ),
          );

          const normalizedResults = normalizeAndMergeUserData(
            resultsByName,
            resultsByLastname,
          );

          users = normalizedResults.users;
          total = normalizedResults.total;
        } else {
          const usersList = await dataProvider.getList("users", {
            pagination: {
              page: page,
              limit: limit,
            },
          });
          users = usersList.data;
          total = usersList.total;
        }

        setTotal(total);
        setUsersList(users);
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
  } = useTableActions(initialFetchUser);

  const handleEdit = (record) => {
    setUser(record);
    setOpenFormModal(true);
  };

  const handleDelete = (record) => {
    setUser(record);
    setOpenDeleteModal(true);
  };

  useEffect(() => {
    fetchUsers(
      pagination.current,
      pagination.pageSize,
      inputFilter,
      statusFilter,
    );
  }, [fetchUsers, inputFilter, pagination, statusFilter]);

  return {
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
