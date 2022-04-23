// * interfaces
import { InnerNeuron } from "@classes/neuron";

// * classes
import { Sensation } from "@interfaces/sensation.interface";

// * sensors
import { xPosSensor, yPosSensor } from "@sensors/position.sensor";


const sensation : Sensation = {
    x: 100,
    y: 5,
};

const connectingNeuron : InnerNeuron = new InnerNeuron("connectingNeuron", 0, []);


describe("Sensors - Position Sensors", () => {
    test("xPosSensor", () => {
        const xPosSensorInstance = xPosSensor(0, sensation, [{ weight: 1, outputNeuron: connectingNeuron }]);

        xPosSensorInstance.fire();

        expect(xPosSensorInstance.id).toBe("XPos");
        expect(connectingNeuron.input).toBeGreaterThanOrEqual(-1);
        expect(connectingNeuron.input).toBeLessThanOrEqual(1);
    });

    test("yPosSensor", () => {
        const yPosSensorInstance = yPosSensor(0, sensation, [{ weight: 1, outputNeuron: connectingNeuron }]);

        yPosSensorInstance.fire();

        expect(yPosSensorInstance.id).toBe("YPos");
        expect(connectingNeuron.input).toBeGreaterThanOrEqual(-1);
        expect(connectingNeuron.input).toBeLessThanOrEqual(1);
    });
});