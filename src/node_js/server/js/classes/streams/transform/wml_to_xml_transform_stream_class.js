'use strict';

const { Transform } = require('stream');

class WMLToXMLTransformStreamClass extends Transform {
    #serverProxy = null;

    _transform(data, encoding, callback) {
        console.log('wml trnsform', data);
        this.push(data);
        callback();
    };

    _flush(callback) {
        callback();
    }

    constructor(options, serverProxy) {
        super(options, serverProxy);

        this.#serverProxy = serverProxy;
    }
}

module.exports = WMLToXMLTransformStreamClass;