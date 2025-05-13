import { useEffect, useState, useCallback, useContext } from "react";
import { Table, Tag, Space, Input, Select, Button, Flex } from "antd";
import FormModal from "./FormModal";
import { UsersListContext } from "../context/UsersListContext";
import { UserContext } from "../context/UserContext";
import DeleteModal from "./DeleteModal";
import { dataProvider } from "../services/dataProvider";

const { Search } = Input;

const UsersTable = () => {
  const { usersList, setUsersList } = useContext(UsersListContext);
  const { setUser } = useContext(UserContext);

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 9 });
  const [statusFilter, setStatusFilter] = useState("");
  const [inputFilter, setInputFilter] = useState("");

  const fetchUsers = useCallback(
    async (page, limit, input, status) => {
      try {
        const [resultsByName, resultsByLastname] = await Promise.all(
          ["name", "lastname"].map((field) =>
            dataProvider.getList("users", {
              pagination: {
                page: page,
                limit: limit,
              },
              filters: {
                [field]: input,
                status: status,
              },
            }),
          ),
        );
        const combinedResults = [
          ...resultsByName.data,
          ...resultsByLastname.data,
        ];

        const combinedTotal = resultsByName.total + resultsByName.total;

        const normalizedAndSorted = [
          ...new Map(combinedResults.map((user) => [user.id, user])).values(),
        ].sort((a, b) => a.id - b.id);

        setTotal(combinedTotal);
        setUsersList(normalizedAndSorted);
      } catch (error) {
        console.error(error);
      }
    },
    [setUsersList],
  );

  function handleAddUser() {
    setOpenFormModal(true);
  }

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  useEffect(() => {
    fetchUsers(
      pagination.current,
      pagination.pageSize,
      inputFilter,
      statusFilter,
    );
  }, [fetchUsers, inputFilter, pagination, statusFilter]);

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
                setInputFilter(value);
                fetchUsers(
                  pagination.current,
                  pagination.pageSize,
                  value.toLowerCase(),
                  statusFilter,
                );
              }}
            />
          </Space.Compact>
          <Space.Compact>
            <Select
              placeholder="Filtrar por estado"
              optionFilterProp="label"
              onChange={(value) => {
                setStatusFilter(value ? value : "");
                fetchUsers(
                  pagination.current,
                  pagination.pageSize,
                  inputFilter,
                  value ? value : "",
                );
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
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: total,
        }}
        onChange={handleTableChange}
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
                <Button
                  type="link"
                  onClick={() => {
                    setUser(record);
                    setOpenFormModal(true);
                  }}
                >
                  Editar
                </Button>
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

export default UsersTable;
