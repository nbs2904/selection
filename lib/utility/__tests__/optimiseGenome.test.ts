import { Genome } from "@interfaces/genome.interface";
import { getFireOrder, streamlineGenome, sortFunction } from "@utility/optimiseGenome";


describe("Utility - getFireOrder", () => {
    test("fireOrder", () => {
        const genome : Genome = {
            sensors: {
                XPos: {
                    bias: 1.679,
                    connections: {
                        MoveBwd: 0.3669,
                        "Neuron 1": 1.5729,
                        "Neuron 0": -0.8679,
                    },
                },
                Age: {
                    bias: -1.9818,
                    connections: {
                        "Neuron 0": -1.1456,
                        "Neuron 1": 3.6202,
                        MoveBwd: 0.5349,
                    },
                },
                YPos: {
                    bias: 1.0448,
                    connections: {
                        "Neuron 1": 0.5395,
                        MoveBwd: 2.1868,
                    },
                },
            },
            innerNeurons: {
                "Neuron 0": {
                    bias: -2.661,
                    connections: {
                        "Neuron 1": 2.0169,
                        MoveBwd: 2.9584,
                    },
                },
                "Neuron 1": {
                    bias: -1.7146,
                    connections: {
                        MoveBwd: -2.4429,
                    },
                },
            },
            actions: {
                MoveBwd: {
                    bias: 1.4586,
                },
            }
        };

        expect(getFireOrder(genome)).toEqual(
            ["Neuron 0", "Neuron 1"]
        );
    });
});

// TODO check every delete statement
describe("Utility - streamlineGenome", () => {
    test("remove useless sensor", () => {
        const genome : Genome = {
            sensors: {
                "XPos": {
                    bias: 1.679,
                    connections: {
                        "MoveBwd": 0.3669,
                        "Neuron 1": 1.5729,
                    }
                },
                "Age": {
                    bias: -1.9818,
                    connections: {}
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: -1.7146,
                    connections: {
                        "MoveBwd": -2.4429,
                    }
                }
            },
            actions: {
                "MoveBwd": {
                    bias: 1.4586,
                }
            },
        };

        const streamlinedGenome : Genome = streamlineGenome(genome);

        expect(streamlinedGenome.sensors.Age).toBeUndefined();

    });

});



// TODO test streamlineGenome()
// TODO test sortFunction()