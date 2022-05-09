// * functions
import { normalise } from "@functions/normalise";


describe("Functions - normalise", () => {
    test("Not Weight and Bias adapted", () => {
        const returnFunction = normalise(0, 50, false);
        const returnFunctionDefaultValue = normalise(0, 50);

        expect(returnFunction(50)).toBe(1);
        expect(returnFunction(0)).toBe(-1);

        expect(() => returnFunction(-1)).toThrow();
        expect(() => returnFunction(51)).toThrow();


        expect(returnFunctionDefaultValue(50)).toBe(1);
        expect(returnFunctionDefaultValue(0)).toBe(-1);

        expect(() => returnFunctionDefaultValue(-1)).toThrow();
        expect(() => returnFunctionDefaultValue(51)).toThrow();
    });

    test("Weight and Bias adapted", () => {
        const returnFunction = normalise(0, 50, true);

        expect(returnFunction(-204)).toBe(-1);
        expect(returnFunction(0)).toBe(0);
        expect(returnFunction(204)).toBe(1);

        expect(() => returnFunction(-205)).toThrow();
        expect(() => returnFunction(205)).toThrow();
    });

    test("Lower bound bigger than upper bound", () => {
        expect(() => normalise(50, 0, false)).toThrow();
        expect(() => normalise(50, 0, true)).toThrow();
    });
});