const moment = require("moment");
const db = require("../db");

const md5 = require("md5");
const { removeUndefinedKeys } = require("../../utils/removeUndefinedKeys");

const userDao = {};

userDao.getUserById = async (id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM users WHERE id = ?",
			[id],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.getUserByUsername = async (username) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM users WHERE username = ?",
			[username],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.getUserByEmail = async (email) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM users WHERE email = ?",
			[email],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.getAllUsers = async (id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT email, username, image, id FROM users WHERE id != ?",
			[id],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.createUser = async (userData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const userObj = {
			...userData,
			password: md5(userData.password),
			registerDate: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		return await db.query("INSERT INTO users SET ?", userObj, "insert", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.updateUser = async (id, userData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		let userObj = {
			username: userData.username,
			email: userData.email,
			password: userData.password ? md5(userData.password) : undefined,
			image: userData.image,
			updateDate: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		// Eliminamos los campos que no se van a mofificar
		userObj = await removeUndefinedKeys(userObj);

		return await db.query(
			"UPDATE users SET ? WHERE id = ?",
			[userObj, id],
			"update",
			conn
		);
	} catch (e) {
		throw new Error(e);
	} finally {
		conn && (await conn.end());
	}
};

userDao.getAllUsersByRentabilidad = async () => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM users ORDER BY rentabilidad DESC",
			null,
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.getAllUsersBySeguidores = async () => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"SELECT * FROM users ORDER BY seguidores DESC",
			null,
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.insertGroupToUser = async (user_id, group_id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"UPDATE users SET group_id = ? WHERE id = ?",
			[group_id, parseInt(user_id)],
			"update",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

userDao.hasGroup = async (id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			`SELECT EXISTS (
                SELECT 1
                FROM users
                WHERE group_id IS NOT NULL AND id = ?
            ) AS tiene_grupo`,
			[id],
			"select",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = userDao;
