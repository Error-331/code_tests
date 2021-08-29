# Вопросы по JavaScript (promise)

Ссылка на задачи - https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/its-quiz-time .

## Задача 1

```javascript

function job() {
    return new Promise(function(resolve, reject) {
        reject();
    });
}

let promise = job();

promise.then(function() {
    console.log('Success 1');
})
.then(function() {
    console.log('Success 2');
})
.then(function() {
    console.log('Success 3');
})
.catch(function() {
    console.log('Error 1');
})
.then(function() {
    console.log('Success 4');
});

```

Вывод:

- `Error 1`;
- `Success 4`;

## Задача 2

```javascript

function job(state) {
    return new Promise(function(resolve, reject) {
        if (state) {
            resolve('success');
        } else {
            reject('error');
        }
    });
}

let promise = job(true);

promise.then(function(data) {
    console.log(data);

    return job(false);
})
.catch(function(error) {
    console.log(error);

    return 'Error caught';
})
.then(function(data) {
    console.log(data);

    return job(true);
})
.catch(function(error) {
    console.log(error);
});

```

Вывод:

- `success`;
- `error`;
- `Error caught`;

## Задача 3

```javascript

function job(state) {
    return new Promise(function(resolve, reject) {
        if (state) {
            resolve('success');
        } else {
            reject('error');
        }
    });
}

let promise = job(true);

promise.then(function(data) {
    console.log(data);

    return job(true);
})
.then(function(data) {
    if (data !== 'victory') {
        throw 'Defeat';
    }

    return job(true);
})
.then(function(data) {
    console.log(data);
})
.catch(function(error) {
    console.log(error);

    return job(false);
})
.then(function(data) {
    console.log(data);

    return job(true);
})
.catch(function(error) {
    console.log(error);

    return 'Error caught';
})
.then(function(data) {
    console.log(data);

    return new Error('test');
})
.then(function(data) {
    console.log('Success:', data.message);
})
.catch(function(data) {
    console.log('Error:', data.message);
});

```

Вывод:

- `success`;
- `Defeat`;
- `error`;
- `Error caught`;
- `Success: test`;

## Задача 4

```javascript


var p = new Promise((resolve, reject) => {
  reject(Error('The Fails!'))
})
p.catch(error => console.log(error.message))
p.catch(error => console.log(error.message))

```

Вывод:

- `The Fails!`;
- `The Fails!`;

## Задача 5

```javascript

var p = new Promise((resolve, reject) => {
    return Promise.reject(Error('The Fails!'))
})
p.catch(error => console.log(error.message))
p.catch(error => console.log(error.message))

```

Вывод: `UnhandledPromiseRejectionWarning: Error: The Fails!`

## Задача 6

```javascript

Promise.resolve('Success!')
    .then(data => {
        data.toUpperCase()
    })
    .then(data => {
        console.log(data)
    })

```

Вывод: `undefined`
