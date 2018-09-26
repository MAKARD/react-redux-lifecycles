import { expect } from "chai";
import * as Redux from "redux";

import { storeDidReplaceReducer } from "../../../src/methods";

const createStore = () => Redux.createStore((state = {}, action: any) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
});

describe("storeDidReplaceReducer()", () => {
    let store: Redux.Store;

    beforeEach(() => {
        store = createStore();
    });

    afterEach(() => {
        store = undefined;
    });

    it("Should do nothing when instance or instance.storeDidReplaceReducer is undefined", () => {
        expect(storeDidReplaceReducer(store)).to.not.throw;
        expect(storeDidReplaceReducer(store, {})).to.not.throw;
    });

    it("Should throw invariant when instance.storeDidReplaceReducer is not a function", () => {
        let error = false;
        try {
            storeDidReplaceReducer(store, { storeDidReplaceReducer: {} } as any)
        } catch (e) {
            error = true;
        }

        expect(error).to.be.true;
    });
});
