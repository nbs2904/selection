require("dotenv").config({path: __dirname + "/.env"});
const express = require("express");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

// * logger
const logger = require("config/log4js").server;

// * config
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const GRID_SIZE = process.env.GRID_SIZE || 50;
// const PXL_HEIGHT = process.env.PXL_HEIGHT || 750;
// const FPS = process.env.FPS || 50;

// * classes
import { Simulation } from "@classes/simulation";

// * utility functions
import { sleep } from "@utility/sleep";

logger.info("Environment:", NODE_ENV);


app.get("/", function (req : any, res : any) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", async (socket : typeof Socket) => {
    logger.info(`Socket "${socket.id}" connected`);

    let simulation = new Simulation(GRID_SIZE as number);

    // for (let index = 0; index < 10; index++) {
    //     simulation.spawnNode();
    //     socket.emit("updateNodeList", simulation.nodes);
    //     await sleep(500);
    // }

    const testNode = simulation.spawnNode();
    await sleep(500);
    // for (let i = 0; i < 10; i++) {
    testNode.moveX(1);
    // sleep(500);      
    // }

    socket.on("disconnect", () => {
        simulation = undefined;
        logger.info(`Socket "${socket.id}" disconnected`);
    });
});

server.listen(PORT || 3000, function () {
    logger.info("App listening on Port " + PORT);
});




// TODO tanh(sum(inputs)) for inner neurons and action neurons