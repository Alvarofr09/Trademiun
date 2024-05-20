const express = require("express");
const {
	userRegister,
	userLogin,
	getAllUsers,
	getUser,
	getUsersByRentabilidad,
	getUsersBySeguidores,
	updateUser,
	hasGroup,
	followUser,
	isFollowing,
	unfollowUser,
} = require("../controllers/userController");

const userRouter = express.Router();

/*----------- Endpoints de POST -----------*/
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/follow", followUser);
userRouter.post("/is-follwing", isFollowing);
userRouter.post("/unfollow", unfollowUser);

/*----------- Endpoints de GET -----------*/
userRouter.get("/allUsers/:id", getAllUsers);
userRouter.get("/getUserInfo/:id", getUser);
userRouter.get("/get-users-by-rentabilidad", getUsersByRentabilidad);
userRouter.get("/get-users-by-seguidores", getUsersBySeguidores);
userRouter.get("/has-group/:id", hasGroup);

/*----------- Endpoints de PATCH -----------*/
userRouter.patch("/update-user/:id", updateUser);

module.exports = userRouter;
