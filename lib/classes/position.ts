// * utility
import { randomInteger } from "@utility/randomNumber";

// * config
const GRID_SIZE = +(process.env.GRID_SIZE || 50) as number;


/**
 * 2-dimensional position with x and y coordinates
 */
export class Position {
    /** @public x-coordinate of position instance */
    public x : number;

    /** @public y-coordinate of position instance */
    public y : number;

    /**
     * @constructor
     * @param x - x-coordinate of position instance (if not provided, random number is generated)
     * @param y - y-coordinate of position instance (if not provided, random number is generated)
     */
    public constructor (x? : number, y? : number) {
        this.x = x !== undefined ? x : randomInteger(GRID_SIZE);
        this.y = y !== undefined ? y : randomInteger(GRID_SIZE);
    }
}