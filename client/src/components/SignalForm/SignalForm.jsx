import { Formik, Form } from "formik";
import { SignalFormInitialValues } from "../../consts/InitialValues";
import { SignalFormSchema } from "./SignalFormSchema";

import { IconFilePlus } from "@tabler/icons-react";

import Input from "../ui/Input";
import Select from "../ui/Select";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { sendSignalRoute, userApi } from "../../api/APIRoutes";
import { previewFiles } from "../../utils/previewFile";

export default function SignalForm({
	currentChat,
	handleSendSignal,
	closeModal,
}) {
	const { user } = useUserContext();
	const [isCompra, setIsCompra] = useState(false);
	const [file, setFile] = useState("");
	const [image, setImage] = useState("");

	const handleChange = (e) => {
		const file = e.target.files[0];
		setFile(file);
		previewFiles(file, setImage);
	};

	async function onSubmit(values) {
		// let formData = new FormData();
		const { description, coin, entrada, stopLoss, takeProfit, riesgo } = values;

		const signalData = {
			from: user.id,
			to: currentChat.group_id,
			image: image,
			description,
			moneda: coin,
			entrada,
			stopLoss,
			takeProfit,
			riesgo,
			isCompra,
		};

		const { data } = await userApi.post(sendSignalRoute, signalData);

		console.log(data);

		if (data.status === false) {
			alert(data.message);
		}
		// Llamar a la función para enviar la señal
		handleSendSignal(data.signal);

		// Cerrar el modal
		closeModal();
	}

	return (
		<>
			<Formik
				initialValues={SignalFormInitialValues}
				validationSchema={SignalFormSchema}
				onSubmit={onSubmit}
				enctype="multipart/form-data"
			>
				{(values, errors, isSubmitting) => (
					<div className="">
						<Form className="form">
							<div className="">
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
							</div>
							{image && <img src={image} alt="Preview" className="h-20 w-20" />}

							<Input
								placeholder="Descripcion"
								name="description"
								type="textarea"
							/>

							<h3 className="titulo tracking-widest text-black dark:text-white">
								TRADE
							</h3>
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
