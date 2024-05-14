const express = require("express");
const {
	userRegister,
	userLogin,
	setAvatar,
	getAllUsers,
	getUser,
	getUsersByRentabilidad,
	getUsersBySeguidores,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/setAvatar/:id", setAvatar);

userRouter.get("/allUsers/:id", getAllUsers);
userRouter.get("/getUserInfo/:id", getUser);
userRouter.get("/get-users-by-rentabilidad", getUsersByRentabilidad);
userRouter.get("/get-users-by-seguidores", getUsersBySeguidores);

module.exports = userRouter;
