import { useEffect, useState, useCallback, useContext } from "react";
import { Table, Tag, Space, Input, Select, Button, Flex } from "antd";
import FormModal from "./FormModal";
import { UsersListContext } from "../context/UsersListContext";
import { UserContext } from "../context/UserContext";
import DeleteModal from "./DeleteModal";

const { Search } = Input;

interface userTableProps {}

const UserTable: React.FC<userTableProps> = () => {
  const { usersList, setUsersList } = useContext(UsersListContext);
  const { setUser } = useContext(UserContext);

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

      setUsersList(normalizedAndSorted);
    },
    [setUsersList],
  );

  const filterByStatus = useCallback(
    async (status: string) => {
      await fetch(`http://localhost:4000/users?status=${status}`)
        .then((response) => response.json())
        .then((data) => setUsersList(data));
    },
    [setUsersList],
  );

  const fetchUsers = useCallback(async () => {
    const users = await fetch("http://localhost:4000/users").then((response) =>
      response.json(),
    );
    return users;
  }, []);

  function handleAddUser() {
    setOpenFormModal(true);
  }

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsersList(data);
    });
  }, [fetchUsers, setUsersList]);

  return (
    <>
      {" "}
      <Flex justify="space-between">
        <Space>
          <Space.Compact>
            <Search
              placeholder="Busqueda por nombre o apellido"
              allowClear
              onSearch={(value) => {
                if (!value) {
                  fetchUsers().then((data) => setUsersList(data));
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
                  fetchUsers().then((data) => setUsersList(data));
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
        dataSource={usersList ? usersList : []}
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
                <Button
                  type="link"
                  onClick={() => {
                    setUser(record);
                    setOpenDeleteModal(true);
                  }}
                >
                  Eliminar
                </Button>
              </Space>
            ),
          },
        ]}
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

export default UserTable;
