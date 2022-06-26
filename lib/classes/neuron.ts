// * interfaces
import { Connection } from "@interfaces/connection.interface";

// * functions
import { tanh } from "@functions/tanh";


/**
 * Base Neuron Class
 * @abstract
 */
export abstract class Neuron {
    /** 
     * @public unique identifier of Neuron
     * @readonly
     */
    public readonly id : string;

    /** @protected used to offset Neurons input */
    protected bias : number;

    /** @protected function bound to Node, to change its state */
    protected activationFunction : (input : number) => number;

    /**
     * @constructor
     * @param id - unique identifier of {@link Neuron} 
     * @param bias - used to offset {@link Neuron} input
     * @param activationFunction - function used to determine Neuron output
     */
    constructor (id : string, bias : number, activationFunction : (input : number) => number) {
        this.id = id;
        this.bias = bias;
        this.activationFunction = activationFunction;
    }

    /**
     * @abstract
     * @public Abstract method to be invoked by child classes
     */
    public abstract fire() : void;
}


/**
 * InnerNeuron class can be seen as hidden layer of a node's genome
 * @extends Class {@link Neuron}
 */
export class InnerNeuron extends Neuron {
    /** @public list of connections to other neurons */
    public connections : Connection[];

    /** @public sum of inputs */
    public input : number;

    /**
     * @constructor
     * @param id - unique identifier of InnerNeuron
     * @param bias - used to offset InnerNeuron input
     * @param connections - list of connections to other neurons
     */
    constructor (id : string, bias? : number, connections? : Connection[]) {
        super(id, bias, tanh);

        this.input = 0;
        this.connections = connections || [];
    }

    /**
     * @public
     * Increases input of every connecting neuron, using the own activationFunction, own input, weight, and bias. 
     */
    public fire () {
        this.connections.forEach(connection => {
            connection.outputNeuron.input += this.activationFunction(this.input * connection.weight + this.bias);
        });
    }
}
