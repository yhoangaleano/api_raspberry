'use strict'

//Declaración de instancias de las librarías para trabajar
var Raspi = require('raspi-io');
var five = require('johnny-five');

//Creación de la tarjeta y libreria de soporte de la versión 2
var board = new five.Board({
    io: new Raspi()
});

var luminosidad = 0;
var continuarCiclo = true;

//Tabla de pines segun la raspberry y la librería de Johnny Five
//https://github.com/nebrius/raspi-io/wiki/Pin-Information

//Cuando la tarjeta esta lista se ejecuta el metodo donde
//tendremos los metodos del API
board.on("ready", function () {

    //GPIO4 - PIN Fisico 7 - Johnny Five 7
    var pin7 = new five.Pin(7);

    //GPIO17 - PIN Fisico 11 - Johnny Five 0
    var pin11 = new five.Pin(0);

    //GPIO27 - PIN Fisico 13 - Johnny Five 2
    var pin13 = new five.Pin(2);

    //GPIO22 - PIN Fisico 15 - Johnny Five 3
    var pin15 = new five.Pin(3);

    //GPIO24 - PIN Fisico 18 - Johnny Five 5
    var pin18 = new five.Pin(5);

    //Listado de pines disponibles para trabajar
    var pins = {
        'pin7': pin7,
        'pin11': pin11,
        'pin13': pin13,
        'pin15': pin15
    };

    //GPIO18/PWM0 - PIN Fisico 12 - Johnny Five 1
    // var pin1 = new five.Led(1);

    //Librería para crear las rutas del api
    var express = require('express');
    var bodyParser = require('body-parser');

    //Instancia de la clase express
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

    app.get('/', function (req, res) {
        res.send("Hola, bienvenido a tu casa domotizada!");
    });

    //Metodo que me retorna el estado del pin (0 apagado - 1 prendido)
    app.get('/state/:pin', function (req, res) {

        console.log("Alguien preguntó por el estado del pin: ", req.params.pin);

        //Condición que pregunta si el pin que se esta pidiendo por petición existe y esta disponible en el listado de pines

        if (pins.hasOwnProperty(req.params.pin)) {

            //Buscar el objeto pin asociado al nombre del pin y consultarlo
            pins[req.params.pin].query(function (state) {

                //Envia el estado en el que se encuentra el pin
                var respuesta = {
                    resultado: true,
                    objeto: state,
                    mensaje: 'El estado del pin: ' + req.params.pin + ' fue devuelto con exito.'
                };

                res.status(200).send(respuesta);
            });

        } else {

            var respuesta = {
                resultado: false,
                objeto: null,
                mensaje: "Lo siento, has preguntado por el estado del pin: " + req.params.pin + ", pero aún no esta disponible"
            };

            res.status(404).send(respuesta);
        }
    });

    // Metodo para apagar un pin que llega por parametro
    app.get('/led/off/:pin', function (req, res) {

        console.log("Apagando el pin: ", req.params.pin);

        var respuesta = {
            resultado: true,
            objeto: null,
            mensaje: ""
        };

        if (pins.hasOwnProperty(req.params.pin)) {

            //Buscar el objeto pin asociado al nombre del pin y apagarlo
            pins[req.params.pin].low();

            //Envia la respuesta de que se apago correctamente
            respuesta.mensaje = 'El pin: ' + req.params.pin + ' se apago correctamente.';
            res.status(200).send(respuesta);

        } else {

            respuesta.resultado = false;
            respuesta.mensaje = 'El pin: ' + req.params.pin + ' no existe. Intente de nuevo.';
            res.status(404).send(respuesta);
        }

    });

    // Metodo para prender un pin que llega por parametro
    app.get('/led/on/:pin', function (req, res) {

        console.log("Prendiendo el pin: ", req.params.pin);

        var respuesta = {
            resultado: true,
            objeto: null,
            mensaje: ""
        };

        if (pins.hasOwnProperty(req.params.pin)) {

            //Buscar el objeto pin asociado al nombre del pin y prenderlo
            pins[req.params.pin].high();

            //Envia la respuesta de que se prendio correctamente
            respuesta.mensaje = 'El pin: ' + req.params.pin + ' se prendio correctamente.';
            res.status(200).send(respuesta);

        } else {

            respuesta.resultado = false;
            respuesta.mensaje = 'El pin: ' + req.params.pin + ' no existe. Intente de nuevo.';
            res.status(404).send(respuesta);
        }

    });

    // Metodo para prender un pin que llega por parametro
    app.get('/brillo/:brillo', function (req, res) {

        luminosidad = req.params.brillo;

        //Envia el estado en el que se encuentra el pin
        var respuesta = {
            resultado: true,
            objeto: req.params.brillo,
            mensaje: 'El brillo se encuentran: ' + req.params.brillo + '.'
        };

        res.status(200).send(respuesta);


    });

    //Metodo para correr la aplicación
    app.listen(3000, function () {
        console.log("Servidor Corriendo por la siguiente dirección http://localhost:3000!");
    });

    do {

        console.log(luminosidad);

        var tiempoDisparo = 8.33 - luminosidad * 8.33 / 100;
        tiempoDisparo = tiempoDisparo / 1000;

        //Buscar el objeto pin asociado al nombre del pin y consultarlo
        pin18.query(function (state) {

            var valorCruce = state.value;
            if(valorCruce == 1){
                pin7.low();
                setTimeout(function () {
                    console.log('Ejecuto Delay', tiempoDisparo);
                    pin7.high();
                }, tiempoDisparo);
            }

        });

    } while (continuarCiclo);

});