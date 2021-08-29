'use strict';

const ServerFacadeClass = require('./server_facade_class');

class ETagTrackingServerFacadeClass extends ServerFacadeClass {
    addETagToResponse(eTagValue, isWeak = false) {
        const eTagHeader = `${isWeak ? 'W/' : ''}"${eTagValue}"`;
        this.server.response.addResponseHeader('ETag', eTagHeader);
    }

    isETagMatch(eTagValue) {
        const ifNoneMatchHeader = this.server.request.getHeader('if-none-match');

        if (!this.isETagCheckProceed) {
            throw (new Error('Cannot find "if-none-match" header'));
        }

        return this.checkValue === eTagValue;
    }

    get isETagPresent() {
        return this.server.request.isRequestHeaderExist('ETag');
    }

    get isETagCheckProceed() {
        return this.server.request.isRequestHeaderExist('if-none-match');
    }

    get value() {
        return this.server.request.getHeader('ETag').replace(/\"|\'/g,"");
    }

    get checkValue() {
        return this.server.request.getHeader('if-none-match').replace(/\"|\'/g,"");
    }
}

module.exports = ETagTrackingServerFacadeClass;