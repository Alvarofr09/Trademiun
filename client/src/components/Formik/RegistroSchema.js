import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 characters, 1 uppercase, 1 lowercase, 1 numeric digit

export const RegistroSchema = yup.object().shape({
  email: yup.string().email("Email incorrecto").required("Email Requerido"),
  username: yup.string().min(5).max(15).required("Nombre de usuario requerido"),
  password: yup
    .string()
    .matches(passwordRules, {
      message:
        "La contraseña debe tener al menos 5 caracteres, 1 mayúscula, 1 minúscula y 1 número",
    })
    .required("Password requerido"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "La contraseña debe coincidir")
    .required("Confirmación de contraseña requerida"),
});
