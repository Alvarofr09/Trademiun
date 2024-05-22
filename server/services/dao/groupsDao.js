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
			admin_id: groupData.admin_id,
			creation_date: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		return await db.query("INSERT INTO grupos SET ?", groupObj, "insert", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.deleteGroup = async (group_id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			"DELETE FROM grupos WHERE id = ?",
			group_id,
			"delete",
			conn
		);
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

groupDao.leaveGroup = async (membershipData) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const group_id = membershipData.group_id;
		const user_id = membershipData.user_id;

		return await db.query(
			"DELETE FROM grupos_membership WHERE group_id = ? AND user_id = ?",
			[group_id, user_id],
			"delete",
			conn
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.getAllGroups = async () => {
	let conn = null;
	try {
		conn = await db.createConection();

		return await db.query(
			`SELECT * FROM grupos ORDER BY participantes DESC`,
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

groupDao.getGroupsByName = async (name) => {
	let conn = null;
	try {
		conn = await db.createConection();
		const nameLike = `%${name}%`;

		const sqlQuery = `
      		SELECT * 
			FROM grupos 
			WHERE group_name LIKE ?
			ORDER BY participantes DESC
    	`;

		return await db.query(sqlQuery, nameLike, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.getAllGroupsOfUser = async (user_id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const sqlQuery = `
      		SELECT g.id AS group_id, g.group_name, g.description, g.image, g.participantes
			FROM grupos AS g
			JOIN grupos_membership AS gm ON g.id = gm.group_id
			WHERE gm.user_id = ?
    	`;

		return await db.query(sqlQuery, user_id, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.getAllGroupsOfUserByName = async (user_id, group_name) => {
	let conn = null;
	try {
		conn = await db.createConection();
		const nameLike = `%${group_name}%`;

		const sqlQuery = `
      		SELECT g.id AS group_id, g.group_name, g.description, g.image, g.participantes
			FROM grupos AS g
			JOIN grupos_membership AS gm ON g.id = gm.group_id
			WHERE gm.user_id = ? AND g.group_name LIKE ?
    	`;

		return await db.query(sqlQuery, [user_id, nameLike], "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.getGroupInfo = async (chat_id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const sqlQuery = `
      		SELECT *
    		FROM grupos
    		WHERE id = ?
    	`;

		return await db.query(sqlQuery, chat_id, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.isInGroup = async (membershipData) => {
	let conn = null;
	try {
		conn = await db.createConection(); // Asegúrate de que esta línea sea correcta (createConnection en lugar de createConection)

		const sqlQuery = `
      		SELECT COUNT(*) AS count
      		FROM grupos_membership
      		WHERE group_id = ? AND user_id = ?
    	`;

		// Pasa los parámetros como una lista
		const params = [membershipData.group_id, membershipData.user_id];

		// Ejecuta la consulta con los parámetros
		const [rows] = await db.query(sqlQuery, params, "select", conn);
		return rows.count > 0;
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

groupDao.isAdmin = async (group_id) => {
	let conn = null;
	try {
		conn = await db.createConection();

		const sqlQuery = `
      		SELECT admin_id
    		FROM grupos
    		WHERE id = ?
    	`;

		return await db.query(sqlQuery, group_id, "select", conn);
	} catch (error) {
		throw new Error(error);
	} finally {
		conn && (await conn.end());
	}
};

module.exports = groupDao;
