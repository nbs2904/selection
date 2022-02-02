import { Color } from "../color";

describe("Test Color Class", () => {
    // TODO initialise color with invalid input values
    test("Initialize Color Instance", () => {
        const color = new Color(1, 2, 3);

        expect(color.r).toBe(1);
        expect(color.g).toBe(2);
        expect(color.b).toBe(3);

        expect(typeof color.r).toBe("number");
        expect(typeof color.g).toBe("number");
        expect(typeof color.b).toBe("number");
    });
});