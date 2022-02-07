// * logger
const logger = require("@config/log4js").node;

// * classes
import { Genome } from "@classes/genome";
import { Position } from "@classes/position";
import { Color } from "@classes/color";

// * interfaces
import { Sensation } from "@interfaces/sensation.interface";

export class Node {
    public id : string;
    public lifespan = process.env.STEP_PER_GENERATION || 200;

    readonly sensation : Sensation;
    
    // private age = 0;
    // private position : Position;

    private color : Color;

    public updateNodePosition : (node : Node, oldPosition : Position) => boolean;

    public constructor(id : string, position : Position, color : Color, updateNodePosition? : (node : Node, oldPosition : Position) => boolean) {
        this.id = id;
        this.color = color;

        this.sensation = {
            age: 0,
            x: position.x,
            y: position.y
        };

        this.updateNodePosition = updateNodePosition;
    }

    /**
     * Getter function for x coordinate
     * @returns - x coordinate
     */

    public get x() : number {
        return this.sensation.x;
    }

    /**
     * Getter function for y coordinate
     * @returns - y coordinate
     */
    public get y() : number {
        return this.sensation.y;
    }
    
    /**
     * Getter function to read color of node
     * @returns Color
     */
    public get getColor() : Color {
        return this.color;
    }

    public get getAge() : number {
        return this.sensation.age;
    }
    
    /**
     * 
     * @param direction gives direction to move towards
     */
    // TODO Test cases:
    // TODO cause error
    public async moveX(direction : number) {
        if(direction != 1 && direction != -1) {
            logger.error("Input of function moveX must be either 1 or -1.");
            throw new Error("Input of function moveX must be either 1 or -1.");
        }

        const newPosition = new Position(this.x + direction, this.y);

        if(this.updateNodePosition(this, newPosition)) {
            this.sensation.x = newPosition.x;
            this.sensation.y = newPosition.y;
            logger.info("One step closer to freedom");
        } else {
            logger.warn("Cannot move", this.sensation.x, this.sensation.y);
        }
    }
    
    /**
     * 
     * @param direction gives direction to move towards
     */
    // TODO Test cases:
    // TODO cause error
    public async moveY(direction : number) {
        if(direction != 1 && direction != -1) {
            logger.error("Input of function moveY must be either 1 or -1.");
            throw new Error("Input of function moveY must be either 1 or -1.");
        }
        
        const newPosition = new Position(this.x, this.y + direction);

        if(this.updateNodePosition(this, newPosition)) {
            this.sensation.x = newPosition.x;
            this.sensation. y= newPosition.y;
            logger.info("One step closer to freedom");
        } else {
            logger.warn("Cannot move", this.sensation.x, this.sensation.y);
        }
    }

    private initGenome(genome? : Genome) {
        // TODO initialise genome
    }
}