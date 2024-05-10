import { Formik, Form } from "formik";
import { LoginFormInitialValues } from "../../consts/InitialValues";
import { ToastContainer, toast } from "react-toastify";
import { LoginFormSchema } from "./LoginFormSchema";

import Input from "../ui/Input";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginForm() {
	const { login, errorMessage } = useAuthContext();
	const navigate = useNavigate();

	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	// useEffect(() => {
	// 	if (localStorage.getItem("user")) {
	// 		navigate("/");
	// 	}
	// }, []);

	async function onSubmit(values) {
		console.log(values);
		console.log(errorMessage);
		if (errorMessage) toast.error(errorMessage, toastOptions);
		await login(values);
		navigate("/");
	}
	return (
		<>
			<Formik
				initialValues={LoginFormInitialValues}
				validationSchema={LoginFormSchema}
				onSubmit={onSubmit}
			>
				{(values, errors, isSubmitting) => (
					<div className="container-form">
						<Form className="form">
							<Input placeholder="Email" name="email" type="email" />

							<Input placeholder="Password" name="password" type="password" />

							<button
								className="btn-primary"
								type="submit"
								disabled={isSubmitting}
							>
								Login
							</button>

							{/* <ButtonGroup /> */}

							{/* <span className="titulo">
								Don´t have an account ?{" "}
								<Link className="link" to="/register">
									Register
								</Link>
							</span> */}
						</Form>
					</div>
				)}
			</Formik>
			<ToastContainer />
		</>
	);
}
