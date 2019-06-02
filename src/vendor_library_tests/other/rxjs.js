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

async function testCase2() {
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

export default async () => {
    console.log('"RxJS" library tests');
    console.log('====================');
    console.log('');

    await testCase1();
    console.log('');
    await testCase2();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}