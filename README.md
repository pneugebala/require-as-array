# require-as-array

[![Build Status](https://travis-ci.org/pneugebala/require-as-array.svg?branch=master)](https://travis-ci.org/pneugebala/require-as-array)

Requiring all files/directories in given path and returning an array.

### Installation:
```
npm install @pneugebala/require-as-array
```
or
```
yarn add @pneugebala/require-as-array
```


### Example:
```javascript
// Directory structure:
//
// entry
// ├───myModule1
// │   └───index.js
// ├───myModule2
// │   └───index.js
// ├───myModule3.js
// └───myModule4.js

const requireAsArray = require("require-as-array")

// Synchronously
const result = requireAsArray("./entry")
...

// Asynchronously
requireAsArray("./entry", (err, result) => {
  if (err)
    throw err
  else
    ...
})
```

Instead of a nested object, only an array with all required modules is returned.