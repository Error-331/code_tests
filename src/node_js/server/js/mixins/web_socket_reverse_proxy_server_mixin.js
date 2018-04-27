'use strict';

const {generateSHA1} = require('./../utils/crypto_utils');

const WebSocketReverseProxyServerMixin = (superClass) => class extends superClass {

    _writeHead(statusCode) {
        const protocolString = this._getProtocol().toUpperCase();
        const protocolVersionString = this._getProtocolVersion();
        const statusCodeString = this._getStatusCodeString(statusCode);

        this._response.write(`${protocolString}/${protocolVersionString} ${statusCode} ${statusCodeString}\r\n`, 'binary');

        const responseHeaders = this._getResponseHeaders();
        responseHeaders.forEach(([headerName, headerValue]) =>  this._response.write(`${headerName}:${headerValue}\r\n`, 'binary'));

        this._response.write('\r\n');
    };

    _isWebSocketOpenRequest() {
        const secWebSocketKeyHeader = this._getRequestHeader('sec-websocket-key');
        const secWebSocketVersionHeader = this._getRequestHeader('sec-websocket-version');
        const secWebSocketExtensionsHeader = this._getRequestHeader('sec-websocket-extensions');
        const upgradeHeader = this._getRequestHeader('upgrade');

        if (typeof upgradeHeader !== 'string') {
            return false;
        }

        return secWebSocketKeyHeader && secWebSocketVersionHeader && secWebSocketExtensionsHeader && upgradeHeader && upgradeHeader.toLocaleLowerCase() === 'websocket';
    }

    // TODO: Sec-WebSocket-Protocol
    _performHandshake() {
        this._secWebSocketKeyClient = this._getRequestHeader('sec-websocket-key');
        this._secWebSocketVersion = parseInt(this._getRequestHeader('sec-websocket-version'));
        this._secWebSocketExtension = this._getRequestHeader('sec-websocket-extensions');

        const guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
        const responseKey = `${this._secWebSocketKeyClient}${guid}`;

        const responseKeyBase64 = generateSHA1(responseKey, 'base64');

        this._addResponseHeader('Sec-WebSocket-Accept', responseKeyBase64);
        this._addResponseHeader('Upgrade', 'websocket');
        this._addResponseHeader('Connection', 'Upgrade');

        this._writeHead(101);
    }

    async onHandleUpgradeRequest() {
        if (!this._isWebSocketOpenRequest()) {
            this._serveErrorPage(400, new Error('Invalid "upgrade" request'));
            return this._request.connection.destroy();
        }

        this._performHandshake();
    }

    constructor(...serverParams) {
        super(...serverParams);

        this._secWebSocketKeyClient = null;
        this._secWebSocketVersion = null;
        this._secWebSocketExtension = null;
    }
};

module.exports = WebSocketReverseProxyServerMixin;