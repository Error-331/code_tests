'use strict';

export default async () => {

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

    Function.prototype.curry = function (numArgs) {
        const self = this;
        numArgs = numArgs || self.length;

        function subCurry(prev) {
            return function (arg) {
                const args = prev.concat(arg);

                if (args.length < numArgs) {
                    return subCurry(args);
                }
                else {
                    return self.apply(this, args);
                }
            };
        }

        return subCurry([]);
    };

    const hexColors = rgbTohex.curry();

    const redBasedHexColor = (green, blue) => hexColors(255)(green)(blue);
    const greenBasedHexColor = (red, blue) => hexColors(red)(255)(blue);
    const blueBasedHexColor = (red, green) => hexColors(red)(green)(255);

    console.log('Currying');
    console.log('========');
    console.log('');


    console.log('Curried hexColors():');
    console.log('');

    console.log('hexColors(11)(12)(123) -', hexColors(11)(12)(123));
    console.log('hexColors(210)(12)(0) -', hexColors(210)(12)(0));

    console.log('');

    console.log('More specific functions based on hexColors():');
    console.log('');

    console.log('redBasedHexColor(11, 12) -', redBasedHexColor(11, 12));
    console.log('greenBasedHexColor(11, 12) -', greenBasedHexColor(11, 12));
    console.log('blueBasedHexColor(11, 12) -', blueBasedHexColor(11, 12));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}