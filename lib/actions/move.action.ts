// * actions
import { Action } from "@actions/action";

// * functions
import { tanh } from "@functions/tanh";

// * interfaces
import { ActionConfig } from "@interfaces/actionConfig.interface";


export function moveFwd(bias : number, actionFunction : () => Promise<void>){
    const config : ActionConfig = {
        id: "MoveFwd",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

export function moveBwd(bias : number, actionFunction : () => Promise<void>){
    const config : ActionConfig = {
        id: "MoveBwd",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

export function moveRnd(bias : number, actionFunction : () => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveRnd",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

export function moveX(bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveX",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

export function moveY(bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveY",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}
