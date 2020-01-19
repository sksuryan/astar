class coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.cameFrom = undefined;
        this.neighbors = []
        this.isWall = false;
    }
    addNeighbors(){
        var x = this.x;
        var y = this.y;
        if(x > 0)
            this.neighbors.push(grid[x-1][y]);
        if(y > 0)
            this.neighbors.push(grid[x][y-1]);
        if(x < rows-1)
            this.neighbors.push(grid[x+1][y]);
        if(y < columns-1)
            this.neighbors.push(grid[x][y+1]);
        if(x > 0 && y > 0)
            this.neighbors.push(grid[x-1][y-1]);
        if(x < rows-1 && y < columns-1)
            this.neighbors.push(grid[x+1][y+1]);
        if(x > 0 && y < columns-1)
            this.neighbors.push(grid[x-1][y+1]);
        if(x < rows-1 && y > 0)
            this.neighbors.push(grid[x+1][y-1]);
    }
    show(){
        rect(canvasLength/rows*this.x,canvasBreadth/columns*this.y,canvasLength/rows,canvasBreadth/columns);
    }
}
