// * actions
import { Action } from "@actions/action";

// * functions
import { tanh } from "@functions/tanh";

// * interfaces
import { ActionConfig } from "@interfaces/actionConfig.interface";

/**
 * kill Action Blue Print
 * @param bias - bias of the action is set upon creation
 * @param actionFunction - function bound to Node, in order to change state when action fires
 */
export function kill (bias : number, actionFunction : () => Promise<void>){
    const config : ActionConfig = {
        id: "Kill",
        bias: bias,
        activationFunction: tanh,
        actionFunction: actionFunction
    };

    return new Action(config.id, config.bias, config.activationFunction, config.actionFunction);
}