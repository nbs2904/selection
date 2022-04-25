// * interfaces
import { Connection } from "@interfaces/connection.interface";

// * functions
// TODO experiment with activationFunctions
import { tanh } from "@functions/tanh";

// * utility
import { randomFloat } from "@utility/randomNumber";

// * config
const BIAS_RANGE = +(process.env.BIAS_RANGE || 4) as number;

/**
 * Base Neuron Class
 * @property {string} id
 * @property {number} bias
 * @property {(input : number) => number} activationFunction
 */
export abstract class Neuron {
    public readonly id : string;
    protected bias : number;
    protected activationFunction : (input : number) => number;

    constructor(id : string, bias : number, activationFunction : (input : number) => number) {
        this.id = id;
        this.bias = bias;
        this.activationFunction = activationFunction;
    }

    /**
     * Abstract method to be invoked by child classes
     */
    public abstract fire() : void;
}


/**
 * InnerNeuron class can be seen as hidden layer of a node's genome
 * @extends {{@link Neuron}
 * @property {@link Connection Connection[]} - list of connections to other neurons
 * @property {number} input - sum of inputs
 */
export class InnerNeuron extends Neuron {
    public connections : Connection[];
    public input : number;

    constructor(id : string, bias? : number, connections? : Connection[]) {
        super(id, bias, tanh);

        this.input = 0;
        this.connections = connections || [];
    }

    /**
     * Increases input of every connecting neuron, using the own activationFunction, own input, weight, and bias. 
     */
    public fire() {
        this.connections.forEach(connection => {
            connection.outputNeuron.input += this.activationFunction(this.input * connection.weight + this.bias);
        });
    }
}
