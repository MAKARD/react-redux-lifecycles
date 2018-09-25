import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";

import { warning } from "../utils/warning";
import { storeDidUpdate, storeDidCatch } from "../methods";

// storeDidUpdate
// storeDidThrow

const lifeCycleMethods = ["storeWillUpdate", "storeDidUpdate", "storeDidThrow"];

export function withLifeCycles<C extends React.ComponentClass, P = {}>(ConnectedComponent: ReactRedux.ConnectedComponentClass<C, P>) {
    return class extends ConnectedComponent {
        public wrappedInstance?: C & {
            storeDidUpdate?: <S = any>(storeState: S) => void;
        }
        public store: Redux.Store;
        public selector: {
            shouldComponentUpdate: boolean;
            run: (props: P) => void;
            error?: any;
            props: P;
        }

        public componentDidMount() {
            super.componentDidMount();

            this.checkMethods();

            storeDidCatch(this.store, this.wrappedInstance);
        }

        public componentWillReceiveProps(P, S) {
            super.componentWillReceiveProps(P, S);

            this.selector.shouldComponentUpdate && storeDidUpdate(this.store.getState(), this.wrappedInstance);
        }

        public get wrappedComponentPrototype() {
            return ConnectedComponent.WrappedComponent.prototype;
        }

        public checkMethods = () => {
            const methods = lifeCycleMethods.reduce((usedMethods, availableMethod) => {
                this.wrappedComponentPrototype[availableMethod] && usedMethods.push(availableMethod);

                return usedMethods;
            }, []);

            if (methods.length && !this.wrappedInstance) {
                methods.forEach((name) => warning(
                    `To use ${name} callback, you need to specify ` +
                    `{ withRef: true } in the options argument of the connect() call.`
                ));
            }
        }
    }
}
