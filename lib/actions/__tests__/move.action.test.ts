// * actions
import { Action } from "@actions/action";
import { moveX, moveY, moveFwd, moveBwd, moveRnd } from "@actions/move.action";



describe("Actions - Move", () => {
    test("moveX action", () => {
        const moveXAction = moveX(0, async () => {return;});
        expect(moveXAction).toBeInstanceOf(Action);
    });

    test("moveY action", () => {
        const moveYAction = moveY(0, async () => {return;});
        expect(moveYAction).toBeInstanceOf(Action);
    });

    test("moveFwd action", () => {
        const moveFwdAction = moveFwd(0, async () => {return;});
        expect(moveFwdAction).toBeInstanceOf(Action);
    });

    test("moveBwd action", () => {
        const moveBwdAction = moveBwd(0, async () => {return;});
        expect(moveBwdAction).toBeInstanceOf(Action);
    });

    test("moveRnd action", () => {
        const moveRndAction = moveRnd(0, async () => {return;});
        expect(moveRndAction).toBeInstanceOf(Action);
    });
});