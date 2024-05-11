const dao = require("../services/dao/signalsDao");
const path = require("path");

const addSignal = async (req, res, next) => {
	try {
		console.log(req.file);
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

		const signalData = {
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
		};

		console.log(signalData);
		console.log("Imagen: ", image);

		if (signalData.image) {
			// Construimos la ruta de carga
			const imageFile = signalData.image;
			const uploadPath = path.join(
				__dirname,
				"../../client/public/images/signals/"
			);
			// Movemos la imagen al servidor
			await imageFile.mv(uploadPath);

			await dao.addSignalImage({
				image_type: "signal",
				signal_id: 1,
				image: imageFile,
			});
			// Actualizamos la ruta de la imagen en la señal
			signalData.image = uploadPath;
		}

		const data = await dao.addSignal(signalData);

		if (!data)
			return res
				.status(500)
				.json({ message: "Error al enviar la señal", status: false });

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

		signals.sort((a, b) => new Date(a.date) - new Date(b.date));
		const protectSignals = signals.map((signal) => {
			return {
				fromSelf: signal.sender_id === from,
				image: signal.image,
				description: signal.description,
				moneda: signal.moneda,
				entrada: signal.entrada,
				stopLoss: signal.stopLoss,
				takeProfit: signal.takeProfit,
				riesgo: signal.riesgo,
				isCompra: signal.isCompra,
				date: signal.date,
				type: "signal",
			};
		});

		return res.json(protectSignals);
	} catch (error) {
		next(error);
	}
};

module.exports = { addSignal, getSignals };
