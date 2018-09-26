import { expect } from "chai";

import { storeDidUpdate } from "../../../src/methods";

describe("storeDidUpdate()", () => {
    it("Should do nothing when instance or instance.storeDidUpdate is undefined", () => {
        expect(storeDidUpdate({}, undefined, {})).to.not.throw;
        expect(storeDidUpdate({}, {}, {})).to.not.throw;
    });

    it("Should throw invariant when instance is undefined", () => {
        let error = false;
        try {
            storeDidUpdate({}, undefined, { storeDidUpdate: true } as any)
        } catch (e) {
            error = true;
        }

        expect(error).to.be.true;
    });

    it("Should throw invariant when instance.storeDidUpdate is not a function", () => {
        let error = false;
        try {
            storeDidUpdate({}, { storeDidUpdate: {} } as any, {})
        } catch (e) {
            error = true;
        }

        expect(error).to.be.true;
    });
});
