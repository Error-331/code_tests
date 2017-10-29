'use strict';

const fs = require('fs');
const path = require('path');

const routes = [
    {
        path: 'storage/cookies/index.html',
        handler: function() {
            return new Promise(async (resolve) => {
                const server = this;

                server._setCookie('test_server_cookie_1_simple', 'test server cookie val 1', '/', 'localhost', false, false);
                server._setCookie('test_server_cookie_2_simple', 'test server cookie val 2', '/', 'localhost', false, false);
                server._setCookie('test_server_cookie_2_simple', 'test server cookie val 2', '/', 'localhost', false, false);
                server._setCookie('test_server_cookie_3_secure', 'test server cookie val 3', '/', 'localhost', true, false);
                server._setCookie('test_server_cookie_4_http', 'test server cookie val 4', '/', 'localhost', false, true);
                server._setCookie('test_server_cookie_5_http_secure', 'test server cookie val 5', '/', 'localhost', true, true);


                console.log(server._getRequestHeaders());

                await server._serveStaticFileByURLParams();
                resolve();
            });
        }
    }
];

module.exports = routes;