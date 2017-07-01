'use strict';

// TODO version 8 futures
const {Writable, Readable} = require('stream');

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
                console.log(`Skipping character - '${currentChar}' in stream '${this._streamName}'`);
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

    getStreamName() {
        return this._streamName;
    }
}

class ReadableStreamClass1 extends Readable {
    constructor(options) {
        super(options);

        this._streamName = options.name || undefined;
    }
}

const writableStream1 = new WritableStreamClass1({'name': 'writable_stream1'});

writableStream1.on('error', function(error) {
    console.error(`Error '${error.message}' while writing to stream ${this.getStreamName()}`);
});

writableStream1.on('finish', function() {
    console.log(`Stream '${this.getStreamName()}' finish receiving data`);
});

const writeCharacters = (writeCount, stream) => {
    let isDrained = true;

    const possibleCharacters = ['a', 'z', 'c', 'd', 'h'];
    const possibleCharactersCount = possibleCharacters.length;

    do {
        writeCount--;
        let characterToWrite = possibleCharacters[parseInt(Math.random() * possibleCharactersCount)];

        if (writeCount === 0) {
            stream.end(characterToWrite);
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

writeCharacters(100, writableStream1);

const writableStream2 = new WritableStreamClass1({'name': 'writable_stream2'});

writableStream2.on('error', function(error) {
    console.error(`Error '${error.message}' while writing to stream ${this.getStreamName()}`);
});

writableStream2.on('finish', function() {
    console.log(`Stream '${this.getStreamName()}' finish receiving data`);
});

const writeCharactersWithCork = (writeCount, stream) => {
    let isDrained = true;

    const possibleCharacters = ['a', 'z', 'c', 'd', 'h'];
    const possibleCharactersCount = possibleCharacters.length;

    stream.cork();

    do {
        writeCount--;
        let characterToWrite = possibleCharacters[parseInt(Math.random() * possibleCharactersCount)];

        if (writeCount === 0) {
            stream.end(characterToWrite);
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

writableStream2.cork();
writeCharactersWithCork(100, writableStream2);
writableStream2.uncork();

