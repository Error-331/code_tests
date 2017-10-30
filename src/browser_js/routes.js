'use strict';

const fs = require('fs');
const path = require('path');

const setGenericCookies = (server, host = 'localhost') => {
    server._setCookie('test_server_cookie_1_simple', 'test server cookie val 1', '/', host, false, false);
    server._setCookie('test_server_cookie_2_simple', 'test server cookie val 2', '/', host, false, false);
    server._setCookie('test_server_cookie_2_simple', 'test server cookie val 2', '/', host, false, false);
    server._setCookie('test_server_cookie_3_secure', 'test server cookie val 3', '/', host, true, false);
    server._setCookie('test_server_cookie_4_http', 'test server cookie val 4', '/', host, false, true);
    server._setCookie('test_server_cookie_5_http_secure', 'test server cookie val 5', '/', host, true, true);
};

const routes = [
    {
        path: 'storage/cookies/basic/index.html',
        handler: function() {
            return new Promise(async (resolve) => {
                const server = this;

                setGenericCookies(server);

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
            const requestOrigin = this._getRequestHeader('origin');

            if (requestOrigin === 'http://test1.com') {
                setGenericCookies(server, 'test2.com');

                server._addResponseHeader('Access-Control-Allow-Origin', 'http://test1.com');
                server._addResponseHeader('Access-Control-Allow-Credentials', 'true');
            }

            await server._serveStaticFileByURLParams();
        }
    },

    {
        path: 'storage/cookies/cross_domain/index.html',
        method: 'get',
        handler: async function() {
            const server = this;
            await server._serveStaticFileByURLParams();
        }
    },
];

module.exports = routes;