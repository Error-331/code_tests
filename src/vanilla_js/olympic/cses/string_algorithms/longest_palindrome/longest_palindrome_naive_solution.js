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

// 0 - two letter palindrome, 1 - three letter palindrome, etc.
/*function longestPalindromeBetterNaiveSolution(stringToExamine) {
    const stringLength = stringToExamine.length;
    const lettersToPalindromeList = new Array(stringLength);

    lettersToPalindromeList.push([false, false])

    for (let letterIdx = 1; letterIdx < stringLength; letterIdx++) {
        const letterPalindromeList = new Array(letterIdx);
        const currentLetter = stringToExamine[letterIdx];

        lettersToPalindromeList.push(letterPalindromeList);

        if (currentLetter === stringToExamine[letterIdx - 1]) {
            letterPalindromeList[0] = true;
        }

        if (letterIdx > 1 && currentLetter === stringToExamine[letterIdx - 2]) {
            letterPalindromeList[1] = true;
        }


        const middleLetterIndex = Math.floor(letterIdx / 2);

        for (let i = letterIdx; i > middleLetterIndex; i--) {

        }
    }

    return lettersToPalindromeList;
}*/

function longestPalindromeDivideAndConquerNaiveSolution(stringToExamine) {
    const stringLength = stringToExamine.length;

    let reminder = stringLength % 2;
    let middleIndex = Math.floor(stringLength / 2);



    for (let i = middleIndex - 1, j = middleIndex + (reminder > 0 ? 1 : 0);  i >= 0; i--, j++) {
        console.log('i', i, stringToExamine[i]);
        console.log('j', j, stringToExamine[j]);
    }
}


const dString = '12345';
const testString1 = 'bbaabbaabbbaaaaaaaaaaaabbbaa';
const testString2 = 'aybabtutabaabba';
const testString3 = 'pan';

//console.log(longestPalindromeNaiveSolution(testString3));
//console.log(longestPalindromeBetterNaiveSolution(testString2));


function photoshopDropShadow2CSSBoxShadow(color, opacity, angle, distance, spread, size) {
    // convert the angle to radians
    angle = (180 - angle) * Math.PI / 180;

    // the color is just an rgba() color with the opacity.
    // for simplicity this function expects color to be an rgb string
    // in CSS, opacity is a decimal between 0 and 1 instead of a percentage
    color = "rgba(" + color + "," + opacity/100 + ")";

    // other calculations
    var offsetX = Math.round(Math.cos(angle) * distance) + "px",
        offsetY = Math.round(Math.sin(angle) * distance) + "px",
        spreadRadius = (size * spread / 100) + "px",
        blurRadius = (size - parseInt(spreadRadius, 10)) + "px";
    return offsetX + " " + offsetY + " " + blurRadius + " " + spreadRadius + " " + color;
}

console.log(photoshopDropShadow2CSSBoxShadow('89,89,89', 19, 120, 1, 0, 0));

//

//box-shadow: offset-x offset-y blur-radius spread-radius rgba(0, 0, 0, opacity) inset;

//text-shadow: offset-x offset-y blur-radius rgba(0,0,0 opacity);