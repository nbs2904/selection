// * classes
import { Neuron } from "@classes/neuron";

// * actions
import * as moveActions from "@actions/move.action";

// TODO fix links
/**
 * Actions function as the output neurons of a node's genome
 * @extends [Neuron]()
*/

export class Action extends Neuron {
    /** @public input to be passed to the activation function */
    public input = 0;
    /**
     * @private Function bound to Node that is called, when Action fires.
     * @param input - either -1 or 1
     */
    private actionFunction : (input? : number) => Promise<void>;

    /**
     * @constructor
     * @param id - unique identifier of Action
     * @param bias - used to offset Action input
     * @param activationFunction - function used to determine Action output
     * @param actionFunction - function bound to Action, to change its state
     */
    constructor (id : string, bias : number, activationFunction : (input : number) => number, actionFunction : (input? : number) => Promise<void>) {
        super(id, bias, activationFunction);

        this.actionFunction = actionFunction;
    }
    
    /**
     * @readonly
     * @returns input and bias that have been passed through the activation function
    */
    public get output () : number {
        return this.activationFunction(this.input + this.bias);
    }
    
    /**
     *  @public invokes actionFunction, causing node to change state 
    */
    public fire () : void {
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

// TODO move array to independent file
export const actionNames = [ "MoveX", "MoveY", "MoveBwd", "MoveFwd", "MoveRnd" ];