import { expect } from "chai";
import * as Redux from "redux";

import { storeDidCatch } from "../../../src/methods";

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

describe("storeDidCatch()", () => {
    let store: Redux.Store;

    beforeEach(() => {
        store = createStore();
    });

    afterEach(() => {
        store = undefined;
    });

    it("Should do nothing when instance or instance.storeDidCatch is undefined", () => {
        storeDidCatch(store);

        expect(() => store.dispatch({ type: "error" })).to.throw("test error");

        storeDidCatch(store, {});

        expect(() => store.dispatch({ type: "error" })).to.throw("test error");
    });

    it("Should throw invariant when instance.storeDidCatch is not a function", () => {
        let error = false;
        try {
            storeDidCatch(store, { storeDidCatch: {} } as any)
        } catch (e) {
            error = true;
        }

        expect(error).to.be.true;
    });
});
