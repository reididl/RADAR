function RADAR165TO15 () {
    angle = endAngle
    while (angle >= startAngle) {
        moveRadar(angle)
        pins.digitalWritePin(DigitalPin.P12, 1)
        pins.analogWritePin(AnalogPin.P0, 400)
        temps = input.runningTime()
        totaltemps = totaltemps + temps
        angle = angle - angleStep
        if (totaltemps - temps >= 100) {
            pins.digitalWritePin(DigitalPin.P12, 0)
            pins.analogWritePin(AnalogPin.P0, 0)
            totaltemps = 0
        }
    }
}
function moveRadar (valAngle: number) {
    robotbit.GeekServo5KG(robotbit.Servos.S1, valAngle)
    basic.pause(30)
    distance = sonar.ping(
    DigitalPin.P15,
    DigitalPin.P14,
    PingUnit.Centimeters
    )
    control.waitMicros(4)
    basic.showNumber(distance)
    ecranDistance = distance / 400 * 63
    x1 = centerX + Math.round(radius * Math.cos(pi * (valAngle / 180)))
    y1 = centerY + Math.round(radius * Math.sin(pi * (valAngle / 180)))
    x2 = centerX + Math.round(ecranDistance * Math.cos(pi * (valAngle / 180)))
    y2 = centerY + Math.round(ecranDistance * Math.sin(pi * (valAngle / 180)))
    OLED12864_I2C.line(
    x1,
    y1,
    x2,
    y2,
    1
    )
}
function RADAR15TO165 () {
    angle = startAngle
    while (angle <= endAngle) {
        moveRadar(angle)
        pins.digitalWritePin(DigitalPin.P12, 1)
        pins.analogWritePin(AnalogPin.P0, 400)
        temps = input.runningTime()
        totaltemps = totaltemps + temps
        angle = angle + angleStep
        if (totaltemps - temps >= 100) {
            pins.digitalWritePin(DigitalPin.P12, 0)
            pins.analogWritePin(AnalogPin.P0, 0)
            totaltemps = 0
        }
    }
}
let OFF = 0
let ON = 0
let BOUTONOFF = 0
let BOUTONON = 0
let y2 = 0
let x2 = 0
let y1 = 0
let x1 = 0
let ecranDistance = 0
let angle = 0
let distance = 0
let totaltemps = 0
let temps = 0
let angleStep = 0
let endAngle = 0
let startAngle = 0
let radius = 0
let centerY = 0
let centerX = 0
let pi = 0
pi = 3.141592653589793
let direction = 1
centerX = 63
centerY = 0
radius = 20
startAngle = 15
endAngle = 165
angleStep = 5
let CONSTANGLE = 15
let Constdelay = 100
temps = input.runningTime()
totaltemps = 0
distance = 0
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
OLED12864_I2C.on()
OLED12864_I2C.zoom(false)
OLED12864_I2C.clear()
basic.pause(2000)
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
        OLED12864_I2C.clear()
        RADAR15TO165()
        OLED12864_I2C.clear()
        RADAR165TO15()
    }
    if (OFF == 1) {
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P13, 1)
        music.stopAllSounds()
    }
})
