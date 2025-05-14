import { Table } from "antd";
import useTable from "../hooks/useTable";
import { createUserColumns } from "../utils/tableUtils";
import DeleteModal from "./DeleteModal";
import FormModal from "./FormModal";
import TableHeader from "./TableHeader";

const UsersTable = () => {
	const {
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
