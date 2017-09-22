'use strict';

const fs = require('fs');

const routes = [
    {
        path: 'data/save',
        handler: function (){
            return new Promise((resolve) => {
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
    }
];

module.exports = routes;