'use strict'

var express = require("express");
var gpioController = require("./../controllers/gpioController");

var api = express.Router();

api.get("/blinkLED/:gpio", gpioController.blinkLED);

module.exports = api;