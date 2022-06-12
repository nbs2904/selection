// * utility
import { validateConfig } from "@utility/validateConfig";

// * config
const config : Config = require("dotenv").config({path: __dirname + "/config/env/.env"}).parsed;
if(!validateConfig(config)) process.exit(1);
const NODE_ENV = process.env.NODE_ENV;
const PORT = +(process.env.PORT || 3000) as number;

// * classes
import { Simulation } from "@classes/simulation";
import { Config } from "@interfaces/config.interface";

// * levels
import { upperLeft } from "./lib/levels/corner.level";

// * logger
const logger = require("@config/logs/log4js").server;

import express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

logger.info("Environment:", NODE_ENV);


app.get("/", function (req : express.req, res : express.res) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", async (socket : typeof Socket) => {
    logger.info(`Socket "${ socket.id }" connected`);

    socket.emit("setConfig", {config, level: upperLeft});    


    const simulation = new Simulation(upperLeft);
    await simulation.run(socket);
    
    
    socket.on("disconnect", () => {
        logger.info(`Socket "${ socket.id }" disconnected`);
        process.exit(0);
    });

    process.exit(0);
});

server.listen(PORT, function () {
    logger.info("App listening on Port " + PORT);
});
