const moment = require("moment");
const db = require("../db");
const { removeUndefinedKeys } = require("../../utils/removeUndefinedKeys");

const signalDao = {};

signalDao.addSignal = async (signalData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		let signalObj = {
			sender_id: signalData.from,
			group_id: signalData.to,
			image: signalData.image,
			description: signalData.description,
			moneda: signalData.moneda,
			entrada: signalData.entrada,
			salida: signalData.salida,
			tp: signalData.tp,
			porcentaje: signalData.porcentaje,
			date: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		// Eliminamos los campos que no se van a mofificar
		signalObj = await removeUndefinedKeys(signalObj);

		return await db.query(
			"INSERT INTO signals SET ?",
			signalObj,
			"insert",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = signalDao;
