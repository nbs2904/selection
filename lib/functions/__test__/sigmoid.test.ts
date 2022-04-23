// * functions
import { sigmoid } from "@functions/sigmoid";


describe("Functions - sigmoid", () => {
    test("sigmoid", () => {
        expect(sigmoid(0)).toBe(0.5);
        expect(sigmoid(10)).toBeCloseTo(0.9999, 3);
        expect(sigmoid(-10)).toBeCloseTo(0.0000, 4);
    });
});