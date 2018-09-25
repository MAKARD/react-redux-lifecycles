# React Redux LifeCycles

Store lifeCycle callbacks (will be extended in future):

```ts
storeDidUpdate(storeState: YourStoreStateInterface): void {}
storeDidCatch(error: YourErrorInterface): void {}
```

### Issues

- Errors intercept by `redux-saga` middleware on resolving effects.

### Install

Via npm

```bash
npm install --save react-redux-lifecycles
```

### Usage

As decorator:

```jsx
import * as React from "react";

import { connect } from "react-redux";
import { withLifeCycles } from "react-redux-lifecycles";

@withLifeCycles
@connect(mapStateToProps, mapDispatchToProps)
export class Component extends React.Component {

    storeDidUpdate(newStoreState) {
        // ...
    }

    storeDidCatch(error) {
        // ...
    }
}
```

As HOC:

```jsx
import * as React from "react";

import { connect } from "react-redux";
import { withLifeCycles } from "react-redux-lifecycles";

class Component extends React.Component {

    storeDidUpdate(newStoreState) {
        // ...
    }

    storeDidCatch(error) {
        // ...
    }
}

export default withLifeCycles(connect(mapStateToProps, mapDispatchToProps)(Component));
```


*Note: withLifeCycles apply as argument only connected component*
