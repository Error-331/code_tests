'use strict';

const HTTP_SERVER_PORT = 3000;
const HTTPS_SERVER_PORT = 4000;
const WEB_SOCKET_SERVER_PORT = 5000;

const HTTP_SERVER_PROTOCOL = 'http';
const HTTPS_SERVER_PROTOCOL = 'https';
const WEB_SOCKET_SERVER_PROTOCOL = 'ws';

const SERVER_DOMAIN = 'localhost';
const WEB_SOCKET_HOST = 'localhost';

const PUBLIC_DIRECTORY_PATH = '.';

const STATIC_PAGES_DIRECTORY_PATH = `${PUBLIC_DIRECTORY_PATH}/pages`;
const RESOURCES_DIRECTORY_PATH = `${PUBLIC_DIRECTORY_PATH}/resources`;

const MAX_POST_DATA_SIZE = 65e6;

module.exports.HTTP_SERVER_PORT = HTTP_SERVER_PORT;
module.exports.HTTPS_SERVER_PORT = HTTPS_SERVER_PORT;
module.exports.WEB_SOCKET_SERVER_PORT = WEB_SOCKET_SERVER_PORT;

module.exports.HTTP_SERVER_PROTOCOL = HTTP_SERVER_PROTOCOL;
module.exports.HTTPS_SERVER_PROTOCOL = HTTPS_SERVER_PROTOCOL;
module.exports.WEB_SOCKET_SERVER_PROTOCOL = WEB_SOCKET_SERVER_PROTOCOL;

module.exports.SERVER_DOMAIN = SERVER_DOMAIN;
module.exports.WEB_SOCKET_HOST = WEB_SOCKET_HOST;

module.exports.STATIC_PAGES_DIRECTORY_PATH = STATIC_PAGES_DIRECTORY_PATH;
module.exports.RESOURCES_DIRECTORY_PATH = RESOURCES_DIRECTORY_PATH;

module.exports.MAX_POST_DATA_SIZE = MAX_POST_DATA_SIZE;
