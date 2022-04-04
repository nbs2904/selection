// * classes
import { Color } from "@classes/color";

/**
 * Cell of a simulation's grid
 * @property {boolean} occupied - whether this cell is occupied by a node
 * @property {@link Color} - color of the node that currently occupies this cell
 */
export class Cell {
    public occupied : boolean;
    public color : Color | undefined;

    public constructor(occupied? : boolean, color? : Color) {
        this.occupied = occupied || false;
        this.color = color || undefined;
    }

    /**
     * updates the cell's properties
     * @param occupied {boolean} - whether this cell is occupied by a node
     * @param color {@link Color} - color of the node that currently occupies this cell
     */
    public update(occupied : boolean, color? : Color) {
        this.occupied = occupied;
        this.color = color || undefined;
    }

    /**
     * resets cell object:
     *  - occupied is set to false
     *  - color is set to undefined
     */
    public reset() {
        this.occupied = false;
        this.color = undefined;
    }
}