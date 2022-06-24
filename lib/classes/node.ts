// * utility
import { streamlineGenome } from "@utility/optimiseGenome";
import { randomGenome } from "@utility/randomGenome";
import { randomFloat, randomInteger } from "@utility/randomNumber";

// * actions
import actionNames from "@actions/names.json";

// * sensors
import sensorNames from "@sensors/names.json";

// * classes
import { Brain } from "@classes/brain";
import { Position } from "@classes/position";
import { Color } from "@classes/color";

// * interfaces
import { Sensation } from "@interfaces/sensation.interface";
import { Genome } from "@interfaces/genome.interface";
import { validateGenome } from "@utility/validateGenome";
import { nanoid } from "nanoid";
import { saveGenome } from "@utility/saveGenome";

// * logger
const logger = require("@config/logs/log4js").node;

// * config
const GRID_SIZE = +(process.env.GRID_SIZE || 50) as number;
const MUTATE_PROBABILITY = +(process.env.MUTATE_PROBABILITY || 0.1) as number;
const CONNECTION_WEIGHT_RANGE = +(process.env.CONNECTION_WEIGHT_RANGE || 50) as number;
const BIAS_RANGE = +(process.env.BIAS_RANGE || 50) as number;
const MAX_NUMBER_INNER_NEURONS = +(process.env.MAX_NUMBER_INNER_NEURONS || 4) as number;


/**
 * Instances respresent an independent entity that can be spawned onto a grid.
 */
export class Node {
    /** @public unique identifier for Node instance */
    public id : string;

    /** @public determines how many steps a Node survives */
    public lifespan = +process.env.STEP_PER_GENERATION || 200;

    /** @public function which is bound to the simulation and is called every step to update position */
    public updateNodePosition : (node : Node, newPosition : Position) => boolean;

    /** @public function which is bound to the simulation and is called when kill action function is invoked */
    public killNode : (x : number, y: number, lastDirection : Position) => boolean;
    
    /** 
     * @private List of sensations that the node is experiencing 
     * @see [Sensation](../interfaces/sensation.interface.ts)
    */
    private sensation : Sensation;

    /** @private [Genome](../interfaces/genome.interface.ts) of the Node */
    private genome : Genome;

    /** @private [Color](./color.ts) of the Node */
    private color : Color;

    /** @private [Brain](./brain.ts) of the Node */
    private brain : Brain;

    /**
     * @constructor
     * @param id - unique identifier for Node instance
     * @param genome - [Genome](../interfaces/genome.interface.ts) of the Node
     * @param position - [Position](./position.ts) of the Node (set randomnly if not provided)
     * @param color - [Color](./color.ts) of the Node (set randomnly if not provided)
     */
    public constructor (id : string, genome? : Genome, position? : Position, color? : Color) {
        this.id = id;
        this.color = color || new Color(randomInteger(255), randomInteger(255), randomInteger(255));

        // ? init last direction randomly
        const lastDirectionInit = new Position(randomInteger(1, -1), 0);

        if (lastDirectionInit.x === 0) {
            while(lastDirectionInit.y === 0) {
                lastDirectionInit.y = randomInteger(1, -1);
            }
        }

        this.sensation = {
            age: 0,
            x: position !== undefined ? position.x : randomInteger(GRID_SIZE - 1),
            y: position !== undefined ? position.y : randomInteger(GRID_SIZE - 1),
            lastDirection: lastDirectionInit
        };

        this.genome = genome || randomGenome();

        // ? initialise Brain
        this.brain = new Brain(this.genome, this.sensation, {
            MoveX: this.moveX.bind(this),
            MoveY: this.moveY.bind(this),
            MoveFwd: this.moveFwd.bind(this),
            MoveBwd: this.moveBwd.bind(this),
            MoveL: this.moveL.bind(this),
            MoveR: this.moveR.bind(this),
            MoveN: this.moveN.bind(this),
            MoveS: this.moveS.bind(this),
            MoveE: this.moveE.bind(this),
            MoveW: this.moveW.bind(this),
            MoveRnd: this.moveRnd.bind(this),
            Kill: this.kill.bind(this)
        });
    }

    /**
     * @public
     * Getter function for x-coordinate
     * @returns x-coordinate
     */

    public get x () : number {
        return this.sensation.x;
    }

    /**
     * @public
     * Getter function for y-coordinate
     * @returns y-coordinate
     */
    public get y () : number {
        return this.sensation.y;
    }
    
    /**
     * @public
     * Getter function to receive color of node
     * @returns Color
     */
    public get getColor () : Color {
        return this.color;
    }

    /**
     * @public
     * Getter function for age of node
     * @returns age
     */
    public get getAge () : number {
        return this.sensation.age;
    }

    /**
     * @public
     * Getter function of [Sensation](../interfaces/sensation.interface.ts) object of node
     * @returns Sensation
     */
    public get getSensation () : Sensation {
        return this.sensation;
    }

    /**
     * @public
     * Invokes brain.compute() and increases age of node by one
     */
    public act () {
        this.brain.compute();
        this.sensation.age++;
    }
    
    
    /**
     * @public
     * moves node along x axis by one step
     * @param direction - can be either 1 or -1
     */
    public async moveX (direction : number) {
        if(direction != 1 && direction != -1) {
            logger.error("Input of function moveX must be either 1 or -1.");
            throw new Error("Input of function moveX must be either 1 or -1.");
        }

        const newPosition = new Position(this.x + direction, this.y);

        if(this.updateNodePosition(this, newPosition)) {
            this.sensation.x = newPosition.x;
            this.sensation.y = newPosition.y;

            // ? update lastDirection
            this.sensation.lastDirection = new Position(direction, 0);
        }
    }
       
    /**
     * @public
     * moves node along y axis by one step
     * @param direction - can be either 1 or -1
     */
    public async moveY (direction : number) {
        if(direction != 1 && direction != -1) {
            logger.error("Input of function moveY must be either 1 or -1.");
            throw new Error("Input of function moveY must be either 1 or -1.");
        }
        
        const newPosition = new Position(this.x, this.y + direction);

        if(this.updateNodePosition(this, newPosition)) {
            this.sensation.x = newPosition.x;
            this.sensation.y = newPosition.y;

            // ? update lastDirection
            this.sensation.lastDirection = new Position(0, direction);
        }
    }

    /**
     * @public
     * moves node in the direction it moved during the last step
     */
    public async moveFwd () {
        if(this.sensation.lastDirection.x && this.sensation.lastDirection.y) {
            throw new Error(`lastDirection must only point in one direction: { x: ${ this.sensation.lastDirection.x }, y: ${ this.sensation.lastDirection.y } }`);
        }

        const newPosition = new Position(this.x + this.sensation.lastDirection.x, this.y + this.sensation.lastDirection.y);

        if(this.updateNodePosition(this, newPosition)) {
            this.sensation.x = newPosition.x;
            this.sensation.y = newPosition.y;
        }
    }

    /**
     * @public
     * moves node in the opposite direction it moved during the last step
     */
    public async moveBwd () {
        if(this.sensation.lastDirection.x && this.sensation.lastDirection.y) {
            throw new Error(`lastDirection must only point in one direction: { x: ${ this.sensation.lastDirection.x }, y: ${ this.sensation.lastDirection.y } }`);
        }

        const newPosition = new Position(this.x - this.sensation.lastDirection.x, this.y - this.sensation.lastDirection.y);

        if(this.updateNodePosition(this, newPosition)) {
            this.sensation.x = newPosition.x;
            this.sensation.y = newPosition.y;
        }
    }

    /**
     * @public
     * moves node in a random direction
     */
    public async moveRnd () {
        const axis = randomInteger(1);
        let direction = randomInteger(1);

        let xDirection = 0;
        let yDirection = 0;

        // ? adjust direction to negative value
        if(direction === 0) {
            direction = -1;
        }

        // ? x axis
        if(axis === 1) {
            xDirection = direction;
        // ? y axis
        } else {
            yDirection = direction;
        }

        const newPosition = new Position(this.x + xDirection, this.y + yDirection);

        if(this.updateNodePosition(this, newPosition)) {
            this.sensation.x = newPosition.x;
            this.sensation.y = newPosition.y;

            // ? update lastDirection
            this.sensation.lastDirection = new Position(xDirection, yDirection);
        }
    }

    /**
     * @public
     * moves node left relative to last direction
     */
    public async moveL () {
        if (this.sensation.lastDirection.x === 0) {
            if (this.sensation.lastDirection.y === 1) {
                this.moveX(-1);
            } else if (this.sensation.lastDirection.y === -1) {
                this.moveX(1);
            } else {
                throw new Error(`lastDirection must only point in one direction: { x: ${ this.sensation.lastDirection.x }, y: ${ this.sensation.lastDirection.y } }`);
            }
        } else if (this.sensation.lastDirection.y === 0) {
            if (this.sensation.lastDirection.x === 1) {
                this.moveY(1);
            } else if (this.sensation.lastDirection.x === -1) {
                this.moveY(-1);
            } else {
                throw new Error(`lastDirection must only point in one direction: { x: ${ this.sensation.lastDirection.x }, y: ${ this.sensation.lastDirection.y } }`);
            }
        }
    }

    /**
     * @public
     * moves node right relative to last direction
     */
    public async moveR () {
        if (this.sensation.lastDirection.x === 0) {
            if (this.sensation.lastDirection.y === 1) {
                this.moveX(1);
            } else if (this.sensation.lastDirection.y === -1) {
                this.moveX(-1);
            } else {
                throw new Error(`lastDirection must only point in one direction: { x: ${ this.sensation.lastDirection.x }, y: ${ this.sensation.lastDirection.y } }`);
            }
        } else if (this.sensation.lastDirection.y === 0) {
            if (this.sensation.lastDirection.x === 1) {
                this.moveY(-1);
            } else if (this.sensation.lastDirection.x === -1) {
                this.moveY(1);
            } else {
                throw new Error(`lastDirection must only point in one direction: { x: ${ this.sensation.lastDirection.x }, y: ${ this.sensation.lastDirection.y } }`);
            }
        }
    }

    /**
     * @public
     * moves node north
     */
    public async moveN () {
        this.moveY(1);
    }

    /**
     * @public
     * moves node south
     */
    public async moveS () {
        this.moveY(-1);
    }

    /**
     * @public
     * moves node east
     */
    public async moveE () {
        this.moveX(1);
    }

    /**
     * @public
     * moves node west
     */
    public async moveW () {
        this.moveX(-1);
    }

    /**
     * @public
     * kills node if one is right in front of it
     * if node has not moved yet and therefore has no set direction, a random direction is set.
     */
    public async kill (){
        this.killNode(this.sensation.x, this.sensation.y, this.sensation.lastDirection);
    }

    /**
     * @public
     * Copies genome when a new offspring is spawned. 
     * The [MUTATE_PROBABILITY](../../config/env/.env) determines how likley a mutation will occur during every step.
     */
    public copyGenome () : { genome : Genome, hasMutated : boolean } {
        // TODO add another connection by chance

        let genomeCopy : Genome = {
            sensors: {},
            innerNeurons: {},
            actions: {}
        };

        // ? copy sensors
        for (const [ sensorName, sensor ] of Object.entries(this.genome.sensors)) {
            const sensorNameCopy = randomInteger(1 / MUTATE_PROBABILITY) ? sensorName : sensorNames[randomInteger(sensorNames.length - 1, 0)];

            if(genomeCopy.sensors[sensorNameCopy] === undefined) {
                genomeCopy.sensors[sensorNameCopy] = {bias: 0, connections: {}};
            }

            genomeCopy.sensors[sensorNameCopy].bias = randomInteger(1 / MUTATE_PROBABILITY) ? sensor.bias : randomFloat(BIAS_RANGE / 2, BIAS_RANGE / 2 * (-1));

            for (const [ connectionName, weight ] of Object.entries(this.genome.sensors[sensorName].connections)) {
                let connectionNameCopy : string;

                if(randomInteger(1 / MUTATE_PROBABILITY)) {
                    connectionNameCopy = connectionName;
                } else {
                    if(randomInteger(1) === 0) {
                        connectionNameCopy = `Neuron ${ randomInteger(MAX_NUMBER_INNER_NEURONS - 1, 0) }`;
                    } else {
                        connectionNameCopy = actionNames[randomInteger(actionNames.length - 1, 0)];
                    }
                }
                
                genomeCopy.sensors[sensorNameCopy].connections[connectionNameCopy] = randomInteger(1 / MUTATE_PROBABILITY) ? weight : randomFloat(CONNECTION_WEIGHT_RANGE / 2, CONNECTION_WEIGHT_RANGE / 2 * (-1));
            }
        }

        // ? copy inner neurons
        for (const [ neuronName, neuron ] of Object.entries(this.genome.innerNeurons)) {
            const neuronNameCopy = randomInteger(1 / MUTATE_PROBABILITY) ? neuronName : `Neuron ${ randomInteger(MAX_NUMBER_INNER_NEURONS - 1, 0) }`;

            if(genomeCopy.innerNeurons[neuronNameCopy] === undefined) {
                genomeCopy.innerNeurons[neuronNameCopy] = {bias: 0, connections: {}};
            }

            genomeCopy.innerNeurons[neuronNameCopy].bias = randomInteger(1 / MUTATE_PROBABILITY) ? neuron.bias : randomFloat(BIAS_RANGE / 2, BIAS_RANGE / 2 * (-1));

            for (const [ connectionName, weight ] of Object.entries(this.genome.innerNeurons[neuronName].connections)) {
                let connectionNameCopy : string;

                if(randomInteger(1 / MUTATE_PROBABILITY)) {
                    connectionNameCopy = connectionName;
                } else {
                    if(randomInteger(1) === 0) {
                        connectionNameCopy = `Neuron ${ randomInteger(MAX_NUMBER_INNER_NEURONS - 1, 0) }`;
                    } else {
                        connectionNameCopy = actionNames[randomInteger(actionNames.length - 1, 0)];
                    }
                }
                
                genomeCopy.innerNeurons[neuronNameCopy].connections[connectionNameCopy] = randomInteger(1 / MUTATE_PROBABILITY) ? weight : randomFloat(CONNECTION_WEIGHT_RANGE / 2, CONNECTION_WEIGHT_RANGE / 2 * (-1));
            }
        }

        // ? copy actions
        for (const [ actionName, action ] of Object.entries(this.genome.actions)) {
            const actionNameCopy = randomInteger(1 / MUTATE_PROBABILITY) ? actionName : actionNames[randomInteger(actionNames.length - 1, 0)];

            if (genomeCopy.actions[actionNameCopy] === undefined) {
                genomeCopy.actions[actionNameCopy] = {bias: 0};
            }

            genomeCopy.actions[actionNameCopy].bias = randomInteger(1 / MUTATE_PROBABILITY) ? action.bias : randomFloat(BIAS_RANGE / 2, BIAS_RANGE / 2 * (-1));
        }

        
        // ? arbitrary connections might have been added due to mutation
        // ? check for connections to neurons/actions that do not exist yet and add them respectively

        // ? check connections of sensors
        for (const [ , sensor ] of Object.entries(this.genome.sensors)) {
            for (const [ connection ] of Object.entries(sensor.connections)) {
                if(!Object.keys(this.genome.innerNeurons).includes(connection) && !Object.keys(this.genome.actions).includes(connection)) {
                    if(actionNames.includes(connection)) {
                        this.genome.actions[connection] = {
                            bias: randomFloat(CONNECTION_WEIGHT_RANGE / 2, CONNECTION_WEIGHT_RANGE / 2 * (-1))
                        };
                    } else {
                        this.genome.innerNeurons[connection] = {
                            bias: randomFloat(CONNECTION_WEIGHT_RANGE / 2, CONNECTION_WEIGHT_RANGE / 2 * (-1)),
                            connections: {}
                        };
                    }
                }
            }
        }

        // ? check connections of inner neurons
        for (const [ , neuron ] of Object.entries(this.genome.innerNeurons)) {
            for (const [ connection ] of Object.entries(neuron.connections)) {
                if(!Object.keys(this.genome.innerNeurons).includes(connection) && !Object.keys(this.genome.actions).includes(connection)) {
                    if(actionNames.includes(connection)) {
                        this.genome.actions[connection] = {
                            bias: randomFloat(CONNECTION_WEIGHT_RANGE / 2, CONNECTION_WEIGHT_RANGE / 2 * (-1))
                        };
                    } else {
                        this.genome.innerNeurons[connection] = {
                            bias: randomFloat(CONNECTION_WEIGHT_RANGE / 2, CONNECTION_WEIGHT_RANGE / 2 * (-1)),
                            connections: {}
                        };
                    }                
                }
            }
        }
        
        genomeCopy = streamlineGenome(genomeCopy);

        if(JSON.stringify(this.genome) !== JSON.stringify(genomeCopy)) {

            if(validateGenome(genomeCopy)) {
                return { genome: genomeCopy, hasMutated: true};
            }

        }

        return { genome: this.genome, hasMutated: false };
    
    }

    /**
     * @public
     * Generates an offspring.
     * @param cellOccupied - Method is bound to a simulation instance, to check whether a cell is already occupied before spawning the offspring onto the grid.
     * @returns offspring as a {@link Node} instance
     */
    public reproduce (cellOccupied : (position : Position) => boolean) : Node {
        const id = nanoid(10);
        const { genome: genomeCopy, hasMutated: hasMutated } = this.copyGenome();

        let position = new Position();

        while(cellOccupied(position)) {
            position = new Position();
        }

        const color = this.getColor;

        if (hasMutated) {
            logger.info(`Genome of Node #${ this.id } has mutated.`);

            // ? selection primary color randomly
            const primaryColor = randomInteger(2);
            const colorStepSize = 10;

            if(primaryColor === 0) {
                color.r = (color.r + colorStepSize) % 256;
            } else if(primaryColor === 1) {
                color.g = (color.g + colorStepSize) % 256;
            } else if(primaryColor === 2) {
                color.b = (color.b + colorStepSize) % 256;
            }
        }

        return new Node(id, genomeCopy, position, color);
    }

    /**
     * @public
     * Stores the genome of the node as a JSON file.
     * @param simulationId - [Genome](../interfaces/genome.interface.ts) is stored in a folder with the name of the simulation Id.
     */
    public storeGenome (simulationId : string) {
        saveGenome(this.genome, this.id, `lib/simulations/${ simulationId }`);
    }
}