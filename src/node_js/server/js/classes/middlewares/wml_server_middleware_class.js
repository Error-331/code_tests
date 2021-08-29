'use strict';

const WMLToXMLTransformStreamClass = require('./../streams/transform/wml_to_xml_transform_stream_class');

class WMLServerMiddlewareClass {
    async onBeforeRouteRequest(serverProxy) {
        serverProxy.addTransformStream(new WMLToXMLTransformStreamClass(serverProxy));
    }
}

module.exports = WMLServerMiddlewareClass;
