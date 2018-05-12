'use strict'

const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

const pin18 = new five.Pin(18);

function blinkLED(req, res) {

    var pulseParameter = req.params.pulse;

    board.on("ready", function() {
        
        five.Pin.write(pin18, pulseParameter);

        res.status(200).send({

            message: `GPIO 24 - Pin 18 ${pulseParameter}`,
            object: null,
            response: true

        });

    });
}

module.exports = {
    blinkLED
}