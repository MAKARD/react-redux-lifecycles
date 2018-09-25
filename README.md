# React Redux LifeCycles

Store lifeCycle callbacks (will be extended in future):

```ts
storeDidUpdate(storeState: YourStoreStateInterface): void {}
storeDidCatch(error: YourErrorInterface): void {}
```

### Install

Via npm

```bash
npm install --save react-redux-lifecycles
```

### Usage

As decorator:

```tsx
import * as React from "react";

import { connect } from "react-redux";
import { withLifeCycles } from "react-redux-lifecycles";

@withLifeCycles
@connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })
export class Component extends React.Component {

    public storeDidUpdate(newStoreState) {
        // ...
    }

    public storeDidCatch(error) {
        // ...
    }
}
```

As HOC:

```tsx
import * as React from "react";

import { connect } from "react-redux";
import { withLifeCycles } from "react-redux-lifecycles";

class Component extends React.Component {

    public storeDidUpdate(newStoreState) {
        // ...
    }

    public storeDidCatch(error) {
        // ...
    }
}

export default withLifeCycles(connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(Component));
```


*Note: withLifeCycles apply as argument only connected component*

*Note: You must pass `withRef: true` to options argument for connect function*
