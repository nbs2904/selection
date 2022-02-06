import { Genome } from "@classes/genome";
// * logger
const logger = require("@config/log4js").node;

// * classes
import { Position } from "@classes/position";
import { Color } from "@classes/color";
export class Node {
    public id : string;
    public age = 0;
    public lifespan = process.env.STEP_PER_GENERATION || 200;

    // TODO set private again
    public position : Position;
    private color : Color;

    public updateNodePosition : (node : Node, oldPosition : Position) => boolean;

    public constructor(id : string, position : Position, color : Color, updateNodePosition? : (node : Node, oldPosition : Position) => boolean) {
        this.id = id;
        this.position = position;
        this.color = color;

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
            this.position = newPosition;
            logger.info("One step closer to freedom");
        } else {
            logger.warn("Cannot move", this.position);
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
            this.position = newPosition;
            logger.info("One step closer to freedom");
        } else {
            logger.warn("Cannot move", this.position);
        }
    }

    private initGenome(genome? : Genome) {
        // TODO initialise genome
    }
}