// * logger
const logger = require("@config/logs/log4js").color;

// TODO check for tsdoc number min max notation

/**
 * Color Class
 * - Color components must be between 0 and 255
 */
export class Color {
    /** @public red color component */
    public r : number;
    
    /** @public green color component */
    public g : number;
    
    /** @public blue color component */
    public b : number;

    /**
     * @constructor
     * @param r - red color component
     * @param g - green color component
     * @param b - blue color component
     */
    public constructor (r : number, g : number, b : number) {
        if(r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
            logger.error(`Invalid Color parameters: (r: ${ r }, g: ${ g }, b: ${ b })`);
            throw new Error("Color parameters have to be in the range of 0-255.");                        
        }

        this.r = r;
        this.g = g;
        this.b = b;
    }
}