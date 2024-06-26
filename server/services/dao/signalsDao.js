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
			stopLoss: signalData.stopLoss,
			takeProfit: signalData.takeProfit,
			riesgo: signalData.riesgo,
			isCompra: signalData.isCompra,
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

signalDao.getSignals = async (to) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM signals WHERE group_id = ? ORDER BY date ASC",
			to,
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

signalDao.getUserSignals = async (user_id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM signals WHERE sender_id = ? ORDER BY date ASC",
			user_id,
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

signalDao.getAllSignalsWithUsers = async () => {
	let conn = null;
	try {
		conn = await db.createConection();

		const query = `
      		SELECT s.*, u.id AS user_id, u.username, u.image AS user_image, u.seguidores
      		FROM signals s
      		JOIN users u ON s.sender_id = u.id
      		ORDER BY s.date DESC;
    	`;

		const results = await db.query(query, null, "select", conn);
		return results;
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

signalDao.getSignalById = async (id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM signals WHERE id = ?",
			id,
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

signalDao.getCoins = async () => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query("SELECT * FROM coins ", null, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = signalDao;
