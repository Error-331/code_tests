# Nested Components

before:

```jsx

import { useState } from 'react';

export const ParentComponent = () => {
    const [count, setCount] = useState(0);

    const ChildComponent = () => (
      <div>Hello World</div>
    );

    return (
     <div>
        <ChildComponent />
        <button onClick={() => setCount(count + 1)}>Count me</button>
     </div>
    );
};

```

- this nesting of functions actually creates a small performance issue;
- every time the parent component is called, it'll re-create the child component's definition;

after:

```jsx

import { useState } from 'react';

const ChildComponent = () => (
   <div>Hello World</div>
);

export const ParentComponent = () => {
    const [count, setCount] = useState(0);

    return (
     <div>
        <ChildComponent />
        <button onClick={() => setCount(count + 1)}>Count me</button>
     </div>
    );
};

```