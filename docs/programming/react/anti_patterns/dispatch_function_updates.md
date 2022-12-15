## Dispatch function updates

before:

```jsx

function DelayedCounter() {
  const [count, setCount] = React.useState(0)
  const increment = async () => {
    await doSomethingAsync()
    setCount(count + 1)
  }
  return <button onClick={increment}>{count}</button>
}

```

- if the user clicks the button multiple times it will update the state only ones because of closure;

after:

```jsx

function DelayedCounter() {
  const [count, setCount] = React.useState(0)
  const increment = async () => {
    await doSomethingAsync()
    setCount(previousCount => previousCount + 1)
  }
  return <button onClick={increment}>{count}</button>
}

```