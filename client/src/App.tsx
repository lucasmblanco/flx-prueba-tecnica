import "@/App.css";
import { ConfigProvider, Layout } from "antd";
import BreadcrumbContainer from "@components/BreadcrumbContainer";
import PageHeader from "@components/PageHeader";
import UsersTable from "@components/UsersTable";
import { UserProvider } from "@context/UserContext";
import { UsersListProvider } from "@context/UsersListContext";
import { contentStyle, layoutStyle, theme } from "@theme/themeConfig";

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
