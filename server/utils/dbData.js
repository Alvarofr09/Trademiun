const db = require("../services/db");

const usersData = [
	{
		username: "Alvaro",
		email: "alvaro@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/AlvaroFR_foto_fezhib",
		description:
			"Un operador de bolsa experto, siempre analizando los movimientos del mercado en busca de oportunidades lucrativas.",
		seguidores: 360,
		rentabilidad: 154,
	},
	{
		username: "Mirella",
		email: "mire@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/dgzngr3oigc7nvefnzli",
		description:
			"Una inversora experimentada, hábil en el arte de diversificar su cartera para minimizar riesgos y maximizar ganancias.",
		seguidores: 367,
		rentabilidad: 267,
	},
	{
		username: "Pablo Fuentes",
		email: "pablo@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/PabloFC_foto_ag1kxm",
		description:
			"Un trader intrépido, dispuesto a tomar decisiones rápidas y calculadas en medio de la volatilidad del mercado.",
		seguidores: 143,
		rentabilidad: 99,
	},
	{
		username: "Pablo Parra",
		email: "parra@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/Pablo_parra_uotmcd",
		description:
			"Un especulador astuto, aprovechando las fluctuaciones del mercado para obtener beneficios en corto plazo.",
		seguidores: 584,
		rentabilidad: 356,
	},
	{
		username: "Izabel",
		email: "izabel@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/Izabel_ctcrn4",
		description:
			"Una analista técnica meticulosa, utilizando herramientas gráficas y algoritmos para prever tendencias y tomar decisiones informadas.",
		seguidores: 924,
		rentabilidad: 418,
	},
	{
		username: "Pablo Pedrosa",
		email: "pedrosa@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/Pablo_Pedrosa_rkz49e",
		description:
			"Un gestor de riesgos prudente, siempre evaluando cuidadosamente las posibles pérdidas antes de realizar cualquier operación.",
		seguidores: 748,
		rentabilidad: 300,
	},
	{
		username: "Veronica",
		email: "vero@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/vero_nmmwks",
		description:
			"Una experta en derivados financieros, aprovechando instrumentos como opciones y futuros para potenciar sus estrategias de inversión.",
		seguidores: 561,
		rentabilidad: 195,
	},
	{
		username: "David",
		email: "david@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/David_nfuccq",
		description:
			"Un day trader disciplinado, ejecutando múltiples operaciones en el transcurso de un solo día para capitalizar pequeños movimientos del mercado.",
		seguidores: 290,
		rentabilidad: 397,
	},
	{
		username: "Marco",
		email: "marco@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/Marco",
		description:
			"Un seguidor de tendencias, identificando y aprovechando los movimientos direccionales del mercado para obtener ganancias sostenidas.",
		seguidores: 643,
		rentabilidad: 282,
	},
	{
		username: "Nacho",
		email: "nacho@gmail.com",
		password: "e10adc3949ba59abbe56e057f20f883e",
		userRole: false,
		image: "Trademiun/Users_Avatar/Nacho",
		description:
			"Un inversor a largo plazo, construyendo gradualmente su patrimonio mediante inversiones sólidas y bien fundamentadas en empresas con potencial de crecimiento a largo plazo.",
		seguidores: 498,
		rentabilidad: 162,
	},
];

const groupsData = [
	{
		group_name: "Trade Marketing",
		description: "Descripción del Grupo A",
		price: 150,
		image: "Trademiun/Groups_Avatar/trade-marketing_fwlhly",
		admin_id: 1,
	},
	{
		group_name: "Autonomo Trade",
		description: "Descripción del Grupo B",
		price: 250,
		image: "Trademiun/Groups_Avatar/autonomo_trade__mazegh",
		admin_id: 2,
	},
	{
		group_name: "Trade.com",
		description: "Descripción del Grupo C",
		price: 100,
		image: "Trademiun/Groups_Avatar/TRADE_COM_atzm7m",
		admin_id: 3,
	},
	{
		group_name: "International Trade",
		description: "Descripción del Grupo D",
		price: 300,
		image: "Trademiun/Groups_Avatar/international-trade_j0nqt3",
		admin_id: 4,
	},
	{
		group_name: "Grupo Trading",
		description: "Descripción del Grupo E",
		price: 200,
		image: "Trademiun/Groups_Avatar/Trading_pyad1r",
		admin_id: 5,
	},
	{
		group_name: "Trade",
		description: "Descripción del Grupo F",
		price: 150,
		image: "Trademiun/Groups_Avatar/Trade_lbpcvr",
		admin_id: 6,
	},
	{
		group_name: "Grupo WDI",
		description: "Descripción del Grupo G",
		price: 50,
		image: "Trademiun/Groups_Avatar/WDI_tgo33f",
		admin_id: 7,
	},
	{
		group_name: "Grupo Agora",
		description: "Descripción del Grupo H",
		price: 75,
		image: "Trademiun/Groups_Avatar/Agora_p20eci",
		admin_id: 8,
	},
	{
		group_name: "Trade Republic",
		description: "Descripción del Grupo I",
		price: 200,
		image: "Trademiun/Groups_Avatar/trade-republic-opiniones_hpbwic",
		admin_id: 9,
	},
	{
		group_name: "Grupo Trade",
		description: "Descripción del Grupo J",
		price: 175,
		image: "Trademiun/Groups_Avatar/Grupo_Trade_mqtfln",
		admin_id: 10,
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

const coinsData = [
	{
		name: "Bitcoin",
		symbol: "BTC",
	},
	{
		name: "Ethereum",
		symbol: "ETH",
	},
	{
		name: "Ripple",
		symbol: "XRP",
	},
	{
		name: "Litecoin",
		symbol: "LTC",
	},
	{
		name: "Cardano",
		symbol: "ADA",
	},
	{
		name: "Dogecoin",
		symbol: "DOGE",
	},
	{
		name: "Polkadot",
		symbol: "DOT",
	},
	{
		name: "Binance Coin",
		symbol: "BNB",
	},
	{
		name: "Chainlink",
		symbol: "LINK",
	},
	{
		name: "Stellar",
		symbol: "XLM",
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
				image,
				description,
				seguidores,
				rentabilidad,
			} = user;
			const sqlQuery = `
        INSERT INTO users (username, email, password, userRole, image, description, seguidores, rentabilidad)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
			const params = [
				username,
				email,
				password,
				userRole,
				image,
				description,
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
			const { group_name, description, price, image, admin_id } = group;
			const sqlQuery = `
                INSERT INTO grupos (group_name, description, price, image, admin_id)
                VALUES (?, ?, ?, ?, ?)
            `;
			const params = [group_name, description, price, image, admin_id];
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

const insertCoins = async () => {
	let conn = await db.createConection();
	try {
		for (const coin of coinsData) {
			const { name, symbol } = coin;
			const sqlQuery = `
        INSERT INTO coins (name, symbol)
        VALUES (?, ?)
      `;
			const params = [name, symbol];
			await db.query(sqlQuery, params, "insert", conn);
		}
	} finally {
		await conn.end();
	}
};

module.exports = { insertUsers, insertGroups, insertMembership, insertCoins };
