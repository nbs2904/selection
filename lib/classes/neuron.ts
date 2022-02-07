import { Connection } from "@interfaces/connection.interface";

export abstract class Neuron {
    protected bias : number;
    protected activationFunction : (input : number) => number;
    protected connections : Connection[];

    public constructor(bias? : number, activationFunction? : (input : number) => number, connections? : Connection[]) {
        this.bias = bias || 0;
        this.activationFunction = activationFunction || function (input :number) { return input; };
        this.connections = connections || [];

        // TODO initialise bias at random value if undefined
        // TODO jsdoc every constructor
    }

    // TODO calculate input and loop through connections to give input to connected neurons
    public abstract fire() : number;
}

// ? connection weight: -4 to 4
// ? sensor output: 0 to 1
// ? neuron output - tanh(sum(input)) (inner and outer action neuron): -1 to 1
