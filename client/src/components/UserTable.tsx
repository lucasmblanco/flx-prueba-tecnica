import { useEffect, useState } from "react";
import { Table, Tag, Space, Input } from "antd";

const { Search } = Input;

interface userTableProps {}

const UserTable: React.FC<userTableProps> = () => {
  const [users, setUsers] = useState<any[]>();
  const [searchUser, setSearchUser] = useState("");

  async function fetchUsers() {
    const users = await fetch("http://localhost:4000/users").then((response) =>
      response.json(),
    );
    return users;
  }

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <>
      {" "}
      <Space.Compact>
        <Search
          placeholder="Busqueda por nombre o apellido"
          allowClear
          onSearch={(value) => setSearchUser(value.toLowerCase())}
        />
      </Space.Compact>
      {users?.length ? (
        <Table
          dataSource={users}
          columns={[
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
              title: "Nombre completo",
              key: "fullname",
              hidden: true,
              filteredValue: [searchUser],
              onFilter: (value, record) => {
                if (value === "") {
                  return true;
                }
                const fullname =
                  record.name.toLowerCase() +
                  " " +
                  record.lastname.toLowerCase();
                return fullname.includes(value);
              },
            },
            {
              title: "Estado",
              dataIndex: "status",
              render: (_, { status }) => {
                let color;
                if (status === "active") {
                  color = "green";
                } else {
                  color = "volcano";
                }

                return (
                  <Tag color={color} key={status}>
                    {status.toUpperCase()}
                  </Tag>
                );
              },
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Space size="middle">
                  <a>Editar</a>
                  <a>Eliminar</a>
                </Space>
              ),
            },
          ]}
          rowKey="id"
        />
      ) : (
        <div>cargando...</div>
      )}
    </>
  );
};

export default UserTable;
