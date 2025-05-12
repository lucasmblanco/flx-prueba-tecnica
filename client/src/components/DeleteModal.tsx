import { useContext } from "react";
import { Modal, Button, Divider, Space, Flex } from "antd";
import { UserContext } from "../context/UserContext";
import { UsersListContext } from "../context/UsersListContext";

interface DeleteModalProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  openDeleteModal,
  setOpenDeleteModal,
}) => {
  const { user, setUser } = useContext(UserContext);
  const { setUsersList } = useContext(UsersListContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/${user?.id}`, {
        method: "DELETE",
      });

      if (response.status === 200 || response.status === 204) {
        setUsersList((prev) => prev.filter((u) => u.id !== user?.id));
        setUser(null);
        setOpenDeleteModal(false);
      } else {
        throw new Error("No se pudo eliminar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setUser(null);
    setOpenDeleteModal(false);
  };
  return (
    <Modal
      width={"40rem"}
      centered
      open={openDeleteModal}
      title="Eliminar usuario"
      onCancel={handleCancel}
      footer={() => (
        <>
          <Divider />
          <Flex justify="end">
            <Space>
              {" "}
              <Button onClick={handleCancel}>Cancelar</Button>
            </Space>
            <Space>
              {" "}
              <Button
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
      <Space>
        <span>Desea eleminar el usuario?</span>
      </Space>
    </Modal>
  );
};

export default DeleteModal;
