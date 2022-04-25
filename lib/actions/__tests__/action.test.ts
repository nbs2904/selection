// * classes
import { Node } from "@classes/node";
import { Position } from "@classes/position";

// * functions
import { tanh } from "@functions/tanh";

// * actions
import { Action } from "@actions/action";

// * interfaces
import { Genome } from "@interfaces/genome.interface";

// * mocks
import { moveXMock } from "@classes/__mocks__/node.mock";


describe("Actions - Base Class", () => {
    test("fire()", () => {
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

        const spy = jest.spyOn(node, "moveX").mockImplementation(moveXMock);
        
        const action : Action = new Action("testAction", 0, tanh, node.moveX.bind(node));

        action.input = 10;
        action.fire();
        
        expect(spy).toHaveBeenCalledWith(1);
        expect(node.x).toBe(1);

        spy.mockClear();

        action.input = -10;
        action.fire();

        expect(spy).toHaveBeenCalledWith(-1);
        expect(node.x).toBe(0);
    });
});