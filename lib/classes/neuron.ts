import { Connection } from "@interfaces/connection.interface";

// TODO experiment with activationFunctions
import { tanh } from "@functions/tanh";

export abstract class Neuron {
    public readonly id : string;
    protected bias : number;
    protected activationFunction : (input : number) => number;

    constructor(id : string, bias : number, activationFunction : (input : number) => number) {
        this.id = id;
        this.bias = bias || 0;
        this.activationFunction = activationFunction || function (input :number) { return input; };

        // TODO initialise bias at random value if undefined
        // TODO jsdoc every constructor
    }

    public abstract fire() : void;
}

export class InnerNeuron extends Neuron {
    public connections : Connection[];
    public input : number;

    constructor(id : string, bias : number, connections? : Connection[]) {
        super(id, bias, tanh);

        this.input = 0;
        this.connections = connections || [];
    }

    public fire() {
        this.connections.forEach(connection => {
            connection.outputNeuron.input += this.activationFunction(this.input * connection.weight + this.bias);
        });
    }
}

// ? connection weight: -4 to 4
// ? sensor output: 0 to 1
// ? neuron output - tanh(sum(input)) (inner and outer action neuron): -1 to 1
