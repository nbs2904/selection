import { SensorInput } from "./../interfaces/sensorInput.interface";
import { Color } from "@classes/color";
import { Neuron } from "@classes/neuron";
import { Node } from "@classes/node";
import { Position } from "@classes/position";
import { normalise } from "@functions/normalise";

const PXL_HEIGHT = process.env.PXL_HEIGH || 750;

const node : Node = new Node("123", new Position(0, 0), new Color(1, 2, 3));
const sensorInput : SensorInput = {
    x: node.x
}; 

export const xPositionSensor = new Neuron(sensorInput, 0, normalise(0, PXL_HEIGHT as number));

console.log("Node:", node.x);
xPositionSensor.fire(0);

// TODO node properties have be stored in an object/interface
node.position.x = 10;
sensorInput.x = 10;

console.log("Node:", node.x);
xPositionSensor.fire(0);


// export const yPositionSensor = new Neuron(node.y, 0, normalise(0, PXL_HEIGHT as number));
