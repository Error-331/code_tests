'use strict';
//TODO: --noEmitHelpers , tslib, --importHelpers
export default () => {

    function testDelayFunction1(ms: number) {
        return new Promise<void>(function(resolve) {
            setTimeout(resolve, ms);
        });
    }

    async function testFunction1() {
        console.log('');
        console.log('Message without delay');

        await testDelayFunction1(1000);
        console.log('');
        console.log('Message after one second delay');

        await testDelayFunction1(1000);
        console.log('');
        console.log('Another message after one second delay');
    }


    console.log('TypeScript asynchronous features testing"');
    console.log('=========================================');

    console.log('Case 1 (delay using timeout and promise): ');
    console.log('');

    testFunction1();

}