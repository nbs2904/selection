import { Neuron } from "@classes/neuron";
import * as moveActions from "@actions/move";

export class Action extends Neuron {
    [x: string]: any;
    public input = 0;
    // TODO check how node function can be bound to action neuron
    private actionFunction : (input : any) => any;

    constructor(id : string, bias : number, activationFunction : (input : number) => number, actionFunction : (input : any) => any) {
        super(id, bias, activationFunction);

        this.actionFunction = actionFunction;
    }

    public get output() : number {
        return this.activationFunction(this.input + this.bias);
    }
    
    public fire() {
        // TODO execute given function
        if(this.output < 0) {
            this.actionFunction(-1);
        } else {
            this.actionFunction(1);
        }
    }

}

export const actionList = {
    "MoveRandom": moveActions.moveRandom,
    "MoveForward": moveActions.moveForward,
    "MoveX": moveActions.moveX,
    "MoveY": moveActions.moveY,
};