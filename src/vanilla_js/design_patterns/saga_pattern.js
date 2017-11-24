'use strict';

export default async () => {
    class PromisesSagaClass {
        _whenAllPromisesFinish(promisesArray) {
            const totalPromises = promisesArray.length;

            let promisesResults = [];
            let promisesErrors = [];

            let promisesResolved = 0;
            let isErrorCaught = false;

            return new Promise((resolve, reject) => {
                const promiseHandler = () => {
                    if (promisesResolved >= totalPromises) {
                        isErrorCaught ? reject(promisesErrors) : resolve(promisesResults);
                    }
                };

                promisesArray.forEach(promise => {
                    promise
                        .then(promiseResult => {
                            promisesResolved++;
                            promisesResults.push(promiseResult);
                            promiseHandler(promiseResult);
                        })
                        .catch(error => {
                            isErrorCaught = true;
                            promisesResolved++;
                            promisesErrors.push(error);
                            promiseHandler(error);
                        });
                });
            });
        }

        _tryFunction(resultingFunction, resultingFunctionIndex, tryCountMaximum, tryCount = 0) {
            return new Promise((resolve, reject) => {
                resultingFunction()
                    .then(resolveValue => {
                        console.log(`Function (${resultingFunctionIndex}) successfully resolved...`);
                        resolve(resolveValue);
                    })
                    .catch((error) => {
                        tryCount++;

                        if (tryCount > tryCountMaximum) {
                            console.error(`Number of tries for function (${resultingFunctionIndex}) exceeded global number of tries`);
                            reject(error);
                        } else {
                            console.log(`Making another try (${tryCount}) for function (${resultingFunctionIndex})...`);
                            resolve(this._tryFunction(resultingFunction, resultingFunctionIndex, tryCountMaximum, tryCount));
                        }
                    });
            });
        }

        execute() {
            return new Promise((resolve, reject) => {
                console.log('Trying resulting functions...');
                const resultingPromises = this._resultingFunctionsArray.map((resultingFunction, resultingFunctionIndex) => this._tryFunction(resultingFunction, resultingFunctionIndex + 1, this._numberOfTries));

                this._whenAllPromisesFinish(resultingPromises)
                    .then(resultingFunctionsResults => {
                        console.log('All is ok');
                        resolve([1, resultingFunctionsResults])
                    })
                    .catch(resultingFunctionsErrors => {
                        console.log('Some resulting functions fail, trying to run rollback functions');

                        const rollbackPromises = this._rollbackFunctionsArray.map((resultingFunction, resultingFunctionIndex) => this._tryFunction(resultingFunction, resultingFunctionIndex + 1, this._numberOfRollbackTries));
                        this._whenAllPromisesFinish(rollbackPromises)
                            .then(compensationFunctionsResults => {
                                console.log('All is ok');
                                resolve([2, resultingFunctionsErrors, compensationFunctionsResults]);
                            })
                            .catch(compensationFunctionsErrors => {
                                console.log('Some rollback functions fail');
                                reject([3, resultingFunctionsErrors, compensationFunctionsErrors]);
                            });
                    });
            });
        }

        constructor(resultingFunctionsArray = [], rollbackFunctionsArray = [], numberOfTries = 3, numberOfRollbackTries = 5) {
            this._resultingFunctionsArray = resultingFunctionsArray;
            this._rollbackFunctionsArray = rollbackFunctionsArray;

            this._numberOfTries = numberOfTries;
            this._numberOfRollbackTries = numberOfRollbackTries;
        }
    }

    const generateTrueOrFalse = () => Math.floor(Math.random() * 2) === 1;

    const testResFunc11 = _ => new Promise((resolve, reject) => setTimeout(_ => generateTrueOrFalse() ? resolve('Result resolve 1') : reject('Result reject 1'), 2000));
    const testResFunc21 = _ => new Promise((resolve, reject) => setTimeout(_ => generateTrueOrFalse() ? resolve('Result resolve 2') : reject('Result reject 2'), 1500));
    const testResFunc31 = _ => new Promise((resolve, reject) => setTimeout(_ => generateTrueOrFalse() ? resolve('Result resolve 3') : reject('Result reject 3'), 500));
    const testResFunc41 = _ => new Promise((resolve, reject) => setTimeout(_ => generateTrueOrFalse() ? resolve('Result resolve 4') : reject('Result reject 4'), 3000));

    const testCompensationFunc11 = _ => new Promise((resolve, reject) => setTimeout(_ => generateTrueOrFalse() ? resolve('Rollback resolve 1') : reject('Rollback reject 1'), 2000));
    const testCompensationFunc21 = _ => new Promise((resolve, reject) => setTimeout(_ => generateTrueOrFalse() ? resolve('Rollback resolve 2') : reject('Rollback reject 2'), 1500));
    const testCompensationFunc31 = _ => new Promise((resolve, reject) => setTimeout(_ => generateTrueOrFalse() ? resolve('Rollback resolve 3') : reject('Rollback reject 3'), 500));
    const testCompensationFunc41 = _ => new Promise((resolve, reject) => setTimeout(_ => generateTrueOrFalse() ? resolve('Rollback resolve 4') : reject('Rollback reject 4'), 3000));

    const promisesSaga1 = new PromisesSagaClass([testResFunc11, testResFunc21, testResFunc31, testResFunc41], [testCompensationFunc11, testCompensationFunc21, testCompensationFunc31, testCompensationFunc41]);
    const promisesSaga2 = new PromisesSagaClass([testResFunc11, testResFunc21, testResFunc31, testResFunc41], [testCompensationFunc11, testCompensationFunc21, testCompensationFunc31, testCompensationFunc41], 0);
    const promisesSaga3 = new PromisesSagaClass([testResFunc11, testResFunc21, testResFunc31, testResFunc41], [testCompensationFunc11, testCompensationFunc21, testCompensationFunc31, testCompensationFunc41], 0, 0);

    console.log('Saga design pattern');
    console.log('===================');
    console.log('');

    console.log('Full number of retries');
    console.log('');

    try {
        const results = await promisesSaga1.execute();
        console.log('');
        console.log('Resulting functions results:', results);
    } catch ([errorCode,resultingFunctionsErrors, rollbackFunctionsResults]) {
        console.log('');
        console.log(`Erroneous (${errorCode}) results -`, `[${resultingFunctionsErrors}], [${rollbackFunctionsResults}]`);
    }

    console.log('');
    console.log('Full number of retries for rollback functions only');
    console.log('');

    try {
        const results = await promisesSaga2.execute();
        console.log('');
        console.log('Resulting functions results:', results);
    } catch ([errorCode,resultingFunctionsErrors, rollbackFunctionsResults]) {
        console.log('');
        console.log(`Erroneous (${errorCode}) results -`, `[${resultingFunctionsErrors}], [${rollbackFunctionsResults}]`);
    }

    console.log('');
    console.log('No retries');
    console.log('');

    try {
        const results = await promisesSaga3.execute();
        console.log('');
        console.log('Resulting functions results:', results);
    } catch ([errorCode,resultingFunctionsErrors, rollbackFunctionsResults]) {
        console.log('');
        console.log(`Erroneous (${errorCode}) results -`, `[${resultingFunctionsErrors}], [${rollbackFunctionsResults}]`);
    }

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
};