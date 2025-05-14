export const LOGO_URL =
  "https://flexxus.com.ar/wp-content/uploads/elementor/thumbs/logo-flexxus-header-pv8liah8khv6xfynvz03so9v98sk2tr50hts9we7dk.png";

export const API_URL = "http://localhost:4000";

export const LIKE_FILTERS = ["name", "lastname"];

export const STATUS_OPTIONS = [
  {
    value: "inactive",
    label: "Inactivo",
  },
  {
    value: "active",
    label: "Activo",
  },
];

export const USERS_COLUMNS = {
  username: {
    title: "Usuario",
    dataIndex: "name",
  },
  name: {
    title: "Nombre",
    dataIndex: "name",
  },
  lastname: {
    title: "Apellido",
    dataIndex: "lastname",
  },
  status: {
    title: "Estado",
    dataIndex: "status",
    types: {
      active: {
        color: "green",
        label: "ACTIVO",
        value: "active",
      },
      inactive: {
        color: "volcano",
        label: "INACTIVO",
        value: "inactive",
      },
    },
  },
  actions: {
    title: "Acciones",
    key: "action",
    buttons: {
      edit: {
        label: "EDITAR",
      },
      delete: {
        label: "DELETE",
      },
    },
  },
};
