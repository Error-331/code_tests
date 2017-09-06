"use strict";

const SERVER_PORT = 3000;

const HTML_PAGES_DIRECTORY_NAME = 'pages';
const RESOURCES_DIRECTORY_NAME = 'resources';

const HTML_MIME_TYPE = 'text/html';
const CSS_MIME_TYPE = 'text/css';
const JS_MIME_TYPE = 'application/javascript';
const PNG_MIME_TYPE = 'image/png';
const GIF_MIME_TYPE = 'image/gif';
const JPG_MIME_TYPE = 'image/jpeg';
const SVG_MIME_TYPE = 'image/svg+xml';

const FILE_EXTENSION_TO_MIME_TYPE = Object.freeze({
    'html': HTML_MIME_TYPE,
    'css': CSS_MIME_TYPE,
    'js': JS_MIME_TYPE,
    'png': PNG_MIME_TYPE,
    'gif': GIF_MIME_TYPE,
    'jpg': JPG_MIME_TYPE,
    'jpeg': JPG_MIME_TYPE,
    'svg': SVG_MIME_TYPE
});

module.exports.SERVER_PORT = SERVER_PORT;

module.exports.HTML_PAGES_DIRECTORY_NAME = HTML_PAGES_DIRECTORY_NAME;
module.exports.RESOURCES_DIRECTORY_NAME = RESOURCES_DIRECTORY_NAME;

module.exports.HTML_MIME_TYPE = HTML_MIME_TYPE;
module.exports.CSS_MIME_TYPE = CSS_MIME_TYPE;
module.exports.JS_MIME_TYPE = JS_MIME_TYPE;
module.exports.PNG_MIME_TYPE = PNG_MIME_TYPE;
module.exports.GIF_MIME_TYPE = GIF_MIME_TYPE;
module.exports.JPG_MIME_TYP = JPG_MIME_TYPE;
module.exports.SVG_MIME_TYPE = SVG_MIME_TYPE;

module.exports.FILE_EXTENSION_TO_MIME_TYPE = FILE_EXTENSION_TO_MIME_TYPE;