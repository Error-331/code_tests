'use strict';

export default async () => {
    const bindFirstArg = (customFunction, firstArgument) => {
        return (secondArgument) => {
            return customFunction(firstArgument, secondArgument);
        };
    };

    const bindSecondArg = (customFunction, secondArgument) => {
        return (firstArgument) => {
            return customFunction(firstArgument, secondArgument);
        };
    };

    const powersOfTwo = bindFirstArg(Math.pow, 2);

    const squareOf = bindSecondArg(Math.pow, 2);
    const cubeOf = bindSecondArg(Math.pow, 3);

    console.log('Function factories');
    console.log('==================');
    console.log('');

    console.log('Partial left binding examples: ');
    console.log('');
    console.log('powersOfTwo(3) -', powersOfTwo(3));
    console.log('powersOfTwo(5) -', powersOfTwo(5));
    console.log('');

    console.log('Partial right binding examples: ');
    console.log('');
    console.log('squareOf(3) -', squareOf(3));
    console.log('squareOf(4) -', squareOf(4));
    console.log('cubeOf(3) -', cubeOf(3));
    console.log('cubeOf(4) -', cubeOf(4));

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}