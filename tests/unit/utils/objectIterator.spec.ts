import { expect } from "chai";

import { objectIterator } from "../../../src/utils/objectIterator";

describe("objectIterator()", () => {
    it("Should return value according to path in passed object", () => {
        expect(objectIterator("level1.level2", { level1: { level2: true } })).to.be.true;
    });

    it("Should throw error if path incorrect", () => {
        expect(() => objectIterator("level3.level2", { test: true })).to.throw();
    });
});
