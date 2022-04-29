// * classes
import { Cell } from "@classes/cell";
import { Node } from "@classes/node";
import { Position } from "@classes/position";
import { Simulation } from "@classes/simulation";

// * levels
import { northHalf } from "@levels/halfGrid.level";

// * mocks
let cellOccupiedSpy : jest.SpyInstance;
const resetSpy = jest.spyOn(Cell.prototype, "reset");
const updateSpy = jest.spyOn(Cell.prototype, "update");

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
        const node = simulation.spawnNode();

        expect(cellOccupiedSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(simulation.livingNodesCount).toBe(1);
        expect(node).toBeInstanceOf(Node);
    });
});