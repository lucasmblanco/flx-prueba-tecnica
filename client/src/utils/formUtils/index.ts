import type { Rule } from "antd/es/form";

export const FORM_VALIDATIONS: Record<string, Rule[]> = {
  username: [
    { required: true, message: "El usuario es obligatorio" },
    { min: 3, message: "Debe tener al menos 3 caracteres" },
  ],
  email: [
    { required: true, message: "El email es obligatorio" },
    { type: "email", message: "Debe ser un email válido" },
  ],
  name: [{ required: true, message: "El nombre es obligatorio" }],
  lastname: [{ required: true, message: "El apellido es obligatorio" }],
  status: [{ required: true, message: "El estado es obligatorio" }],
  age: [
    { required: true, message: "La edad es obligatoria" },
    { type: "number", min: 1, message: "Debe ser mayor a 0" },
  ],
};
