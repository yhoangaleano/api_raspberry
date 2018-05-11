'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Allow", "GET, POST, PUT, DELETE, OPTIONS");

    next();

});

//Cargo las rutas con las que quiero trabajar
var gpioRoute = require("./routes/gpioRoute");

//Aplico las rutas con las que quiero trabajar
app.use("/api", gpioRoute);

module.exports = app;