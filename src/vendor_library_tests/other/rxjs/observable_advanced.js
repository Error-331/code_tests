'use strict';

import { Observable, interval } from 'rxjs';

class TestObservableClass1 {
    nextValuePrefix = '';

    constructor(nextValuePrefix) {
        this.nextValuePrefix = nextValuePrefix;
    }

    next(nextVal) {
        console.log(`Next val (observer 1): ${this.nextValuePrefix}_${nextVal}`);
    }

    complete() {
        console.log(`Complete (observer 1): ${this.completeName}`);
    }

    get completeName() {
        return `${this.nextValuePrefix}_complete`;
    }
}

async function testCase1() {
    return new Promise((resolve) => {

        // region actual example code
        const testObservable1 = new Observable(subscriber => {
            subscriber.next('test val 1...');
            subscriber.next('test val 2...');
            subscriber.next('test val 3...');

            setTimeout(() => {
                subscriber.next('test val...timeout...');
                subscriber.complete();
                resolve();
            }, 1500);
        });

        testObservable1.subscribe(new TestObservableClass1('prefix1'));

        // endregion
    });
}

export default async () => {
    console.log('"RxJS" library tests (observable basics)');
    console.log('========================================');
    console.log('');

    console.log('Case 1 (simple single observable, complex observer):');
    console.log('');
    await testCase1();

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}
