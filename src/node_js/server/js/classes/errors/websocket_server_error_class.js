class WebsocketServerErrorClass extends Error {
    constructor(statusCode = null, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, WebsocketServerErrorClass)
        }

        this.name = 'WebsocketServerError';
    }
}

module.exports = WebsocketServerErrorClass;
