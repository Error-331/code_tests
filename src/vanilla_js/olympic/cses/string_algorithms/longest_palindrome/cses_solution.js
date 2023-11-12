const readline = require('readline');

function longestPalindromeNaiveSolution(stringToExamine) {
    const stringLength = stringToExamine.length;

    let longestPalindrome = null;
    let longestPalindromeLength = 0;

    for (let palLength = stringLength; palLength >= 2 ; palLength--) {
        let endIndex = palLength;

        do {
            const middleIndex = Math.floor(palLength / 2);
            const palindrome = new Array(palLength);

            let isFound = true;

            for (let letterIndex = 0; letterIndex < middleIndex; letterIndex++) {
                if (stringToExamine[endIndex - palLength + letterIndex] !== stringToExamine[endIndex - 1 - letterIndex]) {
                    isFound = false;
                    break;
                }

                palindrome[letterIndex] = stringToExamine[endIndex - palLength + letterIndex];
                palindrome[palLength - 1 - letterIndex] = stringToExamine[endIndex - 1 - letterIndex];
            }

            if (isFound === true) {
                if (palLength % 2 > 0) {
                    palindrome[middleIndex] = stringToExamine[endIndex - 1 - middleIndex];
                }

                if (palindrome.length > longestPalindromeLength) {
                    longestPalindrome = palindrome;
                    longestPalindromeLength = palindrome.length;
                }
            }

            endIndex += 1;
        } while(endIndex <= stringLength);

        if (longestPalindrome !== null) {
            return longestPalindrome.join('');
        }
    }

    return longestPalindrome === null ? '' : longestPalindrome.join('');
}

const readlineInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

readlineInstance.on('line', (input) => {
    console.log(longestPalindromeNaiveSolution(input));
});
