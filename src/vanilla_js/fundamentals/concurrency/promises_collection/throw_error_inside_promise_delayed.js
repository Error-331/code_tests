function test1() {
    return new Promise(() => {
        setTimeout(() => {
            throw new Error('test error 1');
        }, 1000);
    });
}

try {
    test1()
        .then(() => console.log('resolved'))
        .catch((error) => console.log('rejected', error));
} catch (error) {
    console.log('Error was caught', error);
}
