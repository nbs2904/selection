import { Cell } from "../cell";
import { Color } from "../color";

describe("Test Cell Class", () => {
    // TODO spy on function
    test("Initialize Cell Instance with Values", () => {
        const cell = new Cell(true, new Color(100, 150, 200));

        expect(cell.occupied).toBe(true);
        expect(cell.color).toBeInstanceOf(Color);
        expect(cell.color.r).toBe(100);
        expect(cell.color.g).toBe(150);
        expect(cell.color.b).toBe(200);

        expect(typeof cell.occupied).toBe("boolean");
    });

    test("Initialize Cell without Values", () => {
        const cellWithDefaultValues = new Cell();

        expect(typeof cellWithDefaultValues.occupied).toBe("boolean");
        expect(cellWithDefaultValues.occupied).toBe(false);
        expect(cellWithDefaultValues.color).toBe(undefined);
    });

    test("Update Cell", () => {
        const testCell = new Cell(true, new Color(1, 2, 3));

        expect(testCell.occupied).toBe(true);

        testCell.update(false, new Color(4, 5, 6));

        expect(testCell.occupied).toBe(false);
    });

    test("Reset Cell", () => {
        const testCell = new Cell(true, new Color(1, 2, 3));

        expect(testCell.occupied).toBe(true);

        testCell.reset();

        expect(testCell.occupied).toBe(false);
        expect(testCell.color).toBe(undefined);

    });
});