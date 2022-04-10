import { equals } from "@utility/equals";

describe("Utility - equals", () => {
    test("Equal arrays", () => {
        const a = ["a", "b", "c"];
        const b = ["a", "b", "c"];

        expect(equals(a, b)).toBe(true);
    });

    test("Different arrays", () => {
        const a = ["a", "b", "c"];
        const b = ["a", "b", "d"];

        expect(equals(a, b)).toBe(false);
    });

    test("Different length arrays", () => {
        const a = ["a", "b", "c"];
        const b = ["a", "b"];

        expect(equals(a, b)).toBe(false);
    });

    test("Empty arrays", () => {
        const a = [];
        const b = [];

        expect(equals(a, b)).toBe(true);
    });

    test("Empty and non-empty arrays", () => {      
        const a = [];
        const b = ["a", "b", "c"];

        expect(equals(a, b)).toBe(false);
    });

    test("Permutation of arrays", () => {
        const a = ["a", "b", "c"];
        const b = ["c", "b", "a"];

        expect(equals(a, b)).toBe(false);
    });
});