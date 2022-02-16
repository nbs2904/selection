const CONNECTION_WEIGHT_RANGE = +(process.env.CONNECTION_WEIGHT_RANGE || 2) as number;
const BIAS_RANGE = +(process.env.BIAS_RANGE || 0) as number;

// TODO function might break, since one neuron can receive multiple inputs
// TODO from different neurons with their respective weight
// TODO therefore becoming bigger than the boundaries

export function normalise(lowerBound : number, upperBound : number, weightBiasAdapted : boolean) {
    if(upperBound < lowerBound) {
        throw new Error("upper bound needs to be bigger than lower bound");
    }

    if(weightBiasAdapted) {
        // ? adapt boundaries according to global CONNECTION_WEIGHT_RANGE and BIAS_RANGE settings
        const maxAbsoluteBound = Math.max(Math.abs(lowerBound), Math.abs(upperBound));
        upperBound = (maxAbsoluteBound * (CONNECTION_WEIGHT_RANGE) / 2) + (BIAS_RANGE / 2);
        lowerBound = -upperBound;
    }
    
    return (input : number) => {
        if(input < lowerBound || upperBound < input) {
            throw new Error("Input value is out of given boundary.");
        }

        return (input - lowerBound)/(upperBound - lowerBound);
    };
}
