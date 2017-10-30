'use strict';

import CookieHandler from './../basic/cookie_handler';

import {printCookiesToDocFragment} from './../../../resources/js/cookie_helpers';
import {fetchImage} from './../../../resources/js/file_download';

const $testContainer1 = document.getElementById('testContainer1');

if (window.location.hostname === 'test1.com') {
    fetchImage('http://test2.com/resources/images/html5_badge_h_css3_semantics.png', {credentials: 'include'}).then(imageURL => {
        const $tempIMG = document.createElement('img');

        $tempIMG.src = imageURL;
        $testContainer1.appendChild($tempIMG);
    });
} else {
    const cookieHandlerInstance = new CookieHandler();

    const currentCookies = cookieHandlerInstance.getCookies();
    const $cookiesDocFragment = printCookiesToDocFragment(currentCookies);

    $testContainer1.appendChild($cookiesDocFragment);
}

