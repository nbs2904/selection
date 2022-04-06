import { actionList } from "./../actions/action";
export interface ActionConfig {
    /** Id of the action neuron. */
    id: string;
    /** Bias of the action neuron. Ranges between -BIAS_RANGE/2 and BIAS_RANGE/2 (env) */
    bias: number;
    /** activationFunctions can be selected from lib/functions */
    activationFunction: (input : number) => number;
    /** function, bound to node, that shall be invoked after action neuron fires */
    actionFunction : (input : any) => any;
}