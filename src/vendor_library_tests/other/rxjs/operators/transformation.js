'use strict';

import { Observable, Subject } from 'rxjs';
import { map, scan, mergeMap, mapTo } from 'rxjs/operators';

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
            };
        });

        const testObserver1 = map((val) => val * 10)(testObservable1).subscribe(nextVal => {
            console.log(`Next val (observer 1): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver1.unsubscribe();
            resolve();
        }, 3100);

        // endregion
    });
}

async function testCase2()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable2 = new Observable(subscriber => {
            subscriber.next(10);
            subscriber.next(20);
            subscriber.next(30);

            let testValue = 40;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 10;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 2...');
            };
        });

        const testObserver2 = scan((acc, val) => acc + val)(testObservable2).subscribe(nextVal => {
            console.log(`Next val (observer 2): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver2.unsubscribe();
            resolve();
        }, 5000);

        // endregion
    });
}

async function testCase3()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable31 = new Observable(subscriber => {
            subscriber.next(10);
            subscriber.next(20);
            subscriber.next(30);

            let testValue = 40;

            const intervalId = setInterval(() => {
                console.log(`testObservable31 next...${testValue}`);
                subscriber.next(testValue);
                testValue += 10;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3-1...');
            };
        });

        const testObservable32 = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            let testValue = 4;

            const intervalId = setInterval(() => {
                console.log(`testObservable32 next: ${testValue}`);
                subscriber.next(testValue);
                testValue += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3-2...');
            };
        });

        const testObserver3 = testObservable31.pipe(
            mergeMap(testObservable31Val => {
                return testObservable32.pipe(map(testObservable32Val => testObservable32Val + testObservable31Val));
            })
        ).subscribe(nextVal => {
            console.log(`Next val (observer 3): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver3.unsubscribe();
            resolve();
        }, 5000);

        // endregion
    });
}

async function testCase4()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable4 = new Observable(subscriber => {
            subscriber.next(10);
            subscriber.next(20);
            subscriber.next(30);

            let testValue = 40;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 10;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 4...');
            };
        });

        const testSubject4 = new Subject();

        testSubject4.next(1);
        testSubject4.next(2);
        testSubject4.next(3);

        let testSubject4TestValue = 4;

        const testSubject4IntervalId = setInterval(() => {
            testSubject4.next(testSubject4TestValue);
            testSubject4TestValue += 1;
        }, 1000);

        const testObserver4 = testObservable4.pipe(
            mergeMap(testObservable4Val => {
                return testSubject4.pipe(map(testSubject4TestVal => testSubject4TestVal + testObservable4Val));
            })
        ).subscribe(nextVal => {
            console.log(`Next val (observer 4): ${nextVal}`);
        });

        setTimeout(() => {
            clearInterval(testSubject4IntervalId);
            testObserver4.unsubscribe();
            resolve();
        }, 5000);

        // endregion
    });
}

async function testCase5()
{
    return new Promise((resolve) => {

        // region actual example code
        const testSubject51 = new Subject();

        testSubject51.next(10);
        testSubject51.next(20);
        testSubject51.next(30);

        let testSubject51TestValue = 40;

        const testSubject51IntervalId = setInterval(() => {
            testSubject51.next(testSubject51TestValue);
            testSubject51TestValue += 10;
        }, 1000);

        const testSubject52 = new Subject();

        testSubject52.next(1);
        testSubject52.next(2);
        testSubject52.next(3);

        let testSubject52TestValue = 4;

        const testSubject52IntervalId = setInterval(() => {
            testSubject52.next(testSubject52TestValue);
            testSubject52TestValue += 1;
        }, 1000);

        const testObserver5 = testSubject51.pipe(
            mergeMap(testObservable51Val => {
                return testSubject52.pipe(map(testSubject52TestVal => testSubject52TestVal + testObservable51Val));
            })
        ).subscribe(nextVal => {
            console.log(`Next val (observer 5): ${nextVal}`);
        });

        setTimeout(() => {
            clearInterval(testSubject51IntervalId);
            clearInterval(testSubject52IntervalId);

            testObserver5.unsubscribe();
            resolve();
        }, 5000);

        // endregion
    });
}

async function testCase6()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable6 = new Observable(subscriber => {
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
            };
        });

        const testObserver6 = mapTo('-top-')(testObservable6).subscribe(nextVal => {
            console.log(`Next val (observer 6): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver6.unsubscribe();
            resolve();
        }, 3100);

        // endregion
    });
}

export default async () => {
    console.log('"RxJS" library tests (transformation operators)');
    console.log('==============================================');
    console.log('');

    console.log('Case 1 (single observable/observer, map operator):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('Case 2 (single observable/observer, scan operator):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('Case 3 (single observer, multiple observables, mergeMap operator):');
    console.log('');
    await testCase3();

    console.log('');
    console.log('Case 4 (single observer, single observable, single subject, mergeMap operator):');
    console.log('');
    await testCase4();

    console.log('');
    console.log('Case 5 (single observer, multiple subjects, mergeMap operator):');
    console.log('');
    await testCase5();

    console.log('');
    console.log('Case 6 (single observable/observer, mapTo operator):');
    console.log('');
    await testCase6();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
