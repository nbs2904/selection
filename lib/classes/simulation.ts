import { nanoid } from "nanoid";
import { randomInteger } from "@utility/randomInteger";
import { logger } from "config/logger";

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

        for (let index = 0; index < this.gridSize; index++) {
            tempArray.push(new Cell(false));            
        }

        for (let index = 0; index < this.gridSize; index++) {
            this.grid.push(tempArray);
        }

        tempArray = [];
    }

    public cellOccupied(x : number, y : number){
        return this.grid[x][y].occupied;
    }

    /**
     * removes node from the cell it was before and updates new cell
     * @param node - contains the new position to update new cell
     * @param oldPosition - contains old position to reset old cell
     * @throws {CellOccupied} - if new postition is already occupied grid won't be updated
     */
    public updateNodePosition(node : Node, oldPosition : Position) {
        // TODO if cell is alreay occupied throw error (need to figure out if that is the best solution to handle that)
        if(!this.grid[node.getPosition.x][node.getPosition.y].occupied){
            this.grid[oldPosition.x][oldPosition.y].reset();
            this.nodes[node.id] = node;
            this.grid[node.getPosition.x][node.getPosition.y].update(true, node.getColor);
        } else {
            throw new CellOccupied("Cell is already occupied.");
        }
    }

    /**
     * spawns a new node onto the grid
     * @returns new node
     */
    public spawnNode(genome? : any) : Node {
        // TODO genome missing
        // TODO assign id depending on genome
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

        const node = new Node(id, position, color, this.cellOccupied);
        
        // TODO might implement addNode to do all three actions below
        this.grid[node.getPosition.x][node.getPosition.y].update(true, node.getColor);
        
        this.nodes[node.id] = node;
        this.livingNodes++;

        logger.info(`Node with id: ${node.id} was spawned`);

        return node;
    }
}