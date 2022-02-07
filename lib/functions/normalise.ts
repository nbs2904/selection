export function normalise(lowerBound : number, upperBound : number) {
    if(upperBound < lowerBound) {
        throw new Error("uppeBound needs to be bigger than lower bound");
    }

    return (input : number) => {
        if(input < lowerBound || upperBound < input) {
            throw new Error("Input value is out of given boundary.");
        }

        return (input - lowerBound)/(upperBound - lowerBound);
    };
}
