'use strict';

const fs = require('fs');

const routes = [
    {
        path: 'data/save',
        handler: async function (){
            await new Promise((resolve) => {
                const server = this;
                const fileName = 'users.txt';

                const usersTXTFileStream = fs.createWriteStream(`${this._serverRootDir}/user_created/${fileName}`, {
                    flags: 'a',
                    autoClose: true
                });

                usersTXTFileStream.on('open', function(){
                    const firstName = server._postData.firstName ? server._postData.firstName : '';
                    const lastName = server._postData.lastName ? server._postData.lastName : '';

                    this.write(`First name: ${firstName}; Last name: ${lastName}`);
                    this.end('\n');
                });

                usersTXTFileStream.on('close', function(){
                    server._response.writeHead(200);
                    server._response.end('Success!');

                    resolve();
                });

                usersTXTFileStream.on('error', function (error) {
                    console.log(error);

                    if (error.code === 'ENOENT') {
                        server._serveErrorPage(404, `Cannot find file: "${fileName}"`);
                    } else {
                        server._serveErrorPage(400, `Cannot open file: "${fileName}"`);
                    }

                    resolve();
                });
            });
        }
    },

    {
        path: 'images/html5_badge_h_css3_semantics.png',
        method: 'get',
        handler: async function() {
            const server = this;
            const trackingETagValue = 'test_etag_1';

            if (server._isETagCheckProceed()) {
                console.log(`ETag check is happening: "${server._getETagCheckValue()}"`);

                if (server._isETagMatch(trackingETagValue)) {
                    console.log('ETag match');
                    return this._serveEmptyResponse(304);
                } else {
                    console.log('ETag not match');
                    server._addETagToResponse(trackingETagValue);
                }
            } else if (server._isETagPresent()) {
                console.log(`ETag is present: "${server._getETagValue()}"`);
            } else {
                console.log('ETag not present and ETag check is not happening');
                server._addETagToResponse(trackingETagValue);
            }

            await server._serverStaticFileByPath('images/html5_badge_h_css3_semantics.png');
        }
    },

    {
        path: 'jsons/test1.json',
        hostname: 'test1.com',
        handler: async function() {
            const server = this;
            await server._forwardOpenProxyRequest();
        }
    },

    {
        path: 'jsons/test1.json',
        handler: async function() {
            const server = this;

            server._addResponseHeader('x-test', 'test_value');
            server._serveJSON({
                'status': 'ok',
                'isActive': true,
                'date': new Date()
            });
        }
    },

    {
        path: 'StartFileUpload',
        method: 'options',
        handler: async function(){
            const server = this;
            console.log('here1');

            server._addResponseHeader('Access-Control-Allow-Origin', '*');
            server._addResponseHeader('Access-Control-Allow-Credentials', 'true');
            server._addResponseHeader('access-control-allow-headers', ' Content-Type, BSN-AuthToken');

            server._writeHead(200);
            server._response.end();
        }
    },

    {
        path: 'StartFileUpload',
        handler: async function(){
            const server = this;
            console.log('here');

            server._addResponseHeader('Access-Control-Allow-Origin', '*');
            server._addResponseHeader('Access-Control-Allow-Credentials', 'true');
            server._addResponseHeader('access-control-allow-headers', ' Content-Type, BSN-AuthToken');

            server._setDomainToForwardTo('ast.brightsignnetwork.com');
            server._setPortToForwardTo(443);
            server._setPathToForwardPrefix('Upload/v201701/HTTP/WebContentUploadService.svc');
            await server._forwardOpenProxyRequest();
        }
    },
    {
        path: 'websocket/connect',
        handler: async function() {
            const server = this;

            server._writeHead(200);
            server._response.end();
        }
    }
];

module.exports = routes;