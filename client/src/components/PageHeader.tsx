import { Layout } from "antd";
import { LOGO_URL } from "@constants/index";
import { headerStyle } from "@theme/themeConfig";

const { Header } = Layout;

const PageHeader = () => {
  return (
    <Header style={headerStyle}>
      <img src={LOGO_URL} alt="Flexxus logo" />
    </Header>
  );
};

export default PageHeader;
