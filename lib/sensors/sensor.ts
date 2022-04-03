// * classes
import { Neuron } from "@classes/neuron";

// * interfaces
import { Connection } from "@interfaces/connection.interface";
import { Sensation } from "@interfaces/sensation.interface";

// * sensors
import * as positionSensors from "@sensors/position.sensor";
import * as ageSensors from "@sensors/age.sensor";


export class Sensor extends Neuron {
    private readonly sensation : Sensation;
    private readonly senses : string[];
    private connections : Connection[];

    private input : number;

    constructor(id : string, bias : number, sensation? : Sensation, senses? : string[], activationFunction? : (input : number) => number, connections? : Connection[]) {
        // ? set sensor/input neuron bias equal to 0 by default 
        super(id, 0, activationFunction);
        
        this.senses = senses;
        this.sensation = sensation;
        this.connections = connections || [];
    }

    public fire() {
        this.input = this.senses
            .map(sense => this.sensation[sense])
            .reduce((sum, current) => sum + current);
        
        // ? send output to every connected neuron, using the activationFunction, bias, and the respective weight.
        this.connections.forEach((connection) => {
            connection.outputNeuron.input += this.activationFunction(this.input * connection.weight + this.bias);
        });
    }
}

export const sensorList = {
    "XPos": positionSensors.xPosSensor,
    "YPos": positionSensors.yPosSensor,
    "Age": ageSensors.ageSensor
};

export const sensorNames = [ "XPos", "YPos", "Age" ];