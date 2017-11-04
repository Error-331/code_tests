'use strict';

const HTML_MIME_TYPE = 'text/html';
const CSS_MIME_TYPE = 'text/css';
const JS_MIME_TYPE = 'application/javascript';
const JSON_MIME_TYPE = 'application/json';

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

const MPEG3_MIME_TYPE = 'audio/mpeg3';
const MIDI_MIME_TYPE = 'audio/midi';
const WAV_MIME_TYPE = 'audio/wav';

const MPEG_MIME_TYPE = 'video/mpeg';

const SWF_MIME_TYPE = 'application/x-shockwave-flash';
const TEXT_MIME_TYPE = 'text/plain';

const FILE_EXTENSION_TO_MIME_TYPE = Object.freeze({
    'html': HTML_MIME_TYPE,
    'css': CSS_MIME_TYPE,
    'js': JS_MIME_TYPE,
    'json': JSON_MIME_TYPE,

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
    'woff2': WOFF2_MIME_TYPE,

    'mp3': MPEG3_MIME_TYPE,
    'mid': MIDI_MIME_TYPE,
    'wav': WAV_MIME_TYPE,

    'mpeg': MPEG_MIME_TYPE,
    'mpg': MPEG_MIME_TYPE,

    'swf': SWF_MIME_TYPE,
    'txt': TEXT_MIME_TYPE
});

module.exports.HTML_MIME_TYPE = HTML_MIME_TYPE;
module.exports.CSS_MIME_TYPE = CSS_MIME_TYPE;
module.exports.JS_MIME_TYPE = JS_MIME_TYPE;
module.exports.JSON_MIME_TYPE = JSON_MIME_TYPE;

module.exports.PNG_MIME_TYPE = PNG_MIME_TYPE;
module.exports.GIF_MIME_TYPE = GIF_MIME_TYPE;
module.exports.JPG_MIME_TYP = JPG_MIME_TYPE;
module.exports.SVG_MIME_TYPE = SVG_MIME_TYPE;
module.exports.ICON_MIME_TYPE = ICON_MIME_TYPE;

module.exports.EOT_MIME_TYPE = EOT_MIME_TYPE;
module.exports.OTF_MIME_TYPE = OTF_MIME_TYPE;
module.exports.TTF_MIME_TYPE = TTF_MIME_TYPE;
module.exports.WOFF_MIME_TYPE = WOFF_MIME_TYPE;
module.exports.WOFF2_MIME_TYPE = WOFF2_MIME_TYPE;

module.exports.MPEG3_MIME_TYPE = MPEG3_MIME_TYPE;
module.exports.MIDI_MIME_TYPE = MIDI_MIME_TYPE;
module.exports.WAV_MIME_TYPE = WAV_MIME_TYPE;

module.exports.MPEG_MIME_TYPE = MPEG_MIME_TYPE;

module.exports.SWF_MIME_TYPE = SWF_MIME_TYPE;
module.exports.TEXT_MIME_TYPE = TEXT_MIME_TYPE;

module.exports.FILE_EXTENSION_TO_MIME_TYPE = FILE_EXTENSION_TO_MIME_TYPE;