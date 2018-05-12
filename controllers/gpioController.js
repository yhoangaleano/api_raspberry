'use strict'

const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi()
});

function blinkLED(req, res) {

    var pulseParameter = req.params.pulse;

    board.on("ready", function() {
        
         var led = new five.Led(13);

         // This will grant access to the led instance
          // from within the REPL that's created when
          // running this program.
          this.repl.inject({
            led: led
          });

          if(pulseParameter == 0){
            led.stop();
          }else{
            led.blink();
          }

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