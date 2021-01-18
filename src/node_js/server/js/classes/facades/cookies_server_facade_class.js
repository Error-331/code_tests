'use strict';

const {
    MAX_AGE_YEARS_COOKIE,
    MAS_AGE_SECONDS_COOKIE,
    COOKIE_FIELD_NAMES,
    COOKIE_FIELD_NAME_TO_OBJECT_FIELD_NAME
} = require ('../../constants/cookies_constants');

const ServerFacadeClass = require('./server_facade_class');

class CookiesServerFacadeClass extends ServerFacadeClass {
    #cookies = [];

    clearCookies() {
        this.#cookies = [];
        const responseHeaders = this.server.response.headers;

        for(let headerCounter = 0; headerCounter < responseHeaders.length; headerCounter++) {
            const headerName = responseHeaders[headerCounter][0];

            if (headerName.toLocaleLowerCase() !== 'set-cookie') {
                continue;
            }

            responseHeaders.splice(headerCounter, 1);
            headerCounter = -1;
        }

        this.server.response.headers = responseHeaders;
    }

    clearNamedCookieResponseHeader(usrCookieName) {
        const responseHeaders = this.server.response.headers;

        for(let headerCounter = 0; headerCounter < responseHeaders.length; headerCounter++) {
            const [headerName, headerValue] = responseHeaders[headerCounter];

            if (headerName.toLocaleLowerCase() !== 'set-cookie') {
                continue;
            }

            const parsedCookie = CookiesServerFacadeClass.parseCookie(headerValue);

            if (parsedCookie.name === usrCookieName) {
                responseHeaders.splice(headerCounter, 1);
                headerCounter = -1;
            }
        }

        this.server.response.headers = responseHeaders;
    }

    clearNamedCookieObject(usrCookieName) {
        for(let cookieCounter = 0; cookieCounter < this.#cookies.length; cookieCounter++) {
            if (this.#cookies[cookieCounter].name === usrCookieName) {
                this.#cookies.splice(cookieCounter, 1);
                cookieCounter = -1;
            }
        }
    }

    clearNamedCookie(usrCookieName) {
        this.clearNamedCookieResponseHeader(usrCookieName);
        this.clearNamedCookieObject(usrCookieName);
    }

    prepareCookieHeader(cookieObj) {
        const cookieKeyValue = `${cookieObj.name}=${cookieObj.value}`;
        const cookieMainPart = `${cookieKeyValue}; path=${cookieObj.path}; domain=${cookieObj.domain}; max-age=${cookieObj.maxAge}; expires=${cookieObj.expires};`;
        const cookieSecurePart = `${cookieMainPart} ${cookieObj.secure ? 'secure=true;' : ''}`;

        return `${cookieSecurePart} ${cookieObj.httpOnly ? 'httponly=true;' : ''}`;
    }

    prepareCookieHeaders() {
        return this.#cookies.map((cookieObj) => {
            return this.prepareCookieHeader(cookieObj);
        });
    }

    getCookieIndex(cookieName) {
        if (cookieName === undefined || cookieName === null) {
            return;
        }

        return this.#cookies.findIndex(cookie => cookie.name === cookieName);
    }

    getCookie(cookieName) {
        if (cookieName === undefined || cookieName === null) {
            return;
        }

        return this.#cookies.find(cookie => cookie.name === cookieName);
    }

    setCookie(cookieName, cookieValue, cookiePath, cookieDomain, cookieSecure, cookieHTTPOnly, cookieMaxAge, cookieExpires) {
        if (!cookieName) {
            return;
        }

        if (!cookieValue) {
            return;
        }

        const originalCookie = this.getCookie(cookieName);
        const originalCookieIndex = this.getCookieIndex(cookieName);
        const cookieObj = (originalCookie && originalCookieIndex !== -1) ? Object.assign({}, originalCookie) : {};

        const defaultExpiresDate = new Date();
        defaultExpiresDate.setFullYear(defaultExpiresDate.getFullYear() + MAX_AGE_YEARS_COOKIE);

        cookieObj.name = cookieName;
        cookieObj.value = encodeURIComponent(cookieValue);
        cookieObj.path = cookiePath ? cookiePath : (cookieObj.path || '/');
        cookieObj.domain = cookieDomain ? cookieDomain : (cookieObj.domain || this.server.domain);
        cookieObj.secure = cookieSecure ? cookieSecure : (cookieObj.secure || false);
        cookieObj.httpOnly = cookieHTTPOnly ? cookieHTTPOnly : (cookieObj.httpOnly || false);
        cookieObj.maxAge = cookieMaxAge ? cookieMaxAge : (cookieObj.maxAge || MAS_AGE_SECONDS_COOKIE);
        cookieObj.expires = cookieExpires ? cookieExpires : (cookieObj.expires || defaultExpiresDate.toUTCString());

        const cookieString = this.prepareCookieHeader(cookieObj);

        if (originalCookieIndex !== -1) {
            const oldCookieString = this.prepareCookieHeader(originalCookie);
            const oldCookieIndex = this.server.response.getResponseHeaderIndexByNameValue('Set-Cookie', oldCookieString);

            this.server.response.setResponseHeaderValueAtIndex(oldCookieIndex, cookieString);
            this.#cookies[originalCookieIndex] = cookieObj;
        } else {
            this.#cookies.push(cookieObj);
            this.server.response.addResponseHeader('Set-Cookie', cookieString, false);
        }

        return cookieObj;
    }

    static parseCookie(cookieString) {
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
}

module.exports = ServerFacadeClass;