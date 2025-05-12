import { useEffect, useState, useCallback, useContext } from "react";
import { Table, Tag, Space, Input, Select, Button, Flex } from "antd";
import FormModal from "./FormModal";
import { UsersContext } from "../context/UsersContext";

const { Search } = Input;

interface userTableProps {}

const UserTable: React.FC<userTableProps> = () => {
  const { users, setUsers } = useContext(UsersContext);

  const [openAddUser, setOpenAddUser] = useState(false);

  const filterByNameOrLastname = useCallback(
    async (input: string) => {
      const [resultsByName, resultsByLastname] = await Promise.all([
        fetch(`http://localhost:4000/users?name_like=${input}`).then(
          (response) => response.json(),
        ),
        fetch(`http://localhost:4000/users?lastname_like=${input}`).then(
          (response) => response.json(),
        ),
      ]);

      const combinedResults = [...resultsByName, ...resultsByLastname];

      const normalizedAndSorted = [
        ...new Map(combinedResults.map((user) => [user.id, user])).values(),
      ].sort((a, b) => a.id - b.id);

      setUsers(normalizedAndSorted);
    },
    [setUsers],
  );

  const filterByStatus = useCallback(
    async (status: string) => {
      await fetch(`http://localhost:4000/users?status=${status}`)
        .then((response) => response.json())
        .then((data) => setUsers(data));
    },
    [setUsers],
  );

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
  }, [fetchUsers, setUsers]);

  return (
    <>
      <FormModal openAddUser={openAddUser} setOpenAddUser={setOpenAddUser} />{" "}
      <Flex justify="space-between">
        <Space>
          <Space.Compact>
            <Search
              placeholder="Busqueda por nombre o apellido"
              allowClear
              onSearch={(value) => {
                if (!value) {
                  fetchUsers().then((data) => setUsers(data));
                } else {
                  filterByNameOrLastname(value.toLowerCase());
                }
              }}
            />
          </Space.Compact>
          <Space.Compact>
            <Select
              placeholder="Filtrar por estado"
              optionFilterProp="label"
              onChange={(value: string | undefined) => {
                if (!value) {
                  fetchUsers().then((data) => setUsers(data));
                } else {
                  filterByStatus(value);
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
      <Table
        dataSource={users ? users : []}
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
            title: "Estado",
            dataIndex: "status",
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
      )
    </>
  );
};

export default UserTable;
