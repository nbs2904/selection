// * types
import { Level } from "@customTypes/level.type";

const GRID_SIZE = +(process.env.GRID_SIZE || 50) as number;

export const hoizontalMiddle : Level = [
    [ GRID_SIZE / 4, 0, 3 * GRID_SIZE / 4, GRID_SIZE ]
];

export const verticalMiddle : Level = [
    [ 0, GRID_SIZE / 4, GRID_SIZE, 3 * GRID_SIZE / 4 ]
];