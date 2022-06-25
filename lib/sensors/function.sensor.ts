// * sensors
import { Sensor } from "@sensors/sensor";

// * interfaces
import { SensorConfig } from "@interfaces/sensorConfig.interface";
import { Connection } from "./../interfaces/connection.interface";
import { Sensation } from "@interfaces/sensation.interface";

// * functions
import { normalise } from "@functions/normalise";


/**
 * Random Sensor Blue Print.
 * The Random Sensor generates a random float between 0 and 1 every time it fires.
 * @param bias - The bias of the [Sensor](../sensors/sensor.ts) the input is offset with
 * @param sensation - The sensation the [Node](../classes/node.ts) is experiencing
 * @param connections - Array of [Connections](../interfaces/connection.interface.ts) the [Node](../classes/node.ts) has to other [Nodes](../classes/node.ts).
 * @returns [Sensor](./sensor.ts)
 */
export function randomSensor (bias : number, sensation : Sensation, connections : Connection[] = []) : Sensor {
    const config : SensorConfig = {
        id: "Random",
        bias: bias,
        sensation: sensation,
        senses: [ "random" ],
        activationFunction: normalise(0, 1, true),
        connections: connections
    };

    return new Sensor(config.id, config.bias, config.sensation, config.senses, config.activationFunction, config.connections);
}