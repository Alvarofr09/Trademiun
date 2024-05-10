const dao = require("../services/dao/signalsDao");

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
		};

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

module.exports = { addSignal };
