import { Col, Form, Select } from "antd";
import type { Rule } from "antd/es/form";

const FormSelect = ({
  label,
  name,
  rules,
  options,
  placeholder,
  span = 12,
}: {
  label: string;
  name: string;
  rules: Rule[];
  options: { value: string; label: React.ReactNode }[];
  placeholder: string;
  span?: number;
}) => (
  <Col className="gutter-row" span={span}>
    <Form.Item layout="vertical" label={label} name={name} rules={rules}>
      <Select placeholder={placeholder} options={options} />
    </Form.Item>
  </Col>
);

export default FormSelect;
