'use strict';

const fs = require('fs');

const {
    parseURLPathParams,
    extractFileExtensionFromPathParams,
    extractFileNameFromPathParams,
    getMIMETypeForFileExtension
} = require('../../utils/server_request_utils');

const {
    HTML_PAGES_DIRECTORY_PATH,
    RESOURCES_DIRECTORY_PATH,
} = require ('./../constants/general_server_constants');

const ServerMixinErrorClass = require('../server_mixin_error_class');
const ServerFacadeClass = require('./server_facade_class');

class StaticServerFacadeClass extends ServerFacadeClass {
    preparePathToFile(pathParams) {
        pathParams = pathParams.slice();

        const fileName = extractFileNameFromPathParams(pathParams);
        const fileExtension = extractFileExtensionFromPathParams(pathParams);

        pathParams.pop();

        const pathParamsCopyNormalized = pathParams.map(pathParam => pathParam.toLocaleLowerCase());
        const pathToDirectory = pathParamsCopyNormalized.length > 0 ? `/${pathParamsCopyNormalized.join('/')}/` : '/';

        let pathToFile;

        if (fileExtension === 'html') {
            pathToFile = `${this.server.serverRootDir}/${this.htmlPagesDirectoryPath()}${pathToDirectory}${fileName}.${fileExtension}`;
        } else {
            pathToFile = `${this.server.serverRootDir}/${this.resourcesDirectoryPath()}${pathToDirectory}${fileName}.${fileExtension}`;
        }

        return pathToFile;
    }

    serveFile(pathToFile, fileMIMEType) {
        return new Promise((resolve, reject) => {
            this.server.response.addResponseHeader('Content-Type', fileMIMEType);
            this.server.response.writeHead(200);

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
                const fileName = extractFileNameFromPathParams(pathParams);
                const fileExtension = extractFileExtensionFromPathParams(pathParams);

                const errorCode = isENOENT ? 404 : 400;
                const errorMessage = isENOENT ? `Cannot find file: "${fileName}"` : `Cannot open file: "${fileName}.${fileExtension}"`;

                reject(new ServerMixinErrorClass(errorCode, errorMessage));
            });

            // TODO: handle pipe properly
            staticFileStream.pipe(this.server.response.rawResponse);
        });
    }

    async serverStaticFileByPath(pathParams) {
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

        const pathToFile = this.preparePathToFile(pathParams);
        await this.serveFile(pathToFile, fileMIMEType);
    }

    serveStaticFileByURLParams() {
        return this.serverStaticFileByPath(this.server.request.urlPathParams);
    };

    get htmlPagesDirectoryPath() {
        return this.server.constantsOverrides.HTML_PAGES_DIRECTORY_PATH ? this.#constantsOverrides.HTML_PAGES_DIRECTORY_PATH : HTML_PAGES_DIRECTORY_PATH;
    }

    get resourcesDirectoryPath() {
        return this.server.constantsOverrides.RESOURCES_DIRECTORY_PATH ? this.#constantsOverrides.RESOURCES_DIRECTORY_PATH : RESOURCES_DIRECTORY_PATH;
    }

    constructor(server) {
        super(server);

        this.server.router.addCustomRoute({
            path: /\.[^.\\/:*?"<>|\r\n]+$/,
            handler: this.serveStaticFileByURLParams
        });
    }
};

module.exports = StaticServerFacadeClass;
