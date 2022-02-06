import { SensorInput } from "./../interfaces/sensorInput.interface";
import { Connection } from "@interfaces/connection.interface";

export class Neuron {
    private input : SensorInput;
    private bias : number;
    private output : number;
    private activationFunction : (input : number) => number;
    private connections : Connection[];

    public constructor(input? : SensorInput, bias? : number, activationFunction? : (input : number) => number, connections? : Connection[]) {
        this.input = input;
        this.bias = bias || 0;
        this.activationFunction = activationFunction || function (input :number) { return input; };
        this.connections = connections || [];

        // TODO initialise bias at random value if undefined
        // TODO jsdoc every constructor
    }

    public fire(input : number) {
        // TODO calculate input and loop through connections to give input to connected neurons
        console.log("Neuron Fire:", this.input.x);
        
        // console.log(this.activationFunction(this.input));        
    }
}

// ? connection weight: -4 to 4
// ? sensor output: 0 to 1
// ? neuron output - tanh(sum(input)) (inner and outer action neuron): -1 to 1
