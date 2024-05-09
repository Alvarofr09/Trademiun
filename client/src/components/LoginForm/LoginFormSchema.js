import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email Required"),
	password: yup.string().min(5).required("Password Required"),
});
