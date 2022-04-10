import { randomInteger, randomFloat } from "@utility/randomNumber";

describe("Utility - randomInteger", () => {
    test("No lower boundary", () => {
        for (let index = 0; index < 10; index++) {
            const number = randomInteger(10);
            expect(number).toBeLessThanOrEqual(10);
            expect(number).toBeGreaterThanOrEqual(0);
        }
    });

    test("Given lower boundary", () => {
        for (let index = 0; index < 10; index++) {
            const number = randomInteger(10, 5);
            expect(number).toBeLessThanOrEqual(10);
            expect(number).toBeGreaterThanOrEqual(5);
        }
    });

    test("Invalid boundaries", () => {
        expect(() => {
            randomInteger(10, 20);
        }).toThrowError("max must be greater than or equal to min");
    });
});

describe("Utility - randomFloat", () => {
    test("No lower boundary", () => {
        for (let index = 0; index < 10; index++) {
            const number = randomFloat(10);
            expect(number).toBeLessThanOrEqual(10);
            expect(number).toBeGreaterThanOrEqual(0);
        }
    });

    test("Given lower boundary", () => {
        for (let index = 0; index < 10; index++) {
            const number = randomFloat(10, 5);
            expect(number).toBeLessThanOrEqual(10);
            expect(number).toBeGreaterThanOrEqual(5);
        }
    });

    test("Invalid boundaries", () => {
        expect(() => {
            randomFloat(10, 20);
        }).toThrowError("max must be greater than or equal to min");
    });
});