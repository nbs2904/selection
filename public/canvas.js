/* eslint-disable */
// TODO load env or init file which equals backend config

let config = {
    GRID_SIZE: 50,
    PXL_HEIGHT: 750,
    FPS: 60
};
let nodeList = [];

socket.on("updateNodeList", (updateNodeList) => {
    nodeList = updateNodeList;
})

// TODO socket on disconnect

function setup(){
    createCanvas(750, 750);
    frameRate(60);
}

function draw(){
    background(240);
    fill(255, 0, 0);
    noStroke();
    drawNodes(); 
}

// TODO increase efficiency by just redrawing nodes that changed position
function drawNodes(){
    cellLength = config.PXL_HEIGHT/config.GRID_SIZE;

    for(const [key, node] of Object.entries(nodeList)) {
        fill(node.color.r, node.color.g, node.color.b);
        circle(node.position.x * cellLength + cellLength/2, node.position.y * cellLength + cellLength/2, 7);  
    }
}