import * as React from "react";
import * as Redux from "redux";

import { storeDidUpdate, storeDidThrow, storeDidReplaceReducer } from "../methods";

export function withLifeCycles(ConnectedComponent: typeof React.Component & { [key: string]: any }): any {
    return class LifeCycledComponent extends ConnectedComponent {
        public initSelector: () => void;
        public store: Redux.Store;
        public selector: {
            shouldComponentUpdate: boolean;
        };

        constructor(props, context) {
            super(props, context);

            storeDidThrow(this.store, this.wrappedComponentPrototype)
            storeDidReplaceReducer(this.store, this.wrappedComponentPrototype)

            // Re-init selector with new dispatch
            this.initSelector();
        }

        // TODO: Remove after refactor 'react-redux'
        public componentWillReceiveProps(P, S) {
            super.componentWillReceiveProps(this.props, S);

            if (this.selector.shouldComponentUpdate) {
                storeDidUpdate(this.store.getState(), this.wrappedComponentPrototype);
            }
        }

        public get wrappedComponentPrototype() {
            return ConnectedComponent.WrappedComponent.prototype;
        }
    }
}
