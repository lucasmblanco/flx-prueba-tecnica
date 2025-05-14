import { Button, Divider, Flex, Modal, Space, Typography } from "antd";
import useDeleteModalHandler from "../hooks/useDeleteModalHandler";

interface DeleteModalProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  openDeleteModal,
  setOpenDeleteModal,
}) => {
  const { user, handleDelete, handleCancel, loading } = useDeleteModalHandler({
    closeModal: () => setOpenDeleteModal(false),
  });

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
