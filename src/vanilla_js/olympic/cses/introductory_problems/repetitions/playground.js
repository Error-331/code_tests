const testInput1 = 'ATTCGGGA';

const csesTestInput1 = 'AAAAAAAAAA';
const csesTestInput2 = 'ACACACACAC';

function repetitionsNaiveSolution(testSequence) {
    let trackingSymbol = null;

    let trackingLength = 0;
    let maxTrackingLength = 0;

    const testSequenceLength = testSequence.length;

    for (let symbolCounter = 0; symbolCounter < testSequenceLength; symbolCounter++) {
        const currentSymbol = testSequence[symbolCounter];

        if (trackingSymbol === null) {
            trackingSymbol = currentSymbol;
            trackingLength += 1;
        } else if (trackingSymbol === currentSymbol) {
            trackingLength += 1;
        } else {
            trackingSymbol = currentSymbol;

            maxTrackingLength = trackingLength > maxTrackingLength ? trackingLength : maxTrackingLength;
            trackingLength = 1;
        }
    }

    maxTrackingLength = trackingLength > maxTrackingLength ? trackingLength : maxTrackingLength;
    return maxTrackingLength;
}

console.log('Repetitions');
console.log('============');
console.log('');

console.log('Naive solution');
console.log('--------------');
console.log('');

console.log('Repetitions (1) - naive solution (case 1)');
console.log('Repetitions: ', repetitionsNaiveSolution(testInput1));
console.log('');

console.log('Repetitions (2) - naive solution (case 2)');
console.log('Repetitions: ', repetitionsNaiveSolution(csesTestInput1));
console.log('');

console.log('Repetitions (3) - naive solution (case 3)');
console.log('Repetitions: ', repetitionsNaiveSolution(csesTestInput2));
console.log('');
