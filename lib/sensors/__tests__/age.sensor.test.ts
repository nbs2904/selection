// * interfaces
import { InnerNeuron } from "@classes/neuron";

// * classes
import { Sensation } from "@interfaces/sensation.interface";

// * sensors
import { ageSensor } from "@sensors/age.sensor";


const sensation : Sensation = {
    age: 5,
};

const connectingNeuron : InnerNeuron = new InnerNeuron("connectingNeuron", 0, []);

describe("Sensors - Age Sensor", () => {
    test("ageSensor", () => {
        const ageSensorInstance = ageSensor(0, sensation, [{ weight: 1, outputNeuron: connectingNeuron }]);

        ageSensorInstance.fire();

        expect(ageSensorInstance.id).toBe("Age");
        expect(connectingNeuron.input).toBeGreaterThanOrEqual(-1);
        expect(connectingNeuron.input).toBeLessThanOrEqual(1);
    });
});