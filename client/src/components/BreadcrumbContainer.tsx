import { Breadcrumb } from "antd";

const BreadcrumbContainer = () => {
  return (
    <Breadcrumb
      items={[{ title: "Usuarios" }, { title: "Listado de usuarios" }]}
    />
  );
};

export default BreadcrumbContainer;
