import { Button, Flex, Input, Select, Space } from "antd";
import { STATUS_OPTIONS } from "@constants/index";
import { searchInputStyle } from "@theme/themeConfig";
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
    <Flex justify="space-between" align="center">
      <Space>
        <Search
          style={searchInputStyle}
          size="large"
          disabled={loading}
          loading={loading}
          placeholder="Busqueda por nombre o apellido"
          allowClear
          onSearch={handleSearchInput}
        />

        <Select
          size="large"
          disabled={loading}
          loading={loading}
          placeholder="Filtrar por estado"
          optionFilterProp="label"
          onChange={handleStatusChange}
          allowClear
          options={STATUS_OPTIONS}
        />
      </Space>
      <Button size="large" type="primary" onClick={handleAddButtonModal}>
        Agregar usuario
      </Button>
    </Flex>
  );
};

export default TableHeader;
