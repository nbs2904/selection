// * classes
import { Node } from "@classes/node";
import { Position } from "@classes/position";

// * functions
import { tanh } from "@functions/tanh";

// * actions
import { Action } from "@actions/action";
import { moveX, moveY, moveFwd, moveBwd, moveRnd } from "@actions/move.action";

// * interfaces
import { Genome } from "@interfaces/genome.interface";

const genome : Genome = {
    sensors: {
        "Age": {
            bias: 0,
            connections: {
                "Neuron 1": 1
            }
        }
    },
    innerNeurons: {
        "Neuron 1": {
            bias: 0,
            connections: {
                "MoveY": 1
            }
        }
    },
    actions: {
        "MoveY": { bias: 0 }
    }
};


describe("Actions - Move", () => {
    test("moveX action", () => {
        const moveXAction = moveX(0, async (input : number) => {return;});
        expect(moveXAction).toBeInstanceOf(Action);
    });

    test("moveY action", () => {
        const moveYAction = moveY(0, async (input : number) => {return;});
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