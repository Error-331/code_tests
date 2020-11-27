class ServerMixinErrorClass extends Error {
    constructor(httpResponseCode = 500, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerMixinErrorClass)
        }

        this.httpResponseCode = httpResponseCode;
    }
}

module.exports = ServerMixinErrorClass;
