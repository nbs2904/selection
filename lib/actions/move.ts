import { Action } from "@actions/action";
import { tanh } from "@functions/tanh";
import { ActionConfig } from "@interfaces/actionConfig.interface";

// TODO missing lastMovement property
export function moveForward(bias : number, actionFunction : (input : any) => any){
    throw new Error("Implementation missing.");
}

// TODO missing lastMovement property
export function moveBackward(bias : number, actionFunction : (input : any) => any){
    throw new Error("Implementation missing.");    
}

// TODO add moveRandom function to node class
export function moveRandom() {
    console.log("Waiting to be implemented.");
    
}

export function moveX(bias : number, actionFunction : (input : any) => any) {
    const config : ActionConfig = {
        id: "Action MoveX",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

export function moveY(bias : number, actionFunction : (input : any) => any) {
    const config : ActionConfig = {
        id: "Action MoveY",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}
