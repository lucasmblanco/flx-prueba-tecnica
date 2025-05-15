import { Divider, Modal, Typography } from "antd";
import useDeleteModalHandler from "@hooks/useDeleteModalHandler";
import DeleteFooter from "./DeleteFooter";

interface DeleteModalProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    page?: number,
    limit?: number,
    searchTerm?: string,
    status?: string,
  ) => Promise<void>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  openDeleteModal,
  setOpenDeleteModal,
  refetch,
}) => {
  const { user, handleDelete, handleCancel, loading } = useDeleteModalHandler({
    closeModal: () => setOpenDeleteModal(false),
    refetch: refetch,
  });

  return (
    <Modal
      width={"40rem"}
      centered
      open={openDeleteModal}
      title={<Typography.Text strong>Eliminar usuario</Typography.Text>}
      onCancel={handleCancel}
      footer={
        <DeleteFooter
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          loading={loading}
        />
      }
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
