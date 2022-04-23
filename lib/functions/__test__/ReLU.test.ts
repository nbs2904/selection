// * functions
import { ReLU } from "@functions/ReLU";

describe("Functions - ReLU", () => {
    test("Input >= 0", () => {
        expect(ReLU(0)).toBe(0);
        expect(ReLU(1)).toBe(1);
        expect(ReLU(100)).toBe(100);
    });

    test("Input < 0", () => {
        expect(ReLU(-1)).toBe(0);
        expect(ReLU(-100)).toBe(0);
    });
});