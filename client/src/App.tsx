import "./App.css";
import { Layout, ConfigProvider, Breadcrumb } from "antd";
import {
  theme,
  layoutStyle,
  headerStyle,
  contentStyle,
} from "./theme/themeConfig";
import UsersTable from "./components/UsersTable";
import { UsersListProvider } from "./context/UsersListContext";
import { UserProvider } from "./context/UserContext";

const { Header, Content } = Layout;

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <img
            src={
              "https://flexxus.com.ar/wp-content/uploads/elementor/thumbs/logo-flexxus-header-pv8liah8khv6xfynvz03so9v98sk2tr50hts9we7dk.png"
            }
            alt="Flexxus logo"
          />
        </Header>
        <UsersListProvider>
          <Content style={contentStyle}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
              <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
            </Breadcrumb>
            <UserProvider>
              <UsersTable />
            </UserProvider>
          </Content>
        </UsersListProvider>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
