'use strict'

var Gpio = require('onoff').Gpio;

function blinkLED(req, res) {

    var gpioParameter = req.params.gpio;

    var LED = new Gpio(gpioParameter, 'out');

    if (LED.readSync() === 0) {
        LED.writeSync(1);
    } else {
        LED.writeSync(0);
    }

    res.status(200).send({

        message: `GPIO ${gpioParameter} ${LED.readSync()}`,
        object: null,
        response: true

    });
}

module.exports = {
    blinkLED
}