# Webpack

- Loaders are evaluated/executed from right to left (or from bottom to top);

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

## Misc

By default, there is no name for non-initial chunks so that a unique ID is used instead of a name. When using dynamic import we may specify a chunk name explicitly by using a "magic" comment:

import(
  /* webpackChunkName: "app" */
  './app.jsx'
).then((App) => {
  ReactDOM.render(<App />, root);
});


Output
The names of the output files are affected by the two fields in the config:

output.filename - for initial chunk files
output.chunkFilename - for non-initial chunk files
In some cases chunks are used initial and non-initial. In those cases output.filename is used.
A few placeholders are available in these fields. Most often:

[id] - chunk id (e.g. [id].js -> 485.js)
[name] - chunk name (e.g. [name].js -> app.js). If a chunk has no name, then its id will be used
[contenthash] - md4-hash of the output file content (e.g. [contenthash].js -> 4ea6ff1de66c537eb9b2.js)


development	Sets process.env.NODE_ENV on DefinePlugin to value development. Enables useful names for modules and chunks.

production	Sets process.env.NODE_ENV on DefinePlugin to value production. Enables deterministic mangled names for modules and chunks, FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin and TerserPlugin.

none	Opts out of any default optimization options


