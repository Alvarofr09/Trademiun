const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const socket = require("socket.io");

const userRouter = require("./routers/userRoutes");
const messageRouter = require("./routers/messagesRoutes");
const groupRouter = require("./routers/groupsRoutes");
const signalRoute = require("./routers/signalsRoutes");
const {
	createUsersTable,
	createMessagesTable,
	createGroupsTable,
	createMembershipTable,
	createIncrementParticipantsTrigger,
	createSignalsTable,
	createImagesTable,
	createFollowTable,
} = require("./utils/dbTables");
const {
	insertUsers,
	insertGroups,
	insertMembership,
} = require("./utils/dbData");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

const corsOptions = {
	origin: "http://localhost:5173",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: "150mb", extendexd: true }));

const dbSetup = async () => {
	await createUsersTable();
	await createGroupsTable();
	await createMessagesTable();
	await createSignalsTable();
	await createMembershipTable();
	await createImagesTable();
	await createFollowTable();
	await createIncrementParticipantsTrigger();
	await insertUsers();
	await insertGroups();
	await insertMembership();
};

dbSetup().catch((error) => console.error(error));

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/groups", groupRouter);
app.use("/api/signals", signalRoute);

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const io = socket(server, {
	cors: {
		origin: "http://localhost:5173",
		credentials: true,
	},
});

io.on("connection", (socket) => {
	const idHandShake = socket.id;

	socket.on("add-user", (group_id) => {
		socket.join(group_id);
		console.log(`Hola dispositivo: ${idHandShake} se unio a ---> ${group_id}`);

		socket.on("send-msg", (data) => {
			console.log("Mensaje", data);
			socket.to(group_id).emit("msg-recieve", data);
		});
	});
});
