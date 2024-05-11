// multerConfig.js

const multer = require("multer");
const path = require("path");

const upload = multer({
	dest: path.join(__dirname, "../../client/public/images"), // Ruta donde se guardarán las imágenes
});

module.exports = upload;
