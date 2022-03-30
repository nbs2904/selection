/* eslint-disable */
let config = {};
let level = [];
let nodeList = [];

socket.on("setConfig", (configParams) => {
    config = configParams.config;
    level = configParams.level;

    setup();
});

socket.on("updateNodeList", (updateNodeList) => {
    nodeList = updateNodeList;
});


function setup(){
    createCanvas(config.PXL_HEIGHT, config.PXL_HEIGHT);
    frameRate(config.FPS);
}

function draw(){
    background(240);
    noStroke();
    drawLevel();
    drawNodes();
}

function drawNodes(){
    cellLength = config.PXL_HEIGHT/config.GRID_SIZE;

    for(const [, node] of Object.entries(nodeList)) {
        fill(node.color.r, node.color.g, node.color.b);
        circle(node.sensation.x * cellLength + cellLength/2, node.sensation.y * cellLength + cellLength/2, cellLength);
    }
}

function drawLevel() {
    for(rectangle of level) {
        const x = (rectangle[0] / config.GRID_SIZE) * config.PXL_HEIGHT;
        const y = (rectangle[1] / config.GRID_SIZE) * config.PXL_HEIGHT;
        const width = ((rectangle[2] - rectangle[0]) / config.GRID_SIZE) * config.PXL_HEIGHT;
        const height = ((rectangle[3] - rectangle[1]) / config.GRID_SIZE) * config.PXL_HEIGHT;

        fill(255, 0, 0, 100);
        rect(x, y, width, height);
    }
}