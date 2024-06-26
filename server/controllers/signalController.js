const dao = require("../services/dao/signalsDao");
const cloudinary = require("../services/cloudinary");

const addSignal = async (req, res, next) => {
	try {
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
			description,
			moneda,
			entrada,
			stopLoss,
			takeProfit,
			riesgo,
			isCompra,
		};

		if (image) {
			const uploadedImage = await cloudinary.uploader.upload(
				image,
				{
					upload_preset: "signal_upload",
					public_id: `signal_${new Date()}`,
					allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
				},
				function (error, result) {
					if (error) console.log(error);
					console.log(result);
				}
			);

			signalData.image = uploadedImage.public_id;
		}

		// res.status(200).json(uploadedImage);

		const data = await dao.addSignal(signalData);

		let signal = await dao.getSignalById(data);
		[signal] = signal;

		if (!data) {
			return res
				.status(500)
				.json({ message: "Error al enviar la señal", status: false });
		}

		return res.json({
			message: "Señal enviada correctamente",
			status: true,
			signal,
		});
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

const getAllSignalsWithUsers = async (req, res, next) => {
	try {
		const signalsWithUsers = await dao.getAllSignalsWithUsers();

		if (!signalsWithUsers.length) {
			return res.status(404).send("No signals found");
		}

		return res.json(signalsWithUsers);
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

const getCoins = async (req, res, next) => {
	try {
		const coins = await dao.getCoins();

		return res.json(coins);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addSignal,
	getSignals,
	getAllSignalsWithUsers,
	getUserSignals,
	getCoins,
};
