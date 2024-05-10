const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const socket = require("socket.io");

const userRouter = require("./routers/userRoutes");
const messageRouter = require("./routers/messagesRoutes");
const groupRouter = require("./routers/groupsRoutes");
const {
	createUsersTable,
	createMessagesTable,
	createGroupsTable,
	createMembershipTable,
	createIncrementParticipantsTrigger,
	createSignalsTable,
} = require("./utils/dbTables");
const signalRoute = require("./routers/signalsRoutes");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

// Instanciamos la libreria express-fileupload (para subir archivos)
app.use(
	fileUpload({
		createParentPath: true, // Crea la carpeta donde almacenamos las imagenes si no ha sido creada
		limits: { fieldSize: 20 * 1024 * 1024 }, // Limitamos el tamaño de la imagen a 20mb
		abortOnLimit: true, // Interrumpimos la subida de la imagen si excede el limite
		responseOnLimit: "Imagen demasiado grande", // Enviaremos un mensaje de respuesta cuando se interrumpe la carga
		uploadTimeout: 0, // Indicamos el tiempo de respuesta si se interrumpe la carga de la imagen
	})
);

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

createUsersTable();
createGroupsTable();
createMessagesTable();
createSignalsTable();
createMembershipTable();
createIncrementParticipantsTrigger();

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/groups", groupRouter);
app.use("/api/signals", signalRoute);

// const conn = db.createConection();

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
			socket.to(group_id).emit("msg-recieve", data.message);
		});
	});
});
