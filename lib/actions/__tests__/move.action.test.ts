// * classes
import { Node } from "@classes/node";
import { Position } from "@classes/position";

// * functions
import { tanh } from "@functions/tanh";

// * actions
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
const node : Node = new Node("testNode", genome, new Position(0, 0));


describe("Actions - Move", () => {
    // beforeEach(() => {

    // });

    test.todo("moveX action");

    test.todo("moveY action");

    test.todo("moveFwd action");

    test.todo("moveBwd action");

    test.todo("moveRnd action");
});