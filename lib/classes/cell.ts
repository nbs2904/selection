import { Color } from "@classes/color";

export class Cell {
    public occupied : boolean;
    public color : Color | undefined;

    public constructor(occupied? : boolean, color? : Color) {
        this.occupied = occupied || false;
        this.color = color || undefined;
    }

    public update(occupied : boolean, color? : Color) {
        this.occupied = occupied;
        this.color = color || undefined;
    }

    public reset() {
        this.occupied = false;
        this.color = undefined;
    }
}