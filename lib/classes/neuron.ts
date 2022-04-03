// * interfaces
import { Connection } from "@interfaces/connection.interface";

// * functions
// TODO experiment with activationFunctions
import { tanh } from "@functions/tanh";

// * utility
import { randomFloat } from "@utility/randomNumber";

// * config
const BIAS_RANGE = +(process.env.BIAS_RANGE || 50) as number;


export abstract class Neuron {
    public readonly id : string;
    protected bias : number;
    protected activationFunction : (input : number) => number;

    constructor(id : string, bias : number, activationFunction : (input : number) => number) {
        this.id = id;
        this.bias = bias || randomFloat(BIAS_RANGE/2, BIAS_RANGE/2 * (-1));
        this.activationFunction = activationFunction || function (input :number) { return input; };
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
