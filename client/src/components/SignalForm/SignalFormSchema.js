import * as yup from "yup";

export const SignalFormSchema = yup.object().shape({
	signalImage: yup.mixed(),
	description: yup.string(),
	coin: yup.string().required("Tienes que elejir una moneda"),
	entrada: yup.number().positive().required("La entrada es necesaria"),
	salida: yup.number().positive().required("La salida es necesaria"),
	tp: yup.number().positive().required("El tp es necesario"),
	porcentaje: yup.number().positive().required("El porcentaje es necesario"),
});
