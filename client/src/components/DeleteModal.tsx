import { Button, Divider, Flex, Modal, Space, Typography } from "antd";
import { useState } from "react";
import useActions from "../hooks/useActions";

interface DeleteModalProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  openDeleteModal,
  setOpenDeleteModal,
}) => {
  const { user, deleteUser, resetUser } = useActions();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteUser();
      resetUser();
      setOpenDeleteModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetUser();
    setOpenDeleteModal(false);
  };

  return (
    <Modal
      width={"40rem"}
      centered
      open={openDeleteModal}
      title={<Typography.Text strong>Eliminar usuario</Typography.Text>}
      onCancel={handleCancel}
      footer={() => (
        <>
          <Divider />
          <Flex justify="end">
            <Space>
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
          </Flex>
        </>
      )}
    >
      <Divider />
      <Typography.Text>
        Está seguro que quiere eliminar el usuario{" "}
        <Typography.Text type="danger">@{user?.username}</Typography.Text>?
      </Typography.Text>
    </Modal>
  );
};

export default DeleteModal;
