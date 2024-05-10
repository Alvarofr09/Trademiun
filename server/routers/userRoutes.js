const express = require("express");
const {
	userRegister,
	userLogin,
	setAvatar,
	getAllUsers,
	getUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/setAvatar/:id", setAvatar);

userRouter.get("/allUsers/:id", getAllUsers);

userRouter.get("/getUserInfo/:id", getUser);

module.exports = userRouter;
