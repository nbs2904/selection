// * classes
import { InnerNeuron } from "@classes/neuron";
import { Position } from "@classes/position";

// * functions
import { ReLU } from "@functions/ReLU";

// * interfaces
import { Sensation } from "@interfaces/sensation.interface";

// * sensors
import { Sensor } from "@sensors/sensor";


describe("Sensors - Base Class", () => {
    test("fire()", () => {
        const sensation : Sensation = {
            x: 10,
            y: 5,
            age: 100,
            lastDirection: new Position(1, 0)
        };

        const connectingNeuron : InnerNeuron = new InnerNeuron("connectingNeuron", 0, []);
        const sensor : Sensor = new Sensor("testSensor", 0, sensation, [ "x", "y" ], ReLU, [ { weight: 1, outputNeuron: connectingNeuron } ]);

        sensor.fire();

        expect(sensor.id).toBe("testSensor");
        expect(connectingNeuron.input).toBe(15);
    });
});