// * interfaces
import { Potential } from "@classes/potential";
import { Genome } from "@interfaces/genome.interface";


// * utilities
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
                        "Neuron 1": 0.5395
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
                        "Neuron 2": -0.9078,
                        MoveBwd: -2.4429,
                    },
                },
                "Neuron 2": {
                    bias: -1.9078,
                    connections: {
                        "MoveBwd": -1.7146,
                    }
                }
            },
            actions: {
                MoveBwd: {
                    bias: 1.4586,
                },
            }
        };

        expect(getFireOrder(genome)).toEqual(
            [ "Neuron 0", "Neuron 1", "Neuron 2" ]
        );
    });
});

// TODO check every delete statement
describe("Utility - streamlineGenome", () => {
    test("Remove sensor with no connections", () => {
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

    test("Remove inner neuron with no outgoing connections and every connection to it", () => {
        const genome : Genome = {
            sensors: {
                "XPos": {
                    bias: 1.679,
                    connections: {
                        "MoveBwd": 0.3669,
                        "Neuron 2": 1.5729
                    }
                },
                "Age": {
                    bias: -1.9818,
                    connections: {
                        "MoveBwd": 0.3669,
                        "Neuron 1": 3.6202,
                    }
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: -1.7146,
                    connections: {}
                },
                "Neuron 2": {
                    bias: -1.7146,
                    connections: {
                        "MoveBwd": -2.4429,
                        "Neuron 1": -2.4429,
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

        expect(streamlinedGenome.innerNeurons["Neuron 1"]).toBeUndefined();
        expect(streamlinedGenome.sensors["Age"].connections["Neuron 1"]).toBeUndefined();
        expect(streamlinedGenome.innerNeurons["Neuron 2"].connections["Neuron 1"]).toBeUndefined();
    });

    test("Remove action with no connections to it", () => {
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
                    connections: {
                        "MoveBwd": 0.3669,
                    }
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
                },
                "MoveX": {
                    bias: 1.4586,
                }
            },
        };

        const streamlinedGenome : Genome = streamlineGenome(genome);

        expect(streamlinedGenome.actions["MoveX"]).toBeUndefined();
    });

    test("Remove useless sensor, inner neuron, and action at once", () => { 

        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 1.02,
                    }
                },
                "YPos": {
                    bias: -3.0,
                    connections: {
                        "Neuron 1": 1.02,
                    }
                },
                "XPos": {
                    bias: -3.0,
                    connections: {
                        "Neuron 1": 1.02,
                    }
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 2.01,
                    connections: {
                        "MoveY": 1.02,
                        "Neuron 2": 1.02,
                    }
                },
                "Neuron 2": {
                    bias: 2.01,
                    connections: {
                        "foo": 1.90
                    }
                }
            },
            actions: {
                "MoveY": {
                    bias: 3.98
                },
                "MoveX": {
                    bias: 2.91
                }
            }
        };

        const streamlinedGenome : Genome = streamlineGenome(genome);

        expect(streamlinedGenome.sensors["Age"]).toBeUndefined();
        expect(streamlinedGenome.innerNeurons["Neuron 1"].connections["Neuron 2"]).toBeUndefined();
        expect(streamlinedGenome.innerNeurons["Neuron 2"]).toBeUndefined();
        expect(streamlinedGenome.actions["MoveX"]).toBeUndefined();
    });

    test("Remove sensor which does not exist", () => {
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 1.02,
                        "Neuron 2": 1.02,
                    }
                },
                "foo": {
                    bias: 1,
                    connections: {
                        "Neuron 1": 1.02,
                        "Neuron 2": 1.02,
                    }
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 2.01,
                    connections: {
                        "MoveY": 1.02,
                    }
                },
                "Neuron 2": {
                    bias: 2.01,
                    connections: {
                        "MoveY": 1.02,
                    }
                }
            },
            actions: {
                "MoveY": {
                    bias: 3.98
                }
            }
        };

        const streamlinedGenome : Genome = streamlineGenome(genome);

        expect(streamlinedGenome.sensors["foo"]).toBeUndefined();
    });

    test("Remove action which does not exist", () => {        
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 1.02,
                        "Neuron 2": 1.02,
                    }
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 2.01,
                    connections: {
                        "MoveY": 1.02,
                    }
                },
                "Neuron 2": {
                    bias: 2.01,
                    connections: {
                        "MoveY": 1.02,
                    }
                }
            },
            actions: {
                "MoveY": {
                    bias: 3.98
                },
                "foo": {
                    bias: 1.02
                }
            }
        };

        const streamlinedGenome : Genome = streamlineGenome(genome);

        expect(streamlinedGenome.actions["foo"]).toBeUndefined();
    });

    test("Remove connection from sensor that is not included in genome", () => {       
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 1.02,
                        "MoveX": 1.02,
                    }
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 2.01,
                    connections: {
                        "MoveY": 1.02,
                    }
                }
            },
            actions: {
                "MoveY": {
                    bias: 3.98
                }
            }
        };

        const streamlinedGenome = streamlineGenome(genome);

        expect(streamlinedGenome.sensors["Age"].connections["MoveX"]).toBeUndefined();

    });
    

    test("Remove connection from neuron that is not included in genome", () => {       
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 1.02
                    }
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 2.01,
                    connections: {
                        "MoveY": 1.02,
                        "MoveX": 1.02,
                        "XPos": 1.02,
                    }
                }
            },
            actions: {
                "MoveY": {
                    bias: 3.98
                }
            }
        };

        const streamlinedGenome = streamlineGenome(genome);

        expect(streamlinedGenome.innerNeurons["Neuron 1"].connections["MoveX"]).toBeUndefined();
        expect(streamlinedGenome.innerNeurons["Neuron 1"].connections["XPos"]).toBeUndefined();
    });
});

describe("Utility - sortFunction", () => {
    test("Sort Neurons according to their potential", () => {
        const testArray = [
            {
                id: "Neuron 1",
                potential: new Potential(2, 3, 3)
            },
            {
                id: "Neuron 2",
                potential: new Potential(1, 2, 2)
            },
            {
                id: "Neuron 3",
                potential: new Potential(2, 4, 4)
            }
        ];

        testArray.sort(sortFunction);

        expect(testArray[0].id).toBe("Neuron 1");
        expect(testArray[1].id).toBe("Neuron 3");
        expect(testArray[2].id).toBe("Neuron 2");

    });
});