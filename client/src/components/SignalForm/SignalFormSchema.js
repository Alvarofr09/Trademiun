import * as yup from "yup";

export const SignalFormSchema = yup.object().shape({
	signalImage: yup.mixed(),
	description: yup.string(),
	coin: yup.string().required("Tienes que elejir una moneda"),
	riesgo: yup.number().positive().required("El porcentaje es necesario"),
	entrada: yup.number().positive().required("La entrada es necesaria"),
	stopLoss: yup.number().positive().required("La salida es necesaria"),
	takeProfit: yup.number().positive().required("El tp es necesario"),
});
