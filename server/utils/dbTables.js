const db = require("../services/db");

const createUsersTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        username VARCHAR(255) UNIQUE, 
        email VARCHAR(255) UNIQUE, 
        password VARCHAR(255),
        userRole BOOLEAN DEFAULT FALSE,
        group_id INT DEFAULT NULL,
        image TEXT,
        seguidores INT DEFAULT 0,
        rentabilidad INT DEFAULT 0,
        registerDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (group_id) REFERENCES grupos(id) ON DELETE SET NULL
      ) `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createGroupsTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
        CREATE TABLE IF NOT EXISTS grupos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            group_name VARCHAR(255),
            description TEXT,
            price DECIMAL(10, 2),
            image TEXT,
            participantes INT DEFAULT 0,
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ); `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createMessagesTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT,
        sender_id INT,
        group_id INT,
        text TEXT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX (sender_id),
        INDEX (group_id),
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (group_id) REFERENCES grupos(id) ON DELETE CASCADE
      ) `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createSignalsTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
      CREATE TABLE IF NOT EXISTS signals (
        id INT AUTO_INCREMENT,
        sender_id INT,
        group_id INT,
        image TEXT,
        description TEXT,
        moneda VARCHAR(255),
        entrada DECIMAL(10, 2),
        stopLoss DECIMAL(10, 2),
        takeProfit DECIMAL(10, 2),
        riesgo INT,
        isCompra BOOLEAN,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX (sender_id),
        INDEX (group_id),
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (group_id) REFERENCES grupos(id) ON DELETE CASCADE
      ) `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createMembershipTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
      CREATE TABLE IF NOT EXISTS grupos_membership (
        id INT AUTO_INCREMENT PRIMARY KEY,
        group_id INT,
        user_id INT,
        user_role BOOLEAN DEFAULT FALSE,
        INDEX (group_id),
        INDEX (user_id),
        FOREIGN KEY (group_id) REFERENCES grupos(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ); `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createIncrementParticipantsTrigger = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
      CREATE TRIGGER IF NOT EXISTS increment_participants_trigger
      AFTER INSERT ON grupos_membership
      FOR EACH ROW
      BEGIN
          DECLARE group_id INT;

          SET group_id = NEW.group_id;

          UPDATE grupos
          SET participantes = participantes + 1
          WHERE id = group_id;
      END
    `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createImagesTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
            CREATE TABLE IF NOT EXISTS images (
                id INT AUTO_INCREMENT PRIMARY KEY,
                image_type ENUM('user', 'group', 'signal') NOT NULL,
                user_id INT,
                group_id INT,
                signal_id INT,
                image TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (group_id) REFERENCES grupos(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (signal_id) REFERENCES signals(id) ON DELETE CASCADE ON UPDATE CASCADE
            ); `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

const createFollowTable = async () => {
	let conn = await db.createConection();
	try {
		const SqlQuery = `
      CREATE TABLE IF NOT EXISTS follow (
        id INT AUTO_INCREMENT PRIMARY KEY,
        follower_id INT,
        followed_id INT,
        follow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        UNIQUE KEY (follower_id, followed_id)
      ); `;
		await db.query(SqlQuery, null, "create", conn);
	} finally {
		await conn.end();
	}
};

module.exports = {
	createUsersTable,
	createGroupsTable,
	createMessagesTable,
	createSignalsTable,
	createMembershipTable,
	createIncrementParticipantsTrigger,
	createImagesTable,
	createFollowTable,
};
