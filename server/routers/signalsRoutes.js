const express = require("express");
const {
	addSignal,
	getSignals,
	getUserSignals,
	getAllSignalsWithUsers,
} = require("../controllers/signalController");

const signalRoute = express.Router();

signalRoute.post("/add-signal", addSignal);
signalRoute.post("/get-signals", getSignals);

signalRoute.get("/get-signals-with-user", getAllSignalsWithUsers);
signalRoute.get("/get-user-signals/:id", getUserSignals);

module.exports = signalRoute;
