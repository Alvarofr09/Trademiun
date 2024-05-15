const dao = require("../services/dao/signalsDao");
const path = require("path");
const uploadImage = require("../utils/uploadImage");

const addSignal = async (req, res, next) => {
	try {
		console.log(req.body);

		const {
			from,
			to,
			image,
			description,
			moneda,
			entrada,
			stopLoss,
			takeProfit,
			riesgo,
			isCompra,
		} = req.body;

		console.log(image);

		uploadImage(image)
			.then((url) => {
				res.send(url);
			})
			.catch((error) => {
				res.status(500).send(error);
			});

		// const signalData = {
		// 	from,
		// 	to,
		// 	image: req.file ? req.file.filename : null,
		// 	description,
		// 	moneda,
		// 	entrada,
		// 	stopLoss,
		// 	takeProfit,
		// 	riesgo,
		// 	isCompra,
		// };

		// console.log(signalData);

		// // Guardar la señal en la base de datos
		// const data = await dao.addSignal(signalData);

		// if (!data) {
		// 	return res
		// 		.status(500)
		// 		.json({ message: "Error al enviar la señal", status: false });
		// }

		// // Si se subió una imagen, guardarla en la base de datos de imágenes
		// if (req.file) {
		// 	await dao.addSignalImage({
		// 		image_type: "signal",
		// 		signal_id: data.id, // Asegúrate de que `data.id` sea el ID de la señal recién creada
		// 		image: req.file.filename,
		// 	});
		// }

		return res.json({ message: "Señal enviada correctamente", status: true });
	} catch (error) {
		next(error);
	}
};

const getSignals = async (req, res, next) => {
	try {
		const { from, to } = req.body;

		if (!from || !to) return res.status(400).send("Error en el body");

		let signals = [];
		signals = await dao.getSignals(to);

		signals.forEach((signal) => {
			// Añadimos el campo 'type' a cada objeto
			(signal.fromSelf = signal.sender_id === from), (signal.type = "signal");
		});

		return res.json(signals);
	} catch (error) {
		next(error);
	}
};

const getUserSignals = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) return res.status(400).send("Error en la ruta");

		let signals = [];
		signals = await dao.getUserSignals(id);

		signals.forEach((signal) => {
			// Añadimos el campo 'type' a cada objeto
			signal.type = "signal";
		});

		return res.json(signals);
	} catch (error) {
		next(error);
	}
};

module.exports = { addSignal, getSignals, getUserSignals };
