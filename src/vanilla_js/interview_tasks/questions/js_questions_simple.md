# Вопросы по JavaScript (собеседование) - начальный уровень

## Общие вопросы по JavaScript

- Сколько типов данных в JS?

undefined + Boolean + Number + String + BigInt + Symbol + Object + Function + null = 9

```javascript

typeof instance === "undefined";
typeof instance === "boolean";
typeof instance === "number";
typeof instance === "string";
typeof instance === "bigint";
typeof instance === "symbol";
typeof instance === "object";
typeof instance === "function";
typeof instance === "object";

```
- Как ведет себя `this` внутри функций (на что указывает)?


```javascript

function myFunction() {
  console.log(this);
}

// Простой вызов
myFunction(); // глобальный объект (window)

```

```javascript

const myObject = {
  method() {
    console.log(this);
  }
};

// Метод объекта
myObject.method(); // выведет myObject

```

```javascript

function myFunction() {
  console.log(this);
}

const myContext = { value: 'A' };

myFunction.call(myContext);  // выведет { value: 'A' }
myFunction.apply(myContext); // выведет { value: 'A' }

```

```javascript

function MyFunction() {
  console.log(this);
}

new MyFunction(); // выведет MyFunction (сделано через коструктор)

```
- Что такое распространение события (Event Propagation)?

1. Фаза погружения (захвата, перехвата) — событие возникает в объекте Window и опускается до цели события через всех ее предков;
2. Целевая фаза — это когда событие достигает целевого элемента;
3. Фаза всплытия — событие поднимается от event.target, последовательно проходит через всех его предков и достигает объекта Window.


У метода addEventListener есть третий необязательный параметр - useCapture. Когда его значение равняется false (по умолчанию), событие начинается с фазы всплытия. Когда его значение равняется 
true, событие начинается с фазы погружения (для 'прослушивателей\ событий, прикрепленных к цели события, событие находится в целевой фазе, а не в фазах погружения или всплытия. 
События в целевой фазе инициируют все прослушиватели на элементе в том порядке, в котором они были зарегистрированы независимо от параметра useCapture — прим. пер.). 

- В чем разница между методами `event.preventDefault()` и `event.stopPropagation()`?

Метод `event.preventDefault()` отключает поведение элемента по умолчанию. Если использовать этот метод в элементе `form`, то он предотвратит отправку формы (submit). Если использовать 
его в `contextmenu`, то контекстное меню будет отключено (данный метод часто используется в `keydown` для переопределения клавиатуры, например, при создании музыкального/видео плеера 
или текстового редактора). Метод `event.stopPropagation()` отключает распространение события (его всплытие или погружение).

- Как узнать об использовании метода `event.preventDefault()`?

Для этого мы можем использовать свойство `event.defaulPrevented`, возвращающее логическое значение, служащее индикатором применения к элементу метода `event.preventDefault`.

- Что такое цель события или целевой элемент (`event.target`)?

Простыми словами, `event.target` — это элемент, в котором происходит событие, или элемент, вызвавший событие.

- Что такое текущая цель события (`event.currentTarget`)?

`Event.currentTarget` — это элемент, к которому прикреплен прослушиватель событий.

- Почему результатом сравнения двух похожих объектов является false?

В JS объекты и примитивы сравниваются по-разному. Примитивы сравниваются по значению. Объекты — по ссылке или адресу в памяти, где хранится переменная. 

- Для чего используется оператор "!!"?

Оператор "!!" (двойное отрицание) приводит значение справа от него к логическому значению.

```javascript

console.log(!!null); // false
console.log(!!undefined); // false
console.log(!!''); // false
console.log(!!0); // false
console.log(!!NaN); // false
console.log(!!' '); // true
console.log(!!{}); // true
console.log(!![]); // true
console.log(!!1); // true
console.log(!![].length); // false

```

- Как записать несколько выражений в одну строку?

Для этого мы можем использовать оператор ',' (запятая). Этот оператор 'двигается' слева направо и возвращает значение последнего выражения или операнда.


- Что такое замыкание (Closures)?

По сути, замыкание — это способность функции во время создания запоминать ссылки на переменные и параметры, находящиеся в текущей области видимости, в области видимости родительской функции, 
в области видимости родителя родительской функции и так до глобальной области видимости с помощью цепочки областей видимости. Обычно область видимости определяется при создании функции.

```javascript

var globalVar = 'global';
var outerVar = 'outer';

function outerFunc(outerParam) {
    function innerFunc(innerParam) {
        console.log(globalVar, outerParam, innerParam)
    }
    return innerFunc
}

const x = outerFunc(outerVar);

outerVar = 'outer-2';
globalVar = 'guess';

x('inner'); // guess outer inner

```

```javascript

const arrFunc = []
for (var i = 0; i < 5; i++) {
    arrFunc.push(function() {
        return i
    })
}
console.log(i); // 5

for (let i = 0; i < arrFunc.length; i++) {
    console.log(arrFunc[i]()); // все 5
}

```

- Что такое IIFE?

IIFE или Immediately Invoked Function Expression - это функция, которая вызывается или выполняется сразу же после создания или объявления. Для создания IIFE необходимо обернуть функцию в 
круглые скобки (оператор группировки), превратив ее в выражение, и затем вызвать ее с помощью еще одних круглых скобок. Это выглядит так: `(function(){})()`.

```javascript

(function( ) { }( ))

(function( ) { })( )

(function named(params) { })( )

(( ) => { })

(function(global) { })(window)

const utility = (function( ) {
    return {
        // утилиты
    }
})

```

- Почему в представленном коде переменная b становится глобальной при вызове функции?

```javascript

function myFunc(){
    let a = b = 0
}
myFunc()

```

Сначала значение 0 присваивается переменной 'b', которая не объявлена. Движок JS делает ее глобальной. Возвращаемое выражением b = 0 значение (0) затем присваивается локальной переменной 'a'.

- Что такое ECMAScript?

ECMAScript — это спецификация, стандарт скриптовых языков программирования, он является основой JS, поэтому любые изменения ECMAScript отражаются на JS.

- Что такое классы (Classes)?

Классы - это относительно новый способ написания функций-конструкторов в JS. Это синтаксический сахар для функций-конструкторов. В основе классов лежат те же прототипы и прототипное 
наследование:

```javascript

// ES5
function Person(firstName, lastName, age, address){
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
}

Person.self = function(){
    return this;
}

Person.prototype.toString = function(){
    return '[object Person]';
}

Person.prototype.getFullName = function(){
    return this.firstName + ' ' + this.lastName;
}

// ES6
class Person {
    constructor(firstName, lastName, age, address){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
    }

    static self(){
        return this;
    }

    toString(){
        return '[object Person]';
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}

```

- Как проверить, что число является четным, без использования деления по модулю или деления с остатком (оператора "%")?

```javascript

function isEven(num){
    if(num & 1){
        return false
    } else{
        return true
    }
}

```

- Как определить наличие свойства в объекте?

```javascript

const o = {
    'prop': 'bwahahah',
    'prop2': 'hweasa'
}

console.log('prop' in o) // true
console.log('prop1' in o) // false

```

Второй — использовать метод `hasOwnProperty`:

```javascript

console.log(o.hasOwnProperty('prop2')) // true
console.log(o.hasOwnProperty('prop1')) // false

```

Третий — индексная нотация массива:

```javascript

console.log(o['prop']) // bwahahah
console.log(o['prop1']) // undefined

```

- В чем разница между методами `Object.freeze` и `Object.seal`?

Разница заключается в том, что при использовании метода `Object.freeze` мы не можем менять или редактировать свойства объекта, а при использовании `Object.seal` у нас такая возможность 
имеется.

- В чем разница между оператором `in` и методом hasOwnProperty?

Отличие состоит в том, что оператор `in` проверяет наличие свойства не только в самом объекте, но и в его прототипах, а метод `hasOwnProperty` — только в объекте.

```javascript

console.log('prop' in o); // true
console.log('toString' in o); // true

console.log(o.hasOwnProperty('prop')); // true
console.log(o.hasOwnProperty('toString')); // false

```

- Как бы Вы реализовали вспомогательную функцию запоминания?

```javascript

const slice = Array.prototype.slice;

function memoize(fn){
    const cache = {};
    
    return (...args) => {
        const params = slice.call(args);
        console.log(params);
        
        if(cache[params]){
            console.log('cached');
            return cache[params];
        } else{
            let result = fn(...args);
            cache[params] = result;
            console.log('not cached');
            
            return result;
        }
    }
}
const makeFullName = (fName, lName) => `${fName} ${lName}`;
const reduceAdd = (numbers, startValue = 0) => numbers.reduce((total, cur) => total + cur, startValue);

const memoizedFullName = memoize(makeFullName);
const memoizeReduceAdd = memoize(reduceAdd);

memoizedFullName('Marko', 'Polo');
memoizedFullName('Marko', 'Polo'); // не выполнится

memoizeReduceAdd([1,2,3,4],5);
memoizeReduceAdd([1,2,3,4],5); // не выполнится

```

- Что выведеть следующий код?

Вопрос 1: Возможности


```javascript

(function() {
   var a = b = 5;
})();
 
console.log(b);

```

Ответ: 5 - потомучто `b` в глобальном скоупе.

- Сделайте так, чтобы этот код работал `duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]`:

```javascript

function duplicate(arr) {
  return arr.concat(arr);
}
duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]

```

- Напишите цикл, который перебирает числа до 100, возвращая 'fizz' на числа кратные 3, 'buzz' на числа кратные 5 и 'fizzbuzz' на числа кратные 3 и 5:

```javascript

for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
}


```

- Объясните разницу между localStorage, cookies и sessionStorage.

`SessionStorage` - выполняет это в течение определённого промежутка времени (сессии). Закрытие вкладки или браузера приводит их к удалению. При этом данные в SessionStorage сохраняются 
при обновлении страницы.

`LocalStorage` - осуществляет это в течение неограниченного времени. Они сохраняются при перезагрузке браузера и компьютера. Их длительность хранения ничем не ограничена. Но, хоть эти 
данные могут храниться бесконечно в браузере, обычный пользователь может их очень просто удалить, например выполнив очистку истории (при включенной опции 'файлы cookie и другие данные сайтов').


- Что делает doctype?

Описывает правила текущего документа.

`<!DOCTYPE html>` - html 5;

`<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">` - svg;

## Ссылки

- https://habr.com/ru/company/epam_systems/blog/468837/;
- https://habr.com/ru/post/486820/;
- https://lpgenerator.ru/blog/2016/03/14/5-tipichnyh-javascript-voprosov-na-sobesedovanii/;
- https://medium.com/genesis-media/%D1%87%D1%82%D0%BE-%D1%81%D1%82%D0%BE%D0%B8%D1%82-%D0%B7%D0%B0-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B9-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%BE%D0%B9-%D0%B2%D0%B5%D0%B1-%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%BA%D0%B8-%D0%B2-%D0%B1%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80%D0%B5-3933c96467a

