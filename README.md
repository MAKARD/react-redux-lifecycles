# React Redux LifeCycles

Store lifeCycle callbacks (will be extended in future):

```ts
storeDidUpdate(storeState: YourStoreStateInterface): void {}
```

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
@connect(mapStateToProps, mapDispatchToProps, mergeOptions, { withRef: true })
export class Component extends React.Component {
    storeDidUpdate(newStoreState) {
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
}

export default withLifeCycles(connect(mapStateToProps, mapDispatchToProps, mergeOptions, { withRef: true })(Component));
```


*Note: withLifeCycles apply as argument only connected component*

*Note: You must pass `{ withRef: true }` argument to connect method*
