// * sensors
import { Sensor } from "@sensors/sensor";

// * interfaces
import { SensorConfig } from "@interfaces/sensorConfig.interface";
import { Connection } from "./../interfaces/connection.interface";
import { Sensation } from "@interfaces/sensation.interface";

// * functions
import { normalise } from "@functions/normalise";

// * config
const STEPS_PER_GENERATION = +(process.env.STEPS_PER_GENERATION) as number;


/**
 * Age Sensor Blue Print.
 * The Age Sensor just perceives the Age as Sense from the [Node](../classes/node.ts)
 * @param bias - The bias of the [Sensor](../sensors/sensor.ts) the input is offset with
 * @param sensation - The sensation the [Node](../classes/node.ts) is experiencing
 * @param connections - Array of [Connections](../interfaces/connection.interface.ts) the [Node](../classes/node.ts) has to other [Nodes](../classes/node.ts).
 * @returns [Sensor](./sensor.ts)
 */
export function ageSensor (bias : number, sensation : Sensation, connections : Connection[] = []) : Sensor {
    const config : SensorConfig = {
        id: "Age",
        bias: bias,
        sensation: sensation,
        senses: [ "age" ],
        activationFunction: normalise(0, STEPS_PER_GENERATION, true),
        connections: connections
    };

    return new Sensor(config.id, config.bias, config.sensation, config.senses, config.activationFunction, config.connections);
}