import { Color } from "./../classes/color";

export class Node {
    public id : string;
    public age = 0;
    private x : number;
    private y : number;
    public color : Color;

    public constructor(id : string, x : number, y : number, color : Color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public moveX(direction : number) {
        if(direction < 0) this.x -= 1;
        else if(direction > 0) this.x += 1;
    }

    public moveY(direction : number) {
        if(direction < 0) this.y -= 1;
        else if(direction > 0) this.y += 1;
    }
}