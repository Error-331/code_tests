# Using Index as a key in the loop

before:

```jsx

<ul>
    {items.map((item, index) => <li key={index}>{item.name}</li>)}
</ul>

```

- index variable is used to provide a key prop value to the list item;
- it is meant to act as a unique identifier of the element and not a simple index within the list;

Solution 1: produce a unique ID for all your elements;
Solution 2: use index (last resort), random numbers or timestamps;

after:

```jsx

<ul>
    {items.map(item => <li key={item.ID}>{item.name}</li>)}
</ul>

```

Example 1: 

```jsx

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);

```

Example 2: 

```jsx

{this.state.fruits.map( (fruit, index) => <li key={fruit} ... /> )}

```