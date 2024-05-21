const dao = require("../services/dao/groupsDao");
const moment = require("moment");
const cloudinary = require("../services/cloudinary");
const { insertGroupToUser } = require("../services/dao/userDao");

const createGroup = async (req, res, next) => {
	try {
		const { user_id, group_name, description, price, image } = req.body;

		let groupData = {
			group_name,
			description,
			price,
			creation_date: moment().format("YYYY-MM-DD HH:mm:ss"),
		};

		if (image) {
			// Subir imagen a Cloudinary
			const uploadedImage = await cloudinary.uploader.upload(image, {
				upload_preset: "group_upload",
				public_id: `${group_name}_${new Date().toISOString()}`,
				allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
			});

			if (!uploadedImage) {
				return res.status(500).json({
					message: "Error al subir la imagen",
					status: false,
				});
			}

			groupData.image = uploadedImage.public_id;
		} else {
			groupData.image = "Trademiun/Groups_Avatar/gewevwmjrqnlwb55s2c1";
		}

		const data = await dao.createGroup(groupData);

		if (!data)
			return res
				.status(500)
				.json({ message: "Error al crear un grupo", status: false });

		const membershipData = {
			group_id: data,
			user_id,
		};

		// Añadir grupo a user
		await insertGroupToUser(user_id, data);

		// Unir usuario al grupo
		const result = await dao.joinGroup(membershipData);

		if (!result)
			return res
				.status(500)
				.json({ message: "Error al unirse al grupo", status: false });

		return res.json({
			message: "Grupo creado correctamente",
			status: true,
			group_id: data,
		});
	} catch (error) {
		next(error);
	}
};

const joinGroup = async (req, res, next) => {
	//TODO: Hacer que un usuario no se pueda unir a un grupo dos veces
	try {
		const { group_id, user_id } = req.body;

		const membershipData = {
			group_id,
			user_id,
		};

		const data = await dao.joinGroup(membershipData);

		if (!data)
			return res
				.status(500)
				.json({ message: "Error al enviar el mensaje", status: false });

		return res.json({ message: "Te has unido al grupo", status: true });
	} catch (error) {
		next(error);
	}
};

const leaveGroup = async (req, res, next) => {
	try {
		const { group_id, user_id } = req.body;

		const membershipData = {
			group_id,
			user_id,
		};

		const data = await dao.leaveGroup(membershipData);
		console.log("Respuesta", data);

		if (!data)
			return res
				.status(500)
				.json({ message: "Error al salir del grupo", status: false });

		return res.json({ message: "Te has salido del grupo", status: true });
	} catch (error) {
		next(error);
	}
};

const getAllGroups = async (req, res, next) => {
	try {
		const user_id = req.params.id;

		const groups = await dao.getAllGroups(user_id);

		if (groups.length === 0)
			return res.json({ message: "No estas en ningun grupo", status: true });

		return res.json({ groups });
	} catch (error) {
		next(error);
	}
};

const isInGroup = async (req, res, next) => {
	try {
		const { group_id, user_id } = req.body;

		const membershipData = {
			group_id,
			user_id,
		};

		const inGroup = await dao.isInGroup(membershipData);

		if (!inGroup)
			return res.json({
				message: "No estas en el grupo",
				status: false,
				inGroup: false,
			});

		return res.json({
			message: "Estas en el grupo",
			status: true,
			inGroup: true,
		});
	} catch (error) {
		next(error);
	}
};

const isAdmin = async (req, res, next) => {
	try {
		const user_id = req.params.id;
		const { group_id } = req.body;

		const firstUser = await dao.getFirstUser(group_id);

		if (firstUser.length === 0)
			return res.json({
				message: "No se ha encontrado el usuario",
				status: true,
			});

		const isFirstUser = firstUser[0].user_id == user_id;
		const isAdmin = isFirstUser ? true : false;

		return res.json({
			isAdmin: isAdmin,
		});
	} catch (error) {
		next(error);
	}
};

const getGroupInfo = async (req, res, next) => {
	try {
		const chat_id = req.params.id;

		const group = await dao.getGroupInfo(chat_id);

		if (group.length === 0)
			return res.json({ message: "Este grupo no existe", status: true });

		return res.json({ group });
	} catch (error) {
		next(error);
	}
};
module.exports = {
	createGroup,
	joinGroup,
	leaveGroup,
	getAllGroups,
	isInGroup,
	isAdmin,
	getGroupInfo,
};
