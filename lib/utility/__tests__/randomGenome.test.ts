// * utility
import { randomGenome } from "@utility/randomGenome";
import { validateGenome } from "@utility/validateGenome";

describe("Utility - randomGenome", () => {
    test("Generate random genomes", () => {
        for (let i = 0; i < 10; i++) {
            expect(validateGenome(randomGenome())).toBe(true);
        }
    });
});
