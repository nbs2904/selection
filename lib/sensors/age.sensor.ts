// * sensors
import { Sensor } from "@sensors/sensor";

// * interfaces
import { SensorConfig } from "@interfaces/sensorConfig.interface";
import { Connection } from "./../interfaces/connection.interface";
import { Sensation } from "@interfaces/sensation.interface";

// * functions
import { normalise } from "@functions/normalise";

// * config
const STEPS_PER_GENERATION = +(process.env.STEPS_PER_GENERATION || 100) as number;


export function ageSensor(bias : number, sensation : Sensation, connections? : Connection[]) : Sensor {
    const config : SensorConfig = {
        id: "Age",
        bias: bias,
        sensation: sensation,
        senses: ["age"],
        activationFunction: normalise(0, STEPS_PER_GENERATION, true),
        connections: connections || []
    };

    return new Sensor(config.id, config.bias, config.sensation, config.senses, config.activationFunction, config.connections);
}