# useCallback

```jsx

const dispense = candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
}
const dispenseCallback = React.useCallback(dispense, [])

```

is worse than:

```jsx

const dispense = candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
}

```