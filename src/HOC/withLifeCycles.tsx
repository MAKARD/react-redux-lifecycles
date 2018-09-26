import * as React from "react";
import * as Redux from "redux";

import { storeDidUpdate } from "../methods";

export function withLifeCycles(ConnectedComponent: typeof React.Component & { [key: string]: any }): any {
    return class LifeCycledComponent extends ConnectedComponent {
        public wrappedInstance: {
            storeDidUpdate?: (state: any) => void;
        };
        public store: Redux.Store;
        public selector: {
            run: any;
            shouldComponentUpdate: boolean;
        };

        // TODO: Remove after refactor 'react-redux'
        public componentWillReceiveProps(P, S) {
            super.componentWillReceiveProps(this.props, S);

            if (this.selector.shouldComponentUpdate) {
                storeDidUpdate(this.store, this.wrappedInstance, ConnectedComponent.WrappedComponent.prototype);
            }
        }
    }
}
