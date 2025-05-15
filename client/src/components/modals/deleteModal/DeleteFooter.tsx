import { Divider, Space, Button } from "antd";

const DeleteFooter = ({
  handleCancel,
  handleDelete,
  loading,
}: {
  handleCancel: () => void;
  handleDelete: () => void;
  loading: boolean;
}) => {
  return (
    <>
      <Divider />
      <Space align="end">
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button
          loading={loading}
          color="danger"
          variant="solid"
          key="submit"
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      </Space>
    </>
  );
};

export default DeleteFooter;
