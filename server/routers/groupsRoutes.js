const express = require("express");
const {
	createGroup,
	joinGroup,
	getAllGroups,
	isAdmin,
	leaveGroup,
	isInGroup,
	getGroupInfo,
	deleteGroup,
	getAllGroupsOfUser,
} = require("../controllers/groupsController");

const groupRouter = express.Router();

groupRouter.post("/create-group", createGroup);
groupRouter.post("/join-group", joinGroup);
groupRouter.post("/leave-group", leaveGroup);
groupRouter.post("/is-in-group", isInGroup);
groupRouter.post("/is-admin/:id", isAdmin);

groupRouter.get("/get-all-groups", getAllGroups);
groupRouter.get("/get-groups-user/:id", getAllGroupsOfUser);
groupRouter.get("/get-group-info/:id", getGroupInfo);

groupRouter.delete("/delete-group/:id", deleteGroup);

module.exports = groupRouter;
