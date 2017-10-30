'use strict';

const fs = require('fs');
const path = require('path');

const routes = [
    {
        path: 'storage/cookies/basic/index.html',
        handler: function() {
            return new Promise(async (resolve) => {
                const server = this;

                server._setCookie('test_server_cookie_1_simple', 'test server cookie val 1', '/', 'localhost', false, false);
                server._setCookie('test_server_cookie_2_simple', 'test server cookie val 2', '/', 'localhost', false, false);
                server._setCookie('test_server_cookie_2_simple', 'test server cookie val 2', '/', 'localhost', false, false);
                server._setCookie('test_server_cookie_3_secure', 'test server cookie val 3', '/', 'localhost', true, false);
                server._setCookie('test_server_cookie_4_http', 'test server cookie val 4', '/', 'localhost', false, true);
                server._setCookie('test_server_cookie_5_http_secure', 'test server cookie val 5', '/', 'localhost', true, true);

                await server._serveStaticFileByURLParams();
                resolve();
            });
        }
    },


    {
        path: 'resources/images/html5_badge_h_css3_semantics.png',
        method: 'get',
        handler: async function() {
            const server = this;
            const requestHost = this._getRequestHeader('host');

            if (requestHost === 'test2.com') {
                server._setCookie('test_server_cookie_1_simple', 'test server cookie val 1', '/', 'test2.com', false, false);
                server._setCookie('test_server_cookie_2_simple', 'test server cookie val 2', '/', 'test2.com', false, false);
                server._setCookie('test_server_cookie_2_simple', 'test server cookie val 2', '/', 'test2.com', false, false);
                server._setCookie('test_server_cookie_3_secure', 'test server cookie val 3', '/', 'test2.com', true, false);
                server._setCookie('test_server_cookie_4_http', 'test server cookie val 4', '/', 'test2.com', false, true);
                server._setCookie('test_server_cookie_5_http_secure', 'test server cookie val 5', '/', 'test2.com', true, true);

                server._addResponseHeader('Access-Control-Allow-Origin', 'http://test1.com');
                server._addResponseHeader('Access-Control-Allow-Credentials', 'true');
            }

            console.log(server._getRequestHeaders());

            await server._serveStaticFileByURLParams();
        }
    },

    {
        path: 'storage/cookies/cross_domain/index.html',
        method: 'get',
        handler: async function() {
            const server = this;

            console.log(server._getRequestHeaders());
            await server._serveStaticFileByURLParams();
        }
    },
];

module.exports = routes;