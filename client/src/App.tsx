import "./App.css";
import { Layout, ConfigProvider } from "antd";
import { theme, layoutStyle, contentStyle } from "./theme/themeConfig";
import UsersTable from "./components/UsersTable";
import { UsersListProvider } from "./context/UsersListContext";
import { UserProvider } from "./context/UserContext";
import PageHeader from "./components/PageHeader";
import BreadcrumbContainer from "./components/BreadcrumbContainer";

const { Content } = Layout;

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Layout style={layoutStyle}>
        <PageHeader />
        <UsersListProvider>
          <Content style={contentStyle}>
            <BreadcrumbContainer />
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
