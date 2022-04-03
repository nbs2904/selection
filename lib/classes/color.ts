// * logger
const logger = require("@config/log4js").color;


export class Color {
    public r : number;
    public g : number;
    public b : number;

    public constructor(r : number, g : number, b : number) {
        if(r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
            logger.error(`Invalid Color parameters: (r: ${r}, g: ${g}, b: ${b})`);
            throw new Error("Color parameters have to be in the range of 0-255.");                        
        }

        this.r = r;
        this.g = g;
        this.b = b;
    }
}