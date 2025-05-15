import { Col, Form, Input } from "antd";
import type { Rule } from "antd/es/form";

const FormInput = ({
  label,
  name,
  rules,
  placeholder,
  type = "text",
  span = 12,
}: {
  label: string;
  name: string;
  rules: Rule[];
  placeholder: string;
  type?: string;
  span?: number;
}) => (
  <Col className="gutter-row" span={span}>
    <Form.Item layout="vertical" label={label} name={name} rules={rules}>
      <Input placeholder={placeholder} type={type} />
    </Form.Item>
  </Col>
);

export default FormInput;
