import { Flex, Space, Input, Select, Button } from "antd";
import { STATUS_OPTIONS } from "../constants";
const { Search } = Input;

interface TableHeaderProps {
  handleAddButtonModal: () => void;
  loading: boolean;
  handleSearchInput: (value: string) => void;
  handleStatusChange: (value: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  handleAddButtonModal,
  loading,
  handleSearchInput,
  handleStatusChange,
}) => {
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
            options={STATUS_OPTIONS}
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
