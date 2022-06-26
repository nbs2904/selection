// * classes
import { Position } from "@classes/position";

export interface Sensation {
    /** x coordinate of node */
    x? : number;
    /** y coordinate of node */
    y? : number;
    /** age of node */
    age? : number;
    /** last direction node moved (class Position used as a vector)*/
    lastDirection? : Position,
    /** random input sensor */
    random?: () => number;
    /** current living population in simulation */
    population?: () => number,
    /** distance to top border of the grid */
    borderXDistance?: () => number,
    /** distance to right border of the grid */
    borderYDistance?: () => number,
}