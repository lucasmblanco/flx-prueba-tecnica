import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import { UsersListContext } from "@context/UsersListContext";
import { dataProvider } from "@services/dataProvider";
import type { FetchUsersListParams, User } from "@sharedTypes/index";
import { normalizeAndMergeUserData } from "@utils/tableUtils";
import useTableActions from "./useTableActions";

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
  const [allFilteredDataLoaded, setAllFilteredDataLoaded] = useState(false);

  const fetchUsersList = useCallback(
    async ({
      page,
      limit,
      searchTerm = "",
      status = "",
    }: FetchUsersListParams) => {
      try {
        let result: Result<User>;
        /*
          Es el unico modo que pude encontrar para poder traer resultados filtrados por un unico input
          y que filtre por las columnas de "name" y "lastname". json-server no soporta el operador OR en las querys.
          Tuve que eliminar la paginación cuando ocurre esto, de lo contrario no es posible acceder a un valor correcto de x-count-header,
          que es necesario para que la tabla sepa el total de recursos que existen con los filtros actuales.
        */
        if (searchTerm || status) {
          const [resultsByName, resultsByLastname] = await Promise.all(
            ["name", "lastname"].map((field) =>
              dataProvider.getList<User>("users", {
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
          setAllFilteredDataLoaded(true);
        } else {
          setAllFilteredDataLoaded(false);
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
  } = useTableActions(fetchUsersList, setAllFilteredDataLoaded);

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
    if ((inputFilter || statusFilter) && allFilteredDataLoaded) return;

    fetchUsers(
      pagination.current,
      pagination.pageSize,
      inputFilter,
      statusFilter,
    );
    setAllFilteredDataLoaded(false);
  }, [
    fetchUsers,
    inputFilter,
    pagination,
    statusFilter,
    allFilteredDataLoaded,
  ]);

  return {
    fetchUsers,
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
