const express = require("express");
const {
	addMessage,
	getAllMessages,
	getGroupMessages,
} = require("../controllers/messagesController");

const messageRouter = express.Router();

messageRouter.post("/add-message", addMessage);

messageRouter.post("/getMessages", getAllMessages);
messageRouter.post("/getGroupMessages", getGroupMessages);

module.exports = messageRouter;
