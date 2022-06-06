/**
 * Generates pseudo-random number between min and max (inclusive)
 * @param max - included
 * @param min - included (0 if omitted)
 * @throws if min \> max
 */
export function randomInteger (max : number, min? : number) : number {
    if(max < min) throw new Error("max must be greater than or equal to min");

    max++;
    min = Math.ceil(min) || 0;
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Generates pseudo-random number between min and max (inclusive)
 * @param max - included
 * @param min - included (0 if omitted)
 * @throws if min \> max
 * @returns float
 */
export function randomFloat (max : number, min? : number) : number {
    if(max < min) throw new Error("max must be greater than or equal to min");

    min = min || 0;

    return (Math.round(((Math.random() * (max - min) + min) + Number.EPSILON) * 10000) / 10000);
}