'use strict'

var Gpio = require('onoff').Gpio;
var LED;
var blinkInterval;

function blinkLED(req, res) {

    var gpioParameter = req.params.gpio;

    LED = new Gpio(gpioParameter, 'out');
    blinkInterval = setInterval(blinkLED, 250);

    if (LED.readSync() === 0) {
        LED.writeSync(1);
    } else {
        LED.writeSync(0);
    }

    res.status(200).send({

        message: `GPIO ${gpioParameter} encendido`,
        object: null,
        response: true

    });
}

function endBlink(req, res) {

    var gpioParameter = req.params.gpio;

    LED = new Gpio(gpioParameter, 'out');

    clearInterval(blinkInterval);
    LED.writeSync(0);
    LED.unexport();

    res.status(200).send({

        message: `GPIO ${gpioParameter} apagado`,
        object: null,
        response: true

    });
}

module.exports = {
    blinkLED,
    endBlink
}