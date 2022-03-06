const ServerErrorClass = require('./server_error_class');

class WebsocketServerErrorClass extends ServerErrorClass {
    constructor(statusCode = null, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, WebsocketServerErrorClass)
        }

        this.name = 'WebsocketServerError';
        this.statusCode = statusCode;
    }
}

module.exports = WebsocketServerErrorClass;
