# Don't Memorize a Complex Calculation

before:

```jsx

import { useState } from 'react';

export const ParentComponent = () => {
    const [count, setCount] = useState(0);

    const bigData = reallyHeavyCalculation();

    return (
     <div>
        <button onClick={() => setCount(count + 1)}>Count me</button>
     </div>
    );
};

```

- the state changes on this component, it will rerun the expensive calculation even though it just depends on the one count value;
- this is possible performance bottleneck;

Solution: use the **useMemo** hook.

after: 

```jsx

import { useState, useMemo } from 'react';

export const ParentComponent = () => {
    const [count, setCount] = useState(0);

    const bigData = useMemo(() => reallyHeavyCalculation(), []);

    return (
     <div>
        <button onClick={() => setCount(count + 1)}>Count me</button>
     </div>
    );
};

```