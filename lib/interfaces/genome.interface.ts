export interface Genome {
    fireOrder?: string[];
    sensors: {
        [key : string] : {
            bias: number,
            connections: {
                [key : string] : number
            }
        };
    },
    innerNeurons: {
        [key : string] : {
            bias: number,
            connections: {
                [key : string] : number
            }
        };
    },
    actions: {
        [key : string] : {
            bias: number
        }
    }
}
