'use strict';

import {
    adjust,
    all,
    any,
    aperture,
    append,
    chain,
    findIndex,
} from 'ramda';

import {curry} from 'ramda';

export default async () => {
    // test data
    const hippieNamesArray = ['STartriP', 'RivErdReam', 'CloUdsiSter', 'CosMIctraNce', 'SunBeam'];

    // findIndex
    const findCloudSisterNameFunc = hippieName => hippieName.toLowerCase() === 'cloudsister';
    const findSunBeanNameFunc = hippieName => hippieName.toLowerCase() === 'sunbean';

    console.log('');
    console.log('"Lists" category');
    console.log('----------------');

    console.log('');
    console.log('Adjust examples:');
    console.log('');

    console.log('adjust(2, name => name.toUpperCase(), hippieNamesArray) -', adjust(2, name => name.toUpperCase(), hippieNamesArray));

    console.log('');
    console.log('All examples:');
    console.log('');

    console.log('all(tuple => tuple[0] === "a", ["af", "ac", "az"]) -', all(tuple => tuple[0] === 'a', ['af', 'ac', 'az']));
    console.log('all(tuple => tuple[1] === "z", ["af", "ac", "az"]) -', all(tuple => tuple[1] === 'z', ['af', 'ac', 'az']));

    console.log('');
    console.log('Any examples:');
    console.log('');

    console.log('any(tuple => tuple[0] === "b", ["af", "ac", "az"]) -', any(tuple => tuple[0] === 'b', ['af', 'ac', 'az']));
    console.log('any(tuple => tuple[1] === "z", ["af", "ac", "az"]) -', any(tuple => tuple[1] === 'z', ['af', 'ac', 'az']));

    console.log('');
    console.log('Aperture examples:');
    console.log('');

    console.log('aperture(2, ["af", "bf", "cf", "zf", "as", "bs"]) -', aperture(2, ['af', 'bf', 'cf', 'zf', 'as', 'bs']));

    console.log('');
    console.log('Append examples:');
    console.log('');

    console.log('append("zf", ["af", "bf"]) -', append('zf', ['af', 'bf']));

    console.log('');
    console.log('Chain examples:');
    console.log('');

    console.log('chain(letter => `${letter}f`, ["a", "b", "c"]) -', chain(letter => `${letter}f`, ['a', 'b', 'c']));
    console.log(
        'chain(curry((letter, letters) => {letters.push(letter); return letters}), letters => letters[2])(["a", "b", "c"])) -',
        chain(curry((letter, letters) => {letters.push(letter); return letters}), letters => letters[2])(['a', 'b', 'c'])
    );

    console.log('');
    console.log('FindIndex examples:');
    console.log('');

    console.log('findIndex(findCloudSisterNameFunc)(hippieNamesArray) -', findIndex(findCloudSisterNameFunc)(hippieNamesArray));
    console.log('findIndex(findSunBeanNameFunc)(hippieNamesArray) -', findIndex(findSunBeanNameFunc)(hippieNamesArray));

    console.log('');
    console.log('***');
    console.log('');
};