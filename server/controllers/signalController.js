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
			salida,
			tp,
			porcentaje,
		} = req.body;

		const signalData = {
			from,
			to,
			image,
			description,
			moneda,
			entrada,
			salida,
			tp,
			porcentaje,
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
