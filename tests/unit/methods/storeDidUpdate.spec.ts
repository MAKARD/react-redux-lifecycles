import { expect } from "chai";

import { storeDidUpdate } from "../../../src/methods";

describe("storeDidUpdate()", () => {
    it("Should call storeDidUpdate if method valid", () => {
        let called = false;
        const instance = {
            storeDidUpdate: () => {
                called = true;
            }
        }

        storeDidUpdate({}, instance, instance);

        expect(called).to.be.true;
    });

    it("Should not call storeDidUpdate if method not valid", () => {
        let called = false;
        const instance = {
            storeDidUpdate: () => {
                called = true;
            }
        }

        storeDidUpdate({}, {}, instance);

        expect(called).to.be.false;
        instance.storeDidUpdate();
        expect(called).to.be.true;
    });
});
