require("dotenv").config({path: __dirname + "/.env"});
const express = require("express");
const logger = require("./config/logger").logger;

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

// * config
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const GRID_SIZE = process.env.GRID_SIZE || 50;
// const PXL_HEIGHT = process.env.PXL_HEIGHT || 750;
// const FPS = process.env.FPS || 50;

import { Socket } from "socket.io";

// classes
import { Simulation } from "@classes/simulation";
import { Node } from "@classes/node";
import { Color } from "@classes/color";
import { Position } from "@classes/position";

logger.info("Environment:", NODE_ENV);

const simulation = new Simulation(GRID_SIZE as number);

const testNode1 = new Node("1", new Position(25, 25), new Color(255, 0, 0), simulation.cellOccupied);
const testNode2 = new Node("2", new Position(26, 25), new Color(0, 255, 0), simulation.cellOccupied);
const testNode3 = new Node("3", new Position(24, 25), new Color(0, 0, 255), simulation.cellOccupied);
const testNode4 = new Node("4", new Position(25, 24), new Color(255, 0, 255), simulation.cellOccupied);
const testNode5 = new Node("5", new Position(25, 26), new Color(255, 255, 0), simulation.cellOccupied);

// TODO function that pushes node to list and adds node to correct cell in grid which also updates the cell i.e. occupied

simulation.nodes[testNode1.id] = testNode1;
simulation.nodes[testNode2.id] = testNode2;
simulation.nodes[testNode3.id] = testNode3;
simulation.nodes[testNode4.id] = testNode4;
simulation.nodes[testNode5.id] = testNode5;

simulation.grid[0][0].update(true, testNode1.getColor);

app.get("/", function (req : any, res : any) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket : Socket) => {
    logger.info(`Socket "${socket.id}" connected`);

    testDrawingFunction(socket);
    // TODO nodelist dictionary not array


    socket.on("disconnect", () => {
        logger.info(`Socket "${socket.id}" disconnected`);
    });
});

server.listen(PORT || 3000, function () {
    logger.info("App listening on Port " + PORT);
});


async function testDrawingFunction(socket : Socket){
    for (let move = 0; move < 5; move++) {
        testNode1.moveY(-1);
        simulation.nodes[0] = testNode1;
        socket.emit("updateNodeList", simulation.nodes);
        await sleep(1000);
        
    }
}

function sleep(ms : number) {
    return new Promise((resolve : any) => {
        setTimeout(resolve, ms);
    });
}

// TODO tanh(sum(inputs)) for inner neurons and action neurons