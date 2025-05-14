import type { TablePaginationConfig } from "antd";
import { useCallback, useState } from "react";
import type { FetchUsersListParams } from "../types";

const useTableActions = (
  fetchCallback: ({
    page,
    limit,
    searchTerm,
    status,
  }: FetchUsersListParams) => Promise<void>,
) => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 9 });
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
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 9,
    });
  };

  const handleSearchInput = (value: string) => {
    const normalizedValue = value ? value.toLowerCase().trim() : "";
    setInputFilter(normalizedValue);
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value ? value : "");
    setPagination((prev) => ({
      ...prev,
      current: 1,
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
