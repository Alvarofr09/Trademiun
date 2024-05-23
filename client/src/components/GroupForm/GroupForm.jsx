import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form } from "formik";
import { IconFilePlus } from "@tabler/icons-react";

import { CreateGroupFormInitialValues } from "../../consts/InitialValues";
import { GroupFormSchema } from "./GroupFormSchema";
import Input from "../ui/Input";
// import TextArea from "../ui/TextArea";

import { createGroupRoute, userApi } from "../../api/APIRoutes";
import { previewFiles } from "../../utils/previewFile";

export default function GroupForm() {
	const { id: userId } = useParams();
	// const { login } = useAuthContext();
	const navigate = useNavigate();
	const [file, setFile] = useState("");
	const [image, setImage] = useState("");
	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		setFile(file);
		previewFiles(file, setImage);
	};

	async function onSubmit(values) {
		// console.log(values);

		const { groupName, description, price } = values;

		const { data } = await userApi.post(createGroupRoute, {
			user_id: userId,
			group_name: groupName,
			description,
			price,
			image,
		});

		if (data.status === false) {
			toast.error(data.msg, toastOptions);
		} else {
			toast.success(data.message, toastOptions);
			navigate("/");
		}
	}
	return (
		<>
			<Formik
				initialValues={CreateGroupFormInitialValues}
				validationSchema={GroupFormSchema}
				onSubmit={onSubmit}
			>
				{(values, errors, isSubmitting) => (
					<div className="">
						<Form className="form">
							<div className="centered">
								{image ? (
									<img
										src={image}
										alt="Preview"
										className="h-24 w-24 rounded-full"
									/>
								) : (
									<>
										<label htmlFor="groupImage">
											<IconFilePlus size={50} />
										</label>
										<input
											type="file"
											name="groupImage"
											id="groupImage"
											onChange={(e) => handleChange(e)}
											accept="image/png, image/jpeg, image/jpg, image/svg, image/ico, image/jfif, image/webp"
											className="appearance-none hidden opacity-0"
										/>
									</>
								)}
							</div>
							<Input
								placeholder="Nombre del Grupo"
								name="groupName"
								type="text"
							/>

							<Input
								placeholder="Descripcion"
								name="description"
								type="textarea"
								rows="3"
								cols="50"
							/>

							{/* <TextArea name="description" placeholder="Descripción" /> */}
							<Input placeholder="Precio" name="price" type="number" />

							<button
								className="btn-dark mt-3"
								type="submit"
								disabled={isSubmitting}
							>
								Crear Grupo
							</button>
						</Form>
					</div>
				)}
			</Formik>
			<ToastContainer />
		</>
	);
}
