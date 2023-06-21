'use strict';

const {convertToBinaryString} = require('../../library/js/utils/primitives/bitwise_utils');

module.exports = async () => {

    const formatByteString = (byte) => {
        const byteString = convertToBinaryString(byte, 8);

        return `${byteString.substr(0, 4)} ${byteString.substr(4)}`;
    };

    const format2ByteString = (bytes) => {
        const byteString = convertToBinaryString(bytes, 16);

        return `${byteString.substr(0, 4)} ${byteString.substr(4, 4)} - ${byteString.substr(8, 4)} ${byteString.substr(12)}`;
    };

    const format4ByteString = (bytes) => {
        const byteString = convertToBinaryString(bytes, 32);

        return `${byteString.substr(0, 4)} ${byteString.substr(4, 4)} - ${byteString.substr(8, 4)} ${byteString.substr(12, 4)} - ${byteString.substr(16, 4)} ${byteString.substr(20, 4)} - ${byteString.substr(24, 4)} ${byteString.substr(28)}`;
    };

    const testBuffer1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]); // 0001 0010 0011 0100 0101 0110 0111 1000
    const testBuffer2 = Buffer.from([119, 85, 127, 255, 256]); // 01110111 01010101 01111111 11111111 100000000

    console.log('NodeJS "buffer" examples');
    console.log('========================');
    console.log('');

    console.log('readInt8 examples');
    console.log('-----------------');
    console.log('');

    console.log('testBuffer1.readInt8()  -', formatByteString(testBuffer1.readInt8()));  // 0000 0001
    console.log('testBuffer1.readInt8(1) -', formatByteString(testBuffer1.readInt8(1))); // 0000 0010
    console.log('testBuffer1.readInt8(2) -', formatByteString(testBuffer1.readInt8(2))); // 0000 0011
    console.log('testBuffer1.readInt8(3) -', formatByteString(testBuffer1.readInt8(3))); // 0000 0100
    console.log('testBuffer1.readInt8(4) -', formatByteString(testBuffer1.readInt8(4))); // 0000 0101
    console.log('testBuffer1.readInt8(5) -', formatByteString(testBuffer1.readInt8(5))); // 0000 0110
    console.log('testBuffer1.readInt8(6) -', formatByteString(testBuffer1.readInt8(6))); // 0000 0111
    console.log('testBuffer1.readInt8(7) -', formatByteString(testBuffer1.readInt8(7))); // 0000 1000

    console.log('');

    console.log('testBuffer2.readInt8()  -', formatByteString(testBuffer2.readInt8()));  // 0000 1000
    console.log('testBuffer2.readInt8(1) -', formatByteString(testBuffer2.readInt8(1))); // 0101 0101
    console.log('testBuffer2.readInt8(2) -', formatByteString(testBuffer2.readInt8(2))); // 0111 1111
    console.log('testBuffer2.readInt8(3) -', testBuffer2.readInt8(3).toString(2));       // -1
    console.log('testBuffer2.readInt8(4) -', testBuffer2.readInt8(4).toString(2));       // 0

    console.log('');
    console.log('readUInt8 examples');
    console.log('------------------');
    console.log('');

    console.log('testBuffer1.readUInt8()  -', formatByteString(testBuffer1.readUInt8()));  // 0000 0001
    console.log('testBuffer1.readUInt8(1) -', formatByteString(testBuffer1.readUInt8(1))); // 0000 0010
    console.log('testBuffer1.readUInt8(2) -', formatByteString(testBuffer1.readUInt8(2))); // 0000 0011
    console.log('testBuffer1.readUInt8(3) -', formatByteString(testBuffer1.readUInt8(3))); // 0000 0100
    console.log('testBuffer1.readUInt8(4) -', formatByteString(testBuffer1.readUInt8(4))); // 0000 0101
    console.log('testBuffer1.readUInt8(5) -', formatByteString(testBuffer1.readUInt8(5))); // 0000 0110
    console.log('testBuffer1.readUInt8(6) -', formatByteString(testBuffer1.readUInt8(6))); // 0000 0111
    console.log('testBuffer1.readUInt8(7) -', formatByteString(testBuffer1.readUInt8(7))); // 0000 1000

    console.log('');

    console.log('testBuffer2.readUInt8()  -', formatByteString(testBuffer2.readUInt8()));  // 0111 0111
    console.log('testBuffer2.readUInt8(1) -', formatByteString(testBuffer2.readUInt8(1))); // 0101 0101
    console.log('testBuffer2.readUInt8(2) -', formatByteString(testBuffer2.readUInt8(2))); // 0111 1111
    console.log('testBuffer2.readUInt8(3) -', formatByteString(testBuffer2.readUInt8(3))); // 1111 1111

    console.log('');
    console.log('readInt16BE examples');
    console.log('--------------------');
    console.log('');

    console.log('testBuffer1.readInt16BE()  - ', format2ByteString(testBuffer1.readInt16BE()));  // 0000 0001 - 0000 0010
    console.log('testBuffer1.readInt16BE(1) - ', format2ByteString(testBuffer1.readInt16BE(1))); // 0000 0010 - 0000 0011
    console.log('testBuffer1.readInt16BE(2) - ', format2ByteString(testBuffer1.readInt16BE(2))); // 0000 0011 - 0000 0100
    console.log('testBuffer1.readInt16BE(3) - ', format2ByteString(testBuffer1.readInt16BE(3))); // 0000 0100 - 0000 0101
    console.log('testBuffer1.readInt16BE(4) - ', format2ByteString(testBuffer1.readInt16BE(4))); // 0000 0101 - 0000 0110
    console.log('testBuffer1.readInt16BE(5) - ', format2ByteString(testBuffer1.readInt16BE(5))); // 0000 0110 - 0000 0111
    console.log('testBuffer1.readInt16BE(6) - ', format2ByteString(testBuffer1.readInt16BE(6))); // 0000 0111 - 0000 1000

    console.log('');

    console.log('testBuffer2.readInt16BE()  - ', format2ByteString(testBuffer2.readInt16BE()));  // 0111 0111 - 0101 0101
    console.log('testBuffer2.readInt16BE(1) - ', format2ByteString(testBuffer2.readInt16BE(1))); // 0101 0101 - 0111 1111
    console.log('testBuffer2.readInt16BE(2) - ', format2ByteString(testBuffer2.readInt16BE(2))); // 0111 1111 - 1111 1111
    console.log('testBuffer2.readInt16BE(3) - ', testBuffer2.readInt16BE(3));                    // -256

    console.log('');
    console.log('readInt16LE examples');
    console.log('--------------------');
    console.log('');

    console.log('testBuffer1.readInt16LE()  - ', format2ByteString(testBuffer1.readInt16LE()));  // 0000 0010 - 0000 0001
    console.log('testBuffer1.readInt16LE(1) - ', format2ByteString(testBuffer1.readInt16LE(1))); // 0000 0011 - 0000 0010
    console.log('testBuffer1.readInt16LE(2) - ', format2ByteString(testBuffer1.readInt16LE(2))); // 0000 0100 - 0000 0011
    console.log('testBuffer1.readInt16LE(3) - ', format2ByteString(testBuffer1.readInt16LE(3))); // 0000 0101 - 0000 0100
    console.log('testBuffer1.readInt16LE(4) - ', format2ByteString(testBuffer1.readInt16LE(4))); // 0000 0110 - 0000 0101
    console.log('testBuffer1.readInt16LE(5) - ', format2ByteString(testBuffer1.readInt16LE(5))); // 0000 0111 - 0000 0110
    console.log('testBuffer1.readInt16LE(6) - ', format2ByteString(testBuffer1.readInt16LE(6))); // 0000 1000 - 0000 0111

    console.log('');

    console.log('testBuffer2.readInt16LE()  - ', format2ByteString(testBuffer2.readInt16LE()));  // 0101 0101 - 0111 0111
    console.log('testBuffer2.readInt16LE(1) - ', format2ByteString(testBuffer2.readInt16LE(1))); // 0111 1111 - 0101 0101
    console.log('testBuffer2.readInt16LE(2) - ', format2ByteString(testBuffer2.readInt16LE(2))); // 0000 000- - 1000 0001
    console.log('testBuffer2.readInt16LE(3) - ', format2ByteString(testBuffer2.readInt16LE(3))); // 0000 0000 - 1111 1111

    console.log('');
    console.log('readUInt16BE examples');
    console.log('---------------------');
    console.log('');

    console.log('testBuffer1.readUInt16BE()  - ', format2ByteString(testBuffer1.readUInt16BE()));  // 0000 0001 - 0000 0010
    console.log('testBuffer1.readUInt16BE(1) - ', format2ByteString(testBuffer1.readUInt16BE(1))); // 0000 0010 - 0000 0011
    console.log('testBuffer1.readUInt16BE(2) - ', format2ByteString(testBuffer1.readUInt16BE(2))); // 0000 0011 - 0000 0100
    console.log('testBuffer1.readUInt16BE(3) - ', format2ByteString(testBuffer1.readUInt16BE(3))); // 0000 0100 - 0000 0101
    console.log('testBuffer1.readUInt16BE(4) - ', format2ByteString(testBuffer1.readUInt16BE(4))); // 0000 0101 - 0000 0110
    console.log('testBuffer1.readUInt16BE(5) - ', format2ByteString(testBuffer1.readUInt16BE(5))); // 0000 0110 - 0000 0111
    console.log('testBuffer1.readUInt16BE(6) - ', format2ByteString(testBuffer1.readUInt16BE(6))); // 0000 0111 - 0000 1000

    console.log('');

    console.log('testBuffer2.readUInt16BE()  - ', format2ByteString(testBuffer2.readUInt16BE()));  // 0111 0111 - 0101 0101
    console.log('testBuffer2.readUInt16BE(1) - ', format2ByteString(testBuffer2.readUInt16BE(1))); // 0101 0101 - 0111 1111
    console.log('testBuffer2.readUInt16BE(2) - ', format2ByteString(testBuffer2.readUInt16BE(2))); // 0111 1111 - 1111 1111
    console.log('testBuffer2.readUInt16BE(3) - ', format2ByteString(testBuffer2.readUInt16BE(3))); // 1111 1111 - 0000 0000

    console.log('');
    console.log('readUInt16LE examples');
    console.log('---------------------');
    console.log('');

    console.log('testBuffer1.readUInt16LE()  - ', format2ByteString(testBuffer1.readUInt16LE()));  // 0000 0010 - 0000 0001
    console.log('testBuffer1.readUInt16LE(1) - ', format2ByteString(testBuffer1.readUInt16LE(1))); // 0000 0011 - 0000 0010
    console.log('testBuffer1.readUInt16LE(2) - ', format2ByteString(testBuffer1.readUInt16LE(2))); // 0000 0100 - 0000 0011
    console.log('testBuffer1.readUInt16LE(3) - ', format2ByteString(testBuffer1.readUInt16LE(3))); // 0000 0101 - 0000 0100
    console.log('testBuffer1.readUInt16LE(4) - ', format2ByteString(testBuffer1.readUInt16LE(4))); // 0000 0110 - 0000 0101
    console.log('testBuffer1.readUInt16LE(5) - ', format2ByteString(testBuffer1.readUInt16LE(5))); // 0000 0111 - 0000 0110
    console.log('testBuffer1.readUInt16LE(6) - ', format2ByteString(testBuffer1.readUInt16LE(6))); // 0000 1000 - 0000 0111

    console.log('');

    console.log('testBuffer2.readUInt16LE()  - ', format2ByteString(testBuffer2.readUInt16LE()));  // 0101 0101 - 0111 0111
    console.log('testBuffer2.readUInt16LE(1) - ', format2ByteString(testBuffer2.readUInt16LE(1))); // 0111 1111 - 0101 0101
    console.log('testBuffer2.readUInt16LE(2) - ', format2ByteString(testBuffer2.readUInt16LE(2))); // 1111 1111 - 0111 1111
    console.log('testBuffer2.readUInt16LE(3) - ', format2ByteString(testBuffer2.readUInt16LE(3))); // 0000 0000 - 1111 1111

    console.log('');
    console.log('readInt32BE examples');
    console.log('--------------------');
    console.log('');

    console.log('testBuffer1.readInt32BE()  - ', format4ByteString(testBuffer1.readInt32BE()));  // 0000 0001 - 0000 0010 - 0000 0011 - 0000 0100
    console.log('testBuffer1.readInt32BE(1) - ', format4ByteString(testBuffer1.readInt32BE(1))); // 0000 0010 - 0000 0011 - 0000 0100 - 0000 0101
    console.log('testBuffer1.readInt32BE(2) - ', format4ByteString(testBuffer1.readInt32BE(2))); // 0000 0011 - 0000 0100 - 0000 0101 - 0000 0110
    console.log('testBuffer1.readInt32BE(3) - ', format4ByteString(testBuffer1.readInt32BE(3))); // 0000 0100 - 0000 0101 - 0000 0110 - 0000 0111
    console.log('testBuffer1.readInt32BE(3) - ', format4ByteString(testBuffer1.readInt32BE(4))); // 0000 0101 - 0000 0110 - 0000 0111 - 0000 1000

    console.log('');

    console.log('testBuffer2.readInt32BE()  - ', format4ByteString(testBuffer2.readInt32BE()));  // 0111 0111 - 0101 0101 - 0111 1111 - 1111 1111
    console.log('testBuffer2.readInt32BE(1) - ', format4ByteString(testBuffer2.readInt32BE(1))); // 0101 0101 - 0111 1111 - 1111 1111 - 0000 0000

    console.log('');
    console.log('readInt32LE examples');
    console.log('--------------------');
    console.log('');

    console.log('testBuffer1.readInt32LE()  - ', format4ByteString(testBuffer1.readInt32LE()));  // 0000 0100 - 0000 0011 - 0000 0010 - 0000 0001
    console.log('testBuffer1.readInt32LE(1) - ', format4ByteString(testBuffer1.readInt32LE(1))); // 0000 0101 - 0000 0100 - 0000 0011 - 0000 0010
    console.log('testBuffer1.readInt32LE(2) - ', format4ByteString(testBuffer1.readInt32LE(2))); // 0000 0110 - 0000 0101 - 0000 0100 - 0000 0011
    console.log('testBuffer1.readInt32LE(3) - ', format4ByteString(testBuffer1.readInt32LE(3))); // 0000 0111 - 0000 0110 - 0000 0101 - 0000 0100
    console.log('testBuffer1.readInt32LE(3) - ', format4ByteString(testBuffer1.readInt32LE(4))); // 0000 1000 - 0000 0111 - 0000 0110 - 0000 0101

    console.log('');

    console.log('testBuffer2.readInt32LE()  - ', format4ByteString(testBuffer2.readInt32LE()));  // 0000 000- - 1000 0000 - 1010 1010 - 1000 1001
    console.log('testBuffer2.readInt32LE(1) - ', format4ByteString(testBuffer2.readInt32LE(1))); // 0000 0000 - 1111 1111 - 0111 1111 - 0101 0101

    console.log('');
    console.log('readUInt32BE examples');
    console.log('---------------------');
    console.log('');

    console.log('testBuffer1.readUInt32BE()  - ', format4ByteString(testBuffer1.readUInt32BE()));  // 0000 0001 - 0000 0010 - 0000 0011 - 0000 0100
    console.log('testBuffer1.readUInt32BE(1) - ', format4ByteString(testBuffer1.readUInt32BE(1))); // 0000 0010 - 0000 0011 - 0000 0100 - 0000 0101
    console.log('testBuffer1.readUInt32BE(2) - ', format4ByteString(testBuffer1.readUInt32BE(2))); // 0000 0011 - 0000 0100 - 0000 0101 - 0000 0110
    console.log('testBuffer1.readUInt32BE(3) - ', format4ByteString(testBuffer1.readUInt32BE(3))); // 0000 0100 - 0000 0101 - 0000 0110 - 0000 0111
    console.log('testBuffer1.readUInt32BE(3) - ', format4ByteString(testBuffer1.readUInt32BE(4))); // 0000 0101 - 0000 0110 - 0000 0111 - 0000 1000

    console.log('');

    console.log('testBuffer2.readUInt32BE()  - ', format4ByteString(testBuffer2.readUInt32BE()));  // 0111 0111 - 0101 0101 - 0111 1111 - 1111 1111
    console.log('testBuffer2.readUInt32BE(1) - ', format4ByteString(testBuffer2.readUInt32BE(1))); // 0101 0101 - 0111 1111 - 1111 1111 - 0000 0000

    console.log('');
    console.log('readUInt32LE examples');
    console.log('---------------------');
    console.log('');

    console.log('testBuffer1.readUInt32LE()  - ', format4ByteString(testBuffer1.readUInt32LE()));  // 0000 0100 - 0000 0011 - 0000 0010 - 0000 0001
    console.log('testBuffer1.readUInt32LE(1) - ', format4ByteString(testBuffer1.readUInt32LE(1))); // 0000 0101 - 0000 0100 - 0000 0011 - 0000 0010
    console.log('testBuffer1.readUInt32LE(2) - ', format4ByteString(testBuffer1.readUInt32LE(2))); // 0000 0110 - 0000 0101 - 0000 0100 - 0000 0011
    console.log('testBuffer1.readUInt32LE(3) - ', format4ByteString(testBuffer1.readUInt32LE(3))); // 0000 0111 - 0000 0110 - 0000 0101 - 0000 0100
    console.log('testBuffer1.readUInt32LE(3) - ', format4ByteString(testBuffer1.readUInt32LE(4))); // 0000 1000 - 0000 0111 - 0000 0110 - 0000 0101

    console.log('');

    console.log('testBuffer2.readUInt32LE()  - ', format4ByteString(testBuffer2.readUInt32LE()));  // 1111 1111 - 0111 1111 - 0101 0101 - 0111 0111
    console.log('testBuffer2.readUInt32LE(1) - ', format4ByteString(testBuffer2.readUInt32LE(1))); // 0000 0000 - 1111 1111 - 0111 1111 - 0101 0101

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};
