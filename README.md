# React Redux LifeCycles

Store lifeCycle callbacks (will be extended in future):

```ts
storeDidUpdate(storeState: YourStoreStateInterface): void {}
storeDidUpdateState(currentStoreState: YourStoreStateInterface, prevStoreState: YourStoreStateInterface): void {}
```

### Install

Via npm

```bash
npm install --save react-redux-lifecycles
```

### Usage

##### As decorator:

```jsx
import * as React from "react";

import { connect } from "react-redux";
import { withLifeCycles } from "react-redux-lifecycles";

@withLifeCycles()
@connect(mapStateToProps, mapDispatchToProps, mergeOptions, { withRef: true })
export class Component extends React.Component {}
```

##### As HOC:

```jsx
import * as React from "react";

import { connect } from "react-redux";
import { withLifeCycles } from "react-redux-lifecycles";

class Component extends React.Component {}

export default withLifeCycles()(connect(mapStateToProps, mapDispatchToProps, mergeOptions, { withRef: true })(Component));
```


*Note: withLifeCycles apply as argument only connected component*

*Note: You must pass `{ withRef: true }` argument to connect method*


#### Methods

##### storeDidUpdate

Will called after store received new state (reducer has been executed).

To get access to `storeDidUpdate` method just use `withLifeCycles()` method without any arguments.

##### storeDidUpdateState

Will called after store received new specific state (reducer has been executed).

To get access to `storeDidUpdateState` method just use `withLifeCycles()` with `array of strings` as argument.
For example:

```jsx
/**
storeState: {
    field1: {
        level1: {
            level2: true
        },
        subLevel: false
    },
    field2: {
        level1: false
    },
    loading: false
}
**/

// storeDidUpdateState will be executed if one of the passed arguments changed
@withLifeCycles(["field1.level1.level2", "loading"])
@connect(mapStateToProps, mapDispatchToProps, mergeOptions, { withRef: true })
export class Component extends React.Component {
    storeDidUpdateState(currentState) {
        /**
         if reducer change only 'field2' or 'field1.subLevel' value, 'storeDidUpdateState' does not be executed
         if reducer change 'loading' or 'field1.level1.level2' value, 'storeDidUpdateState' will be executed
        **/
    }

    storeDidUpdate(currentStoreState, prevStoreState) {
        // Always executing after store received new state
    }
}
```
