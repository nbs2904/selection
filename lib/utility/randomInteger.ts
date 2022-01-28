export function randomInteger(max : number, min? : number) {
    min = Math.ceil(min) || 0;
    return Math.floor(Math.random() * (max - min) + min);
}