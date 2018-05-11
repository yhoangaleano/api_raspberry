'use strict'

var Gpio = require('onoff').Gpio;

function blinkLED(req, res) {

    var gpioParameter = req.params.gpio;
    var pulseParameter = req.params.pulse;
    var LED = new Gpio(gpioParameter, 'out');
    LED.writeSync(pulseParameter);

    res.status(200).send({

        message: `GPIO ${pulseParameter} ${LED.readSync()}`,
        object: null,
        response: true

    });
}

module.exports = {
    blinkLED
}