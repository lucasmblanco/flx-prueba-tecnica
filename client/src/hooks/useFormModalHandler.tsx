import { Form } from "antd";
import { useState, useEffect } from "react";
import useActions from "./useActions";

const useFormModalHandler = ({
  modalStatus,
  closeModal,
  refetch,
}: {
  modalStatus: boolean;
  closeModal: () => void;
  refetch: (
    page?: number,
    limit?: number,
    searchTerm?: string,
    status?: string,
  ) => Promise<void>;
}) => {
  const [form] = Form.useForm();
  const { user, createUser, updateUser, resetUser } = useActions();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      if (user) {
        await updateUser(values);
      } else {
        await createUser(values);
      }
      closeModal();
      form.resetFields();
      refetch();
    } catch {
      console.error(
        "Se produjeron los siguientes errores",
        form.getFieldsError().map((errorItem) => errorItem.errors[0]),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      resetUser();
    }
    closeModal();
    form.resetFields();
  };

  const buttonLabel = user ? "Editar usuario" : "Agregar usuario";

  useEffect(() => {
    if (user && modalStatus) {
      form.setFieldsValue(user);
    }
  }, [user, form, modalStatus]);

  return {
    form,
    loading,
    handleOk,
    handleCancel,
    buttonLabel,
  };
};

export default useFormModalHandler;
