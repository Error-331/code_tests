# JSX conditions

## Array.length

```jsx

{gallery.length && <Gallery slides={gallery}>}

```

Если `gallery.length === 0` - то будет выведен 0. Решение:

```jsx

gallery.length > 0 && jsx

```

или

```jsx

!!gallery.length && jsx

```

или

```jsx

Boolean(gallery.length) && jsx

```

## Оператор &&

```jsx

user.anonymous || user.restricted && <div className="error" />

```

это 

```jsx

user.anonymous || (user.restricted && <div className="error" />)

```

Решение

```jsx

{(user.anonymous || user.restricted) && <div className="error" />}

```

## If props.children

```jsx

const Wrap = (props) => {
    if (!props.children) return null;
    return <div>{props.children}</div>
};

```
Может работать неправильно. `React.Children.count(props.children)` и `React.Children.toArray(props.children)` тоже могут не сработать. Нельзя точно определить 
есть ли что-то в props.children. Можно попробовать использовать CSS `:empty`.


## remount для неконтролируемых элеметов

```jsx

{mode === 'name'
    ? <input placeholder="name" />
    : <input placeholder="phone" />}

```

Такой код не сделает `remount`.

Лучше сделать так:

```jsx

{mode === 'name'
    ? <input placeholder="name" key="name" />
    : <input placeholder="phone" key="phone" />}

```

или так:

```jsx

{mode === 'name' && <input placeholder="name" />}
{mode !== 'name' && <input placeholder="phone" />}

```
