// * classes
import { Color } from "@classes/color";


/**
 * Cell of a simulation's grid
 * A cell can be occupied, if so it stores the color of the current [Node](./node.ts) occupying it.
 */
export class Cell {
    /** @public Whether or not the cell is currently occupied by a [Node](./node.ts) */
    public occupied : boolean;

    /** @public If Cell is occupied, it stores the [Color](./color.ts) of the respective [Node](./node.ts) */
    public color : Color | undefined;

    /**
     * @constructor
     * @param occupied - Whether or not the cell is currently occupied by a [Node](./node.ts)
     * @param color - If Cell is occupied it stores the [Color](./color.ts) of the respective [Node](./node.ts)
     */
    public constructor (occupied? : boolean, color? : Color) {
        this.occupied = occupied || false;
        this.color = color || undefined;
    }

    /**
     * @public
     * Updates the cell's properties
     * @param occupied - Whether this cell is occupied by a [Node](./node.ts)
     * @param color - [Color](./color.ts) of the [Node](./node.ts) that currently occupies this cell
     */
    public update (occupied : boolean, color? : Color) {
        this.occupied = occupied;
        this.color = color || undefined;
    }

    /**
     * @public
     * resets cell object:
     *  - occupied is set to false
     *  - color is set to undefined
     */
    public reset () {
        this.occupied = false;
        this.color = undefined;
    }
}