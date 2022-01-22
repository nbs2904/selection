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
const PORT = process.env.PORT || 3000;
const GRID_SIZE = process.env.GRID_SIZE || 50;
const PXL_HEIGHT = process.env.PXL_HEIGHT || 750;
const FPS = process.env.FPS || 50;

// classes
import { Simulation } from "./lib/classes/simulation";
import { Node } from "./lib/classes/node";
import { Color } from "./lib/classes/color";

const simulation = new Simulation(GRID_SIZE as number);

const testNode1 = new Node("1", 25, 25, new Color(255, 0, 0));
const testNode2 = new Node("2", 26, 25, new Color(0, 255, 0));
const testNode3 = new Node("3", 24, 25, new Color(0, 0, 255));
const testNode4 = new Node("4", 25, 24, new Color(255, 0, 255));
const testNode5 = new Node("5", 25, 26, new Color(255, 255, 0));

// TODO function that pushes node to list and adds node to correct cell in grid which also updates the cell i.e. occupied

simulation.nodes.push(testNode1);
simulation.nodes.push(testNode2);
simulation.nodes.push(testNode3);
simulation.nodes.push(testNode4);
simulation.nodes.push(testNode5);

simulation.grid[0][0].update(true, testNode1.color);


app.get("/", function (req : any, res : any) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket : any) => {
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


async function testDrawingFunction(socket : any){
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

// tanh(sum(inputs)) for inner neurons and action neurons