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
    console.log(nodeList);    
})

function setup(){
    createCanvas(750, 750);
    frameRate(60);
}

function draw(){
    background(220);
    fill(255, 0, 0);
    noStroke();
    drawNodes();
}

function drawNodes(){
    cellLength = config.PXL_HEIGHT/config.GRID_SIZE;

    // for (let i = 0; i < config.GRID_SIZE; i++) {
    //     for (let j = 0; j < config.GRID_SIZE; j++) {      
    //         circle(i * cellLength + cellLength/2, j * cellLength + cellLength/2, 10);        
    //     }
    // }

    nodeList.forEach(node => {
        fill(node.color.r, node.color.g, node.color.b);
        circle(node.x * cellLength + cellLength/2, node.y * cellLength + cellLength/2, 10);    
    });
}