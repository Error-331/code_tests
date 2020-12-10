'use strict';

const HTTP_SERVER_PORT = 3000;
const HTTPS_SERVER_PORT = 4000;
const WEB_SOCKET_SERVER_PORT = 5000;

const SERVER_DOMAIN = 'localhost';
const WEB_SOCKET_HOST = 'localhost';

const PUBLIC_DIRECTORY_PATH = '.';

const HTML_PAGES_DIRECTORY_PATH = `${PUBLIC_DIRECTORY_PATH}/pages`;
const RESOURCES_DIRECTORY_PATH = `${PUBLIC_DIRECTORY_PATH}/resources`;

const MAX_POST_DATA_SIZE = 65e6;

module.exports.HTTP_SERVER_PORT = HTTP_SERVER_PORT;
module.exports.HTTPS_SERVER_PORT = HTTPS_SERVER_PORT;
module.exports.WEB_SOCKET_SERVER_PORT = WEB_SOCKET_SERVER_PORT;

module.exports.SERVER_DOMAIN = SERVER_DOMAIN;
module.exports.WEB_SOCKET_HOST = WEB_SOCKET_HOST;

module.exports.HTML_PAGES_DIRECTORY_PATH = HTML_PAGES_DIRECTORY_PATH;
module.exports.RESOURCES_DIRECTORY_PATH = RESOURCES_DIRECTORY_PATH;

module.exports.MAX_POST_DATA_SIZE = MAX_POST_DATA_SIZE;
