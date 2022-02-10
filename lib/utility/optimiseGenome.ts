/* eslint-disable no-prototype-builtins */
import { neuronSignalConnection } from "@interfaces/neuronSignalConnection";
import { Genome } from "@interfaces/genome.interface";

export function getFireOrder (innerNeurons : Genome["innerNeurons"]) : string[]{
    const signalConnectionCount : neuronSignalConnection = {};

    // ? get signal count and connection count for every inner neuron
    for(const [neuronId, neuronValues] of Object.entries(innerNeurons)) {
        const neuronConnections = neuronValues.connections;

        if(!(neuronId in signalConnectionCount)) {
            signalConnectionCount[neuronId] = {
                signals: 0,
                connections: 0
            };
        }

        for(const [connectingNeuronId] of Object.entries(neuronConnections)) {
            if(connectingNeuronId.includes("Neuron")) {
                signalConnectionCount[neuronId].connections++;

                if(!(connectingNeuronId in signalConnectionCount)) {
                    signalConnectionCount[connectingNeuronId] = {
                        signals: 0,
                        connections: 0
                    };
                }
                
                signalConnectionCount[connectingNeuronId].signals++;
            }
        }
    }

    // ? return sorted array of neuron ids
    // ? sorted by:
    // ?    -   neuron.connectionCount - neuron.signalCount
    // ?    -   neuron.connectionCount
    return Object.entries(signalConnectionCount)
        .map((neuron) => {
            return {
                "id": neuron[0],
                "connectionCount": neuron[1].connections,
                "connectionSignalBalance": neuron[1].connections - neuron[1].signals
            };
        })
        .sort((firstNeuron, secondNeuron) => {
            if(firstNeuron.connectionSignalBalance !== secondNeuron.connectionSignalBalance) {
                return secondNeuron.connectionSignalBalance - firstNeuron.connectionSignalBalance;
            }

            return secondNeuron.connectionCount - firstNeuron.connectionCount;
        })
        .map((neuron) => {
            return neuron.id;
        });
}

export function streamlineGenome(genome : Genome) : Genome {
    const initialFireOrder = getFireOrder(genome.innerNeurons);
    let changesMade = 1;

    // ? remove useless connection and/or useless inner neurons
    while(changesMade !== 0) {
        changesMade = 0;

        for(const [neuronId, neuronValues] of Object.entries(genome.innerNeurons)) {
            const neuronConnections = neuronValues.connections;

            // ? removes inner neuron if it has no connections, which would render it useless
            if(Object.keys(neuronConnections).length === 0) {
                delete genome.innerNeurons[neuronId];
                changesMade++;
            }

            for(const [connectingNeuronId] of Object.entries(neuronConnections)) {
                if(connectingNeuronId.includes("Neuron")) {
                    // ? removes connection if neuron fires after the neuron it is connected to
                    // ? also remove a connection if a neuron is connected to itself
                    if(initialFireOrder.indexOf(connectingNeuronId) <= initialFireOrder.indexOf(neuronId)) {
                        // TODO remove connection
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
    genome.fireOrder = getFireOrder(genome.innerNeurons);

    return genome;
}

const testGenome : Genome = {
    sensors: {
        "XPos": {
            bias: 1,
            connections: {
                "Neuron 1": 1,
                "MoveX": 1
            }
        },
        // "YPos": {
        //     bias: -2,
        //     connections: {
        //         "Neuron 1": 1
        //     }
        // },
        // "Age": {
        //     bias: 1.19,
        //     connections: {
        //         "Neuron 1": 1,
        //         "Neuron 2": 1
        //     }
        // }
    },
    innerNeurons: {
        "Neuron 1": {
            bias: -0.56,
            connections: {
                // "MoveX": 1,
                // "MoveY": 1,
                "Neuron 3": 1
            }
        },
        "Neuron 2": {
            bias: -1.09,
            connections: {
                "Neuron 1": 1,
                "Neuron 4": 1,
                // "MoveY": 1
            }
        },
        "Neuron 3": {
            bias: -1.09,
            connections: {
                "Neuron 2": 1,
                "Neuron 3": 1,
                "Neuron 4": 1,
                "Neuron 5": 1,
                // "MoveY": 1
            }
        },
        "Neuron 4": {
            bias: -1.09,
            connections: {
                "Neuron 3": 1,
                "Neuron 5": 1,
                // "MoveY": 1
            }
        },
        "Neuron 5": {
            bias: -1.09,
            connections: {
                "MoveY": 1
            }
        }
    },
    actions: {
        "MoveX": {
            bias: 1.61
        },
        // "MoveY": {
        //     bias: 0.23
        // }
    }
};