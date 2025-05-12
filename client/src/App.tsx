import "./App.css";
import { Layout, ConfigProvider, Breadcrumb } from "antd";
import {
  theme,
  layoutStyle,
  headerStyle,
  contentStyle,
} from "./theme/themeConfig";
import UserTable from "./components/UserTable";
import { UsersProvider } from "./context/UsersContext";

const { Header, Content } = Layout;

function App() {
  return (
    <ConfigProvider theme={theme}>
      <UsersProvider>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <img
              src={
                "https://flexxus.com.ar/wp-content/uploads/elementor/thumbs/logo-flexxus-header-pv8liah8khv6xfynvz03so9v98sk2tr50hts9we7dk.png"
              }
              alt="Flexxus logo"
            />
          </Header>
          <Content style={contentStyle}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
              <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
            </Breadcrumb>
            <UserTable />
          </Content>
        </Layout>
      </UsersProvider>
    </ConfigProvider>
  );
}

export default App;
