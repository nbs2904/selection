import { Signal } from "@interfaces/signal.interface";
import { Connection } from "@interfaces/connection.interface";

export abstract class Neuron {
    public readonly id : string;
    protected bias : number;
    protected activationFunction : (input : number) => number;

    constructor(id : string, bias? : number, activationFunction? : (input : number) => number) {
        this.id = id;
        this.bias = bias || 0;
        this.activationFunction = activationFunction || function (input :number) { return input; };

        // TODO initialise bias at random value if undefined
        // TODO jsdoc every constructor
    }

    // TODO calculate input and loop through connections to give input to connected neurons
    public abstract fire();
}

export class InnerNeuron extends Neuron {
    private signals : Signal[];
    private connections : Connection[];
    public input : number;

    constructor(id : string, bias : number, activationFunction : (input : number) => number, signals : Signal[], connections : Connection[]) {
        super(id, bias, activationFunction);

        this.input = 0;
        this.signals = signals;
        this.connections = connections;
    }

    public signalsMissing() : number {
        return this.signals.length - this.signals.filter(signal => signal.fired === true).length;
    }

    public fire() {
        // TODO implementation missing
        this.connections.forEach(connection => {
            connection.outputNeuron.input += this.activationFunction(this.input + this.bias) * connection.weight;
        });
    }
}

// ? connection weight: -4 to 4
// ? sensor output: 0 to 1
// ? neuron output - tanh(sum(input)) (inner and outer action neuron): -1 to 1
