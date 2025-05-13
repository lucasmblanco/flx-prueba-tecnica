import { Layout } from "antd";
import { headerStyle } from "../theme/themeConfig";
import { LOGO_URL } from "../constants";

const { Header } = Layout;

const PageHeader = () => {
  return (
    <Header style={headerStyle}>
      <img src={LOGO_URL} alt="Flexxus logo" />
    </Header>
  );
};

export default PageHeader;
