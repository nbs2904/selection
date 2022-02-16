/**
 * 
 * @param max upper boundary which is included
 * @param min lower boundary which is included (0 if omitted)
 * @returns pseudo random integer between given boundaries
 */
export function randomInteger(max : number, min? : number) {
    max++;
    min = Math.ceil(min) || 0;
    return Math.floor(Math.random() * (max - min) + min);
}

export function randomFloat(max : number, min? : number) {
    min = min || 0;

    return (Math.round(((Math.random() * (max - min) + min) + Number.EPSILON) * 10000) / 10000);
}