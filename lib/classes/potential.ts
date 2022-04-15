/**
 * The potential of an inner neuron is used to determine the fire order of a genome.
 * @property {number} signalsReceived - Number of already received signals from sensors or neurons. (0 <= signalsReceived <= signalsTotal)
 * @property {number} signalsTotal - Number potential incoming signals
 * @property {number} connections - Number of connections to other neurons
 */
export class Potential {
    public signalsReceived : number;
    public signalsTotal : number;
    public connections : number;

    constructor(signalsReceived = 0, signalsTotal = 0, connections = 0) {
        this.signalsReceived = signalsReceived;
        this.signalsTotal = signalsTotal;
        this.connections = connections;
    }

    /**
     * @returns {number} - The potential of the neuron.
     */
    public get potential() : number {
        return this.signalsReceived / this.signalsTotal;
    }
}