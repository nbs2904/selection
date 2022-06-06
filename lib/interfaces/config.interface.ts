// TODO keep up to date

export interface Config {
    /** The Port the server listens to */
    PORT: string | number,
    /** Height and Width of the canvas in the browser */
    PXL_HEIGHT: string | number,
    /** Grid size of the simulation */
    GRID_SIZE: string | number,
    /** Frames per second the simluation should run */
    FPS: string | number,
    /** Number of nodes the simulation starts off in the first generation */
    POPULATION: string | number,
    /** Number of steps in a generation */
    STEPS_PER_GENERATION: string | number,
    /** Number after how many generations the simulation stops */
    MAX_GENERATION: string | number,
    /** How likely it is for a genome to mutate when spawning an offspring */
    MUTATE_PROBABILITY: string | number,
    /** Max number of inner neurons a genome can contain to be valid */
    MAX_NUMBER_INNER_NEURONS: string | number,
    /** Minimum Number of sensors + inner neurons + actions a genome should contain to be valid */
    MIN_NUMBER_GENOME_SIZE: string | number,
    /** Maximum Number of sensors + inner neurons + actions a genome can contain to be valid */
    MAX_NUMBER_GENOME_SIZE: string | number,
    /** Max number of connections a sensor or inner neuron can create */
    MAX_CONNECTIONS: string | number,
    /** Connection weight range: from -([CONNECTION_WEIGHT_RANGE](../../config/env/.env)/2) to ([CONNECTION_WEIGHT_RANGE](../../config/env/.env)/2) */
    CONNECTION_WEIGHT_RANGE: string | number,
    /** Neuron bias range: from -([BIAS_RANGE](../../config/env/.env)/2) to ([BIAS_RANGE](../../config/env/.env)/2) */
    BIAS_RANGE: string | number
}