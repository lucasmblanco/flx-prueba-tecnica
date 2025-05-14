import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { FORM_VALIDATIONS } from "../utils/formUtils";
import useFormModalHandler from "../hooks/useFormModalHandler";

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
      footer={() => (
        <>
          <Divider />
          <Button
            type="primary"
            key="submit"
            onClick={handleOk}
            loading={loading}
          >
            {buttonLabel}
          </Button>
        </>
      )}
    >
      <Divider />
      <Form form={form} name="add-user" layout="vertical" autoComplete="off">
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              layout="vertical"
              label="Usuario"
              name="username"
              rules={FORM_VALIDATIONS.username}
            >
              <Input placeholder="johndoe" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              layout="vertical"
              label="Email"
              name="email"
              rules={FORM_VALIDATIONS.email}
            >
              <Input placeholder="johndoe@domain.com" type="email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              layout="vertical"
              label="Nombre"
              name="name"
              rules={FORM_VALIDATIONS.name}
            >
              <Input placeholder="John" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              layout="vertical"
              label="Apellido"
              name="lastname"
              rules={FORM_VALIDATIONS.lastname}
            >
              <Input placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              layout="vertical"
              label="Estado"
              name="status"
              rules={FORM_VALIDATIONS.status}
            >
              <Select
                placeholder="Seleccione un estado"
                options={[
                  { value: "inactive", label: <span>Inactivo</span> },
                  { value: "active", label: <span>Activo</span> },
                ]}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              layout="vertical"
              label="Edad"
              name="age"
              rules={FORM_VALIDATIONS.age}
            >
              <InputNumber
                min={1}
                max={99}
                style={{ width: "100%" }}
                placeholder="43"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormModal;
