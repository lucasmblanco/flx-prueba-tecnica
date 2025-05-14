import { useState } from "react";
import useActions from "./useActions";

const useDeleteModalHandler = ({ closeModal }: { closeModal: () => void }) => {
  const { user, deleteUser, resetUser } = useActions();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteUser();
      resetUser();
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetUser();
    closeModal();
  };
  return {
    user,
    handleDelete,
    handleCancel,
    loading,
  };
};

export default useDeleteModalHandler;
