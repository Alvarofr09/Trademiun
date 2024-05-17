const dao = require("../services/dao/userDao");
const { SignJWT } = require("jose");
const md5 = require("md5");
const cloudinary = require("../services/cloudinary");

const userRegister = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const usernameCheck = await dao.getUserByUsername(username);

		if (usernameCheck.length < 0)
			return res
				.status(409)
				.json({ msg: "Username already in use", status: false });

		const emailCheck = await dao.getUserByEmail(email);
		if (emailCheck.length)
			return res
				.status(409)
				.json({ msg: "Email already in use", status: false });

		const newUser = {
			username,
			email,
			password,
			isImageSet: true,
			image: "Trademiun/User_Avatar/imagenDefecto_pipbdh",
		};

		const user = await dao.createUser(newUser);
		delete user.password;

		res.status(201).json({ user, status: true });
	} catch (error) {
		next(error);
	}
};

const userLogin = async (req, res, next) => {
	const { email, password, isEncrypted } = req.body;

	if (!email || !password) return res.status(400).send("Error en el body");
	try {
		let user = await dao.getUserByEmail(email);
		if (user.length <= 0) return res.status(404).send("Usuario no registrado");

		const clientPassword = isEncrypted ? password : md5(password);
		[user] = user;

		if (user.password !== clientPassword) return res.sendStatus(401);

		// GENERAR TOKEN
		const jwtConstructor = new SignJWT({
			id: user.id,
			username: user.username,
			email: user.email,
			isImageSet: user.isImageSet,
			image: user.image,
			seguidores: user.seguidores,
			rentabilidad: user.rentabilidad,
		});

		// Codificamos la clave secreta definida en la variable de entorno por requisito de la libreria jose
		// y poder pasarla en el formato correcto (uint8Array) en el metodo .sign
		const encoder = new TextEncoder();

		// Generamos el JWT. Lo hacemos asincrono, ya que nos devuelve una promesa.
		// Le indicamos la cabecera, la creacion, la expiracion y la firma (clave secreta)
		const token = await jwtConstructor
			.setProtectedHeader({ alg: "HS256", typ: "JWT" })
			.setIssuedAt()
			.setExpirationTime("1h")
			.sign(encoder.encode("8ZxUbKjJro"));

		res.status(201).json({ token, status: true });
	} catch (error) {
		next(error);
	}
};

const getAllUsers = async (req, res, next) => {
	try {
		const id = req.params.id;

		const users = await dao.getAllUsers(id);
		res.status(200).json({ users });
	} catch (error) {
		next(error);
	}
};

const getUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		let user = await dao.getUserById(id);
		[user] = user;
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

const getUsersByRentabilidad = async (req, res, next) => {
	try {
		let users = await dao.getAllUsersByRentabilidad();

		// Añadir campo de orden tipo "ranking" a cada usuario
		users = users.map((user, index) => {
			return { ...user, ranking: index + 1 };
		});

		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const getUsersBySeguidores = async (req, res, next) => {
	try {
		let users = await dao.getAllUsersBySeguidores();

		// Añadir campo de orden tipo "ranking" a cada usuario
		users = users.map((user, index) => {
			return { ...user, ranking: index + 1 };
		});

		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		if (Object.entries(req.body).length === 0)
			return res.status(400).send("Error al recibir el body");

		const { username, email, password, image } = req.body;

		const uploadedImage = await cloudinary.uploader.upload(
			image,
			{
				upload_preset: "user_upload",
				public_id: `${username}_${new Date()}`,
				allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
			},
			function (error, result) {
				if (error) console.log(error);
				console.log(result);
			}
		);

		const newUserData = {
			username,
			email,
			password,
			image: uploadedImage.public_id,
		};

		const isUserUpdate = await dao.updateUser(id, newUserData);

		if (!isUserUpdate)
			return res.status(500).send("No se ha podido actualizar el usuario");

		let user = await dao.getUserById(id);
		[user] = user;

		res.status(201).json({ user, status: true });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	userRegister,
	userLogin,
	getAllUsers,
	getUser,
	getUsersByRentabilidad,
	getUsersBySeguidores,
	updateUser,
};
