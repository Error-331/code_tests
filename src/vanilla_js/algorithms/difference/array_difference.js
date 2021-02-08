const testArray1 = [2, 5, 7, 12, 55, 23];
const testArray2 = [12, 1, 3, 4, 55, 6, 7];

function arrayDiffLeftAlgorithmNaive(arr1, arr2) {
    const resultArr = [];
    let found;

    for (let arr1Index = 0; arr1Index < arr1.length; arr1Index++) {
        found = false;

        for (let arr2Index = 0; arr2Index < arr2.length; arr2Index++) {
            if (arr1[arr1Index] === arr2[arr2Index]) {
                found = true;
                break;
            }
        }

        if (found !== true) {
            resultArr.push(arr1[arr1Index]);
        }
    }

    return resultArr;
}


console.log('Array difference (left)');
console.log('=======================');

console.log('');

console.log('Array difference (case 1): ', arrayDiffLeftAlgorithmNaive(testArray1, testArray2));
