'use strict';

const {JSON_MIME_TYPE} = require('./../constants/mime_types_constants');

const JSONSeverMixin = (superClass) => class extends superClass {
    _serveJSON(jsonObject) {
        const stringifiedJSON = JSON.stringify(jsonObject);

        this._addResponseHeader('Content-Type', JSON_MIME_TYPE);
        this._writeHead(200);

        this._response.end(stringifiedJSON);
    }
};

module.exports = JSONSeverMixin;