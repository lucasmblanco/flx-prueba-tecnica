import { Breadcrumb } from "antd";
import { breadcrumbStyle } from "../theme/themeConfig";

const BreadcrumbContainer = () => {
  return (
    <Breadcrumb
      style={breadcrumbStyle}
      items={[{ title: "Usuarios" }, { title: "Listado de usuarios" }]}
    />
  );
};

export default BreadcrumbContainer;
