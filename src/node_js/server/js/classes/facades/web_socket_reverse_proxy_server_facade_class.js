'use strict';

const { generateSHA1 } = require('../../utils/crypto_utils');
const ServerFacadeClass = require('./server_facade_class');

class WebSocketReverseProxyServerFacadeClass extends ServerFacadeClass {
    #secWebSocketKeyClient = null;
    #secWebSocketVersion = null;
    #secWebSocketExtension = null;

    #writeHead(statusCode) {
        const protocolString = this.server.protocol.toUpperCase();
        const protocolVersionString = this.server.protocolVersion;
        const statusCodeString = this.server.getStatusCodeString(statusCode);

        this.server.response.write(`${protocolString}/${protocolVersionString} ${statusCode} ${statusCodeString}\r\n`, 'binary');

        const responseHeaders = this.server.response.headers;
        responseHeaders.forEach(([headerName, headerValue]) =>  this.server.response.write(`${headerName}:${headerValue}\r\n`, 'binary'));

        this.server.response.write('\r\n');
    };

    // TODO: Sec-WebSocket-Protocol
    #performHandshake() {
        this.#secWebSocketKeyClient = this.server.request.getHeader('sec-websocket-key');
        this.#secWebSocketVersion = parseInt(this.server.request.getHeader('sec-websocket-version'));
        this.#secWebSocketExtension = this.server.request.getHeader('sec-websocket-extensions');

        const guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
        const responseKey = `${this.#secWebSocketKeyClient}${guid}`;

        const responseKeyBase64 = generateSHA1(responseKey, 'base64');

        this.server.response.addResponseHeader('Sec-WebSocket-Accept', responseKeyBase64);
        this.server.response.addResponseHeader('Upgrade', 'websocket');
        this.server.response.addResponseHeader('Connection', 'Upgrade');

        this.#writeHead(101);
    }

    async onHandleUpgradeRequest() {
        if (!this.isWebSocketOpenRequest) {
            this.server.response.serveErrorPage(400, new Error('Invalid "upgrade" request'));
            // TODO: fixme
            return this.server.request.rawRequest.connection.destroy();
        }

        this.#performHandshake();
    }

    get isWebSocketOpenRequest() {
        const upgradeHeader = this.server.request.getHeader('upgrade');

        if (typeof upgradeHeader !== 'string') {
            return false;
        }

        return this.server.request.getHeader('sec-websocket-key') &&
            this.server.request.getHeader('sec-websocket-version') &&
            this.server.request.getHeader('sec-websocket-extensions') &&
            upgradeHeader &&
            upgradeHeader.toLocaleLowerCase() === 'websocket';
    }

    get secWebSocketKeyClient() {
        return this.#secWebSocketKeyClient;
    }

    get secWebSocketVersion() {
        return this.#secWebSocketVersion;
    }

    get secWebSocketExtension() {
        return this.#secWebSocketExtension;
    }
}

module.exports = WebSocketReverseProxyServerFacadeClass;
