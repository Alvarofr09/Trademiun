import * as yup from "yup";

export const UserFormSchema = yup.object().shape({
	username: yup.string().min(5).required("Username is required"),
	email: yup.string().email("Invalid email").required("Email Required"),
	password: yup.string().min(5),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref(`password`)], "Passwords must match"),
});
