import { useCallback, useState, useEffect } from "react";

const useTableActions = (fetchCallback) => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 9 });
  const [statusFilter, setStatusFilter] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(
    async (
      page = pagination.current,
      pageSize = pagination.pageSize,
      input = inputFilter,
      status = statusFilter,
    ) => {
      setLoading(true);
      try {
        const result = await fetchCallback(page, pageSize, input, status);
        return result;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [fetchCallback, pagination, inputFilter, statusFilter],
  );

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const handleSearchInput = (value) => {
    const normalizedValue = value ? value.toLowerCase() : "";
    setInputFilter(normalizedValue);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value ? value : "");
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
