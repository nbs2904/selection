import { randomInteger } from "@utility/randomInteger";
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
import { Node } from "@classes/node";

// * utility functions
import { sleep } from "@utility/sleep";

logger.info("Environment:", NODE_ENV);


app.get("/", function (req : any, res : any) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", async (socket : typeof Socket) => {
    logger.info(`Socket "${socket.id}" connected`);

    let simulation = new Simulation(GRID_SIZE as number);

    const DUMMY_NODE_LIST_LENGTH = 500;
    const dummyNodeList : Node[] = [];

    for (let i = 0; i < DUMMY_NODE_LIST_LENGTH; i++) {
        simulation.spawnNode()
            .then((node) => {
                dummyNodeList.push(node);
            })
            .catch((error) => {
                logger.error(error);
            });      
    }

    let repitition = 0;
    while(repitition < 7200) {
        if(randomInteger(2)) {
            if(randomInteger(2)) dummyNodeList[randomInteger(DUMMY_NODE_LIST_LENGTH)].moveX(1);
            else dummyNodeList[randomInteger(DUMMY_NODE_LIST_LENGTH)].moveX(-1);
        } else {
            if(randomInteger(2)) dummyNodeList[randomInteger(DUMMY_NODE_LIST_LENGTH)].moveY(1);
            else dummyNodeList[randomInteger(DUMMY_NODE_LIST_LENGTH)].moveY(-1);
        }

        socket.emit("updateNodeList", simulation.nodes);
        await sleep(1);
        repitition++;
    }


    socket.on("disconnect", () => {
        simulation = undefined;
        logger.info(`Socket "${socket.id}" disconnected`);
    });
});

server.listen(PORT || 3000, function () {
    logger.info("App listening on Port " + PORT);
});




// TODO tanh(sum(inputs)) for inner neurons and action neurons