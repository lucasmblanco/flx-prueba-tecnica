import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
	token: {},
};

const headerStyle: React.CSSProperties = {
	textAlign: "left",
	color: "#fff",
	height: 64,
	paddingInline: 48,
	lineHeight: "64px",
	background: "grey",
};

const contentStyle: React.CSSProperties = {
	textAlign: "center",
	minHeight: 120,
	lineHeight: "120px",
	color: "#fff",
	paddingInline: "5rem",
};

const footerStyle: React.CSSProperties = {
	textAlign: "center",
	color: "#fff",
};

const layoutStyle = {
	// height: "100vh",
};

export { theme, headerStyle, contentStyle, footerStyle, layoutStyle };
