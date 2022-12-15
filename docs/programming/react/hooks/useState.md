# useState

## Initial state with useState

```jsx

function Counter() {
  const [count, setCount] = React.useState(() => 0)
  const increment = () => setCount(previousCount => previousCount + 1)
  return <button onClick={increment}>{count}</button>
}

```
