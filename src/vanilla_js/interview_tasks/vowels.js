const VOWELS_LIST = ['a', 'e', 'i', 'o', 'u', 'y'];

const testWord1 = 'Table';
const testWord2 = 'qzaffdeffo';
const testWord3 = 'vfAfghUOhYgIdE';
const testWord4 = 'AgfrUYfbbfdE';

function reversVowelsMySolution(inputString) {
    const preparedInputString = inputString.split('');
    let lastEndCharIds = preparedInputString.length - 1;

    for (let startCharIdx = 0; startCharIdx < lastEndCharIds; startCharIdx++) {
        const startChar = preparedInputString[startCharIdx];

        // found a vowel
        if (VOWELS_LIST.includes(startChar.toLowerCase())) {

            // going backwards
            for (let endCharIdx = lastEndCharIds; endCharIdx > -1 && endCharIdx > startCharIdx; endCharIdx--) {
                const endChar = preparedInputString[endCharIdx];

                if (VOWELS_LIST.includes(endChar.toLowerCase())) {
                    const temp = preparedInputString[startCharIdx];

                    preparedInputString[startCharIdx] = preparedInputString[endCharIdx];
                    preparedInputString[endCharIdx] = temp;

                    lastEndCharIds = endCharIdx - 1;
                    break;
                }
            }

            if (startCharIdx >= lastEndCharIds) {
                return preparedInputString.join('');
            }
        }
    }

    return preparedInputString.join('');
}

console.log(reversVowelsMySolution(testWord1));
console.log(reversVowelsMySolution(testWord2));
console.log(reversVowelsMySolution(testWord3));
console.log(reversVowelsMySolution(testWord4));