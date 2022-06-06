// * interfaces
import { Sensation } from "@interfaces/sensation.interface";
import { Connection } from "@interfaces/connection.interface";

export interface SensorConfig {
    /** sensor id */
    id: string;
    /** sensor bias */
    bias: number;
    /** {@link Sensation} bound to node */
    sensation: Sensation;
    /** list of senses sensor can access */
    senses: string[];
    /** activation function are listed in lib/functions */
    activationFunction: (input : number) => number;
    /** map of [Connections](./connection.interface.ts) */
    connections: Connection[];
}