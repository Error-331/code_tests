class ServerErrorClass extends Error {
    constructor(code = null, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerErrorClass)
        }

        this.name = 'ServerError';
        this.code = code;
    }
}

module.exports = ServerErrorClass;
