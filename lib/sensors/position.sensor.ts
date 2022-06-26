// * interfaces
import { Sensation } from "@interfaces/sensation.interface";
import { SensorConfig } from "@interfaces/sensorConfig.interface";
import { Connection } from "@interfaces/connection.interface";

// * sensors
import { Sensor } from "@sensors/sensor";

// * functions
import { normalise } from "@functions/normalise";

// * config
const PXL_HEIGHT = +(process.env.PXL_HEIGH || 750) as number;


/**
 * X Position Sensor Blue Print.
 * The xPosSensor just perceives the x-coordinate as Sense from the [Node](../classes/node.ts)
 * @param bias - The bias of the [Sensor](../sensors/sensor.ts) the input is offset with
 * @param sensation - The sensation the [Node](../classes/node.ts) is experiencing
 * @param connections - Array of [Connections](../interfaces/connection.interface.ts) the [Node](../classes/node.ts) has to other [Nodes](../classes/node.ts).
 * @returns [Sensor](./sensor.ts)
 */
export function xPosSensor (bias : number, sensation : Sensation, connections : Connection[] = []) : Sensor {
    const config : SensorConfig = {
        id: "XPos",
        bias: bias,
        sensation: sensation,
        senses: [ "x" ],
        activationFunction: normalise(0, PXL_HEIGHT, true),
        connections: connections
    };

    return new Sensor(config.id, config.bias, config.sensation, config.senses, config.activationFunction, config.connections);
}

/**
 * Y Position Sensor Blue Print.
 * The YPosSensor just perceives the y-coordinate as Sense from the [Node](../classes/node.ts)
 * @param bias - The bias of the [Sensor](../sensors/sensor.ts) the input is offset with
 * @param sensation - The sensation the [Node](../classes/node.ts) is experiencing
 * @param connections - Array of [Connections](../interfaces/connection.interface.ts) the [Node](../classes/node.ts) has to other [Nodes](../classes/node.ts).
 * @returns [Sensor](./sensor.ts)
 */
export function yPosSensor (bias : number, sensation : Sensation, connections : Connection[] = []) : Sensor {
    const config : SensorConfig = {
        id: "YPos",
        bias: bias,
        sensation: sensation,
        senses: [ "y" ],
        activationFunction: normalise(0, PXL_HEIGHT, true),
        connections: connections || []
    };

    return new Sensor(config.id, config.bias, config.sensation, config.senses, config.activationFunction, config.connections);
}


