import { Sensation } from "@interfaces/sensation.interface";
import { Connection } from "@interfaces/connection.interface";

export interface SensorConfig {
    id: string;
    bias: number;
    sensation: Sensation;
    senses: string[];
    activationFunction: (input : number) => number;
    connections: Connection[];
}