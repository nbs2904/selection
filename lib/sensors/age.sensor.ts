import { Sensor } from "@sensors/sensor";
import { SensorConfig } from "@interfaces/sensorConfig.interface";
import { Connection } from "./../interfaces/connection.interface";
import { Sensation } from "@interfaces/sensation.interface";
import { normalise } from "@functions/normalise";

const STEPS_PER_GENERATION = process.env.STEPS_PER_GENERATION || 100;

export function ageSensor(sensation : Sensation, connectinos : Connection[]) : Sensor {
    const config : SensorConfig = {
        sensation: sensation,
        senses: ["age"],
        activationFunction: normalise(0, STEPS_PER_GENERATION as number),
        connections: connectinos || []
    };

    return new Sensor(config.sensation, config.senses, config.activationFunction, config.connections);
}