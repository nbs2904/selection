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
 * @extends [Neuron](../classes/neuron.ts)
 */
export class Sensor extends Neuron {
    /**
     * @private
     * [Sensation](../interfaces/sensation.interface.ts) which is bound to [Node](../classes/node.ts)
     * @readonly
     */
    private readonly sensation : Sensation;
    
    /**
     * @private
     * Array of senses a sensor instance can access.
     * @readonly
     */
    private readonly senses : string[];
    
    /**
     * @private
     * Array of [Connections](../interfaces/connection.interface.ts) the sensor has to other neurons.
     */
    private connections : Connection[];

    /**
     * @private
     * input value of assigned senses
     */
    private input : number;

    /**
     * @constructor
     * @param id - unique identifier of sensor
     * @param bias - bias of sensor the input is offset with
     * @param sensation - [Sensation](../interfaces/sensation.interface.ts) which is bound to [Node](../classes/node.ts)
     * @param senses - array of senses a sensor instance can access
     * @param activationFunction - activation function of sensor
     * @param connections - array of [Connections](../interfaces/connection.interface.ts) the sensor has to other neurons
     */
    constructor (id : string, bias : number, sensation? : Sensation, senses? : string[], activationFunction? : (input : number) => number, connections : Connection[] = []) {
        // ? set sensor/input neuron bias equal to 0 by default 
        super(id, 0, activationFunction);
        
        this.senses = senses;
        this.sensation = sensation;
        this.connections = connections;
    }

    /**
     * @public
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
