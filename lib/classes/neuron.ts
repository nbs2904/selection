import { Connection } from "@interfaces/connection";

export class Neuron {
    private input : number;
    private bias : number;
    private output : number;
    private activationFunction : (input : number) => number;
    private connections : Connection[];

    constructor(bias? : number, activationFunction? : (input : number) => number, connections? : Connection[]) {
        this.bias = bias || undefined;
        this.activationFunction = activationFunction || function (input :number) { return input; };
        this.connections = connections || [];

        // TODO initialise bias at random value if undefined
        // TODO jsdoc every constructor
    }
}