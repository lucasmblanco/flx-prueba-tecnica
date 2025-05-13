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

        const { users, total } = normalizeAndMergeUserData(
          resultsByName,
          resultsByLastname,
        );

        setTotal(total);
        setUsersList(users);
      } catch (error) {
        console.error(error);
      }
    },
    [setUsersList],
  );

  const {
    pagination,
    statusFilter,
    inputFilter,
    handleSearchInput,
    fetchUsers,
    handleTableChange,
    handleStatusChange,
  } = useTableActions(initialFetchUser);

  function handleAddButtonModal() {
    setOpenFormModal(true);
  }

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
    pagination,
    usersList,
    openFormModal,
    openDeleteModal,
    total,
    handleSearchInput,
    handleTableChange,
    handleStatusChange,
    handleAddButtonModal,
    handleEdit,
    handleDelete,
    setOpenFormModal,
    setOpenDeleteModal,
  };
};

export default useTable;
