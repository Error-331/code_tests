'use strict';

import { Observable, Subject, interval } from 'rxjs';
import { multicast } from 'rxjs/operators';

async function testCase1()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable1 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            let valueCounter = 4;

            const intervalId = setInterval(() => {
                subscriber.next(`test val ${valueCounter}...interval...`);
                valueCounter += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(intervalId);
                console.log('Unsubscribing from observable 1...');
            };
        });

        const testSubject1 = new Subject();

        const testObserver1_1 = testSubject1.subscribe({
            next(nextVal) { console.log(`Next val (subject 1-1): ${nextVal}`) },
            error(error) { console.error('Error occurred (subject 1-1): ' + error); },
            complete() { console.log('Flow is ended (subject 1-1)'); } // may not be called if unsubscribed
        });

        let testObserver1_2;

        setTimeout(() => {
            testObserver1_2 = testSubject1.subscribe({
                next(nextVal) { console.log(`Next val (subject 1-2): ${nextVal}`) },
                error(error) { console.error('Error occurred (subject 1-2): ' + error); },
                complete() { console.log('Flow is ended (subject 1-2)'); } // may not be called if unsubscribed
            });
        }, 4000);

        const testObservable1Subscription = testObservable1.subscribe(testSubject1);

        setTimeout(() => {
            testObservable1Subscription.unsubscribe();

            testObserver1_1.unsubscribe();
            testObserver1_2.unsubscribe();

            resolve();
        }, 10000);

        // endregion
    });
}

async function testCase2()
{
    return new Promise((resolve) => {
        const testObservable1 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            let valueCounter = 4;

            const testObservableIntervalId = setInterval(() => {
                subscriber.next(`test val ${valueCounter}...interval...`);
                valueCounter += 1;
            }, 1000);

            return function unsubscribe() {
                clearInterval(testObservableIntervalId);
                console.log('Unsubscribing from observable 1...');
            };
        });

        const testSubject1 = new Subject();

        const testObserver1_1 = testSubject1.subscribe({
            next(nextVal) { console.log(`Next val (subject 1-1): ${nextVal}`) },
            error(error) { console.error('Error occurred (subject 1-1): ' + error); },
            complete() { console.log('Flow is ended (subject 1-1)'); } // may not be called if unsubscribed
        });

        let testObserver1_2;

        setTimeout(() => {
                testObserver1_2 = testSubject1.subscribe({
                    next(nextVal) { console.log(`Next val (subject 1-2): ${nextVal}`) },
                    error(error) { console.error('Error occurred (subject 1-2): ' + error); },
                    complete() { console.log('Flow is ended (subject 1-2)'); } // may not be called if unsubscribed
                });
            }, 4000
        );

        const multicastObserver = testObservable1.pipe(multicast(testSubject1));
        const multicastObserverSubscription = multicastObserver.connect();

        setTimeout(() => {
            multicastObserverSubscription.unsubscribe();

            testObserver1_1.unsubscribe();
            testObserver1_2.unsubscribe();

            resolve();
        }, 10000);
    });
}

async function testCase3()
{
    return new Promise((resolve) => {
        const testObservable1 = interval(1000);
        const testSubject1 = new Subject();

        const testObserver1_1 = testSubject1.subscribe({
            next(nextVal) { console.log(`Next val (subject 1-1): ${nextVal}`) },
            error(error) { console.error('Error occurred (subject 1-1): ' + error); },
            complete() { console.log('Flow is ended (subject 1-1)'); } // may not be called if unsubscribed
        });

        let testObserver1_2;

        setTimeout(() => {
                testObserver1_2 = testSubject1.subscribe({
                    next(nextVal) { console.log(`Next val (subject 1-2): ${nextVal}`) },
                    error(error) { console.error('Error occurred (subject 1-2): ' + error); },
                    complete() { console.log('Flow is ended (subject 1-2)'); } // may not be called if unsubscribed
                });
            }, 4000
        );

        const multicastObserver = testObservable1.pipe(multicast(testSubject1));
        const multicastObserverSubscription =  multicastObserver.connect();

        setTimeout(() => {
            multicastObserverSubscription.unsubscribe();

            testObserver1_1.unsubscribe();
            testObserver1_2.unsubscribe();

            resolve();
        }, 10000);
    });
}

export default async () => {
    console.log('"RxJS" library tests (subject advanced)');
    console.log('=======================================');
    console.log('');

    console.log('Case 1 (Two out of sync observers (second began to listen later), which listen to observable which listen the subject, periodic updates):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('Case 2 (Two out of sync observers (second began to listen later), which listen to observable which listen the subject, periodic updates):');
    console.log('');
    await testCase2();

    console.log('');
    console.log(`Case 3 (Two out of sync observers (second began to listen later), which listen to observable which listen the subject through 'multicast', periodic updates):`);
    console.log('');
    await testCase3();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
