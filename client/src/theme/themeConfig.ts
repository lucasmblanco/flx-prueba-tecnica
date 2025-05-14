import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  components: {
    Table: {
      headerBg: "#f3f3f3",
    },
  },
};

const headerStyle: React.CSSProperties = {
  textAlign: "left",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  background: "#d9d9d9",
};

const contentStyle: React.CSSProperties = {
  paddingInline: "7rem",
};

const layoutStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "#f5f5f5",
};

const tableStyle: React.CSSProperties = {
  paddingBlock: "1.5rem",
};

const searchInputStyle: React.CSSProperties = { width: "20rem" };

const breadcrumbStyle: React.CSSProperties = { paddingBlock: "1rem" };

export {
  theme,
  headerStyle,
  contentStyle,
  layoutStyle,
  tableStyle,
  searchInputStyle,
  breadcrumbStyle,
};
