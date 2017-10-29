'use strict';

import {
    MAX_AGE_YEARS_COOKIE,
    MAS_AGE_SECONDS_COOKIE,
    COOKIE_FIELD_NAMES,
    COOKIE_FIELD_NAME_TO_OBJECT_FIELD_NAME
} from './constants';

export default class CookieHandler {
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

    _parseDocumentCookies() {
        document.cookie.split(';').forEach(cookieString => {
            const parsedCookieObject = this._parseCookie(cookieString);

            this._setCookieObject(
                parsedCookieObject.name,
                decodeURIComponent(parsedCookieObject.value),
                parsedCookieObject.path,
                parsedCookieObject.domain,
                parsedCookieObject.maxAge,
                parsedCookieObject.expires,
                parsedCookieObject.secure,
                parsedCookieObject.httpOnly
            );
        });
    }

    _prepareCookieString(cookieObj) {
        const cookieKeyValue = `${cookieObj.name}=${cookieObj.value}`;
        const cookieMainPart = `${cookieKeyValue}; path=${cookieObj.path}; domain=${cookieObj.domain}; max-age=${cookieObj.maxAge}; expires=${cookieObj.expires};`;
        const cookieSecurePart = `${cookieMainPart} ${cookieObj.secure ? 'secure=true;' : ''}`;

        return `${cookieSecurePart} ${cookieObj.httpOnly ? 'httponly=true;' : ''}`;
    }

    _prepareCookieStrings() {
        return this._cookies.map((cookieObj) => {
            return this._prepareCookieString(cookieObj);
        });
    }

    _removeNamedCookieFromDocument(usrCookieName) {
        // name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
        this._removeNamedCookieFromDocument(usrCookieName);
        this._clearNamedCookieObject(usrCookieName);
    }

    _clearCookies() {
        this._cookies = [];
    }

    _getCookieIndex(cookieName) {
        if (!cookieName) {
            return;
        }

        return this._cookies.findIndex(cookie => cookie.name === cookieName);
    }

    _setDocumentCookie(cookieObj) {
        if (!cookieObj) {
            return;
        }

        const cookieString = this._prepareCookieString(cookieObj);
        document.cookie = cookieString;
    }

    _setCookieObject(cookieName, cookieValue, cookiePath, cookieDomain, cookieMaxAge, cookieExpires, cookieSecure, cookieHTTPOnly) {
        if (!cookieName) {
            return;
        }

        if (!cookieValue) {
            return;
        }

        const originalCookie = this.getCookie(cookieName);
        const originalCookieIndex = this._getCookieIndex(cookieName);
        const cookieObj = (originalCookie && originalCookieIndex !== -1) ? Object.assign({}, originalCookie) : {};

        const defaultExpiresDate = new Date();
        defaultExpiresDate.setFullYear(defaultExpiresDate.getFullYear() + MAX_AGE_YEARS_COOKIE);

        cookieObj.name = cookieName;
        cookieObj.value = encodeURIComponent(cookieValue);
        cookieObj.path = cookiePath ? cookiePath : (cookieObj.path || '/');
        cookieObj.domain = cookieDomain ? cookieDomain : (cookieObj.domain || window.location.hostname);
        cookieObj.maxAge = cookieMaxAge ? cookieMaxAge : (cookieObj.maxAge || MAS_AGE_SECONDS_COOKIE);
        cookieObj.expires = cookieExpires ? cookieExpires : (cookieObj.expires || defaultExpiresDate.toUTCString());
        cookieObj.secure = cookieSecure ? cookieSecure : (cookieObj.secure || false);
        cookieObj.httpOnly = cookieHTTPOnly ? cookieHTTPOnly : (cookieObj.httpOnly || false);

        if (originalCookieIndex !== -1) {
            this._cookies[originalCookieIndex] = cookieObj;
        } else {
            this._cookies.push(cookieObj);
        }

        return cookieObj;
    }

    constructor(...serverParams) {
        this._cookies = [];
        this._parseDocumentCookies();
    }

    getCookies() {
        return this._cookies;
    }

    getCookie(cookieName) {
        if (!cookieName) {
            return;
        }

        return this._cookies.find(cookie => cookie.name === cookieName);
    }

    setCookie(cookieName, cookieValue, cookiePath, cookieDomain, cookieMaxAge, cookieExpires, cookieSecure, cookieHTTPOnly) {
        const cookieObject = this._setCookieObject(cookieName, cookieValue, cookiePath, cookieDomain, cookieMaxAge, cookieExpires, cookieSecure, cookieHTTPOnly);
        this._setDocumentCookie(cookieObject);
    }
};