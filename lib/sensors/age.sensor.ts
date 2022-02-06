import { Neuron } from "@classes/neuron";
import { normalise } from "@functions/normalise";

const STEPS_PER_GENERATION = process.env.STEPS_PER_GENERATION || 100;

// export const ageSensor = new Neuron(0, 0, normalise(0, STEPS_PER_GENERATION as number));