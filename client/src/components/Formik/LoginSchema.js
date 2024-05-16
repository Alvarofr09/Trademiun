import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 characters, 1 uppercase, 1 lowercase, 1 numeric digit

export const LoginSchema = yup.object().shape({
	email: yup.string().email("Email incorrecto").required("Email Requerido"),
	password: yup.string().min(5).required("Password requerido"),
});
