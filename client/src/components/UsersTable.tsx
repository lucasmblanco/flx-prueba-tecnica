import { Table } from "antd";
import FormModal from "./FormModal";
import DeleteModal from "./DeleteModal";
import TableActions from "./TableActions";
import { createUserColumns } from "../utils/tableUtils";
import useTable from "../hooks/useTable";

const UsersTable = () => {
  const {
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
  } = useTable();

  return (
    <>
      <TableActions
        handleAddButton={handleAddButtonModal}
        handleSearchInput={handleSearchInput}
        handleStatusChange={handleStatusChange}
      />
      <Table
        dataSource={usersList ? usersList : []}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: total,
        }}
        onChange={handleTableChange}
        columns={createUserColumns(handleEdit, handleDelete)}
        rowKey="id"
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
