'use strict';

import { Observable } from 'rxjs';

async function testCase1() {
    return new Promise((resolve) => {
        const testObservable1 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            const intervalId = setTimeout(() => {
                subscriber.next('test val...timeout...');
                subscriber.complete();
                resolve();
            }, 1500);
        });

        const testObserver1 = testObservable1.subscribe(nextVal => {
            console.log(`Next val (observer 1): ${nextVal}`);
        });
    });
}

async function testCase2()
{
    return new Promise((resolve) => {
        const testObservable2 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            const intervalId = setInterval(() => {
                subscriber.next('test val...interval...');
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 2...');
                resolve();
            };
        });

        const testObserver2 = testObservable2.subscribe(nextVal => {
            console.log(`Next val (observer 2): ${nextVal}`);
        });

        setTimeout(() => {
            testObserver2.unsubscribe();
        }, 3100);
    });
}

async function testCase3()
{
    return new Promise((resolve) => {
        const testObservable3 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            const intervalId = setInterval(() => {
                subscriber.next('test val...interval...');
            }, 1000);

            setTimeout(() => {
                subscriber.complete();
            }, 3100);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 3...');
                resolve();
            };
        });

        const testObserver3 = testObservable3.subscribe({
            next(nextVal) { console.log(`Next val (observer 3): ${nextVal}`) },
            error(error) { console.error('Error occurred (observer 3): ' + error); },
            complete() { console.log('Flow is ended (observer 3)'); } // may not be called if unsubscribed
        });

        setTimeout(() => {
            testObserver3.unsubscribe();
        }, 3200);
    });
}

async function testCase4()
{
    return new Promise((resolve) => {
        const testObservable4 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            let valueCounter = 0;

            const intervalId = setInterval(() => {
                subscriber.next(`test val ${valueCounter}...interval...`);
                valueCounter += 1;
            }, 2000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 4...');
                resolve();
            };
        });

        const testObserver4_1 = testObservable4.subscribe({
            next(nextVal) { console.log(`Next val (observer 4-1): ${nextVal}`) },
            error(error) { console.error('Error occurred (observer 4-1): ' + error); },
            complete() { console.log('Flow is ended (observer 4-1)'); } // may not be called if unsubscribed
        });

        let testObserver4_2;

        setTimeout(() => {
            testObserver4_2 = testObservable4.subscribe({
                next(nextVal) { console.log(`Next val (observer 4-2): ${nextVal}`) },
                error(error) { console.error('Error occurred (observer 4-2): ' + error); },
                complete() { console.log('Flow is ended (observer 4-2)'); } // may not be called if unsubscribed
            });

        }, 4000);

        setTimeout(() => {
            testObserver4_1.unsubscribe();
            testObserver4_2.unsubscribe();
        }, 10000);
    });
}

async function testCase5()
{
    return new Promise((resolve) => {
        const testObservable5 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            let valueCounter = 0;

            const intervalId = setInterval(() => {
                subscriber.next(`test val ${valueCounter}...interval...`);
                valueCounter += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 5...');
                resolve();
            };
        });

        let testObserver5_1;
        let testObserver5_2;

        setTimeout(() => {
            testObserver5_1 = testObservable5.subscribe(
                (nextVal) => { console.log(`Next val (observer 5-1): ${nextVal}`) },
                (error) => { console.error('Error occurred (observer 5-1): ' + error); },
                () => { console.log('Flow is ended (observer 5-1)'); } // may not be called if unsubscribed
            );

            testObserver5_2 = testObservable5.subscribe(
                (nextVal) => { console.log(`Next val (observer 5-2): ${nextVal}`) },
                (error) => { console.error('Error occurred (observer 5-2): ' + error); },
                () => { console.log('Flow is ended (observer 5-2)'); } // may not be called if unsubscribed
            );
        }, 4000);

        setTimeout(() => {
            testObserver5_1.unsubscribe();
            testObserver5_2.unsubscribe();
        }, 10000);
    });
}

export default async () => {
    console.log('"RxJS" library tests (basics)');
    console.log('=============================');
    console.log('');

    console.log('Case 1 (simple single observable/observer):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('Case 2 (simple single observable/observer, periodic updates):');
    console.log('');
    await testCase2();

    console.log('');
    console.log('Case 3 (Two out of sync observable/observer, periodic updates):');
    console.log('');
    await testCase3();

    console.log('');
    console.log('Case 4 (Two sync observable/observer (second began to listen later), periodic updates):');
    console.log('');
    await testCase4();

    console.log('');
    console.log('Case 5 (Two sync observable/observer (both began to listen later), periodic updates):');
    console.log('');
    await testCase5();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}