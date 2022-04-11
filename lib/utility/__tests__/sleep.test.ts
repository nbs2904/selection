import { sleep } from "@utility/sleep";

describe("Utility - sleep", () => {
    test("Sleep", async () => {
        const start = Date.now();
        await sleep(100);
        const end = Date.now();

        expect(end - start).toBeGreaterThanOrEqual(100);
    });
});