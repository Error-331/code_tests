// 'инн' validator
function uaTINValidator(tinNumber)
{
    let tinNumberCopy = tinNumber;

    if (typeof tinNumber === 'string') {
        tinNumberCopy = tinNumberCopy.split('');
    }

    const checksum = parseInt(tinNumberCopy[0]) * (-1) +
        parseInt(tinNumberCopy[1]) * 5 +
        parseInt(tinNumberCopy[2]) * 7 +
        parseInt(tinNumberCopy[3]) * 9 +
        parseInt(tinNumberCopy[4]) * 4 +

        parseInt(tinNumberCopy[5]) * 6 +
        parseInt(tinNumberCopy[6]) * 10 +
        parseInt(tinNumberCopy[7]) * 5 +

        parseInt(tinNumberCopy[8]) * 7;

    return parseInt(tinNumberCopy[9]) === (checksum % 11) % 10;
}

function uaTINGeneratorLoose(year, month, day, sex) {
    const startDate = new Date(1899, 11, 31);
    const currentBirthDate = new Date(year, month - 1, day);

    const diffDate = currentBirthDate - startDate;
    const diffDays = Math.ceil(diffDate / (1000 * 60 * 60 * 24));
    const diffDaysString = diffDays.toString();
    const diffDaysArray = diffDaysString.split('').map(day => parseInt(day));

    const preSum = diffDaysArray[0] * (-1) +
    diffDaysArray[1] * 5 +
    diffDaysArray[2] * 7 +
    diffDaysArray[3] * 9 +
    diffDaysArray[4] * 4;

    const maleNumbers = [1, 3, 5, 7, 9];
    const femaleNumbers = [2, 4, 6, 8];

    let sexNumbers = sex === 1 ? maleNumbers : femaleNumbers;

    const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const results = [];

    for (const checkNumber of numbersArray) {
        for (const sexNumber of sexNumbers) {
            for (const idNumber1 of numbersArray) {
                for (const idNumber2 of numbersArray) {
                    for (const idNumber3 of numbersArray) {
                        let checksum = preSum +

                            idNumber1 * 6 +
                            idNumber2 * 10 +
                            idNumber3 * 5 +

                            sexNumber * 7;

                        checksum = (checksum % 11) % 10;


                        if (checkNumber === checksum) {
                            const tinNumber = diffDaysString +
                                idNumber1.toString() +
                                idNumber2.toString() +
                                idNumber3.toString() +

                                sexNumber.toString() +

                                checkNumber.toString();

                            results.push(tinNumber);
                        }
                    }
                }
            }

        }
    }

    return results;
}
