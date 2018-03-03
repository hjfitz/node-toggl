# node-toggl
> Toggl api wrapper for node

## Installation
```zsh
yarn add toggl
```

## Usage
```js
import toggl from 'node-toggl';

// token based auth
const client = toggl.createClient({
  token: 'fkjdlfhsfafdsgdd',
});

// user based auth
const client = toggl.createClient({
  username: 'harry@hjf.io',
  password: process.env.TOGGL_PASSWORD,
});

/**
 * TODO
 */

// get all entries

// get a given entry

// stop most recent timer

// stop given timer

// start new timer

```

