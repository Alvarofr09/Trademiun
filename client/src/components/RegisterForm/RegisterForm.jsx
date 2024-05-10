import { Formik, Form } from "formik";
import { RegisterFormInitialValues } from "../../consts/InitialValues";
import { ToastContainer, toast } from "react-toastify";
import { RegisterFormSchema } from "./RegisterFormSchema";

import Checkbox from "../ui/Checkbox";
import { useNavigate } from "react-router-dom";
import { registerRoute, userApi } from "../../api/APIRoutes";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

import Input from "../ui/Input";

import DefaultImage from "../../assets/img/imagenDefecto.png";

export default function RegisterForm() {
	// const api = "https://api.multiavatar.com/45678945";
	const [avatar, setAvatar] = useState(DefaultImage);
	const { login } = useAuthContext();
	const navigate = useNavigate();
	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	async function onSubmit(values) {
		// console.log(values);
		const { username, email, password } = values;
		const { data } = await userApi.post(registerRoute, {
			username,
			email,
			password,
			image: avatar,
		});
		const user = {
			email,
			password,
		};

		if (data.status === false) {
			toast.error(data.msg, toastOptions);
		} else {
			await login(user);

			navigate("/");
		}
	}
	return (
		<>
			<Formik
				initialValues={RegisterFormInitialValues}
				validationSchema={RegisterFormSchema}
				onSubmit={onSubmit}
			>
				{(values, errors, isSubmitting) => (
					<div className="container-form">
						<Form className="form">
							<Input placeholder="Username" name="username" type="text" />

							<Input placeholder="Email" name="email" type="email" />
							<Input
								placeholder="Confirmar Email"
								name="confirmEmail"
								type="email"
							/>

							<Input placeholder="Password" name="password" type="password" />
							<Input
								placeholder="Confirm Password"
								name="confirmPassword"
								type="password"
							/>
							<Checkbox type="checkbox" name="acceptedTC" />
							<button
								className="btn-primary"
								type="submit"
								disabled={isSubmitting}
							>
								Register
							</button>
						</Form>
					</div>
				)}
			</Formik>
			<ToastContainer />
		</>
	);
}
