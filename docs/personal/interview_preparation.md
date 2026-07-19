# Interview preparation

## Browser

### General workflow

When the user enters the URL, It will fetch the HTML source code from the server.

Browser Parse the HTML source code and convert into the Tokens `<, TagName, Attribute, AttributeValue, >`.

The Tokens will convert into the nodes and will construct the DOM Tree.
The CSSOM Tree will generate from the CSS rules.

The DOM and CSSOM tree will combine into the RenderTree.

The RenderTree are constructed as below:

- Start from the root of the dom tree and compute which elements are visible and their computed styles;
- RenderTree will ignore the not visible elements like (`meta`, `script`, `link`) and `display:none`;
- It will match the visible node to the appropriate **CSSOM** rules and apply them;

**Reflow**: Calculate the position and size of each visible node;
**Repaint**: Paint the renderTree on the screen;

#### Repaint and reflows

- **Reflow**: Calculate the position and size of each visible node;
- **Repaint**: Paint the renderTree on the screen;

The Repaint occurs when changes are made to the appearance of the elements that change the visibility, but doesn't affect the layout (Eg: Visibility, background color, outline).

What Causes the Reflows and Repaints? - Reflow will happen when Adding, Removing, Updating the DOM nodes.

- Hiding DOM Element with display: `none` will cause both `reflow` and `repaint`;
- Hiding DOM Element with visibility: `hidden` will cause the only `repaint`, because no layout or position change;
- Moving, animating a DOM node will trigger `reflow` and `repaint`;
- Resizing the window will trigger `reflow`;
- Changing font-style alters the geometry of the element, triggers `reflow` and `repaint`;
- Adding or removing Stylesheet will cause `reflow` and `repaint`;
- Script manipulating the DOM is the expensive operation because they have recalculated each time the document, triggers `reflow` and `repaint`;

##### Minimizing repaints and reflows

- Don't change individual styles, one by one;
- Best for sanity and maintainability is to change the class names, not the styles; 
- If the styles are dynamic, edit the cssText property;

Batch DOM changes:

- Use a `documentFragment` to hold temp changes;
- Clone, update, replace the node;
- Hide the element with display: none (1 reflow, 1 repaint), add 100 changes, restore the display (total 2 reflow, 2 repaint);

## React.js

### Virtual DOM

- It stores a replica of real DOM in memory;
- When DOM is modified, it first applies these changes to the in-memory DOM using diffing algorithm;
- It batches the changes and call applies them on real-dom in one go (thus, minimizing the re-flow and re-paint);

## Testing

### Stubs vs. Mocks

Stubs: 

- provide specific answers to methods calls (`myStubbedService.getValues()` just return a String needed by the code under test);
- used by code under test to isolate it;
- cannot fail test (`myStubbedService.getValues()` just returns the stubbed value);
- often implement abstract methods;

Mocks: 

- "superset" of stubs; 
- can assert that certain methods are called (verify that `myMockedService.getValues()` is called only once);
- used to test behaviour of code under test;
- can fail test (verify that `myMockedService.getValues()` was called once; verification fails, because `myMockedService.getValues()` was not called by my tested code);
- often mocks interfaces;

## Links

- https://caniuse.com/css-math-functions ;
- https://caniuse.com/css-fixed ;
- https://caniuse.com/css-sticky ;
- https://caniuse.com/css-variables ;
- https://caniuse.com/css-sel3 ;
- https://caniuse.com/css-sel2 ;
- https://caniuse.com/script-async ;
- https://caniuse.com/offscreencanvas ;
- https://caniuse.com/picture ;
- https://caniuse.com/history ;
- https://caniuse.com/offline-apps ;
- https://caniuse.com/css-sel2 ;
- https://caniuse.com/fetch ;
- https://caniuse.com/indexeddb ;
- https://caniuse.com/indexeddb2 ;
- https://caniuse.com/mutationobserver ;
- https://caniuse.com/serviceworkers ;
- https://caniuse.com/sharedworkers ;
- https://caniuse.com/sql-storage ;
- https://caniuse.com/async-functions ;
- https://caniuse.com/es6-number ;
- https://caniuse.com/localecompare ;
- https://caniuse.com/object-entries ;
- https://caniuse.com/object-values ;
