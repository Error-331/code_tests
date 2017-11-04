'use strict';

const {
    MAX_AGE_YEARS_COOKIE,
    MAS_AGE_SECONDS_COOKIE,
    COOKIE_FIELD_NAMES,
    COOKIE_FIELD_NAME_TO_OBJECT_FIELD_NAME
} = require ('./../constants/cookies_constants');

const CookiesServerMixin = (superClass) => class extends superClass {
    _parseCookie(cookieString) {
        const trimmedCookieString = cookieString.trim();
        const trimmedCookieStringLength = trimmedCookieString.length;
        const preparedCookieString = trimmedCookieString[trimmedCookieStringLength - 1] === ';' ? trimmedCookieString.substr(0, trimmedCookieStringLength - 1) : trimmedCookieString;

        return preparedCookieString.split(';').reduce((parsedCookie, keyValuePair) => {
             const [paramKey, paramValue] = keyValuePair.trim().split('=');
             const preparedParamKey = paramKey.toLocaleLowerCase();

             const paramKeyIndex = COOKIE_FIELD_NAMES.findIndex(fieldName => fieldName === preparedParamKey);

             if (paramKeyIndex !== -1) {
                 parsedCookie[COOKIE_FIELD_NAME_TO_OBJECT_FIELD_NAME[preparedParamKey]] = paramValue;
             } else {
                 parsedCookie.name = paramKey;
                 parsedCookie.value = paramValue;
             }

             return parsedCookie;
        }, {});
    }

    _prepareCookieHeader(cookieObj) {
        const cookieKeyValue = `${cookieObj.name}=${cookieObj.value}`;
        const cookieMainPart = `${cookieKeyValue}; path=${cookieObj.path}; domain=${cookieObj.domain}; max-age=${cookieObj.maxAge}; expires=${cookieObj.expires};`;
        const cookieSecurePart = `${cookieMainPart} ${cookieObj.secure ? 'secure=true;' : ''}`;

        return `${cookieSecurePart} ${cookieObj.httpOnly ? 'httponly=true;' : ''}`;
    }

    _prepareCookieHeaders() {
        return this._cookies.map((cookieObj) => {
            return this._prepareCookieHeader(cookieObj);
        });
    }

    _clearCookies() {
        this._cookies = [];
        const responseHeaders = this._getResponseHeaders();

        for(let headerCounter = 0; headerCounter < responseHeaders.length; headerCounter++) {
            const headerName = responseHeaders[headerCounter][0];

            if (headerName.toLocaleLowerCase() !== 'set-cookie') {
                continue;
            }

            responseHeaders.splice(headerCounter, 1);
            headerCounter = -1;
        }

        this._setResponseHeaders(responseHeaders);
    }

    _clearNamedCookieResponseHeader(usrCookieName) {
        const responseHeaders = this._getResponseHeaders();

        for(let headerCounter = 0; headerCounter < responseHeaders.length; headerCounter++) {
            const [headerName, headerValue] = responseHeaders[headerCounter];

            if (headerName.toLocaleLowerCase() !== 'set-cookie') {
                continue;
            }

            const parsedCookie = this._parseCookie(headerValue);

            if (parsedCookie.name === usrCookieName) {
                responseHeaders.splice(headerCounter, 1);
                headerCounter = -1;
            }
        }

        this._setResponseHeaders(responseHeaders);
    }

    _clearNamedCookieObject(usrCookieName) {
        for(let cookieCounter = 0; cookieCounter < this._cookies.length; cookieCounter++) {
            if (this._cookies[cookieCounter].name === usrCookieName) {
                this._cookies.splice(cookieCounter, 1);
                cookieCounter = -1;
            }
        }
    }

    _clearNamedCookie(usrCookieName) {
        this._clearNamedCookieResponseHeader(usrCookieName);
        this._clearNamedCookieObject(usrCookieName);
    }

    _getCookieIndex(cookieName) {
        if (!cookieName) {
            return;
        }

        return this._cookies.findIndex(cookie => cookie.name === cookieName);
    }

    _getCookie(cookieName) {
        if (!cookieName) {
            return;
        }

        return this._cookies.find(cookie => cookie.name === cookieName);
    }

    _setCookie(cookieName, cookieValue, cookiePath, cookieDomain, cookieSecure, cookieHTTPOnly, cookieMaxAge, cookieExpires) {
        if (!cookieName) {
            return;
        }

        if (!cookieValue) {
            return;
        }

        const originalCookie = this._getCookie(cookieName);
        const originalCookieIndex = this._getCookieIndex(cookieName);
        const cookieObj = (originalCookie && originalCookieIndex !== -1) ? Object.assign({}, originalCookie) : {};

        const defaultExpiresDate = new Date();
        defaultExpiresDate.setFullYear(defaultExpiresDate.getFullYear() + MAX_AGE_YEARS_COOKIE);

        cookieObj.name = cookieName;
        cookieObj.value = encodeURIComponent(cookieValue);
        cookieObj.path = cookiePath ? cookiePath : (cookieObj.path || '/');
        cookieObj.domain = cookieDomain ? cookieDomain : (cookieObj.domain || this._getServerDomain());
        cookieObj.secure = cookieSecure ? cookieSecure : (cookieObj.secure || false);
        cookieObj.httpOnly = cookieHTTPOnly ? cookieHTTPOnly : (cookieObj.httpOnly || false);
        cookieObj.maxAge = cookieMaxAge ? cookieMaxAge : (cookieObj.maxAge || MAS_AGE_SECONDS_COOKIE);
        cookieObj.expires = cookieExpires ? cookieExpires : (cookieObj.expires || defaultExpiresDate.toUTCString());

        const cookieString = this._prepareCookieHeader(cookieObj);

        if (originalCookieIndex !== -1) {
            const oldCookieString = this._prepareCookieHeader(originalCookie);
            const oldCookieIndex = this._getResponseHeaderIndexByNameValue('Set-Cookie', oldCookieString);

            this._setResponseHeaderValueAtIndex(oldCookieIndex, cookieString);
            this._cookies[originalCookieIndex] = cookieObj;
        } else {
            this._cookies.push(cookieObj);
            this._addResponseHeader('Set-Cookie', cookieString, false);
        }

        return cookieObj;
    }

    constructor(...serverParams) {
        super(...serverParams);

        this._cookies = [];
    }
};

module.exports = CookiesServerMixin;