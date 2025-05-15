import { Divider, Button } from "antd";

const FormFooter = ({
  handleOk,
  loading,
  buttonLabel,
}: {
  handleOk: () => Promise<void>;
  loading: boolean;
  buttonLabel: string;
}) => {
  return (
    <>
      <Divider />
      <Button type="primary" key="submit" onClick={handleOk} loading={loading}>
        {buttonLabel}
      </Button>
    </>
  );
};

export default FormFooter;
