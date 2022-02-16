/* eslint-disable no-prototype-builtins */
import { Potential } from "@classes/potential";
import { Genome } from "@interfaces/genome.interface";

export function getFireOrder (genome : Genome) : string[]{
    const potentials : {
        [key : string] : Potential
    } = {};

    // ? get signalsMissing count and connection count for every inner neuron
    for(const [neuronId, neuron] of Object.entries(genome.innerNeurons)) {
        if(!(neuronId in potentials)) {
            potentials[neuronId] = new Potential();
        }

        for(const [connectingNeuronId] of Object.entries(neuron.connections)) {
            if(connectingNeuronId.includes("Neuron")) {
                potentials[neuronId].connections++;

                if(!(connectingNeuronId in potentials)) {
                    potentials[connectingNeuronId] = new Potential();
                }
                
                potentials[connectingNeuronId].signalsTotal++;
            }
        }
    }

    // ? count signals incoming from sensors
    // ? also increase signalsReceived for the sorting algorithm later
    for(const [sensorId, sensor] of Object.entries(genome.sensors)) {
        for(const [connectingNeuronId] of Object.entries(sensor.connections)) {
            if(connectingNeuronId.includes("Neuron")) {
                potentials[connectingNeuronId].signalsTotal++;
                potentials[connectingNeuronId].signalsReceived++;
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
        for(const [connectingNeuronId] of Object.entries(genome.innerNeurons[unfiredNeurons[0].id].connections)) {
            if(connectingNeuronId.includes("Neuron") && !fireOrder.includes(connectingNeuronId)) {
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
                for(const [connectingNeuronId] of Object.entries(genome.innerNeurons[neuron.id].connections)) {
                    if(connectingNeuronId.includes("Neuron") && !fireOrder.includes(connectingNeuronId)) {
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

export function streamlineGenome(genome : Genome) : Genome {
    // const initialFireOrder = getFireOrder(genome.innerNeurons);
    const initialFireOrder = getFireOrder(genome);
    let changesMade = 1;

    // ? remove useless connection and/or useless inner neurons
    while(changesMade !== 0) {
        changesMade = 0;

        for(const [neuronId, neuron] of Object.entries(genome.innerNeurons)) {
            // ? removes inner neuron if it has no connections, which would render it useless
            if(Object.keys(neuron.connections).length === 0) {
                delete genome.innerNeurons[neuronId];
                changesMade++;
            }

            for(const [connectingNeuronId] of Object.entries(neuron.connections)) {
                if(connectingNeuronId.includes("Neuron")) {
                    // ? removes connection if neuron fires after the neuron it is connected to
                    // ? also remove a connection if a neuron is connected to itself
                    if(initialFireOrder.indexOf(connectingNeuronId) <= initialFireOrder.indexOf(neuronId)) {
                        delete genome.innerNeurons[neuronId].connections[connectingNeuronId];
                        changesMade++;
                    } else if(!(connectingNeuronId in genome.innerNeurons)) {
                        // ? if connectigNeuron has already been removed from genome, remove every connection to it
                        delete genome.innerNeurons[neuronId].connections[connectingNeuronId];
                        changesMade++;
                    }
                }
            }
        }
    }

    // ? remove sensors that might have become useless since inner neurons could have been removed
    for(const [sensorId, sensorValues] of Object.entries(genome.sensors)) {
        const sensorConnections = sensorValues.connections;

        for(const [connectingNeuronId] of Object.entries(sensorConnections)) {
            if(connectingNeuronId.includes("Neuron") && !(connectingNeuronId in genome.innerNeurons)) {
                delete genome.sensors[sensorId].connections[connectingNeuronId];

                // ? if sensor has no connections left an invalid one has been removed, delete the sensor
                if(Object.keys(genome.sensors[sensorId].connections).length === 0) {
                    delete genome.sensors[sensorId];
                }
            }
        }
    }

    // ? update fireOrder for inner Neurons
    genome.fireOrder = getFireOrder(genome);

    return genome;
}


// ? sort by:
// ?    - neuron potential, the neuron with the highest potential will fire next
// ?    - if multiple neurons have the same potential the one with the most connections will fire next
function sortFunction(firstNeuron : { id: string, potential: Potential }, secondNeuron : { id: string, potential: Potential }) {
    if(firstNeuron.potential.potential !== secondNeuron.potential.potential) {
        return secondNeuron.potential.potential - firstNeuron.potential.potential;
    }

    return secondNeuron.potential.connections - firstNeuron.potential.connections;
}

const testGenome1 : Genome = {
    sensors: {
        "XPos": {
            bias: 1,
            connections: {
                "Neuron 1": 1,
                "Neuron 2": 1
            }
        }
    },
    innerNeurons: {
        "Neuron 1": {
            bias: 1,
            connections: {
                "Neuron 3": 1
            }
        },
        "Neuron 2": {
            bias: 1,
            connections: {
                "Neuron 1": 1,
                "Neuron 4": 1,
            }
            
        },
        "Neuron 3": {
            bias: 1,
            connections: {
                "Neuron 2": 1,
                "Neuron 4": 1,
                "Neuron 5": 1
            }
            
        },
        "Neuron 4": {
            bias: 1,
            connections: {
                "Neuron 3": 1,
                "Neuron 5": 1 
            }
            
        },
        "Neuron 5": {
            bias: 1,
            connections: {
                "Neuron 6": 1,
                "MoveX": 1
            }
            
        },
        "Neuron 6": {
            bias: 1,
            connections: {
                "MoveX": 1
            }
            
        }
    },
    actions: {
        "MoveX": {
            bias: 1
        }
    }
};

const testGenome2 : Genome = {
    sensors: {
        "XPos": {
            bias: 1,
            connections: {
                "Neuron 1": 1
            }
        }
    },
    innerNeurons: {
        "Neuron 1": {
            bias: 1,
            connections: {
                "Neuron 2": 1
            }
        },
        "Neuron 2": {
            bias: 1,
            connections: {
                "Neuron 3": 1,
                "Neuron 4": 1,
                "Neuron 5": 1
            }
            
        },
        "Neuron 3": {
            bias: 1,
            connections: {
                "MoveX": 1
            }
            
        },
        "Neuron 4": {
            bias: 1,
            connections: {
                "MoveX": 1
            }
            
        },
        "Neuron 5": {
            bias: 1,
            connections: {
                "MoveX": 1
            }
            
        }
    },
    actions: {
        "MoveX": {
            bias: 1
        }
    }
};
