import { Simulation } from "../simulation";
import { Color } from "../color";
import { Node } from "../node";
import { Position } from "../position";

let simulation : Simulation;
let node : Node;

beforeEach(() => {
    // TODO Mock simulation class
    simulation = new Simulation(5);
    node = new Node("123", new Position(0, 1), new Color(100, 150, 200), simulation.updateNodePosition);

    simulation.spawnNode(node);
});

describe("Test Node Class Instantiation", () => {
    test("Initialize Node Instance", () => {
        node = new Node("456", new Position(0, 0), new Color(200, 200, 200), simulation.updateNodePosition);
        
        expect(node.id).toBe("456");
        expect(node.age).toBe(0);

        expect(typeof node.id).toBe("string");
        expect(typeof node.age).toBe("number");
    });

});

describe("Test Node Get Functions", () => {
    test("Get Node Position",() => {
        expect(node.x).toBe(0);
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

describe("Test Node Action Functions", () => {
    test.todo("Move Node in x-direction");
    test.todo("Move Node in y-direction");
});