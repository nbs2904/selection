import { Cell } from "./lib/interfaces/cell";
require("dotenv").config({path: __dirname + "/.env"});
const express = require("express");
const logger = require("./config/logger").logger;

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

// ? this is a test 4

// * config
const PORT = process.env.PORT || 3000;
const ARRAY_SIZE = process.env.ARRAY_SIZE || 50;

const field : Cell[][] = [];
// * fill array
let temp_array : Cell[] = [];
for (let index = 0; index < ARRAY_SIZE; index++) {
    temp_array.push({ occupied: false });
}

for (let index = 0; index < ARRAY_SIZE; index++) {
    field.push(temp_array);    
}

temp_array = [];

// interfaces
import { Color } from "./lib/interfaces/color";
import {node} from "./lib/classes/node";

const testNodeColor : Color = { r: 255, g: 0, b: 0 };
const testNode = new node("1560abc", 30, 30, testNodeColor);

field[0][0] = { occupied: true, color: testNode.color };


app.get("/", function (req : any, res : any) {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket : any) => {
    logger.info("Socket connected");

    socket.emit("fieldUpdate", field);

    socket.on("disconnect", () => {
        logger.info("Socket disconnected");
    });
});

server.listen(PORT || 3000, function () {
    logger.info("App listening on Port " + PORT);
});


// tanh(sum(inputs)) for inner neurons and action neurons