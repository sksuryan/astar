var canvasLength = 500;
var canvasBreadth = 500;
var rows = 25;
var columns = 25;

var grid = new Array(rows);

var openSet;
var closedSet = [];

var start;
var end;

var i = 0;

function posiblityCheck(current, neighbor){
    x = current.x;
    y = current.y;
    nx = neighbor.x;
    ny = neighbor.y;
    diffx = nx - x;
    diffy = ny - y;
    if(diffx > 0 && diffy > 0 && x < rows-1 && y < columns-1){
        if(grid[x+1][y].isWall && grid[x][y+1].isWall){
            return false;
        }
    }
    if(diffx < 0 && diffy < 0 && x > 0 && y > 0){
        if(grid[x-1][y].isWall && grid[x][y-1].isWall){
            return false;
        }
    }
    if(diffx > 0 && diffy < 0 && x < rows-1 && y > 0){
        if(grid[x+1][y].isWall && grid[x][y-1].isWall){
            return false;
        }
    }
    if(diffx < 0 && diffy > 0 && x > 0 && y < columns-1){
        if(grid[x-1][y].isWall && grid[x][y+1].isWall){
            return false;
        }
    }
    return true;
}

function heuristics(node1,node2){
    return dist(node1.x,node1.y,node2.x,node2.y);
}

function setup(){
    let canvas = createCanvas(canvasLength,canvasBreadth);
    canvas.parent('canvas-holder');
    for (var i=0;i<rows;i++) {
        grid[i] = new Array(columns);
    }
    for(var i=0;i<rows;i++){
        for(var j=0;j<rows;j++){
            grid[i][j] = new coordinates(i,j);
        }
    }
    for(var i=0;i<rows;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].addNeighbors();
            fill(color(255,255,255));
            if(random(1) < 0.3){
                fill(0);
                grid[i][j].isWall = true;
            }
            grid[i][j].show();
        }
    }
    start = grid[0][0];
    start.isWall = false;
    fill(color(255,255,255));
    start.show();
    end = grid[rows-1][columns-1];
    end.isWall = false;
    end.show();
    openSet = new binaryTree();
    openSet.addToTree(start);    
}

var current;
var neighbors;
function draw(){
    if(!(openSet.node === undefined)){

        current = openSet.smallest().node;

        if(current === end){
            console.log("found");
            noLoop();           
        }
        
        closedSet.push(current);
        openSet = openSet.delete(current);
        neighbors = current.neighbors;

        for(var i = 0;i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!closedSet.includes(neighbor) && !(neighbor.isWall) && posiblityCheck(current,neighbor)){
                var temp = current.g+heuristics(current,neighbor);
                if(openSet.search(neighbor)){
                    if(neighbor.g > temp){
                        openSet.delete(neighbor);
                        neighbor.g = temp;
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.cameFrom = current;
                        openSet.addToTree(neighbor);
                    }
                }
                else {
                    neighbor.g = temp;
                    neighbor.h = heuristics(end,current.neighbors[i]);
                    neighbor.f = current.neighbors[i].g + neighbor.h;
                    neighbor.cameFrom = current;
                    openSet.addToTree(neighbor);
                }
            }            
        }       
    }
    for(var i=0;i<closedSet.length;i++){
        fill(color(255,0,0));
        closedSet[i].show();
    }
    temp = current;
    if(!(openSet.node === undefined)){
        while(!(temp === undefined)){
            fill(color(0,0,255));
            temp.show();
            temp = temp.cameFrom;
        }
    }
    openSet.show();
    if(openSet.node === undefined){
        console.log("Not found!");
        noLoop();
    }
}