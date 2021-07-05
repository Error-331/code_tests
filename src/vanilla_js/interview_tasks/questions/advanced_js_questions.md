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

- Рассказать о втором параметре `then`:

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
