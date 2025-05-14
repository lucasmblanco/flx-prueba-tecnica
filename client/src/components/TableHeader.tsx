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

const TableHeader = ({
  setOpenFormModal,
  loading,
  handleSearchInput,
  handleStatusChange,
}) => {
  function handleAddButtonModal() {
    setOpenFormModal(true);
  }

  return (
    <Flex justify="space-between">
      <Space>
        <Space.Compact>
          <Search
            loading={loading}
            placeholder="Busqueda por nombre o apellido"
            allowClear
            onSearch={handleSearchInput}
          />
        </Space.Compact>
        <Space.Compact>
          <Select
            loading={loading}
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
          onClick={handleAddButtonModal}
        >
          Agregar usuario
        </Button>
      </Space>
    </Flex>
  );
};

export default TableHeader;
