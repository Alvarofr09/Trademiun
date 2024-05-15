const express = require("express");
const {
	addSignal,
	getSignals,
	getUserSignals,
} = require("../controllers/signalController");
const upload = require("../utils/multerConfig");

const signalRoute = express.Router();

signalRoute.post("/add-signal", addSignal);
signalRoute.post("/get-signals", getSignals);

signalRoute.get("/get-user-signals/:id", getUserSignals);

module.exports = signalRoute;
