import { Table } from "antd";
import FormModal from "./FormModal";
import DeleteModal from "./DeleteModal";
import TableHeader from "./TableHeader";
import { createUserColumns } from "../utils/tableUtils";
import useTable from "../hooks/useTable";

const UsersTable = () => {
  const {
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
  } = useTable();

  return (
    <>
      <TableHeader
        setOpenFormModal={setOpenFormModal}
        loading={loading}
        handleSearchInput={handleSearchInput}
        handleStatusChange={handleStatusChange}
      />
      <Table
        dataSource={usersList}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: total,
        }}
        onChange={handleTableChange}
        columns={createUserColumns(handleEdit, handleDelete)}
        rowKey="id"
        loading={loading}
      />
      )
      <FormModal
        openFormModal={openFormModal}
        setOpenFormModal={setOpenFormModal}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
};

export default UsersTable;
