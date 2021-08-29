'use strict';

import { Observable, Subject, interval } from 'rxjs';
import { map, scan, mergeMap, mapTo, mergeMapTo, switchMap, pairwise } from 'rxjs/operators';

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
                console.log(`testObservable3_1 next...${testValue}`);
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
                console.log(`testObservable3_2 next: ${testValue}`);
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

async function testCase7()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable71 = new Observable(subscriber => {
            let testValue = 10;

            const intervalId = setInterval(() => {
                console.log(`testObservable7_1 next...${testValue}`);
                subscriber.next(testValue);
                testValue += 10;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 7-1...');
            };
        });

        const testObservable72 = new Observable(subscriber => {
            let testValue = 1;

            const intervalId = setInterval(() => {
                console.log(`testObservable7_2 next: ${testValue}`);
                subscriber.next(testValue);
                testValue += 1;
            }, 3000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 7-2...');
            };
        });

        const testObserver7 = testObservable71.pipe(
            mergeMapTo(testObservable72)
        ).subscribe(nextVal => {
            console.log(`Next val (observer 7): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver7.unsubscribe();
            resolve();
        }, 15000);

        // endregion
    });
}

async function testCase8()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable81 = new Observable(subscriber => {
            let testValue = 10;

            const intervalId = setInterval(() => {
                console.log(`testObservable8_1 next...${testValue}`);
                subscriber.next(testValue);
                testValue += 10;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 8-1...');
            };
        });

        const testObservable82 = new Observable(subscriber => {
            subscriber.next(1);
            subscriber.next(2);
            subscriber.next(3);

            return function unsubscribe() {
                console.log('Unsubscribing from observable 8-2...');
            };
        });

        const testObserver8 = testObservable81.pipe(
            mergeMapTo(testObservable82)
        ).subscribe(nextVal => {
            console.log(`Next val (observer 8): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver8.unsubscribe();
            resolve();
        }, 10000);

        // endregion
    });
}

async function testCase9()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable91 = new Observable(subscriber => {
            let testValue = 10;

            const intervalId = setInterval(() => {
                console.log(`testObservable9_1 next...${testValue}`);
                subscriber.next(testValue);
                testValue += 10;
            }, 2000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 9-1...');
            };
        });

        const testObserver9 = testObservable91.pipe(
            mergeMapTo(interval(1000))
        ).subscribe(nextVal => {
            console.log(`Next val (observer 9): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver9.unsubscribe();
            resolve();
        }, 10000);

        // endregion
    });
}


async function testCase10()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable101 = new Observable(subscriber => {
            subscriber.next(1);
            let testValue = 2;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 1;
            }, 5000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 10-1...');
            };
        });

        const testObservable102 = new Observable(subscriber => {
            let testValue = 10;

            const intervalId = setInterval(() => {
                subscriber.next(testValue);
                testValue += 10;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 10-2...');
            };
        });

        const testObserver10 = testObservable101.pipe(
            switchMap(val => testObservable102.pipe(map(subVal => val + subVal)))
        )
            .subscribe(nextVal => {
                console.log(`Next val (observer 10): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver10.unsubscribe();
            resolve();
        }, 20000);

        // endregion
    });
}


async function testCase11()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable111 = new Observable(subscriber => {
            let testValue = 1;

            const intervalId = setInterval(() => {
                console.log(`testObservable11_1 next...${testValue}`);
                subscriber.next(testValue);
                testValue += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 11-1...');
            };
        });

        const testObserver11 = testObservable111.pipe(pairwise())
            .subscribe(nextVal => {
                console.log(`Next val (observer 11): ${nextVal}`);
            });

        setTimeout(() => {
            testObserver11.unsubscribe();
            resolve();
        }, 5000);

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
    console.log('Case 7 (two observable/observer, mergeMapTo operator):');
    console.log('');
    await testCase7();

    console.log('');
    console.log('Case 8 (two observable/observer (only one setInterval), mergeMapTo operator):');
    console.log('');
    await testCase8();

    console.log('');
    console.log('Case 9 (two observable/observer (one setInterval, one pure interval), switchMap operator):');
    console.log('');
    await testCase9();

    console.log('');
    console.log('Case 10 (two observable/observer, mergeMapTo operator):');
    console.log('');
    await testCase10();

    console.log('');
    console.log('Case 11 (one observable/observer, pairwise operator):');
    console.log('');
    await testCase11();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
