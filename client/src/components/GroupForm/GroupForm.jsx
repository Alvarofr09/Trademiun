import { Formik, Form } from "formik";
import { CreateGroupFormInitialValues } from "../../consts/InitialValues";
import { GroupFormSchema } from "./GroupFormSchema";
import { ToastContainer, toast } from "react-toastify";

import Input from "../ui/Input";
import { useNavigate, useParams } from "react-router-dom";
// import TextArea from "../ui/TextArea";
import { createGroupRoute, joinGroupRoute, userApi } from "../../api/APIRoutes";
import DefaultImage from "../../assets/img/imagenDefectoGrupos.png";

export default function GroupForm() {
	const { id: userId } = useParams();
	const navigate = useNavigate();
	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};

	async function onSubmit(values) {
		console.log(values);

		const { groupName, description, price } = values;

		const { data } = await userApi.post(createGroupRoute, {
			group_name: groupName,
			description,
			price,
			image: DefaultImage,
		});

		console.log(data);

		if (data.status === false) {
			toast.error(data.msg, toastOptions);
		} else {
			const response = await userApi.post(joinGroupRoute, {
				group_id: data.group_id,
				user_id: userId,
			});

			console.log(response);
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
					<div className="container-form">
						<Form className="form">
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
								className="btn-primary"
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
