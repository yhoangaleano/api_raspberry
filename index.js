'use strict'

// var app = require('./app');

// var port = process.env.port || 3977;
// var host = process.env.host || '127.0.0.1';

// var server = app.listen(port, host, function() {

//     console.log("Servidor del API Restful corriendo por http://localhost:3977");

// });

var Raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
    io: new Raspi()
});

board.on("ready", function() { // Once the computer is connected to the Arduino
    // Save convenient references to the LED pin and an analog pin
    var LEDpin = new five.Pin(2);
    var PWM0pin = new five.Led(1);

    var express = require('express'); // Load the library we'll use to set up a basic webserver
    var app = express(); // And start up that server

    app.get('/', function(req, res) { // what happens when we go to `/`
        res.send("Hello from `server.js`!"); // Just send some text
    });

    app.get('/hello', function(req, res) { // what ha1ppens when we go to `/hello`
        res.sendFile('hello.html', { root: '.' }); // Send back the file `hello.html` located in the current directory (`root`)
    });

    app.get('/:pin/state', function(req, res) { // what happens when someone goes to `/#/state`, where # is any number
        console.log("Someone asked for the state of pin", req.params.pin + "…");

        var pins = {
            'led': LEDpin,
            'pwm0': PWM0pin
        };

        console.log(pins);

        if (pins.hasOwnProperty(req.params.pin)) { // If our pins dictionary knows about the pin name requested
            pins[req.params.pin].query(function(state) { // Look up the pin object associated with the pin name and query it
                res.send(state); // sending back whatever the state we get is
            });
        } else {
            var errorMessage = "Sorry, you asked for the state of pin `" + req.params.pin + '`, ' + "but I haven't been told about that pin yet.";
            res.send(errorMessage);
        }
    });

    app.get('/led/off', function(req, res) { // what happens when someone goes to `/led/off`
        console.log("Someone told me to turn the led off…");
        LEDpin.low(); // Set the pin referred to by the `LEDpin` variable 'low' (off)
        res.send("Now the LED for pin 13 should be off."); // And tell the user that it should be off in the webpage
    });

    app.get('/led/on', function(req, res) { // what happens when someone goes to `/led/off`
        console.log("Someone told me to turn the led on…");
        LEDpin.high(); // Set the pin referred to by the `LEDpin` variable 'high' (on)
        res.send("Now the LED for pin 13 should be on.") // And tell the user that it should be off in the webpage
    });

    app.get('/pwm/brightness/:brightness', function(req, res) {

        const brightness = req.params.brightness;

        console.log("Someone told me to turn the led brightness: " + brightness);
        PWM0pin.brightness(brightness); // Set the pin referred to by the `LEDpin` variable 'high' (on)
        res.send("Now the GPIO18/PWM0 - Pin 1 (johnny-five) should be brightness " + brightness) // And tell the user that it should be off in the webpage
    });

    app.get('/pwm/fade/:brightness/:milliseconds', function(req, res) {

        let brightness = req.params.brightness;
        const milliseconds = req.params.milliseconds;

        console.log(brightness);
        brightness = +brightness;

        PWM0pin.fade({
            easing: "linear",
            duration: milliseconds,
            cuePoints: [0, 1],
            keyFrames: [0, brightness],
            onstop: function() {
                console.log("Animation stopped");
            }
        });

        setTimeout(() => {
            PWM0pin.fadeOut();
        }, milliseconds + 1000);

        // console.log("Someone told me to turn the led brightness: " + brightness);
        // PWM0pin.fade(brightness, milliseconds, () => {
        //     PWM0pin.stop();
        // });
        res.send("Now the GPIO18/PWM0 - Pin 1 (johnny-five) should be brightness " + brightness) // And tell the user that it should be off in the webpage
    });

    app.listen(3000, function() { // Actually turn the server on
        console.log("Server's up at http://localhost:3000!");
    });
});