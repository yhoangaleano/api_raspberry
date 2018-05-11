'use strict'

var app = require('./app');

var port = process.env.port || 3977;
var host = process.env.host || '127.0.0.1';

var server = app.listen(port, host, function() {

    console.log("Servidor del API Restful corriendo por http://localhost:3977");

});