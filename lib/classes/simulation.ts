import { nanoid } from "nanoid";
import { randomInteger } from "@utility/randomInteger";

// * logger
import { simulation as logger} from "config/log4js";
// * errors
import { CellOccupied } from "@errors/cell.errors";

// * classes
import { Cell } from "@classes/cell";
import { Color } from "@classes/color";
import { Node } from "@classes/node";
import { Position } from "@classes/position";

// * interfaces
import { NodeList } from "@interfaces/nodeList.interface";


export class Simulation {
    public gridSize : number;
    public age  = 0;
    public livingNodes  = 0;
    public nodes : NodeList = {};
    public grid : Cell[][] = [];

    constructor(gridSize : number) {
        this.gridSize = gridSize;

        let tempArray : Cell[] = [];

        for(let i = 0; i < this.gridSize; i++){
            for(let j = 0; j < this.gridSize; j++){
                tempArray.push(new Cell());
            }

            this.grid.push(tempArray);
            tempArray = [];
        }

        tempArray = [];
    }

    // * function Overloading ---------------------------------------
    public cellOccupied(x : number, y : number) : boolean;
    public cellOccupied(position : Position) : boolean;
    
    /**
     * Checks if cell is already occupied
     * @param xOrPosition first paramter is either x : number or position : Position
     * @param y second parameter is optional
     * @returns boolean
     */
    // TODO Test cases:
    // TODO cell occupied
    // TODO node off-grid
    // TODO each with coordinates and position
    public cellOccupied(xOrPosition : any, y? : number) : boolean {
        if(typeof xOrPosition === "number") {
            if(xOrPosition < 0 || xOrPosition >= this.gridSize || y < 0 || y >= this.gridSize) {
                logger.warn("Node wants to move off the grid!");
                return true;
            }

            return this.grid[xOrPosition][y].occupied;
        } else {
            if(xOrPosition.x < 0 || xOrPosition.x >= this.gridSize || xOrPosition.y < 0 || xOrPosition.y >= this.gridSize) {
                logger.warn("Node wants to move off the grid!");
                return true;
            }

            return this.grid[xOrPosition.x][xOrPosition.y].occupied;
        }
    }
    // * ----------------------------------------------------------------


    /**
     * removes node from the cell it was before and updates new cell
     * @param node - contains the new position to update new cell
     * @param oldPosition - contains old position to reset old cell
     * @throws {CellOccupied} - if new postition is already occupied grid won't be updated
     */
    public updateNodePosition(node : Node, newPosition : Position) : boolean {
        if(this.cellOccupied(newPosition)) {
            return false;
        }

        this.grid[node.x][node.y].reset();
        this.grid[newPosition.x][newPosition.y].update(true, node.getColor);

        return true;
    }

    /**
     * spawns a new node onto the grid
     * @returns new node
     */
    public async spawnNode(genome? : any) : Promise<Node> {
        // TODO genome missing
        // TODO assign id depending on genome

        if(this.livingNodes === this.gridSize * this.gridSize) {
            logger.warn("Grid seems to be overflowing.");
            throw Error("Grid is full");
        }

        const id = nanoid(5);
        
        // ? assign random position, repeat until cell not occupied
        let x = randomInteger(this.gridSize);
        let y = randomInteger(this.gridSize);

        while (this.cellOccupied(x, y)) {
            x = randomInteger(this.gridSize);
            y = randomInteger(this.gridSize);
        }
        const position = new Position(x, y);
        // TODO assign color depending on genome
        const color = new Color(randomInteger(255), randomInteger(255), randomInteger(255));

        const node = new Node(id, position, color, this.updateNodePosition.bind(this));
        
        // TODO might implement addNode to do all three actions below
        this.grid[node.x][node.y].update(true, node.getColor);
        
        this.nodes[node.id] = node;
        this.livingNodes++;

        // logger.info(`Node with id: ${node.id} was spawned`);

        return node;
    }
}