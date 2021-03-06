/* eslint-disable no-prototype-builtins */

// * actions
import actionNames from "@actions/names.json";

// * sensots
import sensorNames from "@sensors/names.json";

// * classes
import { Potential } from "@classes/potential";

// * interfaces
import { Genome } from "@interfaces/genome.interface";

// * utility
import { equals } from "@utility/equals";

/**
 * Determines fire order of a genome's inner neurons.
 * @param genome - [Genome](../interfaces/genome.interface.ts) to optimise 
 * @returns array of [Neuron](../classes/neuron.ts) ids in fire order
 */
export function getFireOrder (genome : Genome) : string[]{
    const potentials : {
        [key : string] : Potential
    } = {};

    // ? get signalsMissing count and connection count for every inner neuron
    for(const [ neuronId, neuron ] of Object.entries(genome.innerNeurons)) {
        if(!(neuronId in potentials)) {
            potentials[neuronId] = new Potential();
        }

        for(const [ connectingNeuronId ] of Object.entries(neuron.connections)) {
            if(!sensorNames.includes(connectingNeuronId) && !actionNames.includes(connectingNeuronId)) {
                potentials[neuronId].connections++;
            }
        }
    }

    // ? count signals incoming from sensors
    // ? also increase signalsReceived for the sorting algorithm later
    for(const [ , sensor ] of Object.entries(genome.sensors)) {
        for(const [ connectingNeuronId ] of Object.entries(sensor.connections)) {
            if(!sensorNames.includes(connectingNeuronId) && !actionNames.includes(connectingNeuronId)) {
                // ? if neuron the sensor is connected to does not exists, skip. It will be removed later in streamlineGenome()
                if(connectingNeuronId in potentials) {
                    potentials[connectingNeuronId].signalsTotal++;
                    potentials[connectingNeuronId].signalsReceived++;
                }
                
            }
        }
        
    }
    
    const fireOrder : string[] = [];

    const unfiredNeurons = Object.entries(potentials)
        .sort((firstPotential, secondPotential) => {
            if(firstPotential[1].potential !== secondPotential[1].potential) {
                return secondPotential[1].potential - firstPotential[1].potential;
            }

            return secondPotential[1].connections - firstPotential[1].connections;
        })
        .map((neuron) => {
            return {
                id: neuron[0],
                potential: neuron[1]
            };
        });
    

    while(fireOrder.length !== Object.keys(genome.innerNeurons).length) {
        // ? "fire" first neuron in array
        fireOrder.push(unfiredNeurons[0].id);

        // ? update potentials
        for(const [ connectingNeuronId ] of Object.entries(genome.innerNeurons[unfiredNeurons[0].id].connections)) {
            if(!sensorNames.includes(connectingNeuronId) && !actionNames.includes(connectingNeuronId) && !fireOrder.includes(connectingNeuronId)) {
                potentials[connectingNeuronId].signalsTotal++;
                potentials[connectingNeuronId].signalsReceived++;                        
            }
        }

        unfiredNeurons.splice(0, 1);
        unfiredNeurons.sort(sortFunction);

        // ? "fire" every neuron whose potential is 1
        for (let index = 0; index < unfiredNeurons.length; index++) {
            const neuron = unfiredNeurons[index];
            
            if(neuron.potential.potential === 1) {
                fireOrder.push(neuron.id);
                unfiredNeurons.splice(index, 1);
                index--;
    
                // ? update potentials
                for(const [ connectingNeuronId ] of Object.entries(genome.innerNeurons[neuron.id].connections)) {
                    if(!sensorNames.includes(connectingNeuronId) && !actionNames.includes(connectingNeuronId) && !fireOrder.includes(connectingNeuronId)) {
                        potentials[connectingNeuronId].signalsReceived++;                        
                    }
                }

                unfiredNeurons.sort(sortFunction);
            } else {
                break;
            }
        }
    }

    return fireOrder;
}

/**
 * Removes unnecessary [Neurons](../classes/neuron.ts) or [Connections](../interfaces/connection.interface.ts) from a [Genome](../interfaces/genome.interface.ts). Based on following factors:
 * - [Neurons](../classes/neuron.ts) with no incoming [Connections](../interfaces/connection.interface.ts)
 * - [Neurons](../classes/neuron.ts) with no outgoing [Connections](../interfaces/connection.interface.ts)
 * - Whether the following [Neuron](../classes/neuron.ts) of one [Neuron](../classes/neuron.ts) or [Sensor](../sensors/sensor.ts) has already been fired.
 * @param genome - [Genome](../interfaces/genome.interface.ts) to streamline
 * @returns optmised [Genome](../interfaces/genome.interface.ts)	
 */
export function streamlineGenome (genome : Genome) : Genome {
    let fireOrder : string[] = [];
    let changesMade = 1;
    const removedNeurons : string[] = [];

    // ? remove useless connection and/or useless inner neurons
    while(changesMade !== 0) {
        changesMade = 0;

        for(const [ neuronId, neuron ] of Object.entries(genome.innerNeurons)) {
            for(const [ connectingNeuronId ] of Object.entries(neuron.connections)) {                
                // ? check if connection is an inner Neuron
                if(!sensorNames.includes(connectingNeuronId) && !actionNames.includes(connectingNeuronId)) {
                    // ? delete connection if connectingNeuron has already been removed
                    if (removedNeurons.includes(connectingNeuronId)) {
                        delete genome.innerNeurons[neuronId].connections[connectingNeuronId];
                        changesMade++;
                    } else if(!(connectingNeuronId in genome.innerNeurons)) {
                        // ? check if connectingNeuron even exists in case of mutation
                        delete genome.innerNeurons[neuronId].connections[connectingNeuronId];
                        removedNeurons.push(connectingNeuronId);
                        changesMade++;
                    } else if(fireOrder.length !== 0) {
                        // ? if fireOrder has been set check if connections can be optimised due to order
                        if(fireOrder.indexOf(connectingNeuronId) <= fireOrder.indexOf(neuronId)) {
                        // ? removes connection if neuron fires after the neuron it is connected to
                        // ? also removes a connection if a neuron is connected to itself
                            delete genome.innerNeurons[neuronId].connections[connectingNeuronId];
                            changesMade++;
                        }
                    }
                } else if(sensorNames.includes(connectingNeuronId) && !(connectingNeuronId in genome.sensors)) {
                    // ? if sensor does not exist, remove connection
                    delete genome.innerNeurons[neuronId].connections[connectingNeuronId];
                    changesMade++;
                } else if(actionNames.includes(connectingNeuronId) && !(connectingNeuronId in genome.actions)) {
                    // ? if action does not exist, remove connection
                    delete genome.innerNeurons[neuronId].connections[connectingNeuronId];
                    changesMade++;
                }
                    
            }

            // ? removes inner neuron if it has no connections, which would render it useless
            if(Object.keys(neuron.connections).length === 0) {
                delete genome.innerNeurons[neuronId];
                removedNeurons.push(neuronId);
                changesMade++;
            }
        }

        // ? if no changes have been made fire order can be determined
        // ? check if further optimisation can be made
        if(changesMade === 0) {
            const newFireOrder = getFireOrder(genome);

            

            // ? if the fireOrder changes get the newest version and recheck everything
            if(!equals(newFireOrder, fireOrder)) {
                fireOrder = newFireOrder;
                changesMade++;
            }
            
        }
    }

    // ? remove sensors that might have become useless since inner neurons could have been removed
    for(const [ sensorId, sensor ] of Object.entries(genome.sensors)) {
        const sensorConnections = sensor.connections;

        for(const [ connectingNeuronId ] of Object.entries(sensorConnections)) {
            if(!sensorNames.includes(connectingNeuronId) && !actionNames.includes(connectingNeuronId) && !(connectingNeuronId in genome.innerNeurons)) {
                delete genome.sensors[sensorId].connections[connectingNeuronId];

            } else if(actionNames.includes(connectingNeuronId) && !(connectingNeuronId in genome.actions)) {
                // ? if action does not exist, remove connection
                delete genome.sensors[sensorId].connections[connectingNeuronId];
            }
        }
            
        // ? if sensor has no connections left after invalid ones has been removed or sensor does not exist in sensorNames, delete the sensor
        if(Object.keys(genome.sensors[sensorId].connections).length === 0 || !(sensorNames.includes(sensorId))) {
            delete genome.sensors[sensorId];
        }
    }

    // ? remove actions that have no connections to it, rendering them useless
    for(const [ actionId ] of Object.entries(genome.actions)) {
        let connectionToActionCount = 0;
        // ? count sensor connections to action
        connectionToActionCount += Object.entries(genome.sensors).filter(([ , sensor ]) => {if (actionId in sensor.connections) return true;}).length;

        // ? count neuron connections to action
        connectionToActionCount += Object.entries(genome.innerNeurons).filter(([ , neuron ]) => {if (actionId in neuron.connections) return true;}).length;

        // ? if no connections to action or action does not exist in actionNames, delete action
        if (connectionToActionCount === 0 || !(actionNames.includes(actionId))) {
            delete genome.actions[actionId];
        }
    }

    // ? update fireOrder for inner Neurons
    genome.fireOrder = getFireOrder(genome);

    return genome;
}


/**
 * Sorting algorithm used to determine fire order of [Inner Neuron](../classes/neuron.ts). [Neurons](../classes/neuron.ts) are sorted by following criteria:
 * 1. [Neuron](../classes/neuron.ts) with the highest [Potential](../classes/potential.ts) will fire first.
 * 2. If multiple [Neurons](../classes/neuron.ts) have the same [Potential](../classes/potential.ts) the one with the most connections will fire first.
 */
export function sortFunction (firstNeuron : { id: string, potential: Potential }, secondNeuron : { id: string, potential: Potential }) {
    if(firstNeuron.potential.potential !== secondNeuron.potential.potential) {
        return secondNeuron.potential.potential - firstNeuron.potential.potential;
    }

    return secondNeuron.potential.connections - firstNeuron.potential.connections;
}
