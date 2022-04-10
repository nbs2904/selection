import { Color } from "../color";

describe("Classes - Color", () => {
    test("Initialize Color Instance", () => {
        const color = new Color(1, 2, 3);

        expect(color.r).toBe(1);
        expect(color.g).toBe(2);
        expect(color.b).toBe(3);

        expect(typeof color.r).toBe("number");
        expect(typeof color.g).toBe("number");
        expect(typeof color.b).toBe("number");
    });

    test("Invalid parameters", () => {
        expect(() => { new Color(256, 0, 0); }).toThrow();
        expect(() => { new Color(-1, 0, 0); }).toThrow();        
        expect(() => { new Color(0, 256, 0); }).toThrow();
        expect(() => { new Color(0, -1, 0); }).toThrow();        
        expect(() => { new Color(0, 0, 256); }).toThrow();
        expect(() => { new Color(0, 0, -1); }).toThrow();
    });
});