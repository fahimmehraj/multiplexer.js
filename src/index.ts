import bus, { I2CBus, BufferCallback } from 'i2c-bus';

// Wrapper around the i2c bus, has the same functions
class MultiplexerChannel implements I2CBus {
    public channelSwitch: Buffer;
    constructor(public tca: Multiplexer, channel: number) {
        // command to send to multiplexer via i2c
        this.channelSwitch = Buffer.from([1 << channel])
        this.switch()
        return new Proxy(this, {
            get(target, prop) {
                const isValidIndex = (prop: string | symbol): prop is Extract<keyof typeof target, string | symbol> => 
                    Reflect.ownKeys(Object.getPrototypeOf(target)).includes(prop);
                
                if (isValidIndex(prop)) {
                    const origMethod = target[prop]
                    if (typeof origMethod == 'function') {
                        return function(...args: any[]) {
                            target.switch();
                            return origMethod.apply(target, args)
                        }
                    }
                }
            }
        })
    }
    close(callback: bus.CompletionCallback): void {
        return this.tca.i2c.close(callback);
    }
    closeSync(): void {
        return this.tca.i2c.closeSync();
    }
    i2cFuncs(callback: bus.ResultCallback<bus.I2CFuncs>): void {
        return this.tca.i2c.i2cFuncs(callback);
    }
    i2cFuncsSync(): bus.I2CFuncs {
        return this.tca.i2c.i2cFuncsSync();
    }
    scan(callback: bus.ResultCallback<number[]>): void;
    scan(address: number, callback: bus.ResultCallback<number[]>): void;
    scan(startAddr: number, endAddr: number, callback: bus.ResultCallback<number[]>): void;
    scan(startAddr: any, endAddr?: any, callback?: any): void {
        if (typeof startAddr === 'function') {
            callback = startAddr;
            startAddr = 0x03;
            endAddr = 0x77;
            return this.tca.i2c.scan(startAddr, endAddr, callback);
        } else if (typeof endAddr === 'function') {
            callback = endAddr;
            endAddr = startAddr;
        }
        if (startAddr == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.scan(startAddr, endAddr, callback);
    }
    scanSync(address?: number): number[];
    scanSync(startAddr?: number, endAddr?: number): number[] {
        if (typeof startAddr === 'undefined') {
            return this.tca.i2c.scanSync(0x03, 0x77)
        } else if (typeof endAddr === 'undefined') {
            endAddr = startAddr;
        }
        if (startAddr == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.scanSync(startAddr, endAddr);

    }
    deviceId(address: number, callback: bus.ResultCallback<bus.I2CDeviceId>): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.deviceId(address, callback);
    }
    deviceIdSync(address: number): bus.I2CDeviceId {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.deviceIdSync(address);
    }
    i2cRead(address: number, length: number, buffer: Buffer, callback: BufferCallback): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.i2cRead(address, length, buffer, callback);
    }

    i2cReadSync(address: number, length: number, buffer: Buffer): number {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.i2cReadSync(address, length, buffer);
    }
    i2cWrite(address: number, length: number, buffer: Buffer, callback: BufferCallback) {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        this.tca.i2c.i2cWrite(address, length, buffer, callback);
    }

    i2cWriteSync(address: number, length: number, buffer: Buffer): number {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.i2cWriteSync(address, length, buffer);
    }
    readByte(address: number, command: number, callback: bus.ResultCallback<number>): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.readByte(address, command, callback);
    }
    readByteSync(address: number, command: number): number {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.readByteSync(address, command);
    }
    readWord(address: number, command: number, callback: bus.ResultCallback<number>): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.readWord(address, command, callback);
    }
    readWordSync(address: number, command: number): number {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.readWordSync(address, command);
    }
    readI2cBlock(address: number, command: number, length: number, buffer: Buffer, callback: bus.BufferCallback): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.readI2cBlock(address, command, length, buffer, callback);
    }
    readI2cBlockSync(address: number, command: number, length: number, buffer: Buffer): number {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.readI2cBlockSync(address, command, length, buffer);
    }
    receiveByte(address: number, callback: bus.ResultCallback<number>): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.receiveByte(address, callback);
    }
    receiveByteSync(address: number): number {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.receiveByteSync(address);
    }
    sendByte(address: number, byte: number, callback: bus.CompletionCallback): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.sendByte(address, byte, callback);
    }
    sendByteSync(address: number, byte: number): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.sendByteSync(address, byte);
    }
    writeByte(address: number, command: number, byte: number, callback: bus.CompletionCallback): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.writeByte(address, command, byte, callback);
    }
    writeByteSync(address: number, command: number, byte: number): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.writeByteSync(address, command, byte);
    }
    writeWord(address: number, command: number, word: number, callback: bus.CompletionCallback): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.writeWord(address, command, word, callback);
    }
    writeWordSync(address: number, command: number, word: number): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.writeWordSync(address, command, word);
    }
    writeQuick(address: number, command: number, bit: number, callback: bus.CompletionCallback): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.writeQuick(address, command, bit, callback);
    }
    writeQuickSync(address: number, command: number, bit: number): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.writeQuickSync(address, command, bit);
    }
    writeI2cBlock(address: number, command: number, length: number, buffer: Buffer, callback: bus.BufferCallback): void {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.writeI2cBlock(address, command, length, buffer, callback);
    }
    writeI2cBlockSync(address: number, command: number, length: number, buffer: Buffer): number {
        if (address == this.tca.address) {
            throw new Error("Device address must be different than TCA9548A address.");
        }
        return this.tca.i2c.writeI2cBlockSync(address, command, length, buffer);
    }
    promisifiedBus(): bus.PromisifiedBus {
        return this.tca.i2c.promisifiedBus();
    }
    switch() {
        this.tca.i2c.i2cWriteSync(this.tca.address, this.channelSwitch.length, this.channelSwitch)
    }
}

class Multiplexer {

    public i2c: I2CBus;
    public channels: Array<MultiplexerChannel>;
    constructor(public address: number, i2c: number) {
        this.i2c = bus.openSync(i2c);
        this.channels = new Array(8).fill(null)

        return new Proxy(this, {
            get(target, prop) {
                let index = parseInt(prop.toString())
                if (index != NaN) {
                    if (!(index in target)) {
                        if (index >= 0 && index <= 7) {
                            // constructor will be called each time Proxy is accessed
                            // therefore calling switch()
                            target.channels[index] = new MultiplexerChannel(target, index);
                        } else {
                            return new Error("Channel should be in the range of 0-7 inclusive")
                        }

                        return target.channels[index];
                    }
                }
            }
        })
    }


}

export = Multiplexer;