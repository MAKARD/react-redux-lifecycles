import { expect } from "chai";

import { storeDidUpdateState } from "../../../src/methods";

describe("storeDidUpdateState()", () => {
    it("Should not call storeDidUpdateState if method not valid", () => {
        let called = false;
        const instance = {
            storeDidUpdateState: () => {
                called = true;
            }
        }

        storeDidUpdateState({}, {}, [], {}, instance);

        expect(called).to.be.false;
        instance.storeDidUpdateState();
        expect(called).to.be.true;
    });

    it("Should not call storeDidUpdateState if method valid and store receive new specific state", () => {
        let called = false;
        const instance = {
            storeDidUpdateState: () => {
                called = true;
            }
        }

        storeDidUpdateState({ test: true }, { test: false }, ["whatever"], instance, instance);

        expect(called).to.be.false;
        storeDidUpdateState({ test: true }, { test: false }, ["test"], instance, instance);

        expect(called).to.be.true;
    });
});
