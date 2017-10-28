'use strict';

const ETagTrackingMixin = (superClass) => class extends superClass {
    _isETagPresent() {
        return this._isRequestHeaderExist('ETag');
    }

    _isETagCheckProceed() {
        return this._isRequestHeaderExist('if-none-match');
    }

    _addETagToResponse(eTagValue, isWeak = false) {
        const eTagHeader = `${isWeak ? 'W/' : ''}"${eTagValue}"`;
        this._addResponseHeader('ETag', eTagHeader);
    }

    _isETagMatch(eTagValue) {
        const ifNoneMatchHeader = this._getRequestHeader('if-none-match');

        if (!this._isETagCheckProceed()) {
            throw (new Error('Cannot find "if-none-match" header'));
        }

        return this._getETagCheckValue() === eTagValue;
    }

    _getETagValue() {
        return this._getRequestHeader('ETag').replace(/\"|\'/g,"");
    }

    _getETagCheckValue() {
        return this._getRequestHeader('if-none-match').replace(/\"|\'/g,"");
    }
};

module.exports = ETagTrackingMixin;