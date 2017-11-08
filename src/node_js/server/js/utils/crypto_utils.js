'use strict';

const crypto = require('crypto');

const generateGUID = () => {
    const rndHexString = crypto.randomBytes(16).toString('hex');
    return `${rndHexString.substring(0,8)}-${rndHexString.substring(8,12)}-${rndHexString.substring(12,16)}-${rndHexString.substring(16,20)}-${rndHexString.substring(20)}`.toLocaleUpperCase();
};

const generateSHA1 = (data, digest = 'hex') => {
    const hashGenerator = crypto.createHash('sha1');
    return hashGenerator.update(data).digest(digest);
};

const encodeStringToBase64 = (data) => {
    const bufferInstance = new Buffer(data);
    return bufferInstance.toString('base64');
};

const decodeBase64 = (data, encoding = 'utf8') => {
    const bufferInstance = new Buffer(data, 'base64');
    return bufferInstance.toString(encoding);
};

module.exports.generateGUID = generateGUID;
module.exports.generateSHA1 = generateSHA1;
module.exports.encodeStringToBase64 = encodeStringToBase64;
module.exports.decodeBase64 = decodeBase64;