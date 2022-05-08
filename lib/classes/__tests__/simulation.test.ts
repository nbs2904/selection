// * classes
import { Cell } from "@classes/cell";
import { Node } from "@classes/node";
import { Position } from "@classes/position";
import { Simulation } from "@classes/simulation";

// * levels
import { northHalf } from "@levels/halfGrid.level";

// * utility
const sleepModule = require("@utility/sleep");

// * mocks
let cellOccupiedSpy : jest.SpyInstance;
const resetSpy = jest.spyOn(Cell.prototype, "reset");
const updateSpy = jest.spyOn(Cell.prototype, "update");

jest.mock("socket.io");
import { Socket } from "socket.io";

let simulation : Simulation;



describe("Classes - Simulation", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        simulation = new Simulation(northHalf);
        cellOccupiedSpy = jest.spyOn(simulation, "cellOccupied").mockReturnValue(false);
    });

    test("Initialization", () => {
        expect(simulation.level).toBe(northHalf);
        expect(simulation.currentGeneration).toBe(0);
        expect(simulation.currentStep).toBe(0);
        expect(simulation.livingNodesCount).toBe(0);
    });

    test("cellOccupied()", () => {
        cellOccupiedSpy.mockRestore();

        expect(simulation.cellOccupied(0, 0)).toBe(false);
        expect(simulation.cellOccupied(new Position(0, 0))).toBe(false);

        simulation.grid[0][0].occupied = true;
        expect(simulation.cellOccupied(0, 0)).toBe(true);
        expect(simulation.cellOccupied(new Position(0, 0))).toBe(true);
    });

    test("updateNodePosition()", () => {        
        const node : Node = new Node("testNode");        
        
        expect(simulation.updateNodePosition(node, new Position(0, 0))).toBe(true);
        expect(cellOccupiedSpy).toHaveBeenCalledTimes(1);
        expect(resetSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(simulation.grid[0][0].occupied).toBe(true);
        
        cellOccupiedSpy.mockReturnValueOnce(true);

        expect(simulation.updateNodePosition(node, new Position(0, 0))).toBe(false);
        expect(cellOccupiedSpy).toHaveBeenCalledTimes(2);
    });

    test("spawnNode() - throws", () => {
        process.env.POPULATION = "400";
        process.env.GRID = "50";
        
        simulation.livingNodesCount = 10000;
        expect(() => simulation.spawnNode()).toThrow();

        simulation.livingNodesCount = 2000;
        expect(() => simulation.spawnNode()).toThrow();
    });

    test("spawnNode(node)", () => {
        simulation.grid[0][0].occupied = true;
        let node : Node = new Node("testNode", undefined, new Position(0, 0));

        cellOccupiedSpy.mockReturnValueOnce(true);

        expect(() => simulation.spawnNode(node)).toThrow();

        simulation.grid[0][0].occupied = false;
        node = new Node("testNode", undefined, new Position(0, 0));

        expect(simulation.spawnNode(node)).toBe(node);
        expect(simulation.grid[0][0].occupied).toBe(true);
        expect(simulation.grid[0][0].color).toBe(node.getColor);
        expect(simulation.nodes[node.id]).toBe(node);
        expect(simulation.livingNodesCount).toBe(1);
    });

    test("spawnNode()", () => {
        cellOccupiedSpy.mockReturnValueOnce(true);

        const node = simulation.spawnNode();

        expect(cellOccupiedSpy).toHaveBeenCalledTimes(2);
        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(simulation.livingNodesCount).toBe(1);
        expect(node).toBeInstanceOf(Node);
    });

    test("step()", () => {
        const mockSocket : Socket = new Socket(undefined, undefined, undefined);
        mockSocket["emit"] = jest.fn();

        const node : Node = new Node("testNode");

        simulation.nodes["testNode"] = node;
        simulation.livingNodesCount++;

        const actSpy = jest.spyOn(node, "act").mockImplementation(() => {return;});

        simulation.step(mockSocket);

        expect(actSpy).toHaveBeenCalledTimes(1);
        expect(simulation.currentStep).toBe(1);

        expect(mockSocket["emit"]).toHaveBeenCalledTimes(1);
        expect(mockSocket["emit"]).toHaveBeenCalledWith("updateNodeList", { "testNode": node });
    });

    test("generation()", async () => {
        const mockSocket : Socket = new Socket(undefined, undefined, undefined);

        const stepSpy = jest.spyOn(simulation, "step").mockImplementation(() => {return;});
        const sleepSpy = jest.spyOn(sleepModule, "sleep").mockImplementation(() => {return;});

        
        const node : Node = new Node("testNode");
        
        simulation.nodes["testNode"] = node;
        simulation.livingNodesCount++;
        
        await simulation.generation(mockSocket);

        expect(stepSpy).toHaveBeenCalledTimes(200);
        expect(sleepSpy).toHaveBeenCalledTimes(200);

        expect(simulation.currentGeneration).toBe(1);
        expect(simulation.currentStep).toBe(0);
    });

    test("run()", async () => {
        const mockSocket : Socket = new Socket(undefined, undefined, undefined);

        const node : Node = new Node("testNode");
        simulation.nodes["testNode"] = node;
        simulation.livingNodesCount++;

        const spawnNodeSpy = jest.spyOn(simulation, "spawnNode").mockImplementation(() => {
            throw new Error();
        }).mockImplementationOnce(function (){
            this.livingNodesCount = 100;
            return node;
        }).mockImplementationOnce(() => {
            throw new Error();
        });

        const generationSpy = jest.spyOn(simulation, "generation").mockImplementation(async () => {return;});


        simulation["callPrivateFunction"] = function (node : Node) {
            this.nodeInsideBoundaries = jest.fn().mockReturnValue(false).mockReturnValueOnce(true);
            return this.nodeInsideBoundaries;
        };

        const reproduceSpy = jest.spyOn(Node.prototype, "reproduce").mockImplementation(() => {return new Node("test");});
        const nodeInsideBoundariesSpy = simulation["callPrivateFunction"](node);
        const storeGenomesSpy = jest.spyOn(simulation, "storeGenomes").mockImplementation(() => {return;});

        await simulation.run(mockSocket);

        expect(resetSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledTimes(2);
        expect(reproduceSpy).toHaveBeenCalledTimes(1);
        expect(nodeInsideBoundariesSpy).toHaveBeenCalledTimes(1);
        expect(spawnNodeSpy).toHaveBeenCalledTimes(2);
        expect(generationSpy).toHaveBeenCalledTimes(2);
        expect(storeGenomesSpy).toHaveBeenCalledTimes(1);
    });

    test("nodeInsideBoundaries()", () => {
        simulation["callPrivateFunction"] = function (node : Node) : boolean {
            return this.nodeInsideBoundaries(node);
        };

        const nodeInsideBoundaries = new Node("nodeInside", undefined, new Position(0, 0));
        const nodeOutsideBoundaries = new Node("nodeOutside", undefined, new Position(0, 51));

        expect(simulation["callPrivateFunction"](nodeOutsideBoundaries)).toBe(false);
        expect(simulation["callPrivateFunction"](nodeInsideBoundaries)).toBe(true);
    });

    test("storeGenomes()", () => {
        const node : Node = new Node("testNode");

        simulation.nodes["testNode"] = node;
        simulation.livingNodesCount++;


        const storeGenomesSpy = jest.spyOn(node, "storeGenome").mockImplementation(() => {return;}).mockImplementationOnce(() => {throw new Error("Unit test Error");});

        simulation.storeGenomes();
        simulation.storeGenomes();

        expect(storeGenomesSpy).toHaveBeenCalledTimes(2);

    });
});
