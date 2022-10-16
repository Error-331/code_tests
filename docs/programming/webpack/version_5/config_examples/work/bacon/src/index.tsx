import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('root');

let render = () => {

  ReactDOM.render(
    <div>
      Loading...
    </div>,
    MOUNT_NODE
  );
};


// This code is excluded from production bundle
if (__DEV__) {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    window.__REDUX_DEVTOOLS_EXTENSION__.open();
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {

    const renderApplication = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    render = () => {
      try {
        renderApplication();
      } catch (error) {
        renderError(error);
      }
    };

    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

render();


