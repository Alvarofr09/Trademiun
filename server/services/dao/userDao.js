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

userDao.setAvatar = async (id, image) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"UPDATE users SET image = ? WHERE id = ?",
			[image, id],
			"update",
			conn
		);
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
			name: userData.name,
			surname: userData.surname,
			email: userData.email,
			password: userData.password ? md5(userData.password) : undefined,
			isImageSet: userData.isImageSet,
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

module.exports = userDao;
