import { Neuron } from "@classes/neuron";
import { Connection } from "@interfaces/connection.interface";
import { Sensation } from "@interfaces/sensation.interface";

// TODO jsdoc entire class
export class Sensor extends Neuron {
    private readonly sensation : Sensation;
    private readonly senses : string[];

    constructor(sensation? : Sensation, senses? : string[], activationFunction? : (input : number) => number, connections? : Connection[]) {
        // ? set sensor/input neuron bias equal to 0 by default 
        const bias = 0;
        super(bias, activationFunction, connections);
        
        this.senses = senses;
        this.sensation = sensation;
    }

    public fire() {
        return this.activationFunction(
            this.senses
                .map(sense => this.sensation[sense])
                .reduce((sum, current) => sum + current)
        );
    }
}