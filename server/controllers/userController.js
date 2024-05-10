const dao = require("../services/dao/userDao");
const { SignJWT } = require("jose");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const userRegister = async (req, res, next) => {
	try {
		const { username, email, password, image } = req.body;
		console.log(req.body);
		const usernameCheck = await dao.getUserByUsername(username);
		console.log(usernameCheck);

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
			image,
		};

		const user = await dao.createUser(newUser);
		delete user.password;

		res.status(201).json({ user, status: true });
	} catch (error) {
		next(error);
	}
};

const userLogin = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) return res.status(400).send("Error en el body");
	try {
		console.log(req.body);

		let user = await dao.getUserByEmail(email);
		if (user.length <= 0) return res.status(404).send("Usuario no registrado");

		const clientPassword = md5(password);
		[user] = user;

		if (user.password !== clientPassword) return res.sendStatus(401);

		// GENERAR TOKEN
		const jwtConstructor = new SignJWT({
			id: user.id,
			username: user.username,
			email: user.email,
			isImageSet: user.isImageSet,
			image: user.image,
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

const setAvatar = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const { image } = req.body;
		// let userData = await dao.getUserByEmail(userId);
		// [userData] = userData;

		if (image) {
			const images = !image.length ? [image] : image;

			const user = await dao.setAvatar(userId, image);

			if (!user) return res.json({ status: false });

			const userObj = {
				isImageSet: true,
				image: image,
			};

			const updatedUser = await dao.updateUser(userId, userObj);

			if (!updatedUser) return res.json({ status: false });

			let userData = await dao.getUserById(userId);
			[userData] = userData;

			// GENERAR TOKEN
			const jwtConstructor = new SignJWT({
				id: userData.id,
				username: userData.username,
				email: userData.email,
				isImageSet: userData.isImageSet,
				image: userData.image,
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

			return res.json({
				token,
			});
		}

		// if (user.isImageSet) return res.json({ isSet: true });
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
		res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	userRegister,
	userLogin,
	setAvatar,
	getAllUsers,
	getUser,
};
