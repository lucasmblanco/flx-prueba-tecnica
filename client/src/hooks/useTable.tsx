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
         Esta es la única forma que encontré para filtrar resultados usando un solo input
         que busque coincidencias tanto en "name" como en "lastname".

         json-server no permite hacer búsquedas combinadas en múltiples columnas con una sola consulta,
         así que tuve que hacer dos: una por "name" y otra por "lastname", y después unir los resultados.

         Cuando sucede esto no uso "_page" ni "_limit" porque al paginar, solo obtengo una parte de los resultados en cada consulta,
         y como pueden haber usuarios repetidos entre ambos resultados, no tengo forma de calcular
         el total real de elementos únicos. Ese total es necesario para que la tabla pueda paginar correctamente
         según los filtros aplicados.
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
