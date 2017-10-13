'use strict';

const HTML_MIME_TYPE = 'text/html';
const CSS_MIME_TYPE = 'text/css';
const JS_MIME_TYPE = 'application/javascript';

const PNG_MIME_TYPE = 'image/png';
const GIF_MIME_TYPE = 'image/gif';
const JPG_MIME_TYPE = 'image/jpeg';
const SVG_MIME_TYPE = 'image/svg+xml';
const ICON_MIME_TYPE = 'image/x-icon';

const EOT_MIME_TYPE = 'application/vnd.ms-fontobject';
const OTF_MIME_TYPE = 'application/font-sfnt';
const TTF_MIME_TYPE = 'application/font-sfnt';
const WOFF_MIME_TYPE = 'application/font-woff';
const WOFF2_MIME_TYPE = 'font/woff2';

const FILE_EXTENSION_TO_MIME_TYPE = Object.freeze({
    'html': HTML_MIME_TYPE,
    'css': CSS_MIME_TYPE,
    'js': JS_MIME_TYPE,

    'png': PNG_MIME_TYPE,
    'gif': GIF_MIME_TYPE,
    'jpg': JPG_MIME_TYPE,
    'jpeg': JPG_MIME_TYPE,
    'svg': SVG_MIME_TYPE,
    'ico': ICON_MIME_TYPE,

    'eot': EOT_MIME_TYPE,
    'otf': OTF_MIME_TYPE,
    'ttf': TTF_MIME_TYPE,
    'woff': WOFF_MIME_TYPE,
    'woff2': WOFF2_MIME_TYPE
});

module.exports.HTML_MIME_TYPE = HTML_MIME_TYPE;
module.exports.CSS_MIME_TYPE = CSS_MIME_TYPE;
module.exports.JS_MIME_TYPE = JS_MIME_TYPE;
module.exports.PNG_MIME_TYPE = PNG_MIME_TYPE;
module.exports.GIF_MIME_TYPE = GIF_MIME_TYPE;
module.exports.JPG_MIME_TYP = JPG_MIME_TYPE;
module.exports.SVG_MIME_TYPE = SVG_MIME_TYPE;
module.exports.ICON_MIME_TYPE = ICON_MIME_TYPE;

module.exports.FILE_EXTENSION_TO_MIME_TYPE = FILE_EXTENSION_TO_MIME_TYPE;