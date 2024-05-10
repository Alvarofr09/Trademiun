const express = require("express");
const { addSignal, getSignals } = require("../controllers/signalController");

const signalRoute = express.Router();

signalRoute.post("/add-signal", addSignal);

signalRoute.post("/get-signals", getSignals);

module.exports = signalRoute;
