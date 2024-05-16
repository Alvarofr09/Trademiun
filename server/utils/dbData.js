const db = require("../services/db");

const usersData = [
	{
		username: "Alvaro",
		email: "alvaro@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 360,
		rentabilidad: 500,
	},
	{
		username: "Mirella",
		email: "mire@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 367,
		rentabilidad: 513,
	},
	{
		username: "Pablo",
		email: "pablo@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 143,
		rentabilidad: 99,
	},
	{
		username: "Parra",
		email: "parra@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 584,
		rentabilidad: 256,
	},
	{
		username: "Izabel",
		email: "izabel@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 924,
		rentabilidad: 712,
	},
	{
		username: "Pedrosa",
		email: "pedrosa@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 748,
		rentabilidad: 330,
	},
	{
		username: "Vero",
		email: "vero@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 561,
		rentabilidad: 19,
	},
	{
		username: "David",
		email: "david@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 290,
		rentabilidad: 797,
	},
	{
		username: "Marco",
		email: "marco@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 643,
		rentabilidad: 854,
	},
	{
		username: "marina",
		email: "marina@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		isImageSet: true,
		image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		seguidores: 498,
		rentabilidad: 162,
	},
];

const groupsData = [
	{
		group_name: "Grupo A",
		description: "Descripción del Grupo A",
		price: 150,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
	{
		group_name: "Grupo B",
		description: "Descripción del Grupo B",
		price: 250,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
	{
		group_name: "Grupo C",
		description: "Descripción del Grupo C",
		price: 100,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
	{
		group_name: "Grupo D",
		description: "Descripción del Grupo D",
		price: 300,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
	{
		group_name: "Grupo E",
		description: "Descripción del Grupo E",
		price: 200,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
	{
		group_name: "Grupo F",
		description: "Descripción del Grupo F",
		price: 150,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
	{
		group_name: "Grupo G",
		description: "Descripción del Grupo G",
		price: 50,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
	{
		group_name: "Grupo H",
		description: "Descripción del Grupo H",
		price: 75,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
	{
		group_name: "Grupo I",
		description: "Descripción del Grupo I",
		price: 200,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
	{
		group_name: "Grupo J",
		description: "Descripción del Grupo J",
		price: 175,
		image: "/src/assets/img/imagenDefectoGrupos.png",
	},
];

const membershipsData = [
	{
		group_id: 1,
		user_id: 1,
	},
	{
		group_id: 1,
		user_id: 2,
	},
	{
		group_id: 1,
		user_id: 3,
	},
	{
		group_id: 1,
		user_id: 4,
	},
	{
		group_id: 1,
		user_id: 5,
	},
	{
		group_id: 1,
		user_id: 6,
	},
	{
		group_id: 1,
		user_id: 7,
	},
	{
		group_id: 1,
		user_id: 8,
	},
	{
		group_id: 1,
		user_id: 9,
	},
	{
		group_id: 1,
		user_id: 10,
	},
];

const insertUsers = async () => {
	let conn = await db.createConection();
	try {
		for (const user of usersData) {
			const {
				username,
				email,
				password,
				userRole,
				isImageSet,
				image,
				seguidores,
				rentabilidad,
			} = user;
			const sqlQuery = `
        INSERT INTO users (username, email, password, userRole, isImageSet, image, seguidores, rentabilidad)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
			const params = [
				username,
				email,
				password,
				userRole,
				isImageSet,
				image,
				seguidores,
				rentabilidad,
			];
			await db.query(sqlQuery, params, "insert", conn);
		}
	} finally {
		await conn.end();
	}
};

const insertGroups = async () => {
	let conn = await db.createConection();
	try {
		for (const group of groupsData) {
			const { group_name, description, price, image } = group;
			const sqlQuery = `
                INSERT INTO grupos (group_name, description, price, image)
                VALUES (?, ?, ?, ?)
            `;
			const params = [group_name, description, price, image];
			await db.query(sqlQuery, params, "insert", conn);
		}
	} finally {
		await conn.end();
	}
};

const insertMembership = async () => {
	let conn = await db.createConection();
	try {
		for (const membership of membershipsData) {
			const { group_id, user_id } = membership;
			const sqlQuery = `
                INSERT INTO grupos_membership (group_id, user_id)
                VALUES (?, ?)
            `;
			const params = [group_id, user_id];
			await db.query(sqlQuery, params, "insert", conn);
		}
	} finally {
		await conn.end();
	}
};

module.exports = { insertUsers, insertGroups, insertMembership };
