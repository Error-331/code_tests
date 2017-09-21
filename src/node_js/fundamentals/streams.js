'use strict';

// https://blog.yld.io/2016/01/13/using-streams/#.WcObkWdqxhH

const {Writable, Readable} = require('stream');

// stream classes definition
class WritableStreamClass1 extends Writable {
    constructor(options) {
        super(options);

        this._streamName = options.name || undefined;

        this._sourceMock = [];
        this._acceptedCharacters = ['a', 'h', 'z'];
    }

    _writev(chunks, callback) {
        const charsToWrite = [];

        for (let chunkElm of chunks) {
            const currentChar = chunkElm.chunk.toString();

            if (this._acceptedCharacters.indexOf(currentChar) === -1) {
                return callback(new Error(`Invalid character - '${currentChar}' in stream '${this._streamName}'`));
            } else {
                console.log(`Saving '${currentChar}' in stream '${this._streamName}'`);
                charsToWrite.push(currentChar);
            }
        }

        this._sourceMock = charsToWrite.slice();
        callback(null);
    }

    _write(chunk, encoding, callback) {
        const currentChar = chunk.toString();

        if (this._acceptedCharacters.indexOf(currentChar) === -1) {
            callback(new Error(`Invalid character - '${currentChar}' in stream '${this._streamName}'`));
        } else {
            console.log(`Write character '${currentChar}' to stream '${this._streamName}'`);

            this._sourceMock.push(currentChar);
            callback(null);
        }
    }

    _final(callback) {
        console.log(`Stream '${this._streamName}' final handler called`);
        callback();
    }

    _destroy(error, callback) {
        if (error && error !== null) {
            console.log(`Stream '${this._streamName}' destroyed with followng error - '${error.message}'`);
            callback(error);
        } else {
            callback();
        }
    }

    getStreamName() {
        return this._streamName;
    }
}

class ReadableStreamClass1 extends Readable {
    constructor(options) {
        super(options);

        this._streamName = options.name || undefined;
        this._bytesRead = 0;
        this._maxPerRead = 100;

        this._possibleCharacters = ['a', 'z', 'c', 'd', 'h'];
        this._possibleCharactersCount = this._possibleCharacters.length;
    }

    _getRandomCharacters() {
        return this._possibleCharacters[parseInt(Math.random() * this._possibleCharactersCount)];
    }

    _getStringToWright(size = 0) {
        let stringToWright = [];

        for (let charCount = 0; charCount < size; charCount++) {
            stringToWright.push(this._getRandomCharacters());
        }

        return stringToWright.join('');
    }

    _read(size = 0) {
        if (size === 0) {
            return this.push(null);
        }

        let stringToWright = '';

        do {
            if (this._bytesRead >= size * 3) {
                stringToWright = null;
            } else {
                stringToWright = this._getStringToWright(parseInt(Math.random() * this._maxPerRead));
                this._bytesRead += stringToWright.length;
            }
        } while(this.push(stringToWright))
    }

    getStreamName() {
        return this._streamName;
    }
}

// helper functions definitions
const writeCharacters1 = (writeCount, stream, useCork = false) => {
    let isDrained = true;

    const possibleCharacters = ['a', 'z', 'c', 'd', 'h'];
    const possibleCharactersCount = possibleCharacters.length;

    if (useCork) {
        stream.cork();
    }

    do {
        writeCount--;
        let characterToWrite = possibleCharacters[parseInt(Math.random() * possibleCharactersCount)];

        if (writeCount === 0) {
            if (useCork) {
                stream.write(characterToWrite);
                stream.uncork();
            } else {
                stream.end(characterToWrite);
            }
        } else {
            isDrained = stream.write(characterToWrite);
        }

    } while (writeCount > 0 && isDrained);

    if (writeCount > 0) {
        stream.once('drain', () => {
            console.log(`'${stream.getStreamName()}' drained`);
            writeCharacters(writeCount, stream)
        });
    }
};

module.exports = async () => {
    console.log('NodeJS streams examples');
    console.log('=======================');
    console.log('');

    console.log('Writable stream example:');
    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        const writableStream1 = new WritableStreamClass1({'name': 'writable_stream1'});

        writableStream1.on('close', function() {
            console.log('close');
        });

        writableStream1.on('error', function(error) {
            console.error(`Error "${error.message}" while writing to stream ${this.getStreamName()}`);
        });

        writableStream1.on('finish', function() {
            console.log(`Stream "${this.getStreamName()}" finish receiving data`);

            writableStream1.destroy(new Error('test error for destroy'));
            setTimeout(_ => resolvePromise(), 2000);
        });

        writeCharacters1(100, writableStream1);
    });

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');

    console.log('Writable stream (with cork) example:');
    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        const writableStream2 = new WritableStreamClass1({'name': 'writable_stream2'});

        writableStream2.on('error', function(error) {
            console.error(`Error "${error.message}" while writing to stream ${this.getStreamName()}`);
            setTimeout(_ => resolvePromise(), 2000);
        });

        writableStream2.on('finish', function() {
            console.log(`Stream "${this.getStreamName()}" finish receiving data`);
            setTimeout(_ => resolvePromise(), 2000);
        });


        writeCharacters1(1500, writableStream2, true);
    });

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');

    console.log('Readable stream (pull) example:');
    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        const readablePullStream1 = new ReadableStreamClass1({'name': 'readable_pull_stream1'});

        readablePullStream1.on('readable', () => {
            let dataChunk;

            while(null !== (dataChunk = readablePullStream1.read())) {
                console.log(`Received ${dataChunk.length} bytes of data.`);
            }

            resolvePromise();
        });
    });

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');

    console.log('Readable stream (push) example:');
    console.log('');

    await new Promise((resolvePromise, rejectPromise) => {
        const readablePushStream1 = new ReadableStreamClass1({'name': 'readable_push_stream1'});

        let readCount = 0;
        const readCountBeforePause = 500;

        readablePushStream1.on('end', function() {
            console.log(`Stream "${this.getStreamName()}" finish pushing data`);
            setTimeout(_ => resolvePromise(), 2000);
        });


        readablePushStream1.on('data', function(dataChunk) {
            console.log(`Received ${dataChunk.length} bytes of data.`);
            readCount++;

            if (readCount === readCountBeforePause) {
                readablePushStream1.pause();

                console.log('');
                console.log(`Stream "${this.getStreamName()}" has been paused...`);
                console.log('');

                setTimeout(_ => {
                    console.log('');
                    console.log(`Stream "${this.getStreamName()}" has been resumed...`);
                    console.log('');

                    readablePushStream1.resume()
                }, 3000);
            }
        });
    });

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};



