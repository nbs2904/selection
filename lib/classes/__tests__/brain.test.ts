// * classes
import { Brain } from "@classes/brain";

// * interfaces
import { Sensation } from "@interfaces/sensation.interface";
import { Genome } from "@interfaces/genome.interface";

// * mocks
import { moveXMock } from "@classes/__mocks__/node.mock";



describe("Classes - Brain", () => {
    test("compute()", () => {
        const genome : Genome = {
            fireOrder: ["Neuron 1"],
            sensors: {
                "XPos": {
                    bias: 0,
                    connections: {
                        "Neuron 1": 5
                    }
                }
            },
            innerNeurons: {
                "Neuron 1": {
                    bias: 0,
                    connections: {
                        "MoveX": 5
                    }
                }
            },
            actions: {
                "MoveX": {
                    bias: 0
                }
            }
        };

        const sensation : Sensation = {
            x: 300
        };

        const spy = jest.fn().mockImplementation(moveXMock);


        const brain = new Brain(genome, sensation, {
            MoveX: spy.bind({sensation})
        });

        brain.compute();
        
        expect(spy).toHaveBeenCalledWith(1);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(sensation.x).toBe(301);
    });
});