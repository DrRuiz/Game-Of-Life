class Automata{
    constructor(gameEngine){
        //The context used to draw
        this.ctx = gameEngine.ctx; 
        //Dimentions of the 2D array
        this.width = 128;
        this.height = 96;
        //Keeps track of time using ticks
        this.ticksBeforeUpdate = 0;
        this.totalTicks = 0;
        //Create the 2D array
        this.my2DArray = new Array(this.width);
        for(let i = 0; i < this.width; i++){
            this.my2DArray[i] = new Array(this.height); 
        }
        this.randomize();
    }

    /* Fill the 2D array with random values between 0 and 1. */
    randomize(){
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                this.my2DArray[i][j] = Math.floor(Math.random() * 2);
            }
        }
    }

    /**
     * Updates the cells inside the 2D array checking wich ones whould be alive and dead after
     * a certain number of ticks.
     */ 
    update(){
        //To get the element and turn it into a decimal number
        let speed = parseInt(document.getElementById("speed").value, 10);
        this.ticksBeforeUpdate++;

        if(this.ticksBeforeUpdate >= speed){
            //Set the ticks before the next update back to 0
            this.ticksBeforeUpdate = 0;
            this.totalTicks++;
            document.getElementById("ticks").innerHTML = "Ticks: " + this.totalTicks;
            //Create temporary array
            let temp2DArray = new Array(this.width);
            for(let i = 0; i < this.width; i++){ 
                temp2DArray[i] = new Array(this.height); 
            }

            for(let i = 0; i < this.width; i++){
                for(let j = 0; j < this.height; j++){
                    //check neighbors
                    let aliveNeighbors = this.countNeighbors(i, j);
                    //Rule tests 
                    if((this.my2DArray[i][j] == 0 && aliveNeighbors == 3) 
                            || (this.my2DArray[i][j] == 1 && (aliveNeighbors == 2 || aliveNeighbors == 3))){
                        temp2DArray[i][j] = 1;
                    } else {
                        temp2DArray[i][j] = 0;
                    }
                }
            }
            this.my2DArray = temp2DArray;
        }
    }

    /**
     * Counts the number of alive neighbors surrounding the passed coordinate in the 2D array and returns it.
     * @returns the total number of alive neighbors surrounding the passed coordinate in the 2D array. 
     */
    countNeighbors(x, y){
        let aliveNeighbors = 0;
        //make this a function(i, j) returns the numberofNeigh
        for(let i = x - 1; i <= x + 1; i++){
            for(let j = y - 1; j <= y + 1; j++){
                if(i >= 0 && i < this.width && j >= 0 
                        && j < this.height && (i != x || j != y)  && this.my2DArray[i][j] == 1){
                    aliveNeighbors++;
                }
            }
        }
        return aliveNeighbors;
    }

    /**
     * Draws the cells that are alive in the 2D array. 
     */
    draw(){ 
        //Refill the canvas
        let squareSpace = 8;
        let squareSize = 6; 
        this.ctx.fillStyle = 'black';
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                if(this.my2DArray[i][j] == 1){
                    this.ctx.fillRect(i * squareSpace, j * squareSpace, squareSize, squareSize);    //Draw a rect
                } 
            }
        }
    }

    pairsOfBoats(){
        for(let i = 32; i < 96; i += 8){
            for(let j = 0; j < this.height; j += 1){
                this.my2DArray[i][j] = 1;
            }
        }

        for(let i = 0; i < this.width; i += 1){
            for(let j = 24; j < 72; j += 16){
                this.my2DArray[i][j] = 1;
            }
        }
    }

    coolMirrorDesign(){
        for(let i = 0; i < this.width; i += 8){
            for(let j = 0; j < this.height; j += 2){
                this.my2DArray[i][j] = 1;
            }
        }

        for(let i = 0; i < this.width; i += 1){
            for(let j = 0; j < this.height; j += 14){
                this.my2DArray[i][j] = 1;
            }
        }
    }

    remindsMeOfChrismas(){
        for(let i = 0; i < this.width; i += 10){
            for(let j = 0; j < this.height; j += 1){
                this.my2DArray[i][j] = 1;
            }
        }

        for(let i = 0; i < this.width; i += 1){
            for(let j = 0; j < this.height; j += 10){
                this.my2DArray[i][j] = 1;
            }
        }
        
        for(let t = 0; t < this.width; t += 8){
            let i = 0 + t;
            let j = 0;
            while(i < this.width && j < this.height){
                this.my2DArray[i][j] = 1;
                i += 1;
                j += 1;
            }
            i = 0;
            j = 0;
        }

        for(let t = 0; t < this.width; t += 8){
            let i = 0;
            let j = 0 + t;
            while(i < this.width && j < this.height){
                this.my2DArray[i][j] = 1;
                i += 1;
                j += 1;
            }
            i = 0;
            j = 0;
        }
    }
}