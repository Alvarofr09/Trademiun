import { Formik, Form } from "formik";
import { SignalFormInitialValues } from "../../consts/InitialValues";
import { SignalFormSchema } from "./SignalFormSchema";

import Input from "../ui/Input";
import Select from "../ui/Select";
import Image from "../ui/Image";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { sendSignalRoute, userApi } from "../../api/APIRoutes";

export default function SignalForm({
	currentChat,
	handleSendSignal,
	closeModal,
}) {
	const { user } = useUserContext();
	const [isCompra, setIsCompra] = useState(false);
	async function onSubmit(values) {
		let formData = new FormData();
		const {
			signalImage,
			description,
			coin,
			entrada,
			stopLoss,
			takeProfit,
			riesgo,
		} = values;

		const signalData = {
			from: user.id,
			to: currentChat.id,
			image: signalImage,
			description,
			moneda: coin,
			entrada,
			stopLoss,
			takeProfit,
			riesgo,
			isCompra,
		};

		console.log(values);

		// Obtener el nombre del archivo
		const partsImage = signalImage.split("\\");
		const fileName = partsImage[partsImage.length - 1];

		// Agregar los valores al FormData
		formData.append("from", user.id);
		formData.append("to", currentChat.id);
		formData.append("image", fileName);
		formData.append("description", description);
		formData.append("moneda", coin);
		formData.append("entrada", entrada);
		formData.append("stopLoss", stopLoss);
		formData.append("takeProfit", takeProfit);
		formData.append("riesgo", riesgo);
		formData.append("isCompra", isCompra);

		// Verificar si el archivo es de tipo imagen por su extensión
		const validImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
		const fileExtension = fileName.split(".").pop().toLowerCase();

		if (validImageExtensions.includes(fileExtension)) {
			// Suponiendo que signalImage es un objeto File si es una imagen válida
			formData.append("signalImage", signalImage);
		} else {
			console.warn(
				"signalImage no es un archivo de imagen válido",
				signalImage
			);
		}

		logFormData(formData);
		console.log(formData);

		const { data } = await userApi.post(sendSignalRoute, formData);

		if (data.status === false) {
			alert(data.message);
		}
		// Llamar a la función para enviar la señal
		handleSendSignal(signalData);

		// Cerrar el modal
		closeModal();
	}

	function logFormData(formData) {
		for (let pair of formData.entries()) {
			console.log(`${pair[0]}: ${pair[1]}`);
		}
	}

	return (
		<>
			<Formik
				initialValues={SignalFormInitialValues}
				validationSchema={SignalFormSchema}
				onSubmit={onSubmit}
			>
				{(values, errors, isSubmitting) => (
					<div className="">
						<Form className="form">
							<Image name="signalImage" />

							<Input
								placeholder="Descripcion"
								name="description"
								type="textarea"
							/>

							<h3 className="titulo tracking-widest text-black">TRADE</h3>
							<div className="flex gap-4">
								<Select name="coin" placeholder="Coin">
									<option value="">Coin</option>
									<option value="BTC">BTC</option>
									<option value="ETH">ETH</option>
									<option value="Doge">Doge</option>
								</Select>

								<Input placeholder="% Riesgo" name="riesgo" type="number" />
							</div>

							<Input placeholder="Entrada" name="entrada" type="number" />
							<Input placeholder="Stop Loss" name="stopLoss" type="number" />
							<Input
								placeholder="Take Profit"
								name="takeProfit"
								type="number"
							/>

							<div className="flex gap-4">
								<button
									onClick={() => setIsCompra(false)}
									className=" text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[30px] text-xl uppercase transition duration-500 ease-in-out hover:bg-red-500 bg-red-600"
									type="submit"
									disabled={isSubmitting}
								>
									Venta
								</button>

								<button
									onClick={() => setIsCompra(true)}
									className=" text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[30px] text-xl uppercase transition duration-500 ease-in-out hover:bg-green-500 bg-green-600"
									type="submit"
									disabled={isSubmitting}
								>
									Compra
								</button>
							</div>
						</Form>
					</div>
				)}
			</Formik>
		</>
	);
}
