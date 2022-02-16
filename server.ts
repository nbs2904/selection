require("dotenv").config({path: __dirname + "/.env"});
const express = require("express");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

// * logger
const logger = require("@config/log4js").server;

// * config
const NODE_ENV = process.env.NODE_ENV;
const PORT = +(process.env.PORT || 3000) as number;
const GRID_SIZE = +(process.env.GRID_SIZE || 50) as number;
// const PXL_HEIGHT = process.env.PXL_HEIGHT || 750;
// const FPS = process.env.FPS || 50;

// * classes
import { Simulation } from "@classes/simulation";
import { Node } from "@classes/node";
import { Position } from "@classes/position";
import { Color } from "@classes/color";

// * utility functions
import { randomInteger } from "@utility/randomNumber";
import { sleep } from "@utility/sleep";
import { randomGenome } from "@utility/randomGenome";
const fs = require("fs");

// * interfaces
import { Genome } from "@interfaces/genome.interface";

logger.info("Environment:", NODE_ENV);


app.get("/", function (req : any, res : any) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", async (socket : typeof Socket) => {
    logger.info(`Socket "${socket.id}" connected`);

    
    const genome = randomGenome();

    fs.writeFileSync("./lib/graphs/genomes/genome.json", JSON.stringify(genome));

    const simulation = new Simulation(GRID_SIZE);
    const node = new Node("hsbea", new Position(10, 10), new Color(0, 0, 0), genome);

    await simulation.spawnNode(node);
    socket.emit("updateNodeList", simulation.nodes);
    await sleep(1000);

    for (let i = 0; i < 100; i++) {
        node.brain.compute();
        socket.emit("updateNodeList", simulation.nodes);
        await sleep(1000);
    }

    socket.on("disconnect", () => {
        logger.info(`Socket "${socket.id}" disconnected`);
    });
});

server.listen(PORT, function () {
    logger.info("App listening on Port " + PORT);
});
