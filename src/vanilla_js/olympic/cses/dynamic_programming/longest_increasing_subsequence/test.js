import { readFileSync } from 'node:fs';

const data = readFileSync('./test_input2.txt').toString().split(' ').map(s => parseInt(s));

function binarySearch(arr, tailIndices, end, value) {
    let start = 0;
    let mid;

    while (start <= end) {
        mid = Math.floor((start + end) / 2);

        if (arr[tailIndices[mid]] < value) {
            start = mid + 1;
        } else if (arr[tailIndices[mid]] > value) {
            end = mid - 1;
        } else {
            return mid;
        }
    }

    return start;
}

function longestIncreasingSubsequence(arr) {
    let n = arr.length;
    let tailIndices = new Array(n).fill(0);
    let prevIndices = new Array(n).fill(-1);
    let len = 1;

    for (let i = 1; i < n; i++) {
        if (arr[i] < arr[tailIndices[0]]) {
            tailIndices[0] = i;
        } else if (arr[i] > arr[tailIndices[len - 1]]) {
            prevIndices[i] = tailIndices[len - 1];
            tailIndices[len++] = i;
        } else {
            let pos = binarySearch(arr, tailIndices, len - 1, arr[i]);
            prevIndices[i] = tailIndices[pos - 1];
            tailIndices[pos] = i;
        }
    }

    return len;
}

//const res = longestIncreasingSubsequence(data, data.length);

//console.log('res', res);


///

function longestIncreasingSubsequence1(arr) {
    let n = arr.length;
    let lis = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j] && lis[i] < lis[j] + 1) {
                lis[i] = lis[j] + 1;
            }
        }
    }

    return Math.max(...lis);
}

const res11 = longestIncreasingSubsequence1(data, data.length);

console.log('res1', res11);


//////////////////////////////////

function f2(checkFunc = () => true, params = [], checkInterval = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let checkResult = null;

            try {
                console.log('here');
                checkResult = checkFunc(...params);
            } catch (error) {
                console.log('here 2');
                return reject(error);
            }

            if (typeof checkResult === 'object') {
                checkResult
                    .then(checkSubResult => {
                        if (checkSubResult === true) {
                            resolve(checkSubResult);
                        } else {
                            return f2(checkFunc, params, checkInterval);
                        }
                    })
                    .catch(reject);
            } else {
                if (checkResult === true) {
                    resolve(checkResult);
                } else {
                    return f2(checkFunc, params, checkInterval)
                        .then(resolve)
                        .catch(reject);
                }
            }
        }, checkInterval);
    });
}

function f1(checkFunc = () => true, params = [], checkInterval = 0, timeoutBeforeCancel = 0) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            console.log('timeout!!!');
            reject();
        }, timeoutBeforeCancel);

        f2(checkFunc, params, checkInterval)
            .then(result => {
                if (result === true) {
                    resolve();
                } else {
                    return f2(checkFunc, params, checkInterval);
                }
            })
            .catch(reject)
    });
}

let cnt = 0;

const checkFunc = () => {
    if (cnt === 2) {
        console.log('nope', cnt);
        cnt += 1;
    } else if (cnt < 100) {
        console.log('nope', cnt);
        cnt += 1;
        return Promise.resolve(false);
    } else if (cnt === 100) {
        console.log('yep', cnt);
        return Promise.resolve(true);
    }
};

f1(checkFunc, [], 2000, 7000)
    .then((res) => {
        console.log('glob resolve', res);
    })
    .catch(error => {
        console.log('glob err', error);
    });


//////////

function attemptAsyncFuncNext(func, attempt) {
    try {
        return func()
            .catch(error => {
                if (attempt <= 0) {
                    return Promise.reject(error);
                } else {
                    return attemptAsyncFuncNext(func, attempt - 1);
                }
            });
    } catch (error) {
        return Promise.reject(error);
    }
}

function attemptAsyncFunc(func, attempts = 5) {
    if (attempts <= 0) {
        return Promise.reject(`Number of attempts cannot be less then or equal to zero (${attempts})`);
    }

    return attemptAsyncFuncNext(func, attempts - 1);
}

let cnt1 = 0;

const fu = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cnt1 === 3) {
                resolve('data1')
            } else {
                console.log('reject');
                reject('err1');
            }

            cnt1+= 1;
        }, 2000)
    })
}

attemptAsyncFunc(fu)
    .then((res) => {
        console.log('good', res);
    })
    .catch((e) => {
        console.log('bad', e)
    })


//////////

const testArray1 = [7, 3, 5, 3, 6, 2, 9, 8];
const testArray2 = [7, 3, 5, 7, 3, 6, 2, 9, 8];
const testArray3 = [3, 4, 5, 6, 2, 3, 4, 5, 6, 7];

const testArrDyn = [10, 8, 6, 7, 7, 3, 2, 8, 6, 3]; // 3



function longestSubsequence(arr, n) {
    // declaring the dp
    let dp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
    for (let curr = n - 1; curr >= 0; curr--) {
        for (let prev = curr - 1; prev >= -1; prev--) {

            // including the element
            let take = 0;
            // element is included if arr[curr]> arr[prev]
            if (prev == -1 || arr[curr] > arr[prev]) {
                take = 1 + dp[curr + 1][curr + 1];
            }

            // excluding the element
            let notTake = dp[curr + 1][prev + 1];

            dp[curr][prev + 1] = Math.max(take, notTake);
        }
    }

    return dp[0][0];
}

console.log('ss', longestSubsequence(testArrDyn, testArrDyn.length));


const length1 = [];

function max1(first, second) {
    if (first > second) {
        return first
    } else {
        return second;
    }
}

function s1(array1, n) {
    let longest = 0;

    for (let k = 0; k < n; k++) {
        length1 [k] = 1;

        for (let i = 0; i < k; i++) {
            if (array1[i] < array1[k]) {
                length1[k] = max1(length1[k],length1 [i]+1);

                if (length1[k] > longest) {
                    longest = length1[k];
                }
            }
        }
    }

    return longest;
}

//const res = s1(testArrDyn, testArrDyn.length);

//console.log(res);



let betSeqLengthGlob = 0;

const memo1 = new Map();

function subF2(testArray, length, currentDigit, digitIdx, seqLength) {
    const key = `${currentDigit}-${digitIdx}-${seqLength}`;
    if (memo1.has(key)) {
        console.log('z');
        return memo1.get(key);
    }

    let bestSeqLength = seqLength;

    if ((length - (digitIdx + 1) + bestSeqLength) < betSeqLengthGlob) {
        return bestSeqLength
    }

    for (let subDigitIdx = digitIdx + 1; subDigitIdx < length; subDigitIdx++) {
        if (testArray[subDigitIdx] > currentDigit) {
            const currentSeqLength = subF2(testArray, length, testArray[subDigitIdx], subDigitIdx, seqLength + 1);

            if (currentSeqLength > bestSeqLength) {
                bestSeqLength = currentSeqLength;
            }
        }
    }

    memo1.set(key, bestSeqLength);
    return bestSeqLength;
}

function f2(testArray, length) {
    for (let digitIdx = 0; digitIdx < length; digitIdx++) {
        const currentSeqLength = subF2(testArray, length, testArray[digitIdx], digitIdx, 1);

        if (currentSeqLength > betSeqLengthGlob) {
            betSeqLengthGlob = currentSeqLength;
        }
    }

    return betSeqLengthGlob;
}

//const result = f2(testArrDyn, testArrDyn.length);

//console.log(result);

function f1(testArray, length) {
    let currentDigit = testArray[0];
    let currentDigitPosition = 0;

    let bestSeqStartPos = 0;
    let estSeqLength = length;

    for (let posIdx = 1; posIdx < length; posIdx++) {
        const nextDigit = testArray[posIdx];
        let possibleSeqLength = (length - posIdx);

        if (
            nextDigit < currentDigit &&
            (currentDigit - nextDigit) > 0
        ) {



            //  currentDigit = nextDigit;
            //  bestSeqStartPos = posIdx;
        }
    }

}