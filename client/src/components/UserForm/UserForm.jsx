import { Formik, Form } from "formik";

import Input from "../ui/Input";
import { IconFilePlus } from "@tabler/icons-react";
import { previewFiles } from "../../utils/previewFile";
import { useState } from "react";
import { UserFormSchema } from "./UserFormSchema";
import { updateUserRoute, userApi } from "../../api/APIRoutes";
import Img from "../ui/CloudinaryImg";
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";

export default function UserForm({ closeModal }) {
	const { login } = useAuthContext();
	const { user } = useUserContext();
	const [file, setFile] = useState("");
	const [image, setImage] = useState("");

	console.log(user);

	const UpdateUserFormInitialValues = {
		username: user.username,
		email: user.email,
		password: "",
		confirmPassword: "",
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		setFile(file);
		previewFiles(file, setImage);
	};

	async function onSubmit(values) {
		// console.log(values);

		const { username, email, password } = values;

		const { data } = await userApi.patch(`${updateUserRoute}/${user.id}`, {
			username,
			email,
			password,
			image,
		});

		if (data.status) {
			const user = {
				email: data.user.email,
				password: data.user.password,
				isEncrypted: true,
			};

			await login(user);

			closeModal();
		}
	}
	return (
		<>
			<Formik
				initialValues={UpdateUserFormInitialValues}
				validationSchema={UserFormSchema}
				onSubmit={onSubmit}
			>
				{(values, errors, isSubmitting) => (
					<div className="">
						<Form className="form">
							{image ? (
								<div className="centered">
									<img
										src={image}
										alt="Preview"
										className="h-36 w-36 rounded-full"
									/>
								</div>
							) : (
								<div className="relative flex justify-center">
									<Img
										isContact={true}
										className={`inline-block h-36 w-36 rounded-full filter brightness-50 contrast-150 `}
										uploadedImg={user.image}
										alt="avatar"
									/>
									<label
										htmlFor="signalImage"
										className="absolute inset-0 centered"
									>
										<IconFilePlus size={50} color="#fff" />
									</label>
									<input
										type="file"
										name="fileInsignalImageput"
										id="signalImage"
										onChange={(e) => handleChange(e)}
										accept="image/png, image/jpeg, image/jpg, image/svg, image/ico, image/jfif, image/webp"
										className="appearance-none hidden opacity-0"
									/>
								</div>
							)}

							<Input placeholder="Username" name="username" type="text" />

							<Input placeholder="Email" name="email" type="email" />
							<Input
								placeholder="Nueva Password"
								name="password"
								type="password"
							/>
							<Input
								placeholder="Confirm NuevaPassword"
								name="confirmPassword"
								type="password"
							/>

							<button
								className="btn-dark mt-3"
								type="submit"
								disabled={isSubmitting}
							>
								Editar Usuario
							</button>
						</Form>
					</div>
				)}
			</Formik>
		</>
	);
}
