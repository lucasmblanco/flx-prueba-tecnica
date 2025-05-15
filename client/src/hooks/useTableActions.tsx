import type { TablePaginationConfig } from "antd";
import { useCallback, useState } from "react";
import type { FetchUsersListParams } from "@sharedTypes/index";
import { INITIAL_PAGE, PAGE_SIZE } from "@/constants";

const useTableActions = (
  fetchCallback: ({
    page,
    limit,
    searchTerm,
    status,
  }: FetchUsersListParams) => Promise<void>,
  setAllFilteredDataLoaded: (value: boolean) => void,
) => {
  const [pagination, setPagination] = useState({
    current: INITIAL_PAGE,
    pageSize: PAGE_SIZE,
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(
    async (
      page = pagination.current,
      limit = pagination.pageSize,
      searchTerm = inputFilter,
      status = statusFilter,
    ) => {
      setLoading(true);
      try {
        const result = await fetchCallback({ page, limit, searchTerm, status });
        return result;
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchCallback, pagination, inputFilter, statusFilter],
  );

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current ?? INITIAL_PAGE,
      pageSize: pagination.pageSize ?? PAGE_SIZE,
    });
  };

  const handleSearchInput = (value: string) => {
    setAllFilteredDataLoaded(false);
    const normalizedValue = value ? value.toLowerCase().trim() : "";
    setInputFilter(normalizedValue);
    setPagination((prev) => ({
      ...prev,
      current: INITIAL_PAGE,
    }));
  };

  const handleStatusChange = (value: string) => {
    setAllFilteredDataLoaded(false);
    setStatusFilter(value ? value : "");
    setPagination((prev) => ({
      ...prev,
      current: INITIAL_PAGE,
    }));
  };

  return {
    loading,
    setLoading,
    pagination,
    statusFilter,
    inputFilter,
    setPagination,
    setStatusFilter,
    setInputFilter,
    fetchUsers,
    handleTableChange,
    handleStatusChange,
    handleSearchInput,
  };
};

export default useTableActions;
