const express = require("express");
const {
	createGroup,
	joinGroup,
	getAllGroups,
	isAdmin,
} = require("../controllers/groupsController");

const groupRouter = express.Router();

groupRouter.post("/create-group", createGroup);
groupRouter.post("/join-group", joinGroup);
groupRouter.post("/is-admin/:id", isAdmin);

groupRouter.get("/get-groups/:id", getAllGroups);

module.exports = groupRouter;
