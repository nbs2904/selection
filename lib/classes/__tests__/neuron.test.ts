// * classes
import { InnerNeuron } from "@classes/neuron";


describe("Classes - InnerNeuron", () => {
    test("Initialize InnerNeuron Instance", () => {
        const neuron = new InnerNeuron("test", 0);

        expect(neuron.id).toBe("test");
        expect(typeof neuron.id).toBe("string");
    });

    test("fire()", () => {
        const receivingNeuron = new InnerNeuron("receivingNeuron", 0);
        const initialNeuron = new InnerNeuron("initNeuron", 0, [ {
            outputNeuron: receivingNeuron,
            weight: 1
        } ]);
        
        initialNeuron.input = 1;
        initialNeuron.fire();

        expect(receivingNeuron.input).toBeGreaterThan(-1);
        expect(receivingNeuron.input).toBeLessThan(1);
    });
});