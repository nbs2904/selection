import { Level } from "./../types/level.type";
import { randomGenome } from "@utility/randomGenome";
import { nanoid } from "nanoid";

// * logger
const logger = require("@config/log4js").simulation;

// * errors
import { CellOccupied } from "@errors/cell.error";

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
const STEPS_PER_GENERATION = +(process.env.STEPS_PER_GENERATION || 500) as number;
const FPS = +(process.env.FPS || 60) as number;
const GRID_SIZE = +(process.env.GRID_SIZE || 50) as number;
const POPULATION = +(process.env.POPULATION || 100) as number;

/**
 * Simulation class serves as a playing field for neurons.
 * @property {@link NodeList} nodes - Map of all nodes in the simulation. The respective key is the node's id.
 * @property {@link Cell Cell[][]} grid - 2D array of cells.
 * @property {number} currentGeneration - Current generation of the simulation. Number of steps in one generation is defined in as STEPS_PER_GENERATION (env).
 * @property {number} currentStep - Current step of a generation. It increases by one after every living node has taken one step.
 * @property {number} livingNodesCount - Number of living nodes in the simulation.
 * @property {@link Level} - Defines a specific area of the grid. At the end of each generation each node outside of that area dies.
 */
export class Simulation {
    public nodes : NodeList = {};
    public grid : Cell[][] = [];
    public currentGeneration = 0;
    public currentStep = 0;
    public livingNodesCount = 0;
    public level : Level;

    constructor(level : Level) {
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
     * @param x - x coordinate of the cell
     * @param y - y coordinate of the cell
     * @returns {boolean} whether cell is occupied
     */
    public cellOccupied(x : number, y : number) : boolean;

    /**
     * @param position - position of the node
     * @returns {boolean} whether cell is occupied
     */
    public cellOccupied(position : Position) : boolean;
    
    // TODO Test cases:
    // TODO cell occupied
    // TODO node off-grid
    // TODO each with coordinates and position

    // TODO assess if function should not throw error instead of returning true
    public cellOccupied(xOrPosition : any, y? : number) : boolean {
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
     * removes node from the cell it was before and updates new cell
     * @param node - contains the new position to update new cell
     * @param newPosition - contains new position node shall be moved to
     * @returns {boolean} whether position of node was successfully updated
     */
    public updateNodePosition(node : Node, newPosition : Position) : boolean {
        if(this.cellOccupied(newPosition)) {
            return false;
        }

        this.grid[node.x][node.y].reset();
        this.grid[newPosition.x][newPosition.y].update(true, node.getColor);

        return true;
    }

    /**
     * spawns a new node onto the grid
     * @param node to be spawned, if parameter is not provided a new node will be generated
     * @returns spawned node
     */
    public spawnNode(node? : Node) : Node {
        if (this.livingNodesCount === GRID_SIZE * GRID_SIZE) {
            logger.warn("Grid seems to be overflowing.");
            throw Error("Grid is full");
        } else if (POPULATION < this.livingNodesCount) {
            logger.warn("Population is already at its maximum.");
            throw Error("Population is overflowing");
        }
    
        if (node) {
            if(this.cellOccupied(node.x, node.y)) {
                logger.warn("Cell already occupied.");
                throw new CellOccupied(`Cell at (${node.x}, ${node.y}) occupied.`);
            } else {
                node.updateNodePosition = this.updateNodePosition.bind(this);
                this.grid[node.x][node.y].update(true, node.getColor);
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
                
            this.grid[newNode.x][newNode.y].update(true, newNode.getColor);
                
            this.nodes[newNode.id] = newNode;
            this.livingNodesCount++;
    
            return newNode;
        }

    }

    /**
     * Invokes each node's step function and updates the grid.
     * @param socket - socket to emit data to
     */
    public step(socket : Socket) {
        logger.info(`Generation: ${this.currentGeneration}, Step: ${this.currentStep}, Nodes: ${this.livingNodesCount}`);
        for (const [, node] of Object.entries(this.nodes)) {
            node.act();
        }
        socket.emit("updateNodeList", this.nodes);

        this.currentStep++;
    }

    /**
     * Simulates entire generation by invoking each node's step function times STEPS_PER_GENERATION.
     * @param socket - socket to emit data to
     */
    public async generation(socket : Socket) {
        const sleepInterval = Math.ceil(1 / FPS * 1000);
        for (let step = 0; step < STEPS_PER_GENERATION; step++) {
            this.step(socket);
            await sleep(sleepInterval);
        }

        this.currentGeneration++;
        this.currentStep = 0;
    }

    /**
     * Starts simulation
     * @param socket - socket to emit data to
     */
    public async run(socket : Socket) {
        // ? fill population with random Nodes until maximum is reached
        while (POPULATION > this.livingNodesCount) {
            try {
                this.spawnNode();
            } catch (err) {
                logger.error(err);
            }
        }

        // TODO determine how many offsprings can spawn
        for (let generation = 0; generation < MAX_GENERATION; generation++) {
            const offsprings : Node[] = [];
            await this.generation(socket);

            for (const [,node] of Object.entries(this.nodes)) {
                this.grid[node.x][node.y].reset();
                
                if(this.nodeInsideBoundaries(node)) {
                    const offspring = node.reproduce(this.cellOccupied.bind(this));
                    offsprings.push(offspring);
                    // ? block cell before adding all offsprings at once
                    this.grid[offspring.x][offspring.y].update(true);
                }

                delete this.nodes[node.id];
                this.livingNodesCount--;
            }

            if(offsprings.length === 0) {
                logger.warn("No survivors");
                socket.emit("updateNodeList", this.nodes);

                break;
            }

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
     * @param node - node to be checked
     * @returns boolean whether node is inside the grid's boundaries
     */
    private nodeInsideBoundaries(node : Node) : boolean {
        for (const square of this.level) {
            if(square[0] <= node.x && node.x <= square[2] && square[1] <= node.y && node.y <= square[3]){
                return true;
            }
        }

        return false;
    }

    /**
     * stores genome of every surviving node
     */
    public storeGenomes() {
        try {
            const simulationId = new Date().toISOString().replace(/T|\..+|:|-/g, "");
    
            for (const [, node] of Object.entries(this.nodes)) {
                node.storeGenome(simulationId);
            }

            logger.info("Genomes have been stored");
        } catch (err) {
            logger.error(err);
        }
    }
}