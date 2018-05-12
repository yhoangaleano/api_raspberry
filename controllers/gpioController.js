'use strict'

const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

const pin13 = new five.Pin(13);

function blinkLED(req, res) {

    var pulseParameter = req.params.pulse;

    board.on("ready", function() {
        
        five.Pin.write(pin13, pulseParameter);

        res.status(200).send({

            message: `GPIO 27 - Pin 13 ${pulseParameter}`,
            object: null,
            response: true

        });

    });
}

module.exports = {
    blinkLED
}