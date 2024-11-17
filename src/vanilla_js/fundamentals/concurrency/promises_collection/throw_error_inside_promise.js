function test1() {
    return new Promise(() => {
       throw new Error('test error 1');
    });
}

test1()
    .then(() => console.log('resolved'))
    .catch((error) => console.log('rejected', error));