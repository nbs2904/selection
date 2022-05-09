// * classes
import { Neuron } from "@classes/neuron";

// * interfaces
import { Connection } from "@interfaces/connection.interface";
import { Sensation } from "@interfaces/sensation.interface";

// * sensors
import * as positionSensors from "@sensors/position.sensor";
import * as ageSensors from "@sensors/age.sensor";


/**
 * Sensors function as the input of a node's genome using the node's sensation.
 * @extends {{@link Neuron}
 * @property {string} id
 * @property {number} bias ranges between -BIAS_RANGE and BIAS_RANGE (env file)
 * @property {@link Sensation} bound to node
 * @property {string[]} senses - list of sensations sensor can access
 * @property {(input : number) => number} activationFunction
 * @property {@link Connection connections[]} - list of connections to other neurons
 */
export class Sensor extends Neuron {
    private readonly sensation : Sensation;
    private readonly senses : string[];
    private connections : Connection[];

    private input : number;

    constructor (id : string, bias : number, sensation? : Sensation, senses? : string[], activationFunction? : (input : number) => number, connections : Connection[] = []) {
        // ? set sensor/input neuron bias equal to 0 by default 
        super(id, 0, activationFunction);
        
        this.senses = senses;
        this.sensation = sensation;
        this.connections = connections;
    }

    /**
     * Increases input of every connecting neuron, using the own activationFunction, own input, weight, and bias. 
     */
    public fire () {
        this.input = this.senses
            .map(sense => this.sensation[sense])
            .reduce((sum, current) => sum + current);
        
        // ? send output to every connected neuron, using the activationFunction, bias, and the respective weight.
        this.connections.forEach((connection) => {
            connection.outputNeuron.input += this.activationFunction(this.input * connection.weight + this.bias);
        });
    }
}

/**
 * map of sensor names to sensors
 */
export const sensorList = {
    "XPos": positionSensors.xPosSensor,
    "YPos": positionSensors.yPosSensor,
    "Age": ageSensors.ageSensor
};

export const sensorNames = [ "XPos", "YPos", "Age" ];