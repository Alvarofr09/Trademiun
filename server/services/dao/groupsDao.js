const db = require("../db");
const moment = require("moment");

const groupDao = {};

groupDao.createGroup = async (groupData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const groupObj = {
			group_name: groupData.group_name,
			description: groupData.description,
			price: groupData.price,
			Image: groupData.image,
			creation_date: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		return await db.query("INSERT INTO grupos SET ?", groupObj, "insert", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.joinGroup = async (membershipData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const membershipObj = {
			group_id: membershipData.group_id,
			user_id: membershipData.user_id,
		};

		return await db.query(
			"INSERT INTO grupos_membership SET ?",
			membershipObj,
			"insert",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.getAllGroups = async (user_id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const sqlQuery = `
      		SELECT grupos.id, grupos.group_name, grupos.description, grupos.image,grupos.participantes
    		FROM grupos
    		JOIN grupos_membership ON grupos.id = grupos_membership.group_id
    		WHERE grupos_membership.user_id = ?
    	`;

		return await db.query(sqlQuery, user_id, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.getFirstUser = async (group_id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const sqlQuery = `
      		SELECT user_id
    		FROM grupos_membership
    		WHERE group_id = ?
			limit 1
    	`;

		return await db.query(sqlQuery, group_id, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = groupDao;
