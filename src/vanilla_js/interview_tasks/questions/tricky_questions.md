# Вопросы по JavaScript (tricky)

## Задача 1

```javascript

function foo() {
  let a = b = 0;
  a++;
  return a;
}

foo();
typeof a; 
typeof b; 

```

Вывод:

- `foo()` - `1`;
- `typeof a` - `undefined`;
- `typeof b` - `number`;

## Задача 2

```javascript

const clothes = ['jacket', 't-shirt'];
clothes.length = 0;

clothes[0]; // => ???

```

Вывод:

- `clothes[0]` - `undefined`;
- `clothes.length` - `0`;

Reducing the value of the length property has the side-effect of deleting own array elements whose array 
index is between the old and new length values.

## Задача 3

```javascript

const length = 4;
const numbers = [];
for (var i = 0; i < length; i++);{
  numbers.push(i + 1);
}

numbers; // => ???

```

Вывод:

- `numbers` - `5`;

## Задача 4

```javascript

function arrayFromValue(item) {
  return
    [item];
}

arrayFromValue(10);

```

Вывод:

- `arrayFromValue(10)` - `undefined`;

## Задача 5

```javascript

let i;
for (i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);
  }
  setTimeout(log, 100);
}

```

Вывод: Output is `3 3 3`. If `i` were declared inside `for` loop the output will be `0 1 2`.

## Задача 6

```javascript

myVar;   // => ???
myConst; // => ???

var myVar = 'value';
const myConst = 3.14;

```
Вывод: `error`. If we remove `myConst;` everything works fine.

## Задача 7

```javascript

new Promise(resolve => { // promise1
   console.log('5');
	resolve();
}).then(() => {
	setTimeout( () => { // setTimeout2
		console.log('6')	
	})
   console.log('7')
});

setTimeout( () => { // setTimeout3
        console.log('8')    
    });

setImmediate( () => { // setImmediate1
        console.log('9')    
    });
    

```

Вывод: 5 7 8 9 6

## Задача 8

```javascript
setTimeout(function timeout() {
  console.log(1);
}, 0);

let p = new Promise(function(resolve, reject) {
  console.log(2);
  resolve();
});

p.then(function() {
  console.log(3);
});

console.log(4);

// 2 4 3 1

```
Вывод: 2 4 3 1

## Задача 9

```javascript

const fullname = 'John Doe';

const obj = {
  fullname: 'Colin Ihrig',
  prop: {
    fullname: 'Aurelio De Rosa',
    getFullname: function() {
      return this.fullname;
    },
  },
};
console.log(obj.prop.getFullname()); // 'Aurelio De Rosa',

const test = obj.prop.getFullname;

console.log(test()); // undefined
console.log(test.call(obj)); // Colin Ihriq

global.fullname = 'John Doe';

console.log(test()); // 'John Doe'

```

Вывод: Aurelio De Rosa, undefined, Colin Ihrig, John Doe
