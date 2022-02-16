import { Connection } from "@interfaces/connection.interface";
import { sensorNames } from "@sensors/sensor";
import { actionNames } from "@actions/action";

import { Genome } from "@interfaces/genome.interface";
import { randomFloat, randomInteger } from "@utility/randomNumber";

// * logger
const logger = require("@config/log4js").utils;

const MAX_NUMBER_INNER_NEURONS = +(process.env.MAX_NUMBER_INNER_NEURONS || 4) as number;
const MIN_NUMBER_GENOME_SIZE = +(process.env.MIN_NUMBER_GENOME_SIZE || 6) as number;
const MAX_NUMBER_GENOME_SIZE = +(process.env.MAX_NUMBER_GENOME_SIZE || 10) as number;

const MAX_CONNECTIONS = +(process.env.MAX_CONNECTIONS || 4) as number;
const CONNECTION_WEIGHT_RANGE = +(process.env.CONNECTION_WEIGHT_RANGE || 8) as number;
const BIAS_RANGE = +(process.env.BIAS_RANGE || 8) as number;

if(MIN_NUMBER_GENOME_SIZE > MAX_NUMBER_GENOME_SIZE) {
    logger.error("MIN_NUMBER_GENOME_SIZE must be smaller than MAX_NUMBER_GENOME_SIZE, please adjust the config file.");
    throw new Error("Invalid Config");
} else if(MAX_NUMBER_INNER_NEURONS > MIN_NUMBER_GENOME_SIZE - 2) {
    logger.error("MAX_NUMBER_INNER_NEURONS must be smaller than MIN_NUMBER_GENOME_SIZE by at least two, please adjust the config file.");
    throw new Error("Invalid Config");
} else if(MAX_NUMBER_INNER_NEURONS + sensorNames.length + actionNames.length < MIN_NUMBER_GENOME_SIZE) {
    logger.error("MIN_NUMBER_GENOME_SIZE is too big to generate a valid genome. Please either decrease the minial length of a genome or consider increasing the number of inner neurons.");
    throw new Error("Invalid Config");
} else if(MIN_NUMBER_GENOME_SIZE < 2) {
    logger.error("MIN_NUMBER_GENOME_SIZE must be bigger than 1, please adjust the config file.");
    throw new Error("Invalid Config");
}

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
    

    return genome;
}