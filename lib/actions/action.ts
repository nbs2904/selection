// * classes
import { Neuron } from "@classes/neuron";

// * actions
import * as moveActions from "@actions/move.action";


/**
 * Actions function as the output neruons of a node's genome
 * @extends {{@link Neuron}
 * @property {string} id
 * @property {number} bias ranges between -BIAS_RANGE and BIAS_RANGE (env file)
 * @property {number} input - neurons can receive input from other neurons
 * @property {(input : number) => number} activationFunction
 * @property {(input? : number) => Promise<void>} actionFunction - bound function to node that will be called when action fires
*/
export class Action extends Neuron {
    public input = 0;
    private actionFunction : (input? : number) => Promise<void>;

    constructor(id : string, bias : number, activationFunction : (input : number) => number, actionFunction : (input? : number) => Promise<void>) {
        super(id, bias, activationFunction);

        this.actionFunction = actionFunction;
    }
    
    /**
     * @returns {number} input and bias that have been passed through the activation function
    */
    public get output() : number {
        return this.activationFunction(this.input + this.bias);
    }
    
    /**
     *  invokes actionFunction, causing node to change state 
    */
    public fire() {
        if(this.output < 0) {
            this.actionFunction(-1);
        } else {
            this.actionFunction(1);
        }
    }
}

/**
 * map of action names to actions
 */
export const actionList = {
    "MoveRnd": moveActions.moveRnd,
    "MoveFwd": moveActions.moveFwd,
    "MoveBwd": moveActions.moveBwd,
    "MoveX": moveActions.moveX,
    "MoveY": moveActions.moveY,
};

export const actionNames = [ "MoveX", "MoveY", "MoveBwd", "MoveFwd", "MoveRnd" ];