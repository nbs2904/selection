export interface Genome {
    /** Order the inner neurons fire */
    fireOrder?: string[];
    /** map of sensors */
    sensors: {
        [key : string] : {
            bias: number,
            connections: {
                [key : string] : number
            }
        };
    },
    /** map of inner neurons */
    innerNeurons: {
        [key : string] : {
            bias: number,
            connections: {
                [key : string] : number
            }
        };
    },
    /** map of actions */
    actions: {
        [key : string] : {
            bias: number
        }
    }
}