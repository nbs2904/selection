// * actions
import { Action } from "@actions/action";

// * functions
import { tanh } from "@functions/tanh";

// * interfaces
import { ActionConfig } from "@interfaces/actionConfig.interface";

/**
 * moveFwd Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveFwd (bias : number, actionFunction : () => Promise<void>){
    const config : ActionConfig = {
        id: "MoveFwd",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

/**
 * moveBwd Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveBwd (bias : number, actionFunction : () => Promise<void>){
    const config : ActionConfig = {
        id: "MoveBwd",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

/**
 * moveRnd Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveRnd (bias : number, actionFunction : () => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveRnd",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

/**
 * moveX Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveX (bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveX",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

/**
 * moveY Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveY (bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveY",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}

/**
 * moveL Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveL (bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveL",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}


/**
 * moveR Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveR (bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveR",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}


/**
 * moveN Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveN (bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveN",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}


/**
 * moveS Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveS (bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveS",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}


/**
 * moveE Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveE (bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveE",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}


/**
 * moveW Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function moveW (bias : number, actionFunction : (input : number) => Promise<void>) {
    const config : ActionConfig = {
        id: "MoveW",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}
