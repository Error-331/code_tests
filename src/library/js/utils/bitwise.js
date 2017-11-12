'use strict';

export const convertToBinaryString = (numberToConvert, minLength = 4) => {
    let convertedNumber = numberToConvert.toString(2);
    const convertedNumberLength = convertedNumber.length;

    if (convertedNumberLength >= minLength) {
        return convertedNumber;
    }

    for (let paddingCounter = convertedNumberLength; paddingCounter < minLength; paddingCounter++)  {
        convertedNumber = '0' + convertedNumber;
    }

    return convertedNumber;
};