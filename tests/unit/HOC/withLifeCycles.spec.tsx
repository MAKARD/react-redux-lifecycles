import { expect } from "chai";
import * as React from "react";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import { mount, ReactWrapper } from "enzyme";

import { withLifeCycles } from "../../../src";
import { WrappedComponent } from "../WrappedComponent";

const createStore = () => Redux.createStore((state = {}, action: any) => {
    switch (action.type) {
        case "any": {
            return {
                ...state,
                ...action.data
            };
        }
        case "error": {
            throw new Error("test error");
        }
        default: {
            return state;
        }
    }
});

describe("withLifeCycles()", () => {
    let Connected: React.ComponentClass;
    let wrapper: ReactWrapper<{}, {}>;

    let store: Redux.Store;

    beforeEach(() => {
        store = createStore();

        Connected = withLifeCycles(
            ReactRedux.connect((state) => state, undefined, undefined, { withRef: true }
            )(WrappedComponent));
        wrapper = mount(
            <ReactRedux.Provider store={store}>
                <Connected />
            </ReactRedux.Provider>
        );
    });

    afterEach(() => {
        Connected = undefined;
        store = undefined;
        wrapper.unmount();
    });

    it("Should correctly render", () => {
        expect(wrapper.getDOMNode().innerHTML).to.equals("WrappedComponent");
    });

    it("Should call 'storeDidUpdate' when store receive new state", () => {
        store.dispatch({
            type: "any",
            data: {
                test: true
            }
        });

        // Crutch. No idea how it's works
        (wrapper.find(Connected).instance() as any).selector.shouldComponentUpdate = true;
        wrapper.find(ReactRedux.Provider).instance().forceUpdate();

        expect(WrappedComponent.storeDidUpdateCalled).to.be.true;
    });

    it("Should call 'storeDidThrow' when store throw error", () => {
        store.dispatch({
            type: "error"
        });

        expect(WrappedComponent.storeDidThrowCalled).to.be.true;
    });
});
