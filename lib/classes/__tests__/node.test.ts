// * classes
import { Color } from "@classes/color";
import { Node } from "@classes/node";
import { Position } from "@classes/position";

// * interfaces
import { Genome } from "@interfaces/genome.interface";

// * mocks
import { updateNodePositionMock } from "@classes/__mocks__/simulation.mock";

let node : Node;
let genome : Genome;
let spy : jest.SpyInstance;


beforeEach(() => {
    // TODO Mock simulation class
    genome = {
        fireOrder: [ "Neuron 2", "Neuron 1", "Neuron 3", "Neuron 4", "Neuron 5" ],
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
    node.updateNodePosition = updateNodePositionMock;

    // ? add test function to manipulate lastDirection property of node.senation object
    node["updateLastDirection"] = function (x : number, y : number) {
        this.sensation.lastDirection = new Position(x, y);
    };

    // ? add test function to manipulate sensation.x and sensation.y properties
    node["updateCoordinates"] = function (x : number, y : number) {
        this.sensation.x = x;
        this.sensation.y = y;
    };

    spy = jest.spyOn(node, "updateNodePosition").mockReturnValue(true);
});

describe("Classes - Node: Instantiation", () => {
    test("Initialize Node Instance", () => {
        expect(node).toBeInstanceOf(Node);
        expect(node.id).toBe("123");
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
    });

    test("Get Node Color", () => {
        expect(node.getColor).toBeInstanceOf(Color);
        expect(node.getColor.r).toBe(100);
        expect(node.getColor.g).toBe(150);
        expect(node.getColor.b).toBe(200);
    });

    test("Get Node Age", () => {
        expect(node.getAge).toBe(0);
        expect(typeof node.getAge).toBe("number");
    });

    test("Get Node Sensation", () => {
        expect(node.getSensation.age).toBe(0);
        expect(node.getSensation.x).toBe(10);
        expect(node.getSensation.y).toBe(1);
    });
});

describe("Classes - Node: Action Functions", () => {
    test("moveX", () => {
        node.moveX(1);
        expect(node.x).toBe(11);
        expect(node.y).toBe(1);
        expect(spy).toHaveBeenCalledTimes(1);

        node.moveX(-1);
        expect(node.x).toBe(10);
        expect(node.y).toBe(1);
        expect(spy).toHaveBeenCalledTimes(2);

        expect(() => node.moveX(0)).rejects.toThrow();
        expect(() => node.moveX(2)).rejects.toThrow();
        expect(() => node.moveX(-2)).rejects.toThrow();

        expect(node.x).toBe(10);
        expect(node.y).toBe(1);
    });

    test("moveY", () => {
        node.moveY(1);
        expect(node.x).toBe(10);
        expect(node.y).toBe(2);
        expect(spy).toHaveBeenCalledTimes(1);

        node.moveY(-1);
        expect(node.x).toBe(10);
        expect(node.y).toBe(1);
        expect(spy).toHaveBeenCalledTimes(2);

        expect(() => node.moveY(0)).rejects.toThrow();
        expect(() => node.moveY(2)).rejects.toThrow();
        expect(() => node.moveY(-2)).rejects.toThrow();
        
        expect(node.x).toBe(10);
        expect(node.y).toBe(1);
    });

    test("moveFwd", () => {
        // ? set lastDirection to (1, 0)
        node["updateLastDirection"](1, 0);
        node.moveFwd();
        expect(node.x).toBe(11);
        expect(node.y).toBe(1);
        expect(spy).toHaveBeenCalledTimes(1);

        // ? set lastDirection to (0, 1)
        node["updateLastDirection"](0, 1);
        node.moveFwd();
        expect(node.x).toBe(11);
        expect(node.y).toBe(2);
        expect(spy).toHaveBeenCalledTimes(2);

        // ? set lastDirection to (1, 1)
        node["updateLastDirection"](1, 1);
        expect(() => node.moveFwd()).rejects.toThrow();
        expect(node.x).toBe(11);
        expect(node.y).toBe(2);
        expect(spy).toHaveBeenCalledTimes(2);
    });

    test("moveBwd", () => {
        // ? set lastDirection to (1, 0)
        node["updateLastDirection"](1, 0);
        node.moveBwd();
        expect(node.x).toBe(9);
        expect(node.y).toBe(1);
        expect(spy).toHaveBeenCalledTimes(1);

        // ? set lastDirection to (0, 1)
        node["updateLastDirection"](0, 1);
        node.moveBwd();
        expect(node.x).toBe(9);
        expect(node.y).toBe(0);
        expect(spy).toHaveBeenCalledTimes(2);

        // ? set lastDirection to (1, 1)
        node["updateLastDirection"](1, 1);
        expect(() => node.moveBwd()).rejects.toThrow();
        expect(node.x).toBe(9);
        expect(node.y).toBe(0);
        expect(spy).toHaveBeenCalledTimes(2);
    });
    
    test("moveRnd", () => {
        for (let i = 0; i < 10; i++) {
            node.moveRnd();
            expect(node.x + node.y === 12 || node.x + node.y === 10).toBeTruthy();
            expect(spy).toHaveBeenCalledTimes(1);

            node["updateCoordinates"](10, 1);
            spy.mockClear();
        }
    });
});

describe("Classes - Node: Other functions", () => {
    test("act", () => {
        node.act();

        expect(node.getAge).toBe(1);
        expect(node.getSensation.age).toBe(1);
    });

    test("copyGenome", () => {
        for (let i = 0; i < 100; i++) {
            const { genome: genomeCopy, hasMutated } = node.copyGenome();
            if (hasMutated) expect(genomeCopy).not.toBe(genome); 
            else expect(genomeCopy).toBe(genome);
        }
    });

    test("reproduce", () => {
        const cellOccupiedMock = jest.fn().mockImplementation((position : Position) => false);
        cellOccupiedMock.mockImplementationOnce((position : Position) => true);

        const copyGenomeMock = jest.spyOn(node, "copyGenome").mockReturnValue({ genome: genome, hasMutated: false });
        copyGenomeMock.mockReturnValueOnce({ genome: genome, hasMutated: true });

        const newNode : Node = node.reproduce(cellOccupiedMock);        

        expect(cellOccupiedMock).toHaveBeenCalledTimes(2);
        expect(copyGenomeMock).toHaveBeenCalledTimes(1);
        expect(newNode).toBeInstanceOf(Node);
        expect(newNode.getColor).toBeInstanceOf(Color);

        
        cellOccupiedMock.mockClear();
        copyGenomeMock.mockClear();

        node.reproduce(cellOccupiedMock);
        expect(cellOccupiedMock).toHaveBeenCalledTimes(1);
        expect(copyGenomeMock).toHaveBeenCalledTimes(1);
    });

    test.todo("storeGenome");
});

