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

    // TODO specify actionFunctions type (either interface or something similar)
    constructor(genome : Genome, sensation : Sensation, actionFunctions : any) {
        this.innerNeuronsFireOrder = genome.fireOrder;

        // ? initialise actions
        for (const actionKey in genome.actions) {
            if(genome.actions.hasOwnProperty(actionKey)) {
                this.actions[actionKey] = actionList[actionKey](genome.actions[actionKey].bias, actionFunctions[actionKey]);
            }
        }

        // ? initialise inner neurons without connections
        for (const innerNeuronKey in genome.innerNeurons) {
            if(genome.innerNeurons.hasOwnProperty(innerNeuronKey)) {
                this.innerNeurons[innerNeuronKey] = new InnerNeuron(innerNeuronKey, genome.innerNeurons[innerNeuronKey].bias);
            }
        }

        // ? initialise sensors with connections
        for (const sensorKey in genome.sensors) {
            if(genome.sensors.hasOwnProperty(sensorKey)) {
                const sensorConnections : Connection[] = [];
                
                for (const connectionKey in genome.sensors[sensorKey].connections) {
                    if(genome.sensors[sensorKey].connections.hasOwnProperty(connectionKey)) {

                        sensorConnections.push({
                            weight: genome.sensors[sensorKey].connections[connectionKey],
                            outputNeuron: this.innerNeurons[connectionKey] || this.actions[connectionKey]
                        });
                    }
                }

                this.sensors[sensorKey] = sensorList[sensorKey](genome.sensors[sensorKey].bias, sensation, sensorConnections);
            }
        }

        for (const innerNeuronKey in this.innerNeurons) {
            if(this.innerNeurons.hasOwnProperty(innerNeuronKey)) {
                const innerNeuronConnections = genome.innerNeurons[innerNeuronKey].connections;
                
                // ?  connect inner neurons
                for (const connectionKey in innerNeuronConnections){
                    if(innerNeuronConnections.hasOwnProperty(connectionKey)) {
                        this.innerNeurons[innerNeuronKey].connections.push({
                            weight: innerNeuronConnections[connectionKey],
                            outputNeuron: this.innerNeurons[connectionKey] || this.actions[connectionKey]
                        });
                    }
                }
            }
        }

    }

    // TODO change every forin to of Object.entires loop

    public compute() {
        // ? fire sensors
        for(const [sensorId, sensor] of Object.entries(this.sensors)) {
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
