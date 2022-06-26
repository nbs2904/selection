import { Level } from "./../types/level.type";
import { randomGenome } from "@utility/randomGenome";
import { nanoid } from "nanoid";

// * logger
const logger = require("@config/logs/log4js").simulation;


// * classes
import { Cell } from "@classes/cell";
import { Node } from "@classes/node";
import { Position } from "@classes/position";

// * interfaces
import { NodeList } from "@interfaces/nodeList.interface";
import { sleep } from "@utility/sleep";
import { Socket } from "socket.io";

// * config
const MAX_GENERATION = +(process.env.MAX_GENERATION || 500) as number;
const STEPS_PER_GENERATION = +(process.env.STEPS_PER_GENERATION || 200) as number;
const FPS = +(process.env.FPS || 60) as number;
const GRID_SIZE = +(process.env.GRID_SIZE || 50) as number;
const POPULATION = +(process.env.POPULATION || 100) as number;

/**
 * Simulation class serves as a playing field for neurons.
 */
export class Simulation {
    /** @public Map of all [Nodes](./node.ts) in the simulation. The respective key is the Node's id. */
    public nodes : NodeList = {};

    /** @public 2D array of [Cells](./cell.ts) */
    public grid : Cell[][] = [];
    
    /** @public generation counter */
    public currentGeneration = 0;
    
    /** @public step counter */
    public currentStep = 0;
    
    /** @public counter of currently living Nodes */
    public livingNodesCount = 0;
    
    /** @public Defines a specific area of the grid. At the end of each generation each node outside of that area dies. */
    public level : Level;

    /**
     * @constructor
     * @param level - Defines a specific area of the grid. At the end of each generation each node outside of that area dies.
     */
    constructor (level : Level) {
        this.level = level;
        let tempArray : Cell[] = [];

        for(let i = 0; i < GRID_SIZE; i++){
            for(let j = 0; j < GRID_SIZE; j++){
                tempArray.push(new Cell());
            }

            this.grid.push(tempArray);
            tempArray = [];
        }

        tempArray = [];
    }

    // * function Overloading ---------------------------------------
    /**
     * @public
     * @param x - x coordinate of the [Cell](./cell.ts)
     * @param y - y coordinate of the [Cell](./cell.ts)
     * @returns whether [Cell](./cell.ts) is occupied
     */
    public cellOccupied(x : number, y : number) : boolean;

    /**
     * @public
     * @param position - [Position](./position.ts) of the node
     * @returns whether [Cell](./cell.ts) is occupied
     */
    public cellOccupied(position : Position) : boolean;
    

    public cellOccupied (xOrPosition : number | Position, y? : number) : boolean {
        if(typeof xOrPosition === "number") {
            if(xOrPosition < 0 || xOrPosition >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
                return true;
            }

            return this.grid[xOrPosition][y].occupied;
        } else {
            if(xOrPosition.x < 0 || xOrPosition.x >= GRID_SIZE || xOrPosition.y < 0 || xOrPosition.y >= GRID_SIZE) {
                return true;
            }

            return this.grid[xOrPosition.x][xOrPosition.y].occupied;
        }
    }
    // * ----------------------------------------------------------------


    /**
     * @public
     * Removes node from the [Cell](./cell.ts) it was before and updates new [Cell](./cell.ts)
     * @param node - old [Position](./position.ts) of [Node](./node.ts) is reset
     * @param newPosition - contains new [Position](./position.ts), [Node](./node.ts) shall be moved to
     * @returns whether [Position](./position.ts) of node was successfully updated
     */
    public updateNodePosition (node : Node, newPosition : Position) : boolean {
        if(this.cellOccupied(newPosition)) {
            return false;
        }

        this.grid[node.x][node.y].reset();
        this.grid[newPosition.x][newPosition.y].update(true, node.getColor, node.id);

        return true;
    }

    /**
     * @public
     * Getter function for current living population of simulation
     * @returns number of currently living Nodes
     */
    public getPopulation () : number {
        return this.livingNodesCount;
    }

    /**
     * Kills [Node](./node.ts) in front of the [Node](./node.ts) that invoked the function.
     * @param x - x coordinate of the node that plans on killing
     * @param y - y coordinate of the node that plans on killing
     * @param lastDirection - last direction of the node that plans on killing
     * @returns whether or not a node in front of the node that plans on killing was killed
     */
    public killNode (x : number, y : number, lastDirection : Position) : boolean {
        let nodeId = undefined;

        if (x + lastDirection.x >= 0 && x + lastDirection.x < GRID_SIZE && y + lastDirection.y >= 0 && y + lastDirection.y < GRID_SIZE) {
            nodeId = this.grid[x + lastDirection.x][y + lastDirection.y].occupied ? this.grid[x + lastDirection.x][y + lastDirection.y].nodeId : undefined;
        }

        if(nodeId === undefined) {
            return false;
        } else {
            delete this.nodes[nodeId];
            this.livingNodesCount--;

            this.grid[x + lastDirection.x][y + lastDirection.y].reset();

            return true;
        }
    }

    /**
     * @public
     * spawns a new [Node](./node.ts) onto the grid
     * @param node - to be spawned, if parameter is not provided a new [Node](./node.ts) will be generated
     * @returns spawned [Node](./node.ts)
     */
    public spawnNode (node? : Node) : Node {
        if (this.livingNodesCount >= GRID_SIZE * GRID_SIZE) {
            logger.warn("Grid seems to be overflowing.");
            throw Error("Grid is full");
        } else if (POPULATION < this.livingNodesCount) {
            logger.warn("Population is already at its maximum.");
            throw Error("Population is overflowing");
        }
    
        if (node) {
            if(this.cellOccupied(node.x, node.y)) {
                logger.warn("Cell already occupied.");
                throw new Error(`Cell at (${ node.x }, ${ node.y }) occupied.`);
            } else {
                node.updateNodePosition = this.updateNodePosition.bind(this);
                node.killNode = this.killNode.bind(this);
                node.population = this.getPopulation.bind(this);

                this.grid[node.x][node.y].update(true, node.getColor, node.id);
                this.nodes[node.id] = node;
                this.livingNodesCount++;
    
                return node;
            }
        } else {
            const id = nanoid(10);
                
            // ? assign random position, repeat until cell not occupied
            let position = new Position();
    
            while(this.cellOccupied(position)) {
                position = new Position();
            }
    
            const newNode = new Node(id, randomGenome(), position);
            newNode.updateNodePosition = this.updateNodePosition.bind(this);
            newNode.killNode = this.killNode.bind(this);
            newNode.population = this.getPopulation.bind(this);
                
            this.grid[newNode.x][newNode.y].update(true, newNode.getColor, newNode.id);
                
            this.nodes[newNode.id] = newNode;
            this.livingNodesCount++;
    
            return newNode;
        }

    }

    /**
     * @public
     * Invokes each [Node's](./node.ts) step function and updates the grid.
     * @param socket - socket to emit data to
     */
    public step (socket : Socket) {
        logger.info(`Generation: ${ this.currentGeneration }, Step: ${ this.currentStep }, Nodes: ${ this.livingNodesCount }`);
        if(this.livingNodesCount === 0) return;
        for (const [ , node ] of Object.entries(this.nodes)) {
            node.act();
        }
        socket.emit("updateNodeList", this.nodes);

        this.currentStep++;
    }

    /**
     * @public
     * Simulates entire generation by invoking each [Node's](./node.ts) step function times [STEPS_PER_GENERATION](../../config/env/.env).
     * @param socket - socket to emit data to
     */
    public async generation (socket : Socket) {
        const sleepInterval = Math.ceil(1 / FPS * 1000);
        for (let step = 0; step < STEPS_PER_GENERATION; step++) {
            this.step(socket);
            await sleep(sleepInterval);
            if(this.livingNodesCount === 0) return;
        }

        this.currentGeneration++;
        this.currentStep = 0;
    }

    /**
     * @public
     * Starts simulation
     * @param socket - socket to emit data to
     */
    public async run (socket : Socket) {
        // ? fill population with random Nodes until maximum is reached
        while (POPULATION > this.livingNodesCount) {
            try {
                this.spawnNode();
            } catch (err) {
                logger.error(err);
            }
        }

        for (let generation = 0; generation < MAX_GENERATION; generation++) {
            const offsprings : Node[] = [];
            await this.generation(socket);

            while (offsprings.length < POPULATION) {
                for (const [ ,node ] of Object.entries(this.nodes)) {
                    this.grid[node.x][node.y].reset();
                
                    if(this.nodeInsideBoundaries(node)) {
                        const offspring = node.reproduce(this.cellOccupied.bind(this));
                        offsprings.push(offspring);
                        // ? block cell before adding all offsprings at once
                        this.grid[offspring.x][offspring.y].update(true);
                    } else {
                        delete this.nodes[node.id];
                        this.livingNodesCount--;
                    }
                    
                    if (POPULATION === offsprings.length) {
                        break;
                    }
                }
                
                // ? if last generation has been reached, no need to spawn offsprings
                if (generation + 1 === MAX_GENERATION) {
                    break;
                }

                // ? if no node survived, break out of loop
                if (Object.entries(this.nodes).length === 0) {
                    break;
                }
            }


            if(offsprings.length === 0) {
                logger.warn("No survivors");
                socket.emit("updateNodeList", this.nodes);

                break;
            }
            
            this.nodes = {};
            this.livingNodesCount = 0;

            for (const offspring of offsprings) {
                try {
                    // ? unblock cell before adding offspring
                    this.grid[offspring.x][offspring.y].update(false);
                    this.spawnNode(offspring);
                } catch (err) {
                    logger.error(err);
                }
            }
        }

        logger.info("----------------------------------------------------");
        logger.info("Simulation finished, survivors:", this.livingNodesCount);

        this.storeGenomes();
    }

    /**
     * @private
     * @param node - [Node](./node.ts) to be checked
     * @returns boolean whether [Node](./node.ts) is inside the grid's boundaries
     */
    private nodeInsideBoundaries (node : Node) : boolean {
        for (const square of this.level) {
            if(square[0] <= node.x && node.x <= square[2] && square[1] <= node.y && node.y <= square[3]){
                return true;
            }
        }

        return false;
    }

    /**
     * @public
     * stores genome of every surviving node
     */
    public storeGenomes () {
        try {
            const simulationId = new Date().toISOString().replace(/T|\..+|:|-/g, "");
    
            for (const [ , node ] of Object.entries(this.nodes)) {
                node.storeGenome(simulationId);
            }

            logger.info("Genomes have been stored");
        } catch (err) {
            logger.error(err);
        }
    }
}