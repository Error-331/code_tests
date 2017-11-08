'use strict';

const calcBuffersLength = (dataBuffers = []) => dataBuffers.reduce((buffersLength, dataBuffer) => buffersLength + dataBuffer.length, 0);
const concatBuffers = (dataBuffers = []) => Buffer.concat(dataBuffers, calcBuffersLength(dataBuffers));

module.exports.calcBuffersLength = calcBuffersLength;
module.exports.concatBuffers = concatBuffers;