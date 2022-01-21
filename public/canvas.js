/* eslint-disable */
let field = [];
// TODO create simple list of all nodes in order to make it easier to loop through all nodes
// TODO create GitHub Repo
let nodeList = [];

socket.on("fieldUpdate", (updatedField) => {
    field = updatedField;    
})

function setup(){
    createCanvas(750, 750);
    frameRate(60);
}

function draw(){
    background(220);
    fill(255, 0, 0);
    noStroke();
    circle(30, 30, 10);
}