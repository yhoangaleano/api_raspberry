// app.get('/pwm/brightness/:brightness', function(req, res) {

//     const brightness = req.params.brightness;

//     console.log("Someone told me to turn the led brightness: " + brightness);
//     PWM0pin.brightness(brightness); // Set the pin referred to by the `LEDpin` variable 'high' (on)
//     res.send("Now the GPIO18/PWM0 - Pin 1 (johnny-five) should be brightness " + brightness) // And tell the user that it should be off in the webpage
// });

// app.get('/pwm/fade/:brightness/:milliseconds', function(req, res) {

//     let brightness = req.params.brightness;
//     const milliseconds = req.params.milliseconds;
//     brightness = +brightness;

//     PWM0pin.fade({
//         easing: "linear",
//         duration: milliseconds,
//         cuePoints: [0, 1],
//         keyFrames: [brightnessPrevious, brightness],
//         onstop: function() {
//             console.log("Animación Terminada: " + brightness);
//             console.log(`Anterior: ${brightnessPrevious}, Ahora: ${brightness}`);
//         }
//     });

//     setTimeout(() => {
//         PWM0pin.fadeOut();
//         brightnessPrevious = brightness;
//     }, milliseconds + 1000);

//     // console.log("Someone told me to turn the led brightness: " + brightness);
//     // PWM0pin.fade(brightness, milliseconds, () => {
//     //     PWM0pin.stop();
//     // });
//     res.send("Now the GPIO18/PWM0 - Pin 1 (johnny-five) should be brightness " + brightness) // And tell the user that it should be off in the webpage
// });