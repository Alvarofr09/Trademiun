const express = require("express");
const { addSignal, getSignals } = require("../controllers/signalController");
const upload = require("../utils/multerConfig");

const signalRoute = express.Router();

signalRoute.post("/add-signal", upload.single("image"), addSignal);

signalRoute.post("/get-signals", getSignals);

module.exports = signalRoute;
