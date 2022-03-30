import { Neuron } from "@classes/neuron";
import * as moveActions from "@actions/move.action";

export class Action extends Neuron {
    public input = 0;
    private actionFunction : (input? : number) => Promise<void>;

    constructor(id : string, bias : number, activationFunction : (input : number) => number, actionFunction : (input? : number) => Promise<void>) {
        super(id, bias, activationFunction);

        this.actionFunction = actionFunction;
    }

    public get output() : number {
        return this.activationFunction(this.input + this.bias);
    }
    
    public fire() {
        if(this.output < 0) {
            this.actionFunction(-1);
        } else {
            this.actionFunction(1);
        }
    }

}

export const actionList = {
    "MoveRnd": moveActions.moveRnd,
    "MoveFwd": moveActions.moveFwd,
    "MoveBwd": moveActions.moveBwd,
    "MoveX": moveActions.moveX,
    "MoveY": moveActions.moveY,
};

export const actionNames = [ "MoveX", "MoveY", "MoveBwd", "MoveFwd", "MoveRnd" ];