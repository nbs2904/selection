// * types
import { Level } from "@customTypes/level.type";

const GRID_SIZE = +(process.env.GRID_SIZE || 50) as number;

/** second quadrant of grid */
export const upperLeft : Level = [
    [0, 0, GRID_SIZE / 2, GRID_SIZE / 2]
];

/** first quadrant of grid */
export const upperRight : Level = [
    [GRID_SIZE / 2, 0, GRID_SIZE, GRID_SIZE / 2]
];

/** third quadrant of grid */
export const lowerLeft : Level = [
    [0, GRID_SIZE / 2, GRID_SIZE / 2, GRID_SIZE]
];

/** fourth quadrant of grid */
export const lowerRight : Level = [
    [GRID_SIZE / 2, GRID_SIZE / 2, GRID_SIZE, GRID_SIZE]
];