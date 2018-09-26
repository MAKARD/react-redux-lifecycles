import * as React from "react";

import { storeDidUpdate } from "../methods";

export function withLifeCycles(ConnectedComponent: typeof React.Component & { [key: string]: any }): any {
    const componentDidMountOrigin = ConnectedComponent.prototype.componentDidMount;
    const componentWillUnmountOrigin = ConnectedComponent.prototype.componentWillUnmount;

    let unsubscribe;

    ConnectedComponent.prototype.componentDidMount = function () {
        componentDidMountOrigin && componentDidMountOrigin.call(this);

        unsubscribe = this.store.subscribe(() => {
            storeDidUpdate(this.store.getState(), this.wrappedInstance, ConnectedComponent.WrappedComponent.prototype);
        });
    }

    ConnectedComponent.prototype.componentWillUnmount = function () {
        unsubscribe && unsubscribe();

        componentWillUnmountOrigin && componentWillUnmountOrigin.call(this);
    }

    return ConnectedComponent;
}
