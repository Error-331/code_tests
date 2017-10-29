'use strict';

import CookieHandler from './cookie_handler';


const cookieHandlerInstance = new CookieHandler();

const currentCookies = cookieHandlerInstance.getCookies();
const currentCookiesCount = currentCookies.length;

const $testContainer1 = document.getElementById('testContainer1');
const $documentFragment = document.createDocumentFragment();

for (let cookieCounter1 = 0; cookieCounter1 < currentCookiesCount; cookieCounter1++) {
    const {name, value, path, domain, maxAge, expires, secure, httpOnly} = currentCookies[cookieCounter1];
    const $cookieContainer = document.createElement('div');

    $cookieContainer.innerHTML = `Name: ${name}; Value: ${decodeURIComponent(value)}; Path: ${path}; Domain: ${domain}; Max-age: ${maxAge}; Expires: ${expires}; Secure: ${secure}; HTTP-only: ${httpOnly}`;
    $documentFragment.appendChild($cookieContainer);
}

$testContainer1.appendChild($documentFragment);