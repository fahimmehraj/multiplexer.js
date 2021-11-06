# multiplexer.js

A module for interacting with the TCA9548A intuitively using the i2c communication bus

The MultiplexerChannel class is basically a wrapper around an i2cBus specified when initializing the Multiplexer.
This package is compatible with any package that relies on the i2c-bus package and takes in an i2c object as it's parameter.

IT HAS ALL THE FUNCTIONS OF AN I2C BUS MADE NORMALLY WITH `bus.openSync()`



## Example
```js
const OLED = require('oled-i2c-bus');
const font =  require('oled-font-5x7');
const Multiplexer = require("../lib/index");

const tca_addr = new Multiplexer(0x70, 1)

const opts = {
    width: 128,
    height: 32,
    address: 0x3C
};

let firstoled = new OLED(tca_addr[7], opts);
let secondoled = new OLED(tca_addr[4], opts);

firstoled.clearDisplay()
firstoled.setCursor(1, 1);
firstoled.writeString(font, 2, 'go', 1, true);
console.log("Yes");

secondoled.clearDisplay()
secondoled.setCursor(1,1);
secondoled.writeString(font, 2, 'no',1,true);
console.log('NO');
```

Refer to https://www.npmjs.com/package/i2c-bus for API reference.
*Note that you should pass in an index of Multiplexer (0-7) as a substitute for an i2cBus, not the Multiplexer object itself*
```js
const tca_addr = new Multiplexer(0x70, 1)
// where OLED is a class constructor that takes in i2cbus
oled = new OLED(tca_addr) // wrong
oled = new OLED(tca_addr[5]) // correct