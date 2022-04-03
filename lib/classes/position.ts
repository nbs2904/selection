// * utility
import { randomInteger } from "@utility/randomNumber";


const GRID_SIZE = +(process.env.GRID_SIZE || 50) as number;
export class Position {
    public x : number;
    public y : number;

    public constructor(x? : number, y? : number) {

        this.x = x !== undefined ? x : randomInteger(GRID_SIZE);
        this.y = y !== undefined ? y : randomInteger(GRID_SIZE);
    }
}