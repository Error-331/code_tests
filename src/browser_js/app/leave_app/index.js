'use strict';

const windowInnerWidth = window.innerWidth;
const rightBorder = windowInnerWidth - 200;

const $testContainer1 = document.getElementById('testContainer1');
const $testContainer2 = document.getElementById('testContainer2');
const $testContainer3 = document.getElementById('testContainer3');

window.addEventListener('mouseout', function (event) {
    const x = event.clientX;
    const y = event.clientY;


    if (x <= 200 && y <= 0) {
        const $textNode = document.createTextNode('Trying to close window (MAC)...');
        $testContainer1.appendChild($textNode);
    }


    if (x >= rightBorder && y <= 0) {
        const $textNode = document.createTextNode('Trying to close window (WIN)...');
        $testContainer1.appendChild($textNode);
    }

    if ( event.relatedTarget == null) {
        const $textNode = document.createTextNode('Leave window...');
        $testContainer2.appendChild($textNode);
    }

}, false);

window.addEventListener('blur', function () {
    const $textNode = document.createTextNode('Window lost focus...');
    $testContainer3.appendChild($textNode);

}, false);
