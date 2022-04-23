// * functions
import { tanh } from "@functions/tanh";


describe("Functions - tanh", () => {
    test("Test against math.tanh function", () => {
        expect(tanh(0)).toBe(Math.tanh(0));
        expect(tanh(1)).toBe(Math.tanh(1));
        expect(tanh(100)).toBe(Math.tanh(100));        
    });
});

