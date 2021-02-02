'use strict';

const { JSON_MIME_TYPE } = require('../constants/data/mime_types_constants');

const ServerMixinErrorClass = require('./server_mixin_error_class');
const ReqResUtilClass = require('./utils/req_res_util_class');

class ServerResponseClass {
    #errorPageWasServed = false;

    #rawResponse = null;
    #headers = [];

    #transformStreams = [];

    #pipeTransformStreams(sourceStream) {
        return this.#transformStreams.reduce((currentStream, nextStream) => {
            return currentStream.pipe(nextStream);
        }, sourceStream).pipe(this.#rawResponse);
    }

    #bindEventHandlers() {
    }

    clearResponseHeaders() {
        this.#headers = [];
    }

    async destroy() {
        if (this.#rawResponse.socket !== undefined && this.#rawResponse.socket !== null) {
            this.#rawResponse.socket.destroy();
        }

        this.#rawResponse = null;
        this.#headers = [];

        this.#transformStreams = [];
    }

    addTransformStream(transformStream) {
        this.#transformStreams.push(transformStream);
    }

    addResponseHeader(headerName, headerValue, override = true) {
        let headerIndex = -1;
        const normalizedHeaderName = headerName.toLowerCase();

        if (override) {
            headerIndex = this.#headers.findIndex(header => {
                return header[0] === normalizedHeaderName;
            });
        }

        if (headerIndex === -1) {
            this.#headers.push([normalizedHeaderName, headerValue])
        } else {
            this.#headers[headerIndex][1] = headerValue;
        }
    }

    addResponseHeaders(responseHeaders) {
        for (const headerName in responseHeaders) {
            this.addResponseHeader(headerName, responseHeaders[headerName]);
        }
    }

    writeHead(statusCode) {
        this.#rawResponse.writeHead(statusCode, this.#headers);
    };

    writeData(data) {
        this.#rawResponse.write(data);
    }

    pipeFrom(readableStream) {
        return this.#pipeTransformStreams(readableStream);
    }

    serveEmptyResponse(code = 200) {
        this.writeHead(code);
        this.#rawResponse.end();
    }

    serveErrorPage(code = 500, error = '') {
        if (this.#errorPageWasServed) {
            return;
        }

        const textMIMEType = ReqResUtilClass.findMIMETypeByFileExtension('txt');

        this.addResponseHeader('Content-Type', textMIMEType);
        this.writeHead(code);

        let errorMessage = '';

        if (typeof error === 'object') {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        this.#rawResponse.end(errorMessage);
    }

    serveJSON(jsonObject) {
        const stringifiedJSON = JSON.stringify(jsonObject);

        this.addResponseHeader('Content-Type', JSON_MIME_TYPE);
        this.writeHead(200);

        this.#rawResponse.end(stringifiedJSON);
    }

    async serverDataByURLParams(serverProxy, routeParamsObj) {
        if(!routeParamsObj.handler || typeof routeParamsObj.handler !== 'function') {
            throw new ServerMixinErrorClass(404, 'Route handler function not found');
        }

        await routeParamsObj.handler(serverProxy);
    };

    getResponseHeaderIndexByNameValue(headerName, headerValue) {
        const normalizedHeaderName = headerName.toLowerCase();

        return this.#headers.findIndex(headerArr => {
            return headerArr[0] === normalizedHeaderName && headerArr[1] === headerValue;
        });
    }

    getResponseHeaderByNameValue(headerName, headerValue) {
        const normalizedHeaderName = headerName.toLowerCase();

        return this.#headers.find(headerArr => {
            return headerArr[0] === normalizedHeaderName && headerArr[1] === headerValue;
        });
    }

    get rawResponse() {
        return this.#rawResponse;
    }

    get headers() {
        return this.#headers;
    }

    setResponseHeaderValueAtIndex(headerIndex, headerValue) {
        this.#headers[headerIndex][1] = headerValue;
    }

    set rawResponse(rawResponse) {
        this.#rawResponse = rawResponse;
    }

    set headers(headers) {
        this.#headers = headers;
    }

    constructor(rawResponse) {
        this.#rawResponse = rawResponse ?? null;

        this.#bindEventHandlers();
    }
}

module.exports = ServerResponseClass;
