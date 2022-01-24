// * errors
import { CellOccupied } from "@errors/cell.errors";

// * classes
import { Position } from "@classes/position";
import { Color } from "@classes/color";

// * interfaces
import { Position  as PositionInterface} from "@interfaces/position.interface";

export class Node {
    public id : string;
    public age = 0;
    private position : Position;
    private color : Color;

    public cellOccupied : (x : number, y : number) => boolean;

    public constructor(id : string, position : Position, color : Color, cellOccupied : (x : number, y : number) => boolean) {
        this.id = id;
        this.position = position;
        this.color = color;

        this.cellOccupied = cellOccupied;
    }

    /**
     * Getter function to read position of node
     * @returns - Position
     */
    public get getPosition() : PositionInterface {
        return { 
            x: this.position.x,
            y: this.position.y
        };
    }
    
    /**
     * Getter function to read color of node
     * @returns Color
     */
    public get getColor() : Color {
        return this.color;
    }
    

    public moveX(direction : number) {
        if(direction < 0) {
            if(!this.cellOccupied(this.position.x - 1, this.position.y)) {
                this.position.x -= 1;
            } else {
                throw new CellOccupied("Cell is already occupied."); 
            }
        }
        else if(direction > 0) {
            if(!this.cellOccupied(this.position.x + 1, this.position.y)) {
                this.position.x += 1;
            } else {
                throw new CellOccupied("Cell is already occupied.");
            }
        }

        // TODO update grid somehow
    }

    public moveY(direction : number) {
        if(direction < 0) {
            if(!this.cellOccupied(this.position.x, this.position.y - 1)) {
                this.position.y -= 1;
            } else {
                throw new CellOccupied("Cell is already occupied."); 
            }
        }
        else if(direction > 0) {
            if(!this.cellOccupied(this.position.x, this.position.y + 1)) {
                this.position.y += 1;
            } else {
                throw new CellOccupied("Cell is already occupied.");
            }
        }

        // TODO update grid somehow
    }
}