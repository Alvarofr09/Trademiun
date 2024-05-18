const express = require("express");
const {
	userRegister,
	userLogin,
	getAllUsers,
	getUser,
	getUsersByRentabilidad,
	getUsersBySeguidores,
	updateUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

userRouter.get("/allUsers/:id", getAllUsers);
userRouter.get("/getUserInfo/:id", getUser);
userRouter.get("/get-users-by-rentabilidad", getUsersByRentabilidad);
userRouter.get("/get-users-by-seguidores", getUsersBySeguidores);

userRouter.patch("/update-user/:id", updateUser);

module.exports = userRouter;
