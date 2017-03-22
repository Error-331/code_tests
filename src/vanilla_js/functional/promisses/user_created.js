'use strict';

export default async () => {
    console.log('Functional programming promises (user created)');
    console.log('==============================================');
    console.log('');

    const whileNotResolved = (loopFunc, resolveParams = []) => {
        return new Promise((resolve) => {
            loopFunc()
                .then((resolveValue) => {
                    if (resolveValue !== undefined) {
                        resolveParams.push(resolveValue);
                    }

                    resolve(resolveParams);
                })
                .catch((error) => {
                    if (error !== undefined) {
                        resolveParams.push(error);
                    }

                    resolve(whileNotResolved(loopFunc, resolveParams));
                });
        });
    };

    console.log('Example of whileNotResolved() function:');
    console.log('');

    let testCounter1 = 0;
    const countLimit1 = 3;

    await whileNotResolved(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (testCounter1 < countLimit1) {
                    testCounter1++;
                    console.log('Test counter1:', testCounter1);
                    reject(testCounter1);
                } else {
                    resolve('finish');
                }
            }, 1500)
        })
    });

    console.log('');
    console.log('--------------------------------------------------------');
    console.log('');
}