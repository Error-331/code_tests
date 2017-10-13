'use strict';

const fs = require('fs');

const {
    extractFileExtensionFromPathParams,
    extractFileNameFromPathParams,
    getMIMETypeForFileExtension
} = require('./../utils/server_request_utils');

const StaticServerMixin = (superClass) => class extends superClass {
    _serveStaticFileByURLParams() {
        return new Promise(async (resolve, reject) => {
            let pathToFile;

            const fileExtension = extractFileExtensionFromPathParams(this._urlPathParams);
            const fileName = extractFileNameFromPathParams(this._urlPathParams);

            const fileMIMEType = getMIMETypeForFileExtension(fileExtension);

            if (!fileMIMEType) {
                const errorMessage = `Cannot find MIME type for file extension of ".${fileExtension}"`;

                this._serveErrorPage(400, errorMessage);
                return reject(new Error(errorMessage));
            }

            const pathParamsCopy = this._urlPathParams.slice();
            pathParamsCopy.pop();

            const pathParamsCopyNormalized = pathParamsCopy.map(pathParam => pathParam.toLocaleLowerCase());
            const pathToDirectory = pathParamsCopyNormalized.length > 0 ? `/${pathParamsCopyNormalized.join('/')}/` : '/';

            if (fileExtension === 'html') {
                pathToFile = `${this._serverRootDir}/${this._getHTMLPagesDirectoryPath()}${pathToDirectory}${fileName}.${fileExtension}`;
            } else {
                pathToFile = `${this._serverRootDir}/${this._getResourcesDirectoryPath()}${pathToDirectory}${fileName}.${fileExtension}`;
            }

            const staticFileStream = fs.createReadStream(pathToFile, {
                flags: 'r',
                autoClose: true
            });

            this._addResponseHeader('Content-Type', fileMIMEType);
            this._writeHead(200);

            staticFileStream.on('close', () => {
                resolve();
            });

            staticFileStream.on('error', (error) => {
                console.log(error);

                if (error.code === 'ENOENT') {
                    this._serveErrorPage(404, `Cannot find file: "${fileName}.${fileExtension}"`);
                } else {
                    this._serveErrorPage(400, `Cannot open file: "${fileName}.${fileExtension}"`);
                }

                resolve();
            });

            staticFileStream.pipe(this._response);
        });
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