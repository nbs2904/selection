import { Neuron } from "@classes/neuron";
import * as moveActions from "@actions/move.action";

export class Action extends Neuron {
    public input = 0;
    private actionFunction : (input : any) => any;

    constructor(id : string, bias : number, activationFunction : (input : number) => number, actionFunction : (input : any) => any) {
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

// TODO find better name for actionList and sensorList
export const actionList = {
    "MoveRnd": moveActions.moveRnd,
    "MoveFwd": moveActions.moveFwd,
    "MoveBwd": moveActions.moveBwd,
    "MoveX": moveActions.moveX,
    "MoveY": moveActions.moveY,
};

export const actionNames = [ "MoveRnd", "MoveFwd", "MoveBwd", "MoveX", "MoveY" ];