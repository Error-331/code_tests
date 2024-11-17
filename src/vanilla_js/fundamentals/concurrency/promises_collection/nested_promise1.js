Promise
    .resolve()
    .then(() => {
        console.log('1-1...');
        return Promise
            .resolve()
            .then(() => {
                console.log('1-2...');
                return Promise.resolve();
            })
            .then(() => {
                console.log('1-3...');
            });
    })
    .then(() => {
        console.log('1-4...');
    });