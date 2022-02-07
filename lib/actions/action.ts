import { Neuron } from "@classes/neuron";

export class Action extends Neuron {
    public input = 0;
    private output = 0;

    constructor(id : string, bias : number, activationFunction : (input : number) => number) {
        super(id, bias, activationFunction);
    }

    public get getOutput() : number {
        return this.output;
    }
    
    public fire() : number {
        return 1;
    }
}