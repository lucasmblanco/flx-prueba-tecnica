import {
  Modal,
  Button,
  Form,
  Input,
  Divider,
  Row,
  Col,
  InputNumber,
  Select,
} from "antd";
import { useContext } from "react";
import { UsersListContext } from "../context/UsersListContext";

interface FormModalProps {
  openFormModal: boolean;
  setOpenFormModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormModal: React.FC<FormModalProps> = ({
  openFormModal,
  setOpenFormModal,
}) => {
  const [form] = Form.useForm();
  const { setUsersList } = useContext(UsersListContext);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const newUser = await response.json();
      setUsersList((prev) => [...prev, newUser]);
      setOpenFormModal(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }

    // const newData = dataSource.map((item) =>
    //   item.key === editingRecord.key ? { ...item, ...values } : item,
    // );
    // setDataSource(newData);
    // setIsModalVisible(false);
    // setEditingRecord(null);
  };

  const handleCancel = () => {
    setOpenFormModal(false);
    form.resetFields();
  };

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
          <Button type="primary" key="submit" onClick={handleOk}>
            Agregar usuario
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
              rules={[
                { required: true, message: "El usuario es obligatorio" },
                { min: 3, message: "Debe tener al menos 3 caracteres" },
              ]}
            >
              <Input placeholder="johndoe" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              layout="vertical"
              label="Email"
              name="email"
              rules={[
                { required: true, message: "El email es obligatorio" },
                { type: "email", message: "Debe ser un email válido" },
              ]}
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
              rules={[{ required: true, message: "El nombre es obligatorio" }]}
            >
              <Input placeholder="John" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              layout="vertical"
              label="Apellido"
              name="lastname"
              rules={[
                { required: true, message: "El apellido es obligatorio" },
              ]}
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
              rules={[{ required: true, message: "El estado es obligatorio" }]}
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
              rules={[
                { required: true, message: "La edad es obligatoria" },
                { type: "number", min: 1, message: "Debe ser mayor a 0" },
              ]}
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
