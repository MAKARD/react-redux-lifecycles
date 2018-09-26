import { expect } from "chai";

import { isMethodValid } from "../../../src/utils/isMethodValid";

describe("isMethodValid()", () => {
    it("Should do nothing when instance or instance[methodName] is undefined", () => {
        expect(isMethodValid(undefined, {}, "test")).to.be.false;
        expect(isMethodValid({}, {}, "test")).to.be.false;
    });

    it("Should throw invariant when instance is undefined", () => {
        let error = false;
        try {
            isMethodValid(undefined, { test: true }, "test")
        } catch (e) {
            error = true;
        }

        expect(error).to.be.true;
    });

    it("Should throw invariant when instance[methodName] is not a function", () => {
        let error = false;
        try {
            isMethodValid({ test: "not function" }, { test: true }, "test")
        } catch (e) {
            error = true;
        }

        expect(error).to.be.true;
    });
});
