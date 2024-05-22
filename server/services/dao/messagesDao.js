const moment = require("moment");
const db = require("../db");

const messageDao = {};

messageDao.addMessage = async (messageData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const messageObj = {
			sender_id: messageData.from,
			group_id: messageData.to,
			text: messageData.text,
			date: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		return await db.query(
			"INSERT INTO messages SET ?",
			messageObj,
			"insert",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

messageDao.getSendedMessages = async (from, to) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM messages WHERE sender_id = ? AND group_id = ?",
			[from, to],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

messageDao.getRecievedMessages = async (from, to) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM messages WHERE sender_id = ? AND group_id = ?",
			[to, from],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

messageDao.getMessages = async (to) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const sqlQuery = `
			SELECT m.*, u.username 
			FROM messages m
			JOIN users u ON m.sender_id = u.id
			WHERE m.group_id = ?
		`;

		return await db.query(sqlQuery, to, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = messageDao;
