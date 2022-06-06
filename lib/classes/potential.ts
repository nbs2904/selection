/**
 * The potential of an inner neuron is used to determine the fire order of a genome.
 */
export class Potential {
    /** @public Number of already received signals from sensors or neurons. (0 \<= signalsReceived \<= signalsTotal) */
    public signalsReceived : number;

    /** @public Maximum of signals that can be received from sensors or neurons. (0 \<= signalsReceived \<= signalsTotal) */
    public signalsTotal : number;

    /** @public Number of connections to other neurons. */
    public connections : number;

    
    /**
     * @constructor
     * @param signalsReceived - Number of already received signals from sensors or neurons. (0 \<= signalsReceived \<= signalsTotal)
     * @param signalsTotal - Maximum of signals that can be received from sensors or neurons. (0 \<= signalsReceived \<= signalsTotal)
     * @param connections - Number of connections to other neurons.
     */
    constructor (signalsReceived = 0, signalsTotal = 0, connections = 0) {
        this.signalsReceived = signalsReceived;
        this.signalsTotal = signalsTotal;
        this.connections = connections;
    }

    /**
     * @public 
     * @returns The potential of the neuron.
     */
    public get potential () : number {
        return this.signalsReceived / this.signalsTotal;
    }
}