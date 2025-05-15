import { Col, Form, InputNumber } from "antd";
import type { Rule } from "antd/es/form";

const FormInputNumber = ({
  label,
  name,
  rules,
  placeholder,
  min,
  max,
  span = 12,
}: {
  label: string;
  name: string;
  rules: Rule[];
  placeholder: string;
  min: number;
  max: number;
  span?: number;
}) => (
  <Col className="gutter-row" span={span}>
    <Form.Item layout="vertical" label={label} name={name} rules={rules}>
      <InputNumber
        min={min}
        max={max}
        style={{ width: "100%" }}
        placeholder={placeholder}
      />
    </Form.Item>
  </Col>
);

export default FormInputNumber;
