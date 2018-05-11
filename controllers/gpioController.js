'use strict'

const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

const pin24 = new five.Pin(24);

function blinkLED(req, res) {

    var pulseParameter = req.params.pulse;

    board.on("ready", function() {
        
        five.Pin.write(pin24, pulseParameter);

        res.status(200).send({

            message: `GPIO 24 ${pulseParameter}`,
            object: null,
            response: true

        });

    });
}

module.exports = {
    blinkLED
}