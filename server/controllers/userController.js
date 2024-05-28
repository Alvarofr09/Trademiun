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
			image: user.image,
			group_id: user.group_id,
			seguidores: user.seguidores,
			description: user.description,
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

const followUser = async (req, res, next) => {
	try {
		const { user_id, to_follow } = req.body;
		const data = await dao.followUser(user_id, to_follow);

		if (data) {
			res.status(201).json({ message: "Seguido", status: true });
		} else {
			res
				.status(400)
				.json({ message: "No se ha podido seguir", status: false });
		}
	} catch (error) {
		next(error);
	}
};

const unfollowUser = async (req, res, next) => {
	try {
		const { user_id, to_unfollow } = req.body;
		const success = await dao.unfollowUser(user_id, to_unfollow);

		if (success) {
			res.status(200).json({ message: "Dejado de seguir", status: true });
		} else {
			res
				.status(400)
				.json({ message: "No se ha podido dejar de seguir", status: false });
		}
	} catch (error) {
		next(error);
	}
};

const isFollowing = async (req, res, next) => {
	try {
		const { user_id, to_check } = req.body;
		let isFollowing = await dao.isFollowing(user_id, to_check);

		res.status(200).json({ isFollowing });
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

const getUsersByName = async (req, res, next) => {
	try {
		const user_name = req.params.name;
		const users = await dao.getUsersByName(user_name);

		if (users.length === 0)
			return res.json({ message: "Error al traer los grupos", status: true });

		return res.json({ users });
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
		if (!id) {
			return res.status(400).send("ID de usuario no proporcionado");
		}

		if (Object.entries(req.body).length === 0) {
			return res.status(400).send("El body de la solicitud está vacío");
		}

		// Inicializa el objeto de datos del usuario
		let newUserData = {};

		// Recorre los campos en el body de la solicitud y añádelos a newUserData
		for (let key in req.body) {
			if (req.body.hasOwnProperty(key) && key !== "image") {
				newUserData[key] = req.body[key];
			}
		}

		// Manejo especial para la imagen
		if (req.body.image) {
			try {
				const uploadedImage = await cloudinary.uploader.upload(req.body.image, {
					upload_preset: "user_upload",
					public_id: `${req.body.username}_${new Date().toISOString()}`,
					allowed_formats: [
						"jpg",
						"png",
						"jpeg",
						"svg",
						"ico",
						"jfif",
						"webp",
						"gif",
					],
				});

				newUserData.image = uploadedImage.public_id;
			} catch (uploadError) {
				console.error(uploadError);
				return res.status(500).send("Error al subir la imagen");
			}
		}

		// Actualiza el usuario en la base de datos
		const isUserUpdated = await dao.updateUser(id, newUserData);

		if (!isUserUpdated) {
			return res.status(500).send("No se ha podido actualizar el usuario");
		}

		// Recupera el usuario actualizado
		let user = await dao.getUserById(id);
		if (!user || user.length === 0) {
			return res.status(404).send("Usuario no encontrado");
		}

		// Devuelve la respuesta con el usuario actualizado
		res.status(201).json({ user: user[0], status: true });
	} catch (error) {
		next(error);
	}
};

const hasGroup = async (req, res, next) => {
	try {
		const user_id = req.params.id;

		const [response] = await dao.hasGroup(user_id);
		const has_group = response.admin_id == user_id;

		if (has_group) {
			return res.status(200).json({
				message: "Ya has creado un grupo",
				status: false,
				hasGroup: true,
				group_id: response.id,
			});
		} else {
			return res.status(200).json({
				message: "Puedes crear un grupo",
				status: true,
				hasGroup: false,
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	userRegister,
	userLogin,
	followUser,
	unfollowUser,
	isFollowing,
	getAllUsers,
	getUser,
	getUsersByName,
	getUsersByRentabilidad,
	getUsersBySeguidores,
	updateUser,
	hasGroup,
};
