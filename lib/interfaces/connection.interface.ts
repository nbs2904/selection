import { Neuron } from "@classes/neuron";

export interface Connection {
    weight : number;
    outputNeuron : Neuron
}