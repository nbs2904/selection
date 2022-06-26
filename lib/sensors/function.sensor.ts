// * sensors
import { Sensor } from "@sensors/sensor";

// * interfaces
import { SensorConfig } from "@interfaces/sensorConfig.interface";
import { Connection } from "./../interfaces/connection.interface";
import { Sensation } from "@interfaces/sensation.interface";

// * functions
import { normalise } from "@functions/normalise";

// * config
const GRID_SIZE = +(process.env.GRID_SIZE || 100) as number;
const POPULATION = +(process.env.POPULATION || 500) as number;


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


/**
 * Population Sensor Blue Print.
 * The Population Sensor receives it input from the current living population in the simulation.
 * @param bias - The bias of the [Sensor](../sensors/sensor.ts) the input is offset with
 * @param sensation - The sensation the [Node](../classes/node.ts) is experiencing
 * @param connections - Array of [Connections](../interfaces/connection.interface.ts) the [Node](../classes/node.ts) has to other [Nodes](../classes/node.ts).
 * @returns [Sensor](./sensor.ts)
 */
export function populationSensor (bias : number, sensation : Sensation, connections : Connection[] = []) : Sensor {
    const config : SensorConfig = {
        id: "Population",
        bias: bias,
        sensation: sensation,
        senses: [ "population" ],
        activationFunction: normalise(0, POPULATION, true),
        connections: connections
    };

    return new Sensor(config.id, config.bias, config.sensation, config.senses, config.activationFunction, config.connections);
}

/**
 * BorderXDistance Sensor Blue Print.
 * The BorderXDistance Sensor input is determined by the node's current distance to the top border of the grid
 * @param bias - The bias of the [Sensor](../sensors/sensor.ts) the input is offset with
 * @param sensation - The sensation the [Node](../classes/node.ts) is experiencing
 * @param connections - Array of [Connections](../interfaces/connection.interface.ts) the [Node](../classes/node.ts) has to other [Nodes](../classes/node.ts).
 * @returns [Sensor](./sensor.ts)
 */
export function borderXDistance (bias : number, sensation : Sensation, connections : Connection[] = []) : Sensor {
    const config : SensorConfig = {
        id: "BorderXDistance",
        bias: bias,
        sensation: sensation,
        senses: [ "borderXDistance" ],
        activationFunction: normalise(0, GRID_SIZE, true),
        connections: connections
    };

    return new Sensor(config.id, config.bias, config.sensation, config.senses, config.activationFunction, config.connections);
}

/**
 * BorderYDistance Sensor Blue Print.
 * The BorderYDistance Sensor input is determined by the node's current distance to the right border of the grid
 * @param bias - The bias of the [Sensor](../sensors/sensor.ts) the input is offset with
 * @param sensation - The sensation the [Node](../classes/node.ts) is experiencing
 * @param connections - Array of [Connections](../interfaces/connection.interface.ts) the [Node](../classes/node.ts) has to other [Nodes](../classes/node.ts).
 * @returns [Sensor](./sensor.ts)
 */
export function borderYDistance (bias : number, sensation : Sensation, connections : Connection[] = []) : Sensor {
    const config : SensorConfig = {
        id: "BorderYDistance",
        bias: bias,
        sensation: sensation,
        senses: [ "borderYDistance" ],
        activationFunction: normalise(0, GRID_SIZE, true),
        connections: connections
    };

    return new Sensor(config.id, config.bias, config.sensation, config.senses, config.activationFunction, config.connections);
}