# Webpack

## useBuiltIns

- `useBuiltIns: 'entry'`:

Turns code like this:

```javascript

import "core-js/stable";
import "regenerator-runtime/runtime";

```

into this:

```javascript

import "core-js/modules/es.array.unscopables.flat";
import "core-js/modules/es.array.unscopables.flat-map";
import "core-js/modules/es.object.from-entries";
import "core-js/modules/web.immediate";

```

- `useBuiltIns: 'usage'`:

Turns code like this:

```javascript

const set = new Set([1, 2, 3]);
[1, 2, 3].includes(2);

```

into this:

```javascript

import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.set";

const set = new Set([1, 2, 3]);
[1, 2, 3].includes(2);

```

## @babel/preset-env

Current preset substitutes following ones:

```

babel-preset-es2015
babel-preset-es2016
babel-preset-es2017
babel-preset-latest

```


