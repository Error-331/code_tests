'use strict';

import { Observable, interval } from 'rxjs';
import { filter, map, distinct, sample, sampleTime, takeUntil, debounce, throttle, distinctUntilChanged } from 'rxjs/operators';

async function testCase1()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable1 = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            let testValue = 4;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 1...');
                resolve();
            };
        });

        const testObserver1 = filter((val) => val % 2 === 0)(testObservable1).subscribe(nextVal => {
            console.log(`Next val (observer 1): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver1.unsubscribe();
        }, 4000);

        // endregion
    });
}

async function testCase2()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable2 = interval(1000)
            .pipe(
                map(_ => {
                    const originalNumber = Math.floor(Math.random() * Math.floor(4));
                    console.log(`Original number (random): ${originalNumber}`);

                    return originalNumber;
                }),
                distinct()
            );

        const testObserver1 = testObservable2.subscribe(nextVal => {
            console.log(`Next val (observer 2): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver1.unsubscribe();
            resolve();
        }, 10000);

        // endregion
    });
}

async function testCase3()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable3_1 = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            let testValue = 4;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3-1...');
                resolve();
            };
        });

        const testObservable3_2 = new Observable(subscriber => {
            const intervalId = setInterval(() => {
                subscriber.next('event-1');
            }, 1500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3-2...');
                resolve();
            };
        });

        const testObserver3 = testObservable3_1
            .pipe(sample(testObservable3_2))
            .subscribe(nextVal => {
                console.log(`Next val (observer 3): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver3.unsubscribe();
            resolve();
        }, 8000);

        // endregion
    });
}

async function testCase4()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable4 = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            let testValue = 4;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 500);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 4...');
                resolve();
            };
        });

        const testObserver4 = testObservable4
            .pipe(sampleTime(1500))
            .subscribe(nextVal => {
                console.log(`Next val (observer 4): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver4.unsubscribe();
            resolve();
        }, 8000);

        // endregion
    });
}

async function testCase5()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable5_1 = new Observable(subscriber => {
            setTimeout(() => {
                subscriber.next(1);
                subscriber.complete();
            }, 5000);

            return function unsubscribe() {
                console.log('Unsubscribing from observable 5_1...');
            };
        });

        const testObservable5_2 = interval(1000);
        const testObserver5_2 = testObservable5_2.pipe(takeUntil(testObservable5_1)).subscribe(nextVal => {
            console.log(`Next val (observer 5_2): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver5_2.unsubscribe();
            resolve();
        }, 10000);

        // endregion
    });
}

async function testCase6()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable61 = new Observable(subscriber => {
            let testValue = 1;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;

                subscriber.next(testValue);
                testValue += 1;

                subscriber.next(testValue);
                testValue += 1;
            }, 2000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 6-1...');
                resolve();
            };
        });

        const testObservable62 = new Observable(subscriber => {
            const timeoutId = setTimeout(() => {
                subscriber.complete();
            }, 1500);

            return function unsubscribe() {
                clearTimeout(timeoutId);
                console.log('Unsubscribing from observable 6-2...');
                resolve();
            };
        });

        const testObserver6 = testObservable61.pipe(debounce(() => testObservable62)).subscribe(nextVal => {
            console.log(`Next val (observer 6): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver6.unsubscribe();
        }, 8000);

        // endregion
    });
}

async function testCase7()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable71 = new Observable(subscriber => {
            let testValue = 1;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 7-1...');
                resolve();
            };
        });

        const testObservable72 = new Observable(subscriber => {
            const timeoutId = setTimeout(() => {
                subscriber.complete();
            }, 3000);

            return function unsubscribe() {
                clearTimeout(timeoutId);
                console.log('Unsubscribing from observable 7-2...');
            };
        });

        const testObserver7 = testObservable71.pipe(throttle(() => testObservable72)).subscribe(nextVal => {
            console.log(`Next val (observer 7): ${nextVal}`);
        });

        setTimeout(() => {
            resolve();
            testObserver7.unsubscribe();
        }, 8000);

        // endregion
    });
}




async function testCase8()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable8 = new Observable(subscriber => {
            subscriber.next({prop1: 1, prop2: 'a'});
            subscriber.next({prop1: 1, prop2: 'a'});
            subscriber.next({prop1: 1, prop2: 'b'});
            subscriber.next({prop1: 2, prop2: 'c'});
            subscriber.next({prop1: 3, prop2: 'c'});
            subscriber.next({prop1: 4, prop2: 'd'});
            subscriber.next({prop1: 5, prop2: 'g'});
            subscriber.next({prop1: 5, prop2: 'g'});
            subscriber.next({prop1: 6, prop2: 'e'});

            subscriber.complete();

            return function unsubscribe() {
                resolve();
                console.log('Unsubscribing from observable 8...');
            };
        });

        const testObserver8 = testObservable8.pipe(
            distinctUntilChanged((first, second) => first.prop1 === second.prop1 || first.prop2 === second.prop2),
        ).subscribe(nextVal => {
            console.log(`Next val (observer 8): ${nextVal.prop1}, ${nextVal.prop2}`);
        });


        // endregion
    });
}


export default async () => {
    console.log('"RxJS" library tests (filtering operators)');
    console.log('==========================================');
    console.log('');

    console.log('');
    console.log('Case 1 (single observable/observer, filter operator):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('Case 2 (single observable/observer, distinct operator):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('Case 3 (two observables, one observer, sample operator):');
    console.log('');
    await testCase3();

    console.log('');
    console.log('Case 4 (singe observable/observer, sampleTime operator):');
    console.log('');
    await testCase4();

    console.log('');
    console.log('Case 5 (two observable/observer, sampleTime operator):');
    console.log('');
    await testCase5();

    console.log('');
    console.log('Case 6 (two observable/observer, debounce operator):');
    console.log('');
    await testCase6();

    console.log('');
    console.log('Case 7 (two observable/observer, throttle operator):');
    console.log('');
    await testCase7();

    console.log('');
    console.log('Case 8 (two observable/observer, distinctUntilChanged operator):');
    console.log('');
    await testCase8();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
