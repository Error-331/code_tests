'use strict';

class CookieParser {
    _parseCookiesString(cookiesString) {
        const cookiesPairs = cookiesString.split(';');

        return cookiesPairs.reduce((keysValuesObject, cookiePair) => {
            const cookieKeyVal = cookiePair.split('=');

            if (!cookieKeyVal || !cookieKeyVal[0]) {
                return keysValuesObject;
            }

            const cookieKey = cookieKeyVal[0].trim();
            const cookieValue = decodeURIComponent(cookieKeyVal[1].trim());

            keysValuesObject[cookieKey] = cookieValue;
            return keysValuesObject;
        }, {});
    }

    constructor() {
        this._cookiesKeysValues = this._parseCookiesString(document.cookie);
    }

    deleteCookieByName() {

    }

    getCookieValueByCookieName(cookieName) {
        return this._cookiesKeysValues[cookieName];
    }

    setCookie(cookieName, cookieValue, cookiePath = '/', cookieDomain = window.location.hostname, cookieMaxAge, cookieExpires, cookieSecure = false, cookieHTTPOnly = false) {
        if (!cookieName) {
            return;
        }

        if (!cookieValue) {
            return;
        }

        cookieValue = encodeURIComponent(cookieValue);

        const cookieMaxAgeYears = 30;
        const cookieMaxAgeSeconds = 31536000 * cookieMaxAgeYears;

        if (!cookieMaxAge) {
            cookieMaxAge = cookieMaxAgeSeconds;
        }

        if (!cookieExpires) {
            const currentDate = new Date();
            currentDate.setFullYear(currentDate.getFullYear() + cookieMaxAgeYears);

            cookieExpires = currentDate.toUTCString()
        }

        const cookieKeyValue = `${cookieName}=${cookieValue}`;
        const cookieMainPart = `${cookieKeyValue}; path=${cookiePath}; domain=${cookieDomain}; max-age=${cookieMaxAge}; expires=${cookieExpires}; `;
        const cookieSecurePart = `${cookieMainPart} ${cookieSecure ? 'secure=true;' : ''} `;
        const cookieHTTPOnlyPart = `${cookieSecurePart} ${cookieHTTPOnly ? 'httponly=true;' : ''}`;

        this._cookiesKeysValues[cookieName] = cookieValue;
        document.cookie = cookieHTTPOnlyPart;
    }
}