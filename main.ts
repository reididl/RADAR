function RADAR165TO15 () {
    i = 165
    while (i > 15) {
        pins.digitalWritePin(DigitalPin.P12, 1)
        pins.analogWritePin(AnalogPin.P0, 400)
        robotbit.GeekServo5KG(robotbit.Servos.S1, i)
        OLED12864_I2C.clear()
        OLED12864_I2C.showString(
        0,
        0,
        "D:",
        1
        )
        distance = sonar.ping(
        DigitalPin.P15,
        DigitalPin.P14,
        PingUnit.Centimeters
        )
        control.waitMicros(2)
        OLED12864_I2C.showNumber(
        3,
        0,
        distance,
        1
        )
        OLED12864_I2C.showString(
        8,
        0,
        "cm",
        1
        )
        OLED12864_I2C.showString(
        0,
        1,
        "A:",
        1
        )
        OLED12864_I2C.showNumber(
        3,
        1,
        i,
        1
        )
        basic.pause(30)
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.analogWritePin(AnalogPin.P0, 0)
        basic.pause(30)
        i = i - 1
    }
}
function RADAR15TO165 () {
    for (let j = 0; j <= 150; j++) {
        pins.digitalWritePin(DigitalPin.P12, 1)
        pins.analogWritePin(AnalogPin.P0, 600)
        robotbit.GeekServo5KG(robotbit.Servos.S1, CONSTANGLE + j)
        OLED12864_I2C.clear()
        OLED12864_I2C.showString(
        0,
        0,
        "D:",
        1
        )
        distance = sonar.ping(
        DigitalPin.P15,
        DigitalPin.P14,
        PingUnit.Centimeters
        )
        control.waitMicros(2)
        OLED12864_I2C.showNumber(
        3,
        0,
        distance,
        1
        )
        OLED12864_I2C.showString(
        8,
        0,
        "cm",
        1
        )
        OLED12864_I2C.showString(
        0,
        1,
        "A:",
        1
        )
        OLED12864_I2C.showNumber(
        3,
        1,
        CONSTANGLE + j,
        1
        )
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.analogWritePin(AnalogPin.P0, 0)
        basic.pause(100)
    }
}
let OFF = 0
let ON = 0
let BOUTONOFF = 0
let BOUTONON = 0
let distance = 0
let i = 0
let CONSTANGLE = 0
CONSTANGLE = 15
pins.digitalWritePin(DigitalPin.P8, 0)
pins.digitalWritePin(DigitalPin.P12, 0)
pins.digitalWritePin(DigitalPin.P13, 1)
robotbit.GeekServo5KG(robotbit.Servos.S1, 90)
basic.showLeds(`
    # # # # #
    # . . . #
    # . . . #
    # . . . #
    # # # # #
    `)
OLED12864_I2C.init(60)
OLED12864_I2C.zoom(true)
OLED12864_I2C.on()
OLED12864_I2C.clear()
OLED12864_I2C.showString(
0,
0,
"WAITING MODE, push ON!",
1
)
basic.pause(2000)
OLED12864_I2C.clear()
basic.forever(function () {
    BOUTONON = pins.digitalReadPin(DigitalPin.P1)
    BOUTONOFF = pins.digitalReadPin(DigitalPin.P2)
    if (BOUTONON == 1) {
        ON = 1
        OFF = 0
    }
    if (BOUTONOFF == 1) {
        ON = 0
        OFF = 1
    }
    if (ON == 1) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P13, 0)
        RADAR15TO165()
        RADAR165TO15()
    }
    if (OFF == 1) {
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P13, 1)
        music.stopAllSounds()
    }
})
