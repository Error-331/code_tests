'use strict';

const fs = require('fs');

const {
    parseURLPathParams,
    extractFileExtensionFromPathParams,
    extractFileNameFromPathParams,
    getMIMETypeForFileExtension
} = require('./../utils/server_request_utils');

const ServerMixinErrorClass = require('./../classes/server_mixin_error_class');

const StaticServerMixin = (superClass) => class extends superClass {
    _preparePathToFile(pathParams) {
        pathParams = pathParams.slice();

        const fileName = extractFileNameFromPathParams(pathParams);
        const fileExtension = extractFileExtensionFromPathParams(pathParams);

        pathParams.pop();

        const pathParamsCopyNormalized = pathParams.map(pathParam => pathParam.toLocaleLowerCase());
        const pathToDirectory = pathParamsCopyNormalized.length > 0 ? `/${pathParamsCopyNormalized.join('/')}/` : '/';

        let pathToFile;

        if (fileExtension === 'html') {
            pathToFile = `${this._serverRootDir}/${this._getHTMLPagesDirectoryPath()}${pathToDirectory}${fileName}.${fileExtension}`;
        } else {
            pathToFile = `${this._serverRootDir}/${this._getResourcesDirectoryPath()}${pathToDirectory}${fileName}.${fileExtension}`;
        }

        return pathToFile;
    }

    _serveFile(pathToFile, fileMIMEType) {
        return new Promise((resolve, reject) => {
            this._addResponseHeader('Content-Type', fileMIMEType);
            this._writeHead(200);

            const staticFileStream = fs.createReadStream(pathToFile, {
                flags: 'r',
                autoClose: true
            });

            staticFileStream.on('close', () => {
                resolve();
            });

            staticFileStream.on('error', (error) => {
                const isENOENT = error.code === 'ENOENT';

                const pathParams = pathToFile.split('/');
                const fileName = pathParams[pathParams.length - 1];

                const errorCode = isENOENT ? 404 : 400;
                const errorMessage = isENOENT ? `Cannot find file: "${fileName}"` : `Cannot open file: "${fileName}.${fileExtension}"`;

                reject(new ServerMixinErrorClass(errorCode, errorMessage));
            });

            staticFileStream.pipe(this._response);
        });
    }

    async _serverStaticFileByPath(pathParams) {
        pathParams = typeof pathParams === 'string' ? parseURLPathParams(pathParams) : pathParams.slice();

        if (!pathParams || pathParams.length <= 0) {
            const errorMessage = `Cannot serve undefined file`;
            throw new ServerMixinErrorClass(400, errorMessage);
        }

        const fileExtension = extractFileExtensionFromPathParams(pathParams);
        const fileMIMEType = getMIMETypeForFileExtension(fileExtension);

        if (!fileMIMEType) {
            const errorMessage = `Cannot find MIME type for file extension of ".${fileExtension}"`;
            throw new ServerMixinErrorClass(400, errorMessage);
        }

        const pathToFile = this._preparePathToFile(pathParams);
        await this._serveFile(pathToFile, fileMIMEType);
    }

    _serveStaticFileByURLParams() {
        return this._serverStaticFileByPath(this._urlPathParams);
    };

    constructor(...serverParams) {
        super(...serverParams);

        this._addCustomRoute({
            path: /\.[^.\\/:*?"<>|\r\n]+$/,
            handler: this._serveStaticFileByURLParams
        });
    }
};

module.exports = StaticServerMixin;
