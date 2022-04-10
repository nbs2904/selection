// * actions
import { actionNames } from "@actions/action";

// * sensors
import { sensorNames } from "@sensors/sensor";

// * interfaces
import { Genome } from "@interfaces/genome.interface";

// * utility
import { randomFloat, randomInteger } from "@utility/randomNumber";
import { streamlineGenome } from "@utility/optimiseGenome";

// * logger
const logger = require("@config/log4js").utils;

// * config
const MAX_NUMBER_INNER_NEURONS = +(process.env.MAX_NUMBER_INNER_NEURONS || 6) as number;
const MIN_NUMBER_GENOME_SIZE = +(process.env.MIN_NUMBER_GENOME_SIZE || 4) as number;
const MAX_NUMBER_GENOME_SIZE = +(process.env.MAX_NUMBER_GENOME_SIZE || 10) as number;

const MAX_CONNECTIONS = +(process.env.MAX_CONNECTIONS || 10) as number;
const CONNECTION_WEIGHT_RANGE = +(process.env.CONNECTION_WEIGHT_RANGE || 8) as number;
const BIAS_RANGE = +(process.env.BIAS_RANGE || 8) as number;

/**
 * Generates a random genome according to config file in the root directory. (.env)
 * @returns {{{@link Genome
 */
export function randomGenome() : Genome{
    const genome : Genome = {
        sensors: {},
        innerNeurons: {},
        actions: {}
    };
    
    const sensors : string[] = [];
    const innerNeurons : string[] = [];
    const actions : string[] = [];
    
    // ? add at least one sensor and one action
    sensors.push(sensorNames[randomInteger(sensorNames.length - 1)]);
    actions.push(actionNames[randomInteger(actionNames.length - 1)]);

    let configIsValid = false;
    let currentGenomeLength = sensors.length + innerNeurons.length + actions.length;

    while(!configIsValid) {

        if(currentGenomeLength === MAX_NUMBER_GENOME_SIZE) {
            configIsValid = true;
            break;
        }

        const type = randomInteger(2);

        if(type === 0) {
            if(sensors.length < sensorNames.length) {
                const remainingSensors = sensorNames.filter((name) => !sensors.includes(name));

                sensors.push(remainingSensors[randomInteger(remainingSensors.length - 1)]);
                currentGenomeLength++;
            }
        } else if(type === 1) {
            if(innerNeurons.length < MAX_NUMBER_INNER_NEURONS) {
                innerNeurons.push(`Neuron ${innerNeurons.length}`);
                currentGenomeLength++;
            }

        } else if(type === 2) {
            if(actions.length < actionNames.length) {
                const remainingActions = actionNames.filter((name) => !actions.includes(name));

                actions.push(remainingActions[randomInteger(remainingActions.length - 1)]);
                currentGenomeLength++;
            }
        }

        if(MIN_NUMBER_GENOME_SIZE <= currentGenomeLength && currentGenomeLength <= MAX_NUMBER_GENOME_SIZE) {
            configIsValid = randomInteger(1) ? true : false;
        }
    }

    // ? add sensors
    sensors.forEach((name) => {
        const connections : {[key : string] : number} = {};
        const numberOfConnections = randomInteger(MAX_CONNECTIONS, 1);

        for (let index = 0; index < numberOfConnections; index++) {
            const remainingNeurons = innerNeurons.filter((innerNeuronName) => !Object.keys(connections).includes(innerNeuronName));
            const remainingActions = actions.filter((actionName) => !Object.keys(connections).includes(actionName));

            let type : number;
            let connectionName : string;

            if(remainingNeurons.length > 0 && remainingActions.length > 0) {
                type = randomInteger(1);
            } else if(remainingNeurons.length > 0) {
                type = 0;
            } else if(remainingActions.length > 0) {
                type = 1;
            } else {
                type = -1;
            }

            if(type === 0) {
                connectionName = remainingNeurons[randomInteger(remainingNeurons.length - 1)];
            } else if(type === 1) {
                connectionName = remainingActions[randomInteger(remainingActions.length - 1)];
            }

            if(type !== -1) {
                connections[connectionName] = randomFloat(CONNECTION_WEIGHT_RANGE/2, CONNECTION_WEIGHT_RANGE/2 * (-1));
            }
        }

        genome.sensors[name] = {
            bias: randomFloat(BIAS_RANGE/2, BIAS_RANGE/2 * (-1)),
            connections: connections
        };
    });

    // ? add inner neurons
    innerNeurons.forEach((name) => {
        const connections : {[key : string] : number} = {};
        const numberOfConnections = randomInteger(MAX_CONNECTIONS, 1);

        for(let index = 0; index < numberOfConnections; index++) {
            const remainingNeurons = innerNeurons.filter((innerNeuronName) => !Object.keys(connections).includes(innerNeuronName) && name !== innerNeuronName);
            const remainingActions = actions.filter((actionName) => !Object.keys(connections).includes(actionName));

            let type : number;
            let connectionName : string;

            if(remainingNeurons.length > 0 && remainingActions.length > 0) {
                type = randomInteger(1);
            } else if(remainingNeurons.length > 0) {
                type = 0;
            } else if(remainingActions.length > 0) {
                type = 1;
            } else {
                type = -1;
            }

            if(type === 0) {
                connectionName = remainingNeurons[randomInteger(remainingNeurons.length - 1)];
            } else if(type === 1) {
                connectionName = remainingActions[randomInteger(remainingActions.length - 1)];
            }

            if(type !== -1) {
                connections[connectionName] = randomFloat(CONNECTION_WEIGHT_RANGE/2, CONNECTION_WEIGHT_RANGE/2 * (-1));
            }
        }

        genome.innerNeurons[name] = {
            bias: randomFloat(BIAS_RANGE/2, BIAS_RANGE/2 * (-1)),
            connections: connections
        };
    });

    // ? add actions
    actions.forEach((name) => {
        genome.actions[name] = { bias: randomFloat(BIAS_RANGE/2, BIAS_RANGE/2 * (-1))};
    });
    
    return streamlineGenome(genome);
}