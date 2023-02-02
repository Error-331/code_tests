# Component Nesting

- every time the parent component is rendered, it will also redefine the child component which means it gets a new memory address and lead to performance issues and unpredictable behavior;

before:

```jsx

const Parent = () => {
  const SecondChild = () => {
    return <div> <SecondChild/> </div>
  }
    
  const Child = () => {
    return <div> <SecondChild/> </div>
  }

  return (
    <div>
     <Child/>
    </div>
  )
}

```

- either not define a child component at all or move the child component out of the parent and pass the function as a prop;

after:

```jsx

const SecondChild = () => {
    return <div> <SecondChild/> </div>
}

const Child = () => {
    return <div> <SecondChild/> </div>
}

const Parent = () => {
  return (
    <div>
     <Child/>
    </div>
  )
}

```