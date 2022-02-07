import { Sensation } from "@interfaces/sensation.interface";
// TODO sort imports in every file

// * interfaces
import { SensorConfig } from "@interfaces/sensorConfig.interface";
import { Connection } from "@interfaces/connection.interface";

// * sensors
import { Sensor } from "@sensors/sensor";

// * functions
import { normalise } from "@functions/normalise";


const PXL_HEIGHT = process.env.PXL_HEIGH || 750;

export function xPosSensor(sensation : Sensation, connections? : Connection[]) : Sensor {
    const config : SensorConfig = {
        id: "Sensor XPos",
        sensation: sensation,
        senses: ["x"],
        activationFunction: normalise(0, PXL_HEIGHT as number),
        connections: connections || []
    };

    return new Sensor(config.id, config.sensation, config.senses, config.activationFunction, config.connections);
}

export function yPosSensor(sensation : Sensation, connections? : Connection[]) : Sensor {
    const config : SensorConfig = {
        id: "Sensor YPos",
        sensation: sensation,
        senses: ["y"],
        activationFunction: normalise(0, PXL_HEIGHT as number),
        connections: connections || []
    };

    return new Sensor(config.id, config.sensation, config.senses, config.activationFunction, config.connections);
}


