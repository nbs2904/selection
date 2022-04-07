// * classes
import { InnerNeuron } from "@classes/neuron";
import { Action } from "@actions/action";

export interface Connection {
    /** weight of the connection */
    weight : number;
    /** neuron or action this neuron is connected to */
    outputNeuron : InnerNeuron | Action
}