export function sigmoid(input : number) : number {
    return 1/(1 + Math.exp(-input));
}