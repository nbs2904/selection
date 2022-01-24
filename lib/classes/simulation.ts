// * errors
import { CellOccupied } from "@errors/cell.errors";

// * classes
import { Cell } from "@classes/cell";
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
        if(this.grid[x][y].occupied) return true;
        else return false; 
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

            this.grid[node.getPosition.x][node.getPosition.y].occupied = true;
            this.grid[node.getPosition.x][node.getPosition.y].color = node.getColor;
        } else {
            throw new CellOccupied("Cell is already occupied.");
        }
    }
}