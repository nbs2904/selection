export class Color {
    public r : number;
    public g : number;
    public b : number;

    public constructor(r : number, g : number, b : number) {
        // TODO check if color is in range otherwise throw error
        this.r = r;
        this.g = g;
        this.b = b;
    }
}