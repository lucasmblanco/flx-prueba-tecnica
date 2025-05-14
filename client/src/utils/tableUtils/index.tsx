import { Tag, Button, Space } from "antd";

export const createUserColumns = (onEdit, onDelete) => [
  {
    title: "Usuario",
    dataIndex: "username",
  },
  {
    title: "Nombre",
    dataIndex: "name",
  },
  {
    title: "Apellido",
    dataIndex: "lastname",
  },
  {
    title: "Estado",
    dataIndex: "status",
    render: (_, { status }) => {
      const color = status === "active" ? "green" : "volcano";
      const statusTranslated = status === "active" ? "ACTIVO" : "INACTIVO";
      return (
        <Tag color={color} key={status}>
          {statusTranslated}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
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

export const normalizeAndMergeUserData = (sourceA, sourceB) => {
  const mergedUsers = [...sourceA.data, ...sourceB.data];
  const deduplicatedAndSortedUsers = [
    ...new Map(mergedUsers.map((user) => [user.id, user])).values(),
  ].sort((a, b) => a.id - b.id);
  const totalUsers = deduplicatedAndSortedUsers.length;
  return {
    users: deduplicatedAndSortedUsers,
    total: totalUsers,
  };
};
