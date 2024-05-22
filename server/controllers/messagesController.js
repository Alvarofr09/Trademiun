// const { SignJWT } = require("jose");
// const jwt = require("jsonwebtoken");
// const md5 = require("md5");
const dao = require("../services/dao/messagesDao");

const addMessage = async (req, res, next) => {
	try {
		const { from, to, text } = req.body;

		const messageData = {
			from,
			to,
			text: text,
		};

		const data = await dao.addMessage(messageData);

		if (!data)
			return res
				.status(500)
				.json({ message: "Error al enviar el mensaje", status: false });

		return res.json({ message: "Mensaje enviado correctamente", status: true });
	} catch (error) {
		next(error);
	}
};

const getGroupMessages = async (req, res, next) => {
	try {
		const { from, to } = req.body;

		if (!from || !to) return res.status(400).send("Error en el body");

		let messages = [];
		messages = await dao.getMessages(to);

		messages.sort((a, b) => new Date(a.date) - new Date(b.date));
		const projectMessages = messages.map((message) => {
			return {
				fromSelf: message.sender_id === from,
				username: message.username,
				message: message.text,
				date: message.date,
				type: "message",
			};
		});

		return res.json(projectMessages);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addMessage,
	getGroupMessages,
};
