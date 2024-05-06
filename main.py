basic.show_leds("""
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    """)
OLED12864_I2C.init(60)
servo = 0
OLED12864_I2C.clear()
OLED12864_I2C.on()
OLED12864_I2C.show_string(10, 10, "Hello!", 1)
basic.show_leds("""
    . # # . .
    . # # . .
    . . . . .
    . . . . .
    . . . . .
    """)