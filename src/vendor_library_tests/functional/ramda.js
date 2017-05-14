'use strict';

import R from 'ramda';

export default async () => {

    const powersOfTwo = R.partial(Math.pow, [2]);

    const squareOf = R.partialRight(Math.pow, [2]);
    const cubeOf = R.partialRight(Math.pow, [3]);

    const numberToHex = (component) => {
        const hex = component.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const numbersToHex = (...args) => {
        return [...args].map(numberToHex).join('');
    };

    const rgbTohex = (red, green, blue) => {
        return '#' + numbersToHex(red) + numbersToHex(green) + numbersToHex(blue);
    };

    const hexColors = R.curry(rgbTohex);

    const roundedSqrt = R.compose(Math.round, Math.sqrt);
    const squaredDate = R.compose(roundedSqrt, Date.parse);

    console.log('"Ramda" library tests');
    console.log('=====================');

    console.log('Partial left application examples:');
    console.log('');

    console.log('powersOfTwo(3) -', powersOfTwo(3));
    console.log('powersOfTwo(5) -', powersOfTwo(5));

    console.log('');

    console.log('Partial right application examples:');
    console.log('');

    console.log('squareOf(3) -', squareOf(3));
    console.log('squareOf(4) -', squareOf(4));
    console.log('cubeOf(3) -', cubeOf(3));
    console.log('cubeOf(4) -', cubeOf(4));

    console.log('');

    console.log('Currying examples:');
    console.log('');

    console.log('hexColors(11)(12)(123) -', hexColors(11)(12)(123));
    console.log('hexColors(210)(12)(0) -', hexColors(210)(12)(0));

    console.log('');

    console.log('hexColors(11,12,123) -', hexColors(11,12,123));
    console.log('hexColors(R.__, R.__, 0)(210)(12) -', hexColors(R.__, R.__, 0)(210)(12));

    console.log('');

    console.log('Compose examples:');
    console.log('');

    console.log('roundedSqrt(5) -', roundedSqrt(5));
    console.log('squaredDate("January 1, 2014") -', squaredDate("January 1, 2014"));

    console.log('');

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}