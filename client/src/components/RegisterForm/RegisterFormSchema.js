import * as yup from "yup";

export const RegisterFormSchema = yup.object().shape({
	username: yup.string().min(5).required("Username is required"),
	email: yup.string().email("Invalid email").required("Email Required"),
	confirmEmail: yup
		.string()
		.oneOf([yup.ref(`email`)], "Email must match")
		.required("Confirm Email Required"),
	password: yup.string().min(5).required("Password Required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref(`password`)], "Passwords must match")
		.required("Confirm Password Required"),
	acceptedTC: yup
		.boolean()
		.oneOf([true], "Please accept the terms and conditions"),
});
