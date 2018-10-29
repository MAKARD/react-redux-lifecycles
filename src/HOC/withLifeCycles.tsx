import * as React from "react";

import { storeDidUpdate, storeDidUpdateState } from "../methods";

export const withLifeCycles = (selectors?: Array<string>) =>
    (ConnectedComponent: typeof React.Component & { [key: string]: any }): any => {
        const componentDidMountOrigin = ConnectedComponent.prototype.componentDidMount;
        const componentWillUnmountOrigin = ConnectedComponent.prototype.componentWillUnmount;

        let unsubscribe;

        ConnectedComponent.prototype.componentDidMount = function () {
            componentDidMountOrigin && componentDidMountOrigin.call(this);

            let prevStoreState = this.store.getState();
            let currentStoreState = prevStoreState;

            unsubscribe = this.store.subscribe(() => {
                prevStoreState = currentStoreState;
                currentStoreState = this.store.getState();

                storeDidUpdate(
                    currentStoreState,
                    this.wrappedInstance,
                    ConnectedComponent.WrappedComponent.prototype
                );

                if (selectors && selectors.length) {
                    storeDidUpdateState(
                        prevStoreState,
                        currentStoreState,
                        selectors,
                        this.wrappedInstance,
                        ConnectedComponent.WrappedComponent.prototype
                    );
                }
            });
        }

        ConnectedComponent.prototype.componentWillUnmount = function () {
            unsubscribe && unsubscribe();

            componentWillUnmountOrigin && componentWillUnmountOrigin.call(this);
        }

        return ConnectedComponent;
    }
