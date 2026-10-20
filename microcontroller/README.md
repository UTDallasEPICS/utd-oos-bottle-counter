# Microcontroller Code

This is the location for the microcontroller code.

## Project Structure

```
microcontroller/
|
|- ArduinoFountain/
|  |
|  |_ ArduinoFountain.ino (MAIN FILE)
|
|- archived_code/
|  |
|  |- BasicHttpClient/
|  |  |
|  |  |_ BasicHttpClient.ino
|  |
|  |- Bottle_Counter.ino
|  |
|  |- WiFiClientInsecure_copy_20240404164147.ino
|  |
|  |- dipSwitchCounter.ino
|
|_ README.md
```

```microcontroller/ArduinoFountain/ArduinoFountain.ino``` is the final, fully-assembled code file for the microcontroller code developed in Spring 2024 semester.

For the purpose of maintaining user contributions and code sources that were used as reference to create ```ArduinoFountain.ino```, those files have been moved ```archived_code/```.

## Purpose of Each File

```ArduinoFountain/ArduinoFountain.ino```
- The ***main (and only)*** Arduino sketch that is uploaded on to the Arduino Nano ESP32 device.
    - Emphasizing "only" as the ```microcontroller/``` folder was not organized earlier. Non-essential code is placed in ```archived_code/```.
- Purpose:
    - **Setup pin to read input from AC/DC relay** connected to the retro-fitted bottle refill station.
        - The ArduinoFountain.ino sketch uses ```millis()``` to count how long the input pin senses that water is flowing
        - When the fountain has been running for around ```20s```, the increment API is called (mentioned in next bullet point)
    - **Calls an API endpoint** ```http://192.168.0.1:3000/api/arduino/increment/``` to **increment the database counter** for the respective bottle refill station the microcontroller device is attached to.
    - **Handle dip-switch "id setter" code**.
        - In this design, an 8-pin dip-switch was used to set an "id".
        - The "id" is used to tell the device what Bottle Refill Station counter should be incremented in the database when the API is called.
        - For example: the database has multiple fountains. Let's say a fountain at the first floor of ECSW is assigned a database ID of 8. When setting up our microcontroller device, the installer would have to flip the switches such that it resembles ```00001000``` - which is 8 in binary. ```0``` denotes the switch is off (facing down). ```1``` denotes the switch is on (facing up).

```archived_code/Bottle_Counter.ino```
- Contains early micrcontroller code written by the team
    - Displays ```bottles dispensed``` count on an LCD display
    - Simulates a bottle being dispensed using button input

```archived_code/dipSwitchCounter.ino```
- Contains the 8-pin dip-switch "id setter" code (described above) before it was merged into ```ArduinoFountain.ino```

```archived_code/WiFiClientInsecure_copy_20240404164147.ino``` and ```archived_code/BasicHttpClient/BasicHttpClient.ino```
- These were example files the team followed in order to connect the microcontroller to a Wi-Fi network and perform an API call.
- The ```BasicHttpClient.ino``` example is the one team actually followed to build ```ArduinoFountain.ino```, instead of ```WiFiClientInsecure_copy_20240404164147.ino```