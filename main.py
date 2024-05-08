def RADAR165TO15():
    global i, temps, totaltemps, distance
    i = 165
    while i > 15:
        pins.digital_write_pin(DigitalPin.P12, 1)
        pins.analog_write_pin(AnalogPin.P0, 400)
        temps = input.running_time()
        totaltemps = totaltemps + input.running_time()
        robotbit.geek_servo5_kg(robotbit.Servos.S1, i)
        OLED12864_I2C.show_string(0, 0, "D:", 1)
        distance = sonar.ping(DigitalPin.P15, DigitalPin.P14, PingUnit.CENTIMETERS)
        OLED12864_I2C.show_number(3, 0, distance, 1)
        OLED12864_I2C.show_string(8, 0, "cm", 1)
        OLED12864_I2C.show_string(0, 1, "A:", 1)
        OLED12864_I2C.show_number(3, 1, i, 1)
        basic.pause(30)
        if totaltemps - temps >= 100:
            pins.digital_write_pin(DigitalPin.P12, 0)
            pins.analog_write_pin(AnalogPin.P0, 0)
            totaltemps = 0
            basic.pause(100)
        i = i - 1
def RADAR15TO165():
    global temps, totaltemps, distance
    for j in range(151):
        pins.digital_write_pin(DigitalPin.P12, 1)
        pins.analog_write_pin(AnalogPin.P0, 600)
        temps = input.running_time()
        totaltemps = totaltemps + temps
        robotbit.geek_servo5_kg(robotbit.Servos.S1, CONSTANGLE + j)
        OLED12864_I2C.show_string(0, 0, "D:", 1)
        distance = sonar.ping(DigitalPin.P15, DigitalPin.P14, PingUnit.CENTIMETERS)
        OLED12864_I2C.show_number(3, 0, distance, 1)
        OLED12864_I2C.show_string(8, 0, "cm", 1)
        OLED12864_I2C.show_string(0, 1, "A:", 1)
        OLED12864_I2C.show_number(3, 1, CONSTANGLE + j, 1)
        basic.pause(30)
        if totaltemps - temps >= 100:
            pins.digital_write_pin(DigitalPin.P12, 0)
            pins.analog_write_pin(AnalogPin.P0, 0)
            totaltemps = 0
            basic.pause(100)
OFF = 0
ON = 0
BOUTONOFF = 0
BOUTONON = 0
i = 0
distance = 0
totaltemps = 0
temps = 0
CONSTANGLE = 0
CONSTANGLE = 15
Constdelay = 100
temps = input.running_time()
totaltemps = 0
distance = 0
pins.digital_write_pin(DigitalPin.P8, 0)
pins.digital_write_pin(DigitalPin.P12, 0)
pins.digital_write_pin(DigitalPin.P13, 1)
robotbit.geek_servo5_kg(robotbit.Servos.S1, 90)
basic.show_leds("""
    # # # # #
    # . . . #
    # . . . #
    # . . . #
    # # # # #
    """)
OLED12864_I2C.init(60)
OLED12864_I2C.zoom(True)
OLED12864_I2C.on()
OLED12864_I2C.clear()
OLED12864_I2C.show_string(0, 0, "WAITING MODE, push ON!", 1)
OLED12864_I2C.show_number(0,
    2,
    sonar.ping(DigitalPin.P15, DigitalPin.P14, PingUnit.CENTIMETERS),
    1)
basic.pause(2000)
OLED12864_I2C.clear()

def on_forever():
    global BOUTONON, BOUTONOFF, ON, OFF
    BOUTONON = pins.digital_read_pin(DigitalPin.P1)
    BOUTONOFF = pins.digital_read_pin(DigitalPin.P2)
    if BOUTONON == 1:
        ON = 1
        OFF = 0
    if BOUTONOFF == 1:
        ON = 0
        OFF = 1
    if ON == 1:
        pins.digital_write_pin(DigitalPin.P8, 1)
        pins.digital_write_pin(DigitalPin.P12, 0)
        pins.digital_write_pin(DigitalPin.P13, 0)
        RADAR15TO165()
        RADAR165TO15()
    if OFF == 1:
        pins.digital_write_pin(DigitalPin.P8, 0)
        pins.digital_write_pin(DigitalPin.P12, 0)
        pins.digital_write_pin(DigitalPin.P13, 1)
        music.stop_all_sounds()
basic.forever(on_forever)
