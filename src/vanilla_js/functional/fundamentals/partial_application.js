'use strict';

export default async () => {
    const numberToHex = (component) => {
        const hex = component.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    const numbersToHex = (...args) => {
        return [...args].map(numberToHex).join('');
    };

    Function.prototype.partialApplyLeft = function(...superArguments){
        const self = this;

        return function(...subArguments){
            return self.call(this, ...superArguments, ...subArguments);
        };
    };

    const testOUI = 123;
    const getMacAddress = numbersToHex.partialApplyLeft(testOUI);

    console.log('Partial application');
    console.log('===================');
    console.log('');

    console.log('Simple function which accepts any number of arguments: ');
    console.log('');

    console.log('numbersToHex() -', numbersToHex());
    console.log('numbersToHex(100,200) -', numbersToHex(100,200));
    console.log('numbersToHex(100, 200, 255, 0, 123) -', numbersToHex(100, 200, 255, 0, 123));

    console.log('');

    console.log('Partly applied left function(numbersToHex):');
    console.log('');

    console.log('getMacAddress() -', getMacAddress()); // '7b'
    console.log('getMacAddress(100, 200, 2, 123, 66, 0, 1) -', getMacAddress(100, 200, 2, 123, 66, 0, 1)); // '7b64c8027b420001'

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}