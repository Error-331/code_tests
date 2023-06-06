/**
 * @NApiVersion 2.1
 *
 * Version    Date           Author           Remarks
 * 1.00       15 Feb 2023    Sergei Selihov
 *
 */
define([
        './general_utils.js',
    ],
    (
        { isArray, isNumber }
    ) => {
        function runCallbackOnChunksSync(dataArray = [], step = 10, callback = () => {}) {
            if (!isArray(dataArray)) {
                throw new Error('Provided data is not an array');
            }

            if (!isNumber(step)) {
                throw new Error('Provided "step" is not a number');
            }

            if (step <= 0) {
                throw new Error('Step cannot be less than or equal to zero');
            }

            let startIdx = 0;
            let elementsSlice = dataArray.slice(startIdx, startIdx + step);

            while(elementsSlice.length > 0) {
                callback(elementsSlice)
                startIdx += step;
                elementsSlice = dataArray.slice(startIdx, startIdx + step);
            }
        }

        return {
            runCallbackOnChunksSync
        }
    });
