import { useEffect, useState, useCallback } from "react";
import { Table, Tag, Space, Input, Select, Button, Flex } from "antd";
import FormModal from "./FormModal";

const { Search } = Input;

interface userTableProps {}

const UserTable: React.FC<userTableProps> = () => {
  const [users, setUsers] = useState<any[]>();
  const [searchUser, setSearchUser] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [openAddUser, setOpenAddUser] = useState(false);

  const fetchUsers = useCallback(async () => {
    const users = await fetch("http://localhost:4000/users").then((response) =>
      response.json(),
    );
    return users;
  }, []);

  function handleAddUser() {
    setOpenAddUser(true);
  }

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, [fetchUsers]);

  return (
    <>
      <FormModal openAddUser={openAddUser} setOpenAddUser={setOpenAddUser} />{" "}
      <Flex justify="space-between">
        <Space>
          <Space.Compact>
            <Search
              placeholder="Busqueda por nombre o apellido"
              allowClear
              onSearch={(value) => setSearchUser(value.toLowerCase())}
            />
          </Space.Compact>
          <Space.Compact>
            <Select
              placeholder="Filtrar por estado"
              optionFilterProp="label"
              onChange={(value: string | undefined) => {
                if (!value) {
                  setFilterStatus("");
                } else {
                  setFilterStatus(value);
                }
              }}
              allowClear
              options={[
                {
                  value: "inactive",
                  label: "Inactivo",
                },
                {
                  value: "active",
                  label: "Activo",
                },
              ]}
            />
          </Space.Compact>
        </Space>
        <Space>
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={handleAddUser}
          >
            Agregar usuario
          </Button>
        </Space>
      </Flex>
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
                const fullname = `${record.name.toLowerCase()} ${record.lastname.toLowerCase()}`;
                return fullname.includes(value);
              },
            },
            {
              title: "Estado",
              dataIndex: "status",
              filteredValue: [filterStatus],
              onFilter: (value, record) => {
                if (value === "") {
                  return true;
                }
                return record.status === value;
              },
              render: (_, { status }) => {
                let color;
                let statusTranslated;
                if (status === "active") {
                  color = "green";
                  statusTranslated = "ACTIVO";
                } else {
                  color = "volcano";
                  statusTranslated = "INACTIVO";
                }
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
