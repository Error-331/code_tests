# useMemo

```jsx

function CandyDispenser() {
    const initialCandies = ['snickers', 'skittles', 'twix', 'milky way'];
    const [candies, setCandies] = React.useState(initialCandies);
}

```

can be done like this:

```jsx

const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']
function CandyDispenser() {
    const [candies, setCandies] = React.useState(initialCandies);
}

```

or like this:

```jsx



function CandyDispenser() {
    const initialCandies = React.useMemo(
        () => ['snickers', 'skittles', 'twix', 'milky way'],
        [],
    );
    
    const [candies, setCandies] = React.useState(initialCandies);
}

```