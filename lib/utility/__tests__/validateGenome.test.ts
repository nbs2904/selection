import { Genome } from "@interfaces/genome.interface";
import { validateGenome } from "@utility/validateGenome";



describe("Utility - validateGenome", () => {
    test("Too many inner neurons", () => {
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 3.127,
                        "Neuron 2": 2
                    },
                },
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 2": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 3": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 4": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 5": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
            },
            actions: {
                "MoveX": {
                    bias: 0
                }
            }
        };

        expect(validateGenome(genome)).toBe(false);
    });

    test("Genome too big", () => {        
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 3.127,
                        "Neuron 2": 2
                    },
                },
                "XPos": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 3.127,
                        "Neuron 2": 2
                    },
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 2": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 3": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 4": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                }
            },
            actions: {
                "MoveX": {
                    bias: 0
                },
                "MoveY": {
                    bias: 0
                },
                "MoveBwd": {
                    bias: 0
                },
                "MoveFwd": {
                    bias: 0
                },
                "MoveRnd": {
                    bias: 0
                }
            }
        };

        expect(validateGenome(genome)).toBe(false);
    });

    test("Genome too small", () => {       
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 3.127,
                        "Neuron 2": 2
                    },
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                }
            },
            actions: {
                "MoveX": {
                    bias: 0
                }
            }
        };

        expect(validateGenome(genome)).toBe(false);
    });

    test("Sensor has too many connections", () => {
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 3.127,
                        "Neuron 2": 2,
                        "Neuron 3": 2,
                        "Neuron 4": 2,
                        "MoveX": 2,
                    },
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 2": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 3": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 4": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                }
            },
            actions: {
                "MoveX": {
                    bias: 0
                }
            }
        };

        expect(validateGenome(genome)).toBe(false);
    });

    test("Inner neuron has too many connetcions", () => {     
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 3.127
                    },
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                        "Neuron 3": 2,
                        "Neuron 4": 2,
                        "MoveX": 2,
                        "MoveY": 2
                    }
                },
                "Neuron 2": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 3": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 4": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                }
            },
            actions: {
                "MoveX": {
                    bias: 0
                },
                "MoveY": {
                    bias: 0
                }
            }
        };

        expect(validateGenome(genome)).toBe(false);
    });

    test("Valid genome", () => {
        const genome : Genome = {
            sensors: {
                "Age": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 3.127
                    },
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                        "Neuron 3": 2,
                        "Neuron 4": 2
                    }
                },
                "Neuron 2": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 3": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                },
                "Neuron 4": {
                    bias: 0,
                    connections: {
                        "Neuron 2": 3.127,
                    }
                }
            },
            actions: {
                "MoveX": {
                    bias: 0
                },
                "MoveY": {
                    bias: 0
                }
            }
        };

        expect(validateGenome(genome)).toBe(true);
    });
});