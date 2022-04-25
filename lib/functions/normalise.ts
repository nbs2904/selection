// * config
const CONNECTION_WEIGHT_RANGE = +(process.env.CONNECTION_WEIGHT_RANGE || 4) as number;
const BIAS_RANGE = +(process.env.BIAS_RANGE || 4) as number;


/**
 * normalises given input to be between -1 and 1
 * @param lowerBound - lower bound of the range
 * @param upperBound - upper bound of the range
 * @param {boolean} weightBiasAdapted - whether to adapt the range to the weight/bias of neurons
 * @returns function that normalises given input to be between -1 and 1
 */
export function normalise(lowerBound : number, upperBound : number, weightBiasAdapted = false) {
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
            throw new Error(`Input value is out of given boundary. Input: ${input}, Boundaries: [${lowerBound}, ${upperBound}]`);
        }

        const range = upperBound - lowerBound;
        const middle = lowerBound + (range / 2);
        
        return (input - middle) / (range / 2);
    };
}
