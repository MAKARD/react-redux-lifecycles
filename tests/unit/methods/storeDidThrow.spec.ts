import { expect } from "chai";
import * as Redux from "redux";

import { storeDidThrow } from "../../../src/methods";

const createStore = () => Redux.createStore((state = {}, action: any) => {
    switch (action.type) {
        case "error": {
            throw new Error("test error");
        }
        default: {
            return state;
        }
    }
});

describe("storeDidThrow()", () => {
    let store: Redux.Store;

    beforeEach(() => {
        store = createStore();
    });

    afterEach(() => {
        store = undefined;
    });

    it("Should do nothing when instance or instance.storeDidThrow is undefined", () => {
        storeDidThrow(store);

        expect(() => store.dispatch({ type: "error" })).to.throw("test error");

        storeDidThrow(store, {});

        expect(() => store.dispatch({ type: "error" })).to.throw("test error");
    });

    it("Should throw invariant when instance.storeDidThrow is not a function", () => {
        let error = false;
        try {
            storeDidThrow(store, { storeDidThrow: {} } as any)
        } catch (e) {
            error = true;
        }

        expect(error).to.be.true;
    });
});
