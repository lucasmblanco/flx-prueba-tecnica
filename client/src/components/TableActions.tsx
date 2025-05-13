import { Flex, Space, Input, Select, Button } from "antd";

const { Search } = Input;

const statusOptions = [
  {
    value: "inactive",
    label: "Inactivo",
  },
  {
    value: "active",
    label: "Activo",
  },
];

const TableActions = ({
  handleSearchInput,
  handleStatusChange,
  handleAddButton,
}) => {
  return (
    <Flex justify="space-between">
      <Space>
        <Space.Compact>
          <Search
            placeholder="Busqueda por nombre o apellido"
            allowClear
            onSearch={handleSearchInput}
          />
        </Space.Compact>
        <Space.Compact>
          <Select
            placeholder="Filtrar por estado"
            optionFilterProp="label"
            onChange={handleStatusChange}
            allowClear
            options={statusOptions}
          />
        </Space.Compact>
      </Space>
      <Space>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={handleAddButton}
        >
          Agregar usuario
        </Button>
      </Space>
    </Flex>
  );
};

export default TableActions;
