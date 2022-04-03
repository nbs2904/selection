// * classes
import { Position } from "@classes/position";

export interface Sensation {
    x? : number;
    y? : number;
    age? : number;
    /** Position class is used as a vector.*/
    lastDirection? : Position
}