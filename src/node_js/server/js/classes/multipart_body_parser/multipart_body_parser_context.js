const EventEmitter = require('events');

const {
    MB_PARSER_INITIAL_STATE,
    MB_PARSER_SEEK_BOUNDARY_HEADERS_END_STATE,
} = require('./../../constants/multipart_body_parser/state_constants');

const {
    MB_PARSER_CRLF,
    MB_PARSER_HEADERS_END_INDEX,

    MB_PARSER_BOUNDARY_INDEX_TEST_FUNC,
    MB_PARSER_BODY_BOUNDARY_INDEX_TEST_FUNC,
    MB_PARSER_FINAL_BOUNDARY_INDEX_TEST_FUNC,
} = require('./../../constants/multipart_body_parser/test_string_rules_constants');

const {
    MB_PARSER_PREAMBLE_FOUND,

    MB_PARSER_INITIAL_BOUNDARY_FOUND,
    MB_PARSER_NEXT_OR_FINAL_BOUNDARY_FOUND,
    MB_PARSER_BOUNDARY_FOUND,
    MB_PARSER_FINAL_BOUNDARY_FOUND,

    MB_PARSER_BOUNDARY_HEADERS_START_FOUND,
    MB_PARSER_BOUNDARY_HEADERS_END_FOUND,
    MB_PARSER_BOUNDARY_HEADERS_FOUND,

    MB_PARSER_BODY_PART_FOUND,
    MB_PARSER_BODY_PARSED,
} = require('./../../constants/multipart_body_parser/parser_events_constants');

const MultipartBodyParserDictionaryClass = require('./multipart_body_parser_dictionary_class');

// https://brianray-7981.medium.com/tutorial-write-a-finite-state-machine-to-parse-a-custom-language-in-pure-python-1c11ade9bd43
class MultipartBodyParserContext extends EventEmitter {
    #request = null;
    #stateName = null;

    #boundaryString = null;
    #preamble = null;

    #stringChunks = [];
    #stringChunksLengths = [];

    #combinedChunksString = '';
    #combinedChunksStringLength = 0;
    #combinedChunksStringIndex = 0;

    constructor(request) {
        super();

        this.#request = request;
        this.#stateName = MB_PARSER_INITIAL_STATE;
    }

    #resetChunkData() {
        this.#stringChunks = [];
        this.#stringChunksLengths = [];

        this.#combinedChunksString = '';
        this.#combinedChunksStringLength = 0;
        this.#combinedChunksStringIndex = 0;
    }

    #trimChunkData() {
        if (this.#stringChunks.length <= 0) {
            return null;
        }

        let chunkIndex = 0;

        while (chunkIndex < this.#stringChunks.length - 1) {
            const currentChunkLength = this.#stringChunksLengths[chunkIndex];

            if (this.#combinedChunksStringIndex >= currentChunkLength) {
                this.#stringChunks.shift();
                this.#stringChunksLengths.shift();

                this.#combinedChunksString = this.#combinedChunksString.substr(currentChunkLength);
                this.#combinedChunksStringLength = this.#combinedChunksString.length;
                this.#combinedChunksStringIndex = this.#combinedChunksStringIndex - currentChunkLength;

            } else {
                chunkIndex += 1;
            }
        }
    }

    #storeDataChunk(dataChunk) {
        const dataChunkString = dataChunk.toString();
        const dataChunkLength = dataChunkString.length;

        this.#stringChunks.push(dataChunkString);
        this.#stringChunksLengths.push(dataChunkLength);

        this.#combinedChunksString = this.#combinedChunksString.concat(dataChunkString);
        this.#combinedChunksStringLength = this.#combinedChunksString.length;
    }

    #redistributeStringData() {
        if (this.#stateName !==  MB_PARSER_SEEK_BOUNDARY_HEADERS_END_STATE) {
            return null;
        }

        this.#trimChunkData();

        if (this.#combinedChunksStringIndex === this.#combinedChunksStringLength - 1) {
            this.#resetChunkData();

            return null;
        }

        if (this.#stringChunks.length <= 1) {
            return null;
        }

        const currentChunkIndex = this.#currentChunkIndex;
        const combinedChunksLengthAfter = this.#getCombinedChunksLengthFrom(currentChunkIndex + 1);

        if (combinedChunksLengthAfter >= this.#finalBoundaryLength) {
            const newChunkIndex = (this.#combinedChunksStringLength - combinedChunksLengthAfter);

            this.#stringChunks.shift();
            this.#stringChunksLengths.shift();

            this.#combinedChunksString = this.#combinedChunksString.substr(newChunkIndex);
            this.#combinedChunksStringLength = this.#combinedChunksString.length;
            this.#combinedChunksStringIndex = this.#combinedChunksStringIndex - newChunkIndex;
        }
    }

    #parseBoundaryHeader() {
        const contentTypeHeader = this.#request.headers['content-type'];
        if (contentTypeHeader === null || contentTypeHeader === undefined) {
            throw new Error('Cannot find "content-type" header, POST boundary is not parsable');
        }

        const contentTypeHeaderParts = contentTypeHeader.split(';');

        if (contentTypeHeaderParts.length < 2) {
            throw new Error('Incorrect "content-type" for multipart POST request');
        }

        const contentMime = contentTypeHeaderParts[0];
        if (contentMime.toLowerCase() !== 'multipart/form-data') {
            throw new Error(`Incorrect MIME type (${contentMime}) provided in "content-type" header`);
        }

        const contentBoundary = contentTypeHeaderParts[1]
            .trim()
            .replace('boundary=', '')
            .trim();

        if (contentBoundary.length < 3 || contentBoundary.indexOf('--') !== 0) {
            throw new Error(`Incorrect content boundary: "${contentBoundary}"`);
        }

        this.#boundaryString = contentBoundary;
    }

    #emitData(eventName, startPos, chunkLength) {
        const endPos = startPos + chunkLength;
        const chunk = this.#combinedChunksString.substr(startPos, chunkLength);

        this.emit(eventName, startPos, endPos, chunk);
    }

    #transitToNewState(stateVariant = null, chunkStartPos = null, chunkLength) {
        chunkStartPos = chunkStartPos === null || chunkStartPos === undefined ? this.#combinedChunksStringIndex : chunkStartPos;

        this.#combinedChunksStringIndex = chunkStartPos + chunkLength;
        this.#setNewState(stateVariant);
    }

    transitToInitialBoundaryFound() {
        const boundaryIndexStart = this.testInitialBoundary();

        if (boundaryIndexStart > 0) {
            this.#preamble = this.#combinedChunksString.substr(this.#combinedChunksStringIndex, boundaryIndexStart);

            this.#emitData(MB_PARSER_PREAMBLE_FOUND, this.#combinedChunksStringIndex, this.#preamble.length);
            this.#emitData(MB_PARSER_INITIAL_BOUNDARY_FOUND, this.#preamble.length, this.#boundaryLength);

            this.#transitToNewState(null, 0, this.#preamble.length + this.#boundaryLength);

            return true;
        } else {
            this.#emitData(MB_PARSER_INITIAL_BOUNDARY_FOUND, this.#combinedChunksStringIndex, this.#initialBoundaryLength);
            this.#transitToNewState(null, this.#combinedChunksStringIndex, this.#initialBoundaryLength);
            return true;
        }
    }

    transitToHeadersStartFound() {
        this.#emitData(MB_PARSER_BOUNDARY_HEADERS_START_FOUND, this.#combinedChunksStringIndex, this.#crlfLength);
        this.#transitToNewState(null, this.#combinedChunksStringIndex, this.#crlfLength);

        return true;
    }

    transitToHeadersEndFound() {
        const headersEndPos = this.testHeadersEnd();

        const headersLength = headersEndPos - this.#combinedChunksStringIndex;

        this.#emitData(MB_PARSER_BOUNDARY_HEADERS_FOUND, this.#combinedChunksStringIndex, headersLength);
        this.#emitData(MB_PARSER_BOUNDARY_HEADERS_END_FOUND, headersEndPos, MB_PARSER_HEADERS_END_INDEX.length);

        this.#transitToNewState(null, headersEndPos, MB_PARSER_HEADERS_END_INDEX.length);

        return true;
    }

    transitToNextOrEndBoundary() {
        const nextBoundaryIndex = this.testNextOrEndBoundary();
        const currentStringIndex = this.#combinedChunksStringIndex;

        this.#emitData(MB_PARSER_NEXT_OR_FINAL_BOUNDARY_FOUND, nextBoundaryIndex, this.#boundaryLength);
        this.#transitToNewState(2, null, this.#boundaryLength);

        this.#combinedChunksStringIndex = currentStringIndex;

        if (((this.#combinedChunksStringIndex + this.#boundaryLength) === this.#combinedChunksStringLength)) {
            return false;
        }

        const finalBoundaryIndex = this.#combinedChunksString.indexOf(this.#finalBoundary, this.#combinedChunksStringIndex);

        if (finalBoundaryIndex !== -1 && nextBoundaryIndex === finalBoundaryIndex) {
            this.#emitData(MB_PARSER_BODY_PART_FOUND, this.#combinedChunksStringIndex, finalBoundaryIndex - this.#combinedChunksStringIndex);
            this.#emitData(MB_PARSER_FINAL_BOUNDARY_FOUND, finalBoundaryIndex, this.#finalBoundaryLength);

            this.#transitToNewState(1, finalBoundaryIndex, this.#finalBoundaryLength);

            return true;
        } else {
            this.#emitData(MB_PARSER_BODY_PART_FOUND, this.#combinedChunksStringIndex, nextBoundaryIndex - this.#combinedChunksStringIndex);
            this.#emitData(MB_PARSER_BOUNDARY_FOUND, nextBoundaryIndex, this.#boundaryLength);

            this.#transitToNewState(0, nextBoundaryIndex, this.#boundaryLength);

            return true;
        }
    }

    transitToContentParsed() {
        return false;
    }

    testInitialBoundary() {
        return this.#combinedChunksString.indexOf(this.#initialBoundary, this.#combinedChunksStringIndex);
    }

    testHeadersStart() {
        return this.#combinedChunksString.indexOf(this.#crlf, this.#combinedChunksStringIndex);
    }

    testHeadersEnd() {
        return this.#combinedChunksString.indexOf(MB_PARSER_HEADERS_END_INDEX, this.#combinedChunksStringIndex);
    }

    testNextOrEndBoundary() {
        return this.#combinedChunksString.indexOf(this.#boundary, this.#combinedChunksStringIndex);
    }

    testContentParsed() {
        return -1;
    }

    #parseNext() {
        if (this.#combinedChunksStringIndex === this.#combinedChunksString.length - 1) {
            return;
        }

        const stateTransitionData = MultipartBodyParserDictionaryClass.findTransitionByState(this.#stateName);

        if (stateTransitionData === null || stateTransitionData === undefined) {
            throw new Error(`Cannot find state data for "${this.#stateName}"`);
        }

        if (stateTransitionData.test(this) !== -1 && stateTransitionData.transit(this)) {
            this.#parseNext()
        }
    }

    #getCombinedChunksLengthFrom(chunkIndexFrom) {
        let chunksLengthsSum = 0;

        while (chunkIndexFrom < this.#stringChunksLengths.length) {
            chunksLengthsSum += this.#stringChunksLengths[chunkIndexFrom];

            chunkIndexFrom += 1;
        }

        return chunksLengthsSum;
    }

    #setNewState(stateVariant) {
        if (typeof stateVariant === 'number') {
            const stateTransitionData = MultipartBodyParserDictionaryClass.findTransitionByState(this.#stateName);
            this.#stateName = stateTransitionData.dist[stateVariant];
        } else if (typeof stateVariant === 'string') {
            this.#stateName = stateVariant;
        } else {
            const stateTransitionData = MultipartBodyParserDictionaryClass.findTransitionByState(this.#stateName);
            this.#stateName = stateTransitionData.dist;
        }
    }

    get #crlf() {
        return MB_PARSER_CRLF;
    }

    get #initialBoundary() {
        return MB_PARSER_BOUNDARY_INDEX_TEST_FUNC(this.#boundaryString);
    }

    get #boundary() {
        return MB_PARSER_BODY_BOUNDARY_INDEX_TEST_FUNC(this.#boundaryString);
    }

    get #finalBoundary () {
        return MB_PARSER_FINAL_BOUNDARY_INDEX_TEST_FUNC(this.#boundaryString);
    }

    get #crlfLength() {
        return this.#crlf.length;
    }

    get #initialBoundaryLength() {
        return this.#initialBoundary.length;
    }

    get #boundaryLength() {
        return this.#boundary.length;
    }

    get #finalBoundaryLength() {
        return this.#finalBoundary.length;
    }

    get #currentChunkIndex() {
        let chunkIndex = 0;

        while (chunkIndex < this.#stringChunksLengths.length) {
            if (this.#combinedChunksStringIndex <= this.#stringChunksLengths[chunkIndex] - 1) {
                return chunkIndex;
            }

            chunkIndex += 1;
        }

        throw new Error(`Cannot find current chunk index of ${this.#stringChunksLengths.length} chunks )`);
    }

    async parse() {
        this.#parseBoundaryHeader();

        this.#request.on('data', postDataChunk => {
            this.#storeDataChunk(postDataChunk);
            this.#parseNext();
            this.#redistributeStringData();
        });

        this.#request.on('end', () => {
            this.emit(MB_PARSER_BODY_PARSED);
        })
    }
}

module.exports = MultipartBodyParserContext;
