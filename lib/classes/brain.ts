/* eslint-disable no-prototype-builtins */
import { Connection } from "@interfaces/connection.interface";
import { Action, actionList } from "@actions/action";
import { InnerNeuron } from "@classes/neuron";
import { Sensor, sensorList } from "@sensors/sensor";
import { Genome } from "@interfaces/genome.interface";
import { Sensation } from "@interfaces/sensation.interface";


export class Brain {
    private sensors : { [key : string] : Sensor } = {};
    private innerNeurons : { [key : string] : InnerNeuron } = {};
    private actions : { [key : string] : Action } = {};

    private innerNeuronsFireOrder : string[] = [];

    constructor(genome : Genome, sensation : Sensation, actionFunctions : { [key : string] : () => void }) {
        this.innerNeuronsFireOrder = genome.fireOrder;

        // ? initialise actions
        for (const [actionName] of Object.entries(genome.actions)) {
            this.actions[actionName] = actionList[actionName](genome.actions[actionName].bias, actionFunctions[actionName]);
        }

        // ? initialise inner neurons without connections
        for (const [neuronName] of Object.entries(genome.innerNeurons)) {
            this.innerNeurons[neuronName] = new InnerNeuron(neuronName, genome.innerNeurons[neuronName].bias);
        }

        // ? initialise sensors with connections
        for (const [sensorName] of Object.entries(genome.sensors)) {
            const sensorConnections : Connection[] = [];
                
            for (const [connection] of Object.entries(genome.sensors[sensorName].connections)) {
                sensorConnections.push({
                    weight: genome.sensors[sensorName].connections[connection],
                    outputNeuron: this.innerNeurons[connection] || this.actions[connection]
                });
            }

            this.sensors[sensorName] = sensorList[sensorName](genome.sensors[sensorName].bias, sensation, sensorConnections);
        }

        for (const [neuronName] of Object.entries(this.innerNeurons)) {
            const innerNeuronConnections = genome.innerNeurons[neuronName].connections;
                
            // ?  connect inner neurons
            for (const [connection] of Object.entries(innerNeuronConnections)){
                this.innerNeurons[neuronName].connections.push({
                    weight: innerNeuronConnections[connection],
                    outputNeuron: this.innerNeurons[connection] || this.actions[connection]
                });
            }
        }

    }

    public compute() {
        // ? fire sensors
        for(const [, sensor] of Object.entries(this.sensors)) {
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

        for(const [currentActionId, currentAction] of Object.entries(this.actions)) {
            if(Math.abs(highestAbsOutputAction) < Math.abs(currentAction.output)) {
                highestAbsOutputAction = currentAction.output;
                highestAbsOutputActionId = currentActionId;
            }
            currentAction.input = 0;
        }

        // ? fire action with highest absolute output
        this.actions[highestAbsOutputActionId].fire();
    }
}
