// * classes
import { InnerNeuron } from "@classes/neuron";
import { Action } from "@actions/action";

export interface Connection {
    weight : number;
    outputNeuron : InnerNeuron | Action
}