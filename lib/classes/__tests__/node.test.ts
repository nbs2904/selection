import { northHalf } from "@levels/halfGrid.level";
import { Simulation } from "../simulation";
import { Color } from "../color";
import { Node } from "../node";
import { Position } from "../position";
import { Genome } from "@interfaces/genome.interface";

let simulation : Simulation;
let node : Node;
let genome : Genome;

beforeEach(() => {
    // TODO Mock simulation class
    simulation = new Simulation(northHalf);
    genome = {
        sensors: {
            "XPos": {
                bias: 1,
                connections: {
                    "Neuron 1": 1,
                    "MoveX": 1
                }
            },
            "YPos": {
                bias: -2,
                connections: {
                    "Neuron 1": 1
                }
            },
            "Age": {
                bias: 1.19,
                connections: {
                    "Neuron 1": 1,
                    "Neuron 2": 1
                }
            }
        },
        innerNeurons: {
            "Neuron 1": {
                bias: -0.56,
                connections: {
                    "MoveX": 1,
                    "MoveY": 1,
                    "Neuron 3": 1
                }
            },
            "Neuron 2": {
                bias: -1.09,
                connections: {
                    "Neuron 1": 1,
                    "Neuron 4": 1,
                    "MoveY": 1
                }
            },
            "Neuron 3": {
                bias: -1.09,
                connections: {
                    "Neuron 2": 1,
                    "Neuron 3": 1,
                    "Neuron 4": 1,
                    "Neuron 5": 1,
                    "MoveY": 1
                }
            },
            "Neuron 4": {
                bias: -1.09,
                connections: {
                    "Neuron 3": 1,
                    "Neuron 5": 1,
                    "MoveY": 1
                }
            },
            "Neuron 5": {
                bias: -1.09,
                connections: {
                    "MoveY": 1
                }
            }
        },
        actions: {
            "MoveX": {
                bias: 1.61
            },
            "MoveY": {
                bias: 0.23
            }
        }
    };
    node = new Node("123", genome, new Position(10, 1), new Color(100, 150, 200));

    simulation.spawnNode(node);
});

describe("Classes - Node: Instantiation", () => {
    test("Initialize Node Instance", () => {
        node = new Node("456", genome, new Position(0, 0), new Color(200, 200, 200));
        
        expect(node.id).toBe("456");
        expect(node.getSensation.age).toBe(0);

        expect(typeof node.id).toBe("string");
        expect(typeof node.getSensation.age).toBe("number");
    });

});

describe("Classes - Node: Getter Functions", () => {
    test("Get Node Position",() => {
        expect(node.x).toBe(10);
        expect(node.y).toBe(1);

        expect(typeof node.x).toBe("number");
        expect(typeof node.y).toBe("number");
    });

    test("Get Node Color", () => {
        expect(node.getColor).toBeInstanceOf(Color);
        expect(node.getColor.r).toBe(100);
        expect(node.getColor.g).toBe(150);
        expect(node.getColor.b).toBe(200);
    });
});

describe("Classes - Node: Action Functions", () => {
    test.todo("Move Node in x-direction");
    test.todo("Move Node in y-direction");
});