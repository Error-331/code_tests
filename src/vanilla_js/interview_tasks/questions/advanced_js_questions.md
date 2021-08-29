# Вопросы по JavaScript (собеседование) - продвнутый уровень

##  Вопросы по специфическим особенностям

- Объяснить работу `Tagged templates` на примере `styled components`.

Ссылка на описани технологии: https://styled-components.com/docs/basics#motivation

Пример кода:

```javascript

function styled(css, ...variables) {
    const theme = {
        spacing: {
            min: "2px",
            max: "24px",
        },
        colors: {
            primary: "coral",
            secondary: "peachpuff",
        },
    };

    const props = {
        theme,
        primary: true,
        bigSpacing: true,
    };

    const computedCss = css
        .map(
            (chunk, index) =>
                `${chunk}${variables[index] ? variables[index](props) : ""}`
        )
        .join("");
    return computedCss;
}

const Button = styled`
  background: ${({ primary, theme }) =>
    primary ? theme.colors.primary : theme.colors.secondary};
  margin-bottom: ${({ bigSpacing, theme }) =>
    bigSpacing ? theme.spacing.max : theme.spacing.min};

  span {
    padding: 0.25em 1em;
    color: ${({ primary, theme }) =>
    primary ? theme.colors.secondary : "#fff"};
  }
`;

console.log(Button);

```

- Рассказать о втором параметре `then`.

Второй параметр `then` реализует функцию перехвата `catch` если `Promise` был отменен `reject`.

Пример кода:

```javascript

function testFunc1() {
    return Promise.reject('Error message 1');
}

testFunc1()
    .then(
        (val) => {
            console.log('TestFunc1 resolved:', val)
        },
        (val) => {
            console.log('TestFunc1 rejected:', val)
        }
    );

testFunc1()
    .then(
        (val) => {
            console.log('TestFunc1 resolved:', val)
        }
    )
    .catch(
        (val) => {
            console.log('TestFunc1 rejected:', val)
        }
    );

```

- Стрелочная функция как конструктор.

Стрелочная функций не может быть коструктором.

- Стрелочные функции как метод объекта.

Всегда будут указывать на внешний `scope`.

Пример кода:

```javascript

const test_obj1 = {
  test_prop1: 'test_val1',
  testMethod1 : () => {
    console.log('This:', this);
    console.log('Test prop1:', this.test_prop1);
  },

  testMethod2: function() {
    console.log('This:', this);
    console.log('Test prop1:', this.test_prop1);
  }
}
console.log(test_obj1);

test_obj1.testMethod1();
test_obj1.testMethod2();

```

- Расскаать для чего может пригодиться WeakMap?

WeakMap может быть использован для ассоциирования данных для объектов которые создаються и/или очищаються внешним кодом 
(внешние библиотеки, DOM дерево и  т.д.).

Пример кода:

```javascript


let visitsCountMap = new WeakMap(); 

function countUser(user) { 
  let count = visitsCountMap.get(user) || 0; 
  visitsCountMap.set(user, count + 1); 
}

```

WeakMap также может быть использован для кэширования.

Пример кода:

```javascript

let cache = new WeakMap(); 

function process(obj) { 
  if (!cache.has(obj)) { 
    let result = obj; 
    cache.set(obj, result); 
  } 
  
  return cache.get(obj); 
} 

let obj = result1 = process(obj); 
let result2 = process(obj); 

obj = null;

```

- Как с помощью символа (`Symbol`) определить новое свойство объекта?

Пример кода:

```javascript

let user = { name: "Иван" };
let id = Symbol("id");

user[id] = "ID Value";
alert( user[id] ); 

```

- Как получить символ (`Symbol`) для значения?

Пример кода:

```javascript

let id = Symbol.for("id");
let idAgain = Symbol.for("id");

```

- Как получить все свойтсво объекта включая символьные?

1. `Object.getOwnPropertySymbols(obj)`;
2. `Reflect.ownKeys(obj)`
