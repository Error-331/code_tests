'use strict';

import { Observable, asyncScheduler, animationFrameScheduler } from 'rxjs';
import { observeOn, windowTime } from 'rxjs/operators';

global.requestAnimationFrame = function (callback) {
    return setTimeout(callback, 0);
};

global.cancelAnimationFrame = function(timeoutId) {
    clearTimeout(timeoutId);
};

async function testCase1()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable1 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            setTimeout(() => {
                subscriber.complete();
            }, 3100);

            return function unsubscribe() {
                console.log('Unsubscribing from observable 1...');
            };
        }).pipe(
            observeOn(asyncScheduler)
        );

        console.log(`'testObserver1' is about to subscribe to 'testObservable1'`);
        console.log('');

        const testObserver1 = testObservable1.subscribe({
            next(nextVal) { console.log(`Next val (observer 1): ${nextVal}`) },
            error(error) { console.error('Error occurred (observer 1): ' + error); },
            complete() { console.log('Flow is ended (observer 1)'); } // may not be called if unsubscribed
        });

        console.log(`'testObserver1' is about to unsubscribe from 'testObservable1'`);
        console.log('');

        setTimeout(() => {
            testObserver1.unsubscribe();
            resolve();
        }, 3200);

        // endregion
    });
}

async function testCase2()
{
    return new Promise((resolve) => {

        // region actual example code
        const testObservable2 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            setTimeout(() => {
                subscriber.complete();
            }, 3100);

            return function unsubscribe() {
                console.log('Unsubscribing from observable 2..');
                resolve();
            };
        }).pipe(
            observeOn(animationFrameScheduler)
        );

        console.log(`'testObserver2' is about to subscribe to 'testObservable1'`);
        console.log('');

        const testObserver2 = testObservable2.subscribe({
            next(nextVal) { console.log(`Next val (observer 2): ${nextVal}`) },
            error(error) { console.error('Error occurred (observer 2): ' + error); },
            complete() { console.log('Flow is ended (observer 2)'); } // may not be called if unsubscribed
        });

        console.log(`'testObserver2' is about to unsubscribe from 'testObservable2'`);
        console.log('');

        setTimeout(() => {
            testObserver2.unsubscribe();
        }, 3200);

        // endregion

    });
}

export default async () => {
    console.log('"RxJS" library tests (scheduler basics)');
    console.log('=======================================');
    console.log('');

    console.log(`Case 1 (single observable/observer) using 'asyncScheduler':`);
    console.log('');
    await testCase1();

    console.log(`Case 2 (single observable/observer) using 'animationFrameScheduler':`);
    console.log('');
    await testCase2();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
