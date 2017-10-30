'use strict';

export const printCookiesToDocFragment = (cookiesToPrint) => {
    const cookiesCount = cookiesToPrint.length;
    const $documentFragment = document.createDocumentFragment();

    for (let cookieCounter1 = 0; cookieCounter1 < cookiesCount; cookieCounter1++) {
        const {name, value, path, domain, maxAge, expires, secure, httpOnly} = cookiesToPrint[cookieCounter1];
        const $cookieContainer = document.createElement('div');

        $cookieContainer.innerHTML = `Name: ${name}; Value: ${decodeURIComponent(value)}; Path: ${path}; Domain: ${domain}; Max-age: ${maxAge}; Expires: ${expires}; Secure: ${secure}; HTTP-only: ${httpOnly}`;
        $documentFragment.appendChild($cookieContainer);
    }

    return $documentFragment;
};