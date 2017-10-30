'use strict';

import CookieHandler from './cookie_handler';
import {printCookiesToDocFragment} from './../../../resources/js/cookie_helpers';

const cookieHandlerInstance = new CookieHandler();

const currentCookies = cookieHandlerInstance.getCookies();
const $testContainer1 = document.getElementById('testContainer1');
const $cookiesDocFragment = printCookiesToDocFragment(currentCookies);

$testContainer1.appendChild($cookiesDocFragment);