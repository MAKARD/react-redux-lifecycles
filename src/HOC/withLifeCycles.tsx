import * as React from "react";
import * as Redux from "redux";

import { warning } from "../utils/warning";
import { storeDidUpdate, storeDidCatch } from "../methods";

const lifeCycleMethods = ["storeDidUpdate", "storeDidThrow"];

export function withLifeCycles(ConnectedComponent: typeof React.Component & { [key: string]: any }): any {
    return class LifeCycledComponent extends ConnectedComponent {
        public test: keyof typeof ConnectedComponent;
        public wrappedInstance?: {
            storeDidUpdate?: <S = any>(storeState: S) => void;
            storeDidCatch?: <S = any> (error: S) => void;
        }
        public store: Redux.Store;
        public selector: {
            shouldComponentUpdate: boolean;
            run: (props: any) => void;
            error?: any;
            props: any;
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
