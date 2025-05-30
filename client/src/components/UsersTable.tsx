import { Table } from "antd";
import useTable from "@hooks/useTable";
import { createUserColumns } from "@utils/tableUtils";
import DeleteModal from "@components/modals/deleteModal";
import FormModal from "@components/modals/formModal";
import TableHeader from "@components/TableHeader";
import { tableStyle } from "@theme/themeConfig";

const UsersTable = () => {
  const {
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
  } = useTable();

  return (
    <>
      <TableHeader
        handleAddButtonModal={handleAddButtonModal}
        loading={loading}
        handleSearchInput={handleSearchInput}
        handleStatusChange={handleStatusChange}
      />
      <Table
        style={tableStyle}
        bordered
        dataSource={usersList}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: total,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
        columns={createUserColumns(handleEdit, handleDelete)}
        rowKey="id"
        loading={loading}
      />
      <FormModal
        openFormModal={openFormModal}
        setOpenFormModal={setOpenFormModal}
        refetch={fetchUsers}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        refetch={fetchUsers}
      />
    </>
  );
};

export default UsersTable;
