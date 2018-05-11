'use strict'

var Gpio = require('onoff').Gpio;

function blinkLED(req, res) {

    var gpioParameter = req.params.gpio;
    var pulseParameter = req.params.pulse;
    var LED = new Gpio(gpioParameter, 'out');
    LED.writeSync(pulseParameter);

    console.log(pulseParameter);

    if(pulseParameter == 0){
        LED.unexport();
    }

    res.status(200).send({

        message: `GPIO ${gpioParameter} ${pulseParameter}`,
        object: null,
        response: true

    });
}

module.exports = {
    blinkLED
}