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
];

module.exports = routes;