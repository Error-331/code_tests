1. Which of the following is true about Flux Dispatcher?

- The dispatcher is used to broadcast payloads to registered callbacks. (um)
- Dispatcher is used to checking changes in DOM.
- The dispatcher is used to set state in React application.
- The dispatcher is used to send data to components.

2. PropTypes is used for ___ ?

- getInitialState
- Validation
- getPropsValue
- getDefaultProps
- typechecking (um)

3. What kind of application architecture is widely used together with ReactJs?

- Flux (um)
- Flux with MVC
- MVC
- Singleton
- Flex
- Rex pattern
- Fluxation architecture
- JSX architecture

4. Can you use ReactJs without flux?

- Yes, but then you will have to use MVC (u)
- Yes (m)
- No
- No, it’s in core of ReactJS

5. Which statement about ReacJs is correct?

- ReactJs uses MVC pattern to manipulate data flow inside application, that’s why it’s so easy to build native applications with it.
- With ReactJs you can write HTML in JS with JSX (um)
- With ReactJs you extend HTML with custom ReactJs bindings
- ReactJs is closed source library produced by Facebook and used by many big companies in production: Airbnb, Facebook, Twitter and others
- ReactJs is fast because it has no virtual DOM and directly manipulates HTML document with MVC pattern
- ReactJs uses flux pattern instead of virtual DOM to manipulate singleton CSS objects

6. What should be the correct value of the children proptype?

```js

propTypes: {
    children: React.PropTypes.string.isRequired
}

````

- 12
- ```js ['test', 'test2'] ```
- 99.66
- 'test1' (um)

7. Which of the following is the primary mental data flow in Flux?

• action -> store -> dispatcher -> view
• store -> action -> dispatcher -> view
• store -> dispatcher -> action -> view
• action -> dispatcher -> store -> view (um)
• dispatcher -> action -> store -> view

8. Why do you need dispatcher in flux?

- To register store’s callbacks
- To create action creators (um)
- It’s not needed in flux, you can just manipulate store directly
- Dispatcher is required by Redux
- To manipulate store directly without any additional actions

9. What is wrong with the following code?

```js

MyComponent.propTypes = {
    name: React.PropTypes.string
}

MyComponent.defaultProps = {
    name: ‘My name’
}

```

- defaultProps should be defaultProperties
- MyComponent.propTypes is a function not an object
- nothing is wrong (m)
- default value is not necessary (u)

10. What is needed to write ReactJs application with ES6 classes and have cross-browser support?

- Webpack or browserify to generate ES4 code
- Babel to transpile code to ES5
- Babel with es2015 plugin to transpile code to ES5
- Babel with CLI support
- Babel with react and es2015 presets (um)

11. Which statement about propTypes is incorrect?

- It improves auto completion for some IDEs
- It provides easier checking of production code (um)
- It’s easy to define required props for each component
- If used with isRequired property, it automatically checks if property value is available while developing
- If used with isRequired property, it automatically checks if value is undefined while developing

12. Which is true for ReactJS components defined as pure JS functions?

- Pure function component have only render method defined (u)
- Pure function component do not have lifecycle methods or propTypes (m)
- It’s possible to set defaultProps for pure function component
- Pure function component has everything what ES6 class has, but you can’t use inner state of the component, only way to mutate data is to fire new action and wait for props update

13. What will happen if parent component will fire render function?

- Child components will fire render functions too to keep all UI state up to date
- Child components will fire shouldComponentUpdate (um)
- Child components will fire shouldComponentUpdate only if store was updated during running render function of parent component
- Child components will fire shouldComponentUpdate only if state was updated during render of parent 

14. What is the first place to start optimizing speed of ReactJs application?

- You don’t need to optimize, Facebook already done it with virtual DOM
- Make better architecture of stores (m)
- Use more inner state of components, stop firing too many actions (u)
- Use component events to reduce render function calls
- Don’t use setState function
- Use props combined with inner component state

15. What does ReactJs provide?

- Encapsulation for reusable components
- Sync between DOM and data (um)
- Full framework with all tools to build modern web application
- Fast forms validation
- Objective-J for web
- It allows to write JS application with latest technologies like ES6 or even ES7

16. How transform JSX code in browser?

- With Babel stand alone build
- Standard Babel and react preset (u)
- JSXTransformer is recommended by Facebook starting from ReactJs v0.15
- You can’t use JSX in browser, must transpile it to ES5 before sending to browser (m)

17. Do you need to add key property on ReactJs elements?

- Keys must be provided for list elements so ReactJs will know which element changed when state or props changes (u)
- Keys must be provided for list elements to work faster
- Keys should be provided for list elements (m)
- Yes, keys must be provided for all elements

18. How set custom html inside ReactJs component?

- ``` <div dangerouslySetInnerHTML={{__html: ‘Some custom html’}} /> ``` {u}
- ``` <div dangerouslySetInnerHTML={‘Some custom html’} /> ``` {m}
- ``` <div innerHTML={‘Some custom html’} /> ```
- ``` <div innerHTML={{__html: ‘Some custom html’}} /> ```
- ``` <div innerHTML={{html: ‘Some custom html’}} /> ```
- ``` <customHtml>Some custom html</customHtml> ```
- ``` <dangerouslySetInnerHTML>Some custom html</dangerouslySetInnerHTML> ```

19. Which of the following is true about React Library?
Note: There may be more than one right answer.

- Make AJAX requests
- Update DOM-tree (um)
- React on events (um)
- Store data

20. What will happen to the state if you click the <div>

```jsx harmony

constructor() {
    super();
    this.state = {
        status: ‘no status’
    };
}

handleClick() {
    this.setState({status: ‘I am fine!’});
}
render() {
    return (
        <div onClick={this.handleClick}>
            click me
        </div>
    );
}


```

- return false
- fatal error (m)
- syntax error
- updates the status state to ‘I am fine’ (u)