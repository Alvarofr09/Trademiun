const mysql = require("mysql2/promise");
// import mysql from "mysql2/promise";

let db = {};

db.createConection = async () => {
	try {
		const mysqlConecction = await mysql.createConnection({
			host: process.env.DB_HOST || "localhost",
			port: process.env.DB_PORT || 3306,
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASSWORD || "1234",
			database: process.env.DB_NAME || "test2",
			dateStrings: true,
		});
		console.log("Database connected, TRUE");
		return mysqlConecction;
	} catch (error) {
		console.log(error.message);
		throw new Error(error.message);
	}
};

db.query = async (sqlQuery, params, type, conn) => {
	try {
		const [result] = await conn.query(sqlQuery, params);
		switch (type) {
			case "select":
				return JSON.parse(JSON.stringify(result));

			case "insert":
				return parseInt(result.insertId);

			case "update":
			case "replace":
			case "delete":
				if (result.affectedRows > 0) {
					return true;
				} else {
					return false;
				}

			case "create":
				if (result.warningStatus === 0) {
					return true; // Indica que la tabla se creó correctamente
				} else {
					return false; // Indica que hubo un problema al crear la tabla
				}
			default:
				throw new Error("Query type not found");
		}
	} catch (error) {
		console.error("Query or database error: ", error);
		throw new Error(error.message);
	}
};
// export default db;
module.exports = db;
