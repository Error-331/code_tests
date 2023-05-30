const readline = require('readline');

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

const readlineInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

readlineInstance.on('line', (input) => {
    console.log(repetitionsNaiveSolution(input));
});