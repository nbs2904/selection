import { Cell } from "./cell";
import { Node } from "./node";

export class Simulation {
    public gridSize : number;
    public age  = 0;
    public livingNodes  = 0;
    public nodes : Node[] = [];
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
}