import { Position } from "../position";

describe("Classes - Position", () => {
    test("Initialize Position Instance", () => {
        const position = new Position(10, 20);

        expect(position.x).toBe(10);
        expect(position.y).toBe(20);

        expect(typeof position.x).toBe("number");
        expect(typeof position.y).toBe("number");
    });

    test("Initialize Position without arguments", () => {
        const position = new Position();

        expect(position.x).toBeGreaterThanOrEqual(0);
        expect(position.y).toBeLessThanOrEqual(50);

        expect(typeof position.x).toBe("number");
        expect(typeof position.y).toBe("number");
    });
});