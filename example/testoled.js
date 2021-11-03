const Multiplexer = require("../lib/index")

const tca_addr = new Multiplexer(0x70, 1)
console.log(tca_addr[3].constructor.name)