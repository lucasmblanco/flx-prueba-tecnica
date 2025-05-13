import { useCallback, useState } from "react";

const useTableActions = (initialFetchCallback) => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 9 });
  const [statusFilter, setStatusFilter] = useState("");
  const [inputFilter, setInputFilter] = useState("");

  const fetchUsers = useCallback(
    async (
      page = pagination.current,
      pageSize = pagination.pageSize,
      input = inputFilter,
      status = statusFilter,
    ) => {
      return initialFetchCallback(page, pageSize, input, status);
    },
    [initialFetchCallback, pagination, inputFilter, statusFilter],
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
