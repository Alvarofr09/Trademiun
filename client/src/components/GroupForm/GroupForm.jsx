import { Formik, Form } from "formik";
import { CreateGroupFormInitialValues } from "../../consts/InitialValues";
import { GroupFormSchema } from "./GroupFormSchema";
import { ToastContainer, toast } from "react-toastify";

import Input from "../ui/Input";
import { useNavigate, useParams } from "react-router-dom";
// import TextArea from "../ui/TextArea";
import { createGroupRoute, joinGroupRoute, userApi } from "../../api/APIRoutes";
import { IconFilePlus } from "@tabler/icons-react";
import { previewFiles } from "../../utils/previewFile";
import { useState } from "react";

export default function GroupForm() {
	const { id: userId } = useParams();
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
			group_name: groupName,
			description,
			price,
			image,
		});

		// console.log(data);

		if (data.status === false) {
			toast.error(data.msg, toastOptions);
		} else {
			const response = await userApi.post(joinGroupRoute, {
				group_id: data.group_id,
				user_id: userId,
			});

			// console.log(response);
			if (response.data.status === false) {
				toast.error(response.msg, toastOptions);
			} else {
				toast.success(response.msg, toastOptions);
				navigate("/");
			}
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
										<label htmlFor="signalImage">
											<IconFilePlus size={50} />
										</label>
										<input
											type="file"
											name="fileInsignalImageput"
											id="signalImage"
											onChange={(e) => handleChange(e)}
											required
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
