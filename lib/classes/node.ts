// * logger
const logger = require("../../config/log4js").node;

// * errors
import { CellOccupied } from "@errors/cell.errors";

// * classes
import { Position } from "@classes/position";
import { Color } from "@classes/color";

export class Node {
    public id : string;
    public age = 0;
    private position : Position;
    private color : Color;

    public cellOccupied : (x : number, y : number) => boolean;
    public updateNodePosition : (node : Node, oldPosition : Position) => void;

    // TODO change function to object containing all simulation functions which are needed. (Such as updateNodePosition)
    public constructor(id : string, position : Position, color : Color, cellOccupied : (x : number, y : number) => boolean, updateNodePosition : (node : Node, oldPosition : Position) => void) {
        this.id = id;
        this.position = position;
        this.color = color;

        this.cellOccupied = cellOccupied;
        this.updateNodePosition = updateNodePosition;
    }

    /**
     * Getter function for x coordinate
     * @returns - x coordinate
     */
    public get x() : number {
        return this.position.x;
    }

    /**
     * Getter function for y coordinate
     * @returns - y coordinate
     */
    public get y() : number {
        return this.position.y;
    }
    
    /**
     * Getter function to read color of node
     * @returns Color
     */
    public get getColor() : Color {
        return this.color;
    }
    
    /**
     * 
     * @param direction 
     */
    public moveX(direction : number) {
        // TODO check if already at most left or right position
        if(direction != 1 && direction != -1) {
            logger.error("Input of function moveX must be either 1 or -1.");
            throw new Error("Input of function moveX must be either 1 or -1.");
        }
        
        const oldPosition = this.position;
        const newPosition = new Position(this.x + direction, this.y);

        if(this.cellOccupied(newPosition.x, newPosition.y)) {
            logger.warn("Cell already occupied");
            throw new CellOccupied("Cell already occupied.");
        }

        this.position.x = newPosition.x;
        this.position.y = newPosition.y;

        this.updateNodePosition(this, oldPosition);
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