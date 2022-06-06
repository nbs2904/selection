/* eslint-disable no-prototype-builtins */

// * classes
import { InnerNeuron } from "@classes/neuron";

// * actions
import { Action, actionList } from "@actions/action";

// * sensors
import { Sensor, sensorList } from "@sensors/sensor";

// * interfaces
import { Connection } from "@interfaces/connection.interface";
import { Genome } from "@interfaces/genome.interface";
import { Sensation } from "@interfaces/sensation.interface";

/**
 * Brain of a node.
 * Determines which Neuron fires in what order and invokes action function to change the node's state.
 */
export class Brain {
    /** @private map of the Brain's [Sensor](../sensors/sensor.ts) */
    private sensors : { [key : string] : Sensor } = {};
    /** @private map of the Brain's [InnerNeuron](./neuron.ts) */
    private innerNeurons : { [key : string] : InnerNeuron } = {};
    /** @private map of the Brain's [Action](../actions/action.ts) */
    private actions : { [key : string] : Action } = {};
    /** @private order in which inner neurons fire */
    private innerNeuronsFireOrder : string[] = [];

    /**
     * @constructor
     * @param genome - Genome of Node, used to generate a working Brain
     * @param sensation - Sensation which is bound to Node to get access to current states
     * @param actionFunctions - Function of Node that shall be called upon firing determined Action Neuron
     */
    constructor (genome : Genome, sensation : Sensation, actionFunctions : { [key : string] : () => void }) {
        this.innerNeuronsFireOrder = genome.fireOrder;

        // ? initialise actions
        for (const [ actionName ] of Object.entries(genome.actions)) {
            this.actions[actionName] = actionList[actionName](genome.actions[actionName].bias, actionFunctions[actionName]);
        }

        // ? initialise inner neurons without connections
        for (const [ neuronName ] of Object.entries(genome.innerNeurons)) {
            this.innerNeurons[neuronName] = new InnerNeuron(neuronName, genome.innerNeurons[neuronName].bias);
        }

        // ? initialise sensors with connections
        for (const [ sensorName ] of Object.entries(genome.sensors)) {
            const sensorConnections : Connection[] = [];
                
            for (const [ connection ] of Object.entries(genome.sensors[sensorName].connections)) {
                sensorConnections.push({
                    weight: genome.sensors[sensorName].connections[connection],
                    outputNeuron: this.innerNeurons[connection] || this.actions[connection]
                });
            }

            this.sensors[sensorName] = sensorList[sensorName](genome.sensors[sensorName].bias, sensation, sensorConnections);
        }

        for (const [ neuronName ] of Object.entries(this.innerNeurons)) {
            const innerNeuronConnections = genome.innerNeurons[neuronName].connections;
                
            // ?  connect inner neurons
            for (const [ connection ] of Object.entries(innerNeuronConnections)){
                this.innerNeurons[neuronName].connections.push({
                    weight: innerNeuronConnections[connection],
                    outputNeuron: this.innerNeurons[connection] || this.actions[connection]
                });
            }
        }

    }

    /**
     * Firstly, invokes all sensors.
     * Then, invokes all inner neurons according to the genome's fire order.
     * Finally, invokes the action with highest absolute input.
     */
    public compute () {
        // ? fire sensors
        for(const [ , sensor ] of Object.entries(this.sensors)) {
            sensor.fire();
        }

        // ? fire inner neurons
        this.innerNeuronsFireOrder.forEach((neuronId) => {
            this.innerNeurons[neuronId].fire();
            this.innerNeurons[neuronId].input = 0;
        });

        // ? determine which action to fire
        let highestAbsOutputAction = 0;
        let highestAbsOutputActionId = "";

        for(const [ currentActionId, currentAction ] of Object.entries(this.actions)) {
            if(Math.abs(highestAbsOutputAction) < Math.abs(currentAction.output)) {
                highestAbsOutputAction = currentAction.output;
                highestAbsOutputActionId = currentActionId;
            }
        }

        // ? fire action with highest absolute output
        this.actions[highestAbsOutputActionId].fire();

        // ? reset all actions
        for (const [ , action ] of Object.entries(this.actions)) {
            action.input = 0;
        }
    }
}
