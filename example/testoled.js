const OLED = require('oled-i2c-bus');
const font =  require('oled-font-5x7');
const Multiplexer = require("../lib/index");

const tca_addr = new Multiplexer(0x70, 1)
console.log(tca_addr[3].constructor.name)

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