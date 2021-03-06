// * interfaces
import { Genome } from "@interfaces/genome.interface";

// * logger
const logger = require("@config/logs/log4js").utils;

// * config
const MAX_NUMBER_INNER_NEURONS = +(process.env.MAX_NUMBER_INNER_NEURONS || 4) as number;
const MIN_NUMBER_GENOME_SIZE = +(process.env.MIN_NUMBER_GENOME_SIZE || 6) as number;
const MAX_NUMBER_GENOME_SIZE = +(process.env.MAX_NUMBER_GENOME_SIZE || 10) as number;
const MAX_CONNECTIONS = +(process.env.MAX_CONNECTIONS || 4) as number;

/**
 * Checks if [Genome](../interfaces/genome.interface.ts) is valid based on [Config file](../interfaces/config.interface.ts).
 * @param genome - [Genome](../interfaces/genome.interface.ts) to validate
 */
export function validateGenome (genome : Genome) : boolean {
    // ? check MAX_NUMBER_INNER_NEURONS
    if(Object.entries(genome.innerNeurons).length > MAX_NUMBER_INNER_NEURONS) {
        logger.warn("Too many inner neurons");
        return false;
    }

    // ? check for genome size
    const genomeSize = Object.entries(genome.sensors).length + Object.entries(genome.innerNeurons).length + Object.entries(genome.actions).length;

    if(genomeSize < MIN_NUMBER_GENOME_SIZE || genomeSize > MAX_NUMBER_GENOME_SIZE) {
        logger.warn("Genome size is not within bounds");
        return false;
    }

    // ? MAX_CONNECTIONS
    // ? check every sensor
    for (const [ , sensor ] of Object.entries(genome.sensors)) {
        if(Object.entries(sensor.connections).length > MAX_CONNECTIONS) {
            logger.warn("Sensor has too many connections");
            return false;
        }
    }

    // ? check every neuron
    for (const [ , neuron ] of Object.entries(genome.innerNeurons)) {
        if(Object.entries(neuron.connections).length > MAX_CONNECTIONS) {
            logger.warn("Neuron has too many connections");
            return false;
        }
    }


    return true;
}