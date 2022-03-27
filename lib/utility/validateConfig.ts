import { Config } from "@interfaces/config.interface";

export function validateConfig(config : Config) {
    if (!("PORT" in config)) throw new Error("PORT seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("PXL_HEIGHT" in config)) throw new Error("PXL_HEIGHT seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("GRID_SIZE" in config)) throw new Error("GRID_SIZE seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("FPS" in config)) throw new Error("FPS seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("POPULATION" in config)) throw new Error("POPULATION seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("STEPS_PER_GENERATION" in config)) throw new Error("STEPS_PER_GENERATION seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("MAX_GENERATION" in config)) throw new Error("MAX_GENERATION seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("MUTATE_PROBABILITY" in config)) throw new Error("MUTATE_PROBABILITY seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("MAX_NUMBER_INNER_NEURONS" in config)) throw new Error("MAX_NUMBER_INNER_NEURONS seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("MIN_NUMBER_GENOME_SIZE" in config)) throw new Error("MIN_NUMBER_GENOME_SIZE seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("MAX_NUMBER_GENOME_SIZE" in config)) throw new Error("MAX_NUMBER_GENOME_SIZE seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("MAX_CONNECTIONS" in config)) throw new Error("MAX_CONNECTIONS seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("CONNECTION_WEIGHT_RANGE" in config)) throw new Error("CONNECTION_WEIGHT_RANGE seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    if (!("BIAS_RANGE" in config)) throw new Error("BIAS_RANGE seems to be missing in your configuration. Please refer to the .env file in your root directory.");
    

    if (!Number(config.PORT)) throw new Error("PORT must be a number.");
    if (!Number(config.PXL_HEIGHT)) throw new Error("PXL_HEIGHT must be a number.");
    if (!Number(config.GRID_SIZE)) throw new Error("GRID_SIZE must be a number.");
    if (!Number(config.FPS)) throw new Error("FPS must be a number.");
    if (!Number(config.POPULATION)) throw new Error("POPULATION must be a number.");
    if (!Number(config.STEPS_PER_GENERATION)) throw new Error("STEPS_PER_GENERATION must be a number.");
    if (!Number(config.MAX_GENERATION)) throw new Error("MAX_GENERATION must be a number.");
    if (!Number(config.MUTATE_PROBABILITY)) throw new Error("MUTATE_PROBABILITY must be a number.");
    if (!Number(config.MAX_NUMBER_INNER_NEURONS)) throw new Error("MAX_NUMBER_INNER_NEURONS must be a number.");
    if (!Number(config.MIN_NUMBER_GENOME_SIZE)) throw new Error("MIN_NUMBER_GENOME_SIZE must be a number.");
    if (!Number(config.MAX_NUMBER_GENOME_SIZE)) throw new Error("MAX_NUMBER_GENOME_SIZE must be a number.");
    if (!Number(config.MAX_CONNECTIONS)) throw new Error("MAX_CONNECTIONS must be a number.");
    if (!Number(config.CONNECTION_WEIGHT_RANGE)) throw new Error("CONNECTION_WEIGHT_RANGE must be a number.");
    if (!Number(config.BIAS_RANGE)) throw new Error("BIAS_RANGE must be a number.");
}
