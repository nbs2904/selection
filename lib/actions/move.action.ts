import { Action } from "@actions/action";
import { tanh } from "@functions/tanh";
import { ActionConfig } from "@interfaces/actionConfig.interface";

export function moveFwd(bias : number, actionFunction : (input : any) => any){
    const config : ActionConfig = {
        id: "MoveFwd",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

export function moveBwd(bias : number, actionFunction : (input : any) => any){
    const config : ActionConfig = {
        id: "MoveBwd",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

export function moveRnd(bias : number, actionFunction : (input : any) => any) {
    const config : ActionConfig = {
        id: "MoveRnd",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

export function moveX(bias : number, actionFunction : (input : any) => any) {
    const config : ActionConfig = {
        id: "MoveX",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

export function moveY(bias : number, actionFunction : (input : any) => any) {
    const config : ActionConfig = {
        id: "MoveY",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}
