'use strict';

const ServerMixinErrorClass = require('./server_mixin_error_class');

const { getMIMETypeForFileExtension } = require('./../utils/server_request_utils');

const { JSON_MIME_TYPE } = require('./../constants/mime_types_constants');

class ServerResponseClass {
    #errorPageWasServed = false;

    #rawResponse = null;
    #responseHeaders = [];

    clearResponseHeaders() {
        this.#responseHeaders = [];
    }

    addResponseHeader(headerName, headerValue, override = true) {
        let headerIndex = -1;
        const normalizedHeaderName = headerName.toLowerCase();

        if (override) {
            headerIndex = this.#responseHeaders.findIndex(header => {
                return header[0] === normalizedHeaderName;
            });
        }

        if (headerIndex === -1) {
            this.#responseHeaders.push([normalizedHeaderName, headerValue])
        } else {
            this.#responseHeaders[headerIndex][1] = headerValue;
        }
    }

    addResponseHeaders(responseHeaders) {
        for (const headerName in responseHeaders) {
            this.addResponseHeader(headerName, responseHeaders[headerName]);
        }
    }

    writeHead(statusCode) {
        this.#rawResponse.writeHead(statusCode, this.#responseHeaders);
    };

    serveEmptyResponse(code = 200) {
        this.writeHead(code);
        this.#rawResponse.end();
    }

    serveErrorPage(code = 500, error = '') {
        if (this.#errorPageWasServed) {
            return;
        }

        const textMIMEType = getMIMETypeForFileExtension('txt');

        this.addResponseHeader('Content-Type', textMIMEType);
        this.writeHead(code);

        let errorMessage = '';

        if (typeof error === 'object') {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        this.#rawResponse.end(errorMessage);
        console.error(errorMessage);
    }

    serveJSON(jsonObject) {
        const stringifiedJSON = JSON.stringify(jsonObject);

        this.addResponseHeader('Content-Type', JSON_MIME_TYPE);
        this.writeHead(200);

        this.#rawResponse.end(stringifiedJSON);
    }

    async serverDataByURLParams(routeParamsObj) {
        if(!routeParamsObj.handler || typeof routeParamsObj.handler !== 'function') {
            return this.serveErrorPage(404, 'Route handler function not found');
        }

        try {
            await routeParamsObj.handler.call(this);
        } catch(error) {
            if (error instanceof ServerMixinErrorClass) {
                return this.serveErrorPage(error.httpResponseCode, error);
            } else {
                return this.serveErrorPage(500, error);
            }
        }
    };

    getResponseHeaderIndexByNameValue(headerName, headerValue) {
        const normalizedHeaderName = headerName.toLowerCase();

        return this.#responseHeaders.findIndex(headerArr => {
            return headerArr[0] === normalizedHeaderName && headerArr[1] === headerValue;
        });
    }

    getResponseHeaderByNameValue(headerName, headerValue) {
        const normalizedHeaderName = headerName.toLowerCase();

        return this.#responseHeaders.find(headerArr => {
            return headerArr[0] === normalizedHeaderName && headerArr[1] === headerValue;
        });
    }

    get rawResponse() {
        return this.#rawResponse;
    }

    get responseHeaders() {
        return this.#responseHeaders;
    }

    setResponseHeaderValueAtIndex(headerIndex, headerValue) {
        this.#responseHeaders[headerIndex][1] = headerValue;
    }

    set responseHeaders(responseHeaders) {
        this.#rawResponse = responseHeaders;
    }

    constructor(rawResponse) {
        this.#rawResponse = rawResponse;
    }
}

module.exports = ServerResponseClass;
