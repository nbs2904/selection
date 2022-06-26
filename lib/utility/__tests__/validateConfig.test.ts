import { Config } from "@interfaces/config.interface";
import { validateConfig } from "@utility/validateConfig";


describe("Utility - validateConfig", () => {
    test("Missing properties", () => {
        const config = {};

        expect(validateConfig(config as Config)).toBe(false);

        config["PORT"] = 3000;
        expect(validateConfig(config as Config)).toBe(false);

        config["PXL_HEIGHT"] = 100;
        expect(validateConfig(config as Config)).toBe(false);

        config["GRID_SIZE"] = 10;
        expect(validateConfig(config as Config)).toBe(false);

        config["FPS"] = 60;
        expect(validateConfig(config as Config)).toBe(false);

        config["POPULATION"] = 100;
        expect(validateConfig(config as Config)).toBe(false);

        config["STEPS_PER_GENERATION"] = 100;
        expect(validateConfig(config as Config)).toBe(false);

        config["MAX_GENERATION"] = 100;
        expect(validateConfig(config as Config)).toBe(false);

        config["MUTATE_PROBABILITY"] = 0.1;
        expect(validateConfig(config as Config)).toBe(false);

        config["MAX_NUMBER_INNER_NEURONS"] = 2;
        expect(validateConfig(config as Config)).toBe(false);

        config["MIN_NUMBER_GENOME_SIZE"] = 6;
        expect(validateConfig(config as Config)).toBe(false);

        config["MAX_NUMBER_GENOME_SIZE"] = 10;
        expect(validateConfig(config as Config)).toBe(false);

        config["MAX_CONNECTIONS"] = 4;
        expect(validateConfig(config as Config)).toBe(false);

        config["CONNECTION_WEIGHT_RANGE"] = 1;
        expect(validateConfig(config as Config)).toBe(false);

        config["BIAS_RANGE"] = 1;
        expect(validateConfig(config as Config)).toBe(false);

        config["LEVEL"] = "southHalf";
        expect(validateConfig(config as Config)).toBe(true);

    });

    test("No number properties", () => {
        const config : Config = {
            PORT: "NAN",
            PXL_HEIGHT: "NAN",
            GRID_SIZE: "NAN",
            FPS: "NAN",
            POPULATION: "NAN",
            STEPS_PER_GENERATION: "NAN",
            MAX_GENERATION: "NAN",
            MUTATE_PROBABILITY: "NAN",
            MAX_NUMBER_INNER_NEURONS: "NAN",
            MIN_NUMBER_GENOME_SIZE: "NAN",
            MAX_NUMBER_GENOME_SIZE: "NAN",
            MAX_CONNECTIONS: "NAN",
            CONNECTION_WEIGHT_RANGE: "NAN",
            BIAS_RANGE: "NAN",
            LEVEL: "northHalf"
        };

        expect(validateConfig(config)).toBe(false);

        config.PORT = 3000;
        expect(validateConfig(config)).toBe(false);

        config.PXL_HEIGHT = 100;
        expect(validateConfig(config)).toBe(false);

        config.GRID_SIZE = 10;
        expect(validateConfig(config)).toBe(false);

        config.FPS = 60;
        expect(validateConfig(config)).toBe(false);

        config.POPULATION = 100;
        expect(validateConfig(config)).toBe(false);

        config.STEPS_PER_GENERATION = 100;
        expect(validateConfig(config)).toBe(false);

        config.MAX_GENERATION = 100;
        expect(validateConfig(config)).toBe(false);

        config.MUTATE_PROBABILITY = 0.5;
        expect(validateConfig(config)).toBe(false);

        config.MAX_NUMBER_INNER_NEURONS = 8;
        expect(validateConfig(config)).toBe(false);

        config.MIN_NUMBER_GENOME_SIZE = 10;
        expect(validateConfig(config)).toBe(false);

        config.MAX_NUMBER_GENOME_SIZE = 10;
        expect(validateConfig(config)).toBe(false);

        config.MAX_CONNECTIONS = 10;
        expect(validateConfig(config)).toBe(false);

        config.CONNECTION_WEIGHT_RANGE = 10;
        expect(validateConfig(config)).toBe(false);

        config.BIAS_RANGE = 10;
        expect(validateConfig(config)).toBe(true);
    });

    test("Invalid properties", () => {
        const config : Config = {
            PORT: 3000,
            PXL_HEIGHT: 500,
            GRID_SIZE: 10,
            FPS: 60,
            POPULATION: 100,
            STEPS_PER_GENERATION: 100,
            MAX_GENERATION: 100,
            MUTATE_PROBABILITY: 0.01,
            MAX_NUMBER_INNER_NEURONS: 8,
            MIN_NUMBER_GENOME_SIZE: 10,
            MAX_NUMBER_GENOME_SIZE: 10,
            MAX_CONNECTIONS: 10,
            CONNECTION_WEIGHT_RANGE: 10,
            BIAS_RANGE: 10,
            LEVEL: "northHalf"
        };

        expect(validateConfig(config)).toBe(true);
        
        config.MIN_NUMBER_GENOME_SIZE = 1;
        expect(validateConfig(config)).toBe(false);
        
        config.MIN_NUMBER_GENOME_SIZE = 11;
        expect(validateConfig(config)).toBe(false);
        
        config.MIN_NUMBER_GENOME_SIZE = 10;
        config.MAX_NUMBER_INNER_NEURONS = 10;
        expect(validateConfig(config)).toBe(false);
        
        config.MAX_NUMBER_INNER_NEURONS = 8;
        config.MAX_NUMBER_GENOME_SIZE = 110;
        config.MIN_NUMBER_GENOME_SIZE =  100;
        expect(validateConfig(config)).toBe(false);  
        
        config.LEVEL = "";
        expect(validateConfig(config)).toBe(false);
    });
});