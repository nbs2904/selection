import fs = require("fs");

// * interfaces
import { Genome } from "@interfaces/genome.interface";

// * utility
import { saveGenome } from "@utility/saveGenome";


const fileName  = "test_utility_saveGenome";
const path  = "lib/genomes/src";

const genome : Genome = {
    sensors: {
        "Age": {
            bias: 0,
            connections: {
                "Neuron 1": 0.12
            }
        }
    },
    innerNeurons: {
        "Neuron 1": {
            bias: 0,
            connections: {
                "MoveBwd": 0.12
            }
        }
    },
    actions: {
        "MoveBwd": {
            bias: 0,
        }
    }
};


describe("Utility - saveGenome", () => {
    test("Save test genome with path", () => {
        saveGenome(genome, fileName, path);
        expect(fs.existsSync(`${ path }/${ fileName }.json`)).toBe(true);

        fs.unlinkSync(`${ path }/${ fileName }.json`);
    });

    test("Save genome without path", () => {
        saveGenome(genome, fileName);
        expect(fs.existsSync(`${ path }/${ fileName }.json`)).toBe(true);

        fs.unlinkSync(`${ path }/${ fileName }.json`);
    });
});