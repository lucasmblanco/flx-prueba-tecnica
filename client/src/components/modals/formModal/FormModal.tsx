import { Divider, Form, Modal, Row } from "antd";
import { FORM_VALIDATIONS } from "../../../utils/formUtils";
import useFormModalHandler from "../../../hooks/useFormModalHandler";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormInputNumber from "./FormInputNumber";
import FormFooter from "./FormFooter";

interface FormModalProps {
  openFormModal: boolean;
  setOpenFormModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    page?: number,
    limit?: number,
    searchTerm?: string,
    status?: string,
  ) => Promise<void>;
}

const FormModal: React.FC<FormModalProps> = ({
  openFormModal,
  setOpenFormModal,
  refetch,
}) => {
  const { form, loading, handleOk, handleCancel, buttonLabel } =
    useFormModalHandler({
      modalStatus: openFormModal,
      closeModal: () => setOpenFormModal(false),
      refetch: refetch,
    });

  return (
    <Modal
      width={"40rem"}
      centered
      open={openFormModal}
      title="Agregar usuario"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <FormFooter
          handleOk={handleOk}
          loading={loading}
          buttonLabel={buttonLabel}
        />
      }
    >
      <Divider />
      <Form form={form} name="add-user" layout="vertical" autoComplete="off">
        <Row gutter={16}>
          <FormInput
            label="Usuario"
            name="username"
            rules={FORM_VALIDATIONS.username}
            placeholder="johndoe"
          />
          <FormInput
            label="Email"
            name="email"
            rules={FORM_VALIDATIONS.email}
            placeholder="johndoe@domain.com"
            type="email"
          />
        </Row>
        <Row gutter={16}>
          <FormInput
            label="Nombre"
            name="name"
            rules={FORM_VALIDATIONS.name}
            placeholder="John"
          />
          <FormInput
            label="Apellido"
            name="lastname"
            rules={FORM_VALIDATIONS.lastname}
            placeholder="Doe"
          />
        </Row>
        <Row gutter={16}>
          <FormSelect
            label="Estado"
            name="status"
            rules={FORM_VALIDATIONS.status}
            placeholder="Seleccione un estado"
            options={[
              { value: "inactive", label: <span>Inactivo</span> },
              { value: "active", label: <span>Activo</span> },
            ]}
          />
          <FormInputNumber
            label="Edad"
            name="age"
            rules={FORM_VALIDATIONS.age}
            placeholder="43"
            min={1}
            max={99}
          />
        </Row>
      </Form>
    </Modal>
  );
};

export default FormModal;
