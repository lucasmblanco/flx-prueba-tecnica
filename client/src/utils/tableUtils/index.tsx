import { Button, Space, Tag } from "antd";
import type { AnyObject } from "antd/es/_util/type";
import type { ColumnType } from "antd/es/table";
import { USERS_COLUMNS } from "../../constants";

type CreateColumns = <T extends AnyObject>(
	onEdit: (record: T) => void,
	onDelete: (record: T) => void,
) => ColumnType<T>[];

export const createUserColumns: CreateColumns = (onEdit, onDelete) => [
	{
		title: USERS_COLUMNS.username.title,
		dataIndex: USERS_COLUMNS.username.dataIndex,
	},
	{
		title: USERS_COLUMNS.name.title,
		dataIndex: USERS_COLUMNS.name.dataIndex,
	},
	{
		title: USERS_COLUMNS.lastname.title,
		dataIndex: USERS_COLUMNS.lastname.dataIndex,
	},
	{
		title: USERS_COLUMNS.status.title,
		dataIndex: USERS_COLUMNS.status.dataIndex,
		render: (_: unknown, record: AnyObject) => {
			const { color, label } =
				record.status === USERS_COLUMNS.status.types.active.value
					? {
							color: USERS_COLUMNS.status.types.active.color,
							label: USERS_COLUMNS.status.types.active.label,
						}
					: {
							color: USERS_COLUMNS.status.types.inactive.color,
							label: USERS_COLUMNS.status.types.inactive.label,
						};

			return (
				<Tag color={color} key={record.status}>
					{label}
				</Tag>
			);
		},
	},
	{
		title: "Action",
		key: "action",
		render: (_: unknown, record: AnyObject) => (
			<Space size="middle">
				<Button type="link" onClick={() => onEdit(record)}>
					Editar
				</Button>
				<Button type="link" onClick={() => onDelete(record)}>
					Eliminar
				</Button>
			</Space>
		),
	},
];

export const normalizeAndMergeUserData = <T extends { id: number | string }>(
	sourceA: { data: T[]; total?: number },
	sourceB: { data: T[]; total?: number },
) => {
	const mergedUsers = [...sourceA.data, ...sourceB.data];
	const usersData = [
		...new Map(mergedUsers.map((user) => [user.id, user])).values(),
	].sort((a, b) => (a.id as number) - (b.id as number));
	const totalUsersCount = usersData.length;
	return {
		data: usersData,
		total: totalUsersCount,
	};
};
