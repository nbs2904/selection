import { Neuron } from "@classes/neuron";
import { Connection } from "@interfaces/connection.interface";
import { Sensation } from "@interfaces/sensation.interface";

// TODO jsdoc entire class
export class Sensor extends Neuron {
    private readonly sensation : Sensation;
    private readonly senses : string[];
    private connections : Connection[];

    private input : number;

    constructor(id : string, sensation? : Sensation, senses? : string[], activationFunction? : (input : number) => number, connections? : Connection[]) {
        // ? set sensor/input neuron bias equal to 0 by default 
        super(id, 0, activationFunction);
        
        this.senses = senses;
        this.sensation = sensation;
        this.connections = connections;
    }

    public fire() {
        this.input = this.senses
            .map(sense => this.sensation[sense])
            .reduce((sum, current) => sum + current);
        
        

        // TODO send output to connections
    }
}