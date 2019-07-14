'use strict';

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';

    const $testContainer1 = document.getElementById('testContainer1');

    const $textNode = document.createTextNode('Leaving already?');
    const $tempDiv = document.createElement('div');

    $tempDiv.appendChild($textNode);
    $testContainer1.appendChild($tempDiv);
});
