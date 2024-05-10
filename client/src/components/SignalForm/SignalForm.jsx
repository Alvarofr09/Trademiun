import { Formik, Form } from "formik";
import { SignalFormInitialValues } from "../../consts/InitialValues";
import { SignalFormSchema } from "./SignalFormSchema";

import Input from "../ui/Input";
import Select from "../ui/Select";
import Image from "../ui/Image";
import { sendSignalRoute, userApi } from "../../api/APIRoutes";

export default function SignalForm({ currentUser, currentChat }) {
	async function onSubmit(values) {
		console.log(values);
		const { description, coin, entrada, stopLoss, takeprofit, riesgo } = values;
		const { data } = await userApi.post(sendSignalRoute, {
			from: currentUser.id,
			to: currentChat.id,
			description,
			moneda: coin,
			entrada,
			stopLoss,
			takeprofit,
			riesgo,
		});

		if (data.status) {
			alert(data.message);
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
									className=" text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[30px] text-xl uppercase transition duration-500 ease-in-out hover:bg-red-500 bg-red-600"
									type="submit"
									disabled={isSubmitting}
								>
									Venta
								</button>

								<button
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
