const express = require("express");
const { addSignal } = require("../controllers/signalController");

const signalRoute = express.Router();

signalRoute.post("/add-signal", addSignal);

// signalRoute.post("/getGroupMessages", getGroupMessages);

module.exports = signalRoute;
