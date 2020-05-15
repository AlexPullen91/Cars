class AlignGrid {
    constructor(config) {
        this.config = config;  // reference to the config so we can get it to anywhere within the class
        if (!config.scene) { // if there's no scene in config file log out error message 
            console.log("missing scene"); 
            return;
        } if (!config.rows) { 
            config.rows = 5; // use default value if we're missing number of rows in config option
        } if (!config.cols) {
            config.cols = 5; // use default value if we're missing number of cols in config option
        } if (!config.height) {
            config.height = game.config.height; // assumes we're using game height
        } if (!config.width) {
            config.width = game.config.width; // assumes we're using game width
        }

        this.scene = config.scene;

        this.cw = config.width / config.cols;  // taking width of the game and dividing it by number of colums to determine cell width
        this.ch = config.height / config.rows;  // taing height of the game and dividing it by number of rows to determine height

    }

    show() { // show the grid
        this.graphics = this.scene.add.graphics(); // gives an object to draw on
        this.graphics.lineStyle(2,0xff0000); // thickness of 2 and color of red

        for (var i = 0; i < this.config.width; i+= this.cw) { // add in cell width every time it loops through, drawing a line from top to bottom of the screen
            this.graphics.moveTo(i, 0);  // x position at i  -  y position at 0
            this.graphics.lineTo(i, this.config.height);  
        }
        for (var i = 0; i < this.config.height; i+= this.ch) { // add in cell height every time it loops through, drawing a line from side to side
            this.graphics.moveTo(0, i);  // x position at 0  -  y position at i
            this.graphics.lineTo(this.config.width, i); 
        }
        

        this.graphics.strokePath(); // allows me to draw the lines
    }
    placeAt(xx, yy, obj) {
        //calc position based upon the cellwidth and cellheight
        var x2 = this.cw * xx + this.cw / 2; // places the image dead center
        var y2 = this.ch * yy + this.ch / 2; // places the image dead center

        // obj.x = x2;
        // obj.y = y2;
    }
    placeAtIndex(index, obj) {
        var yy = Math.floor(index / this.config.cols); // get the number of cols and divivde the index number by it and return the integer
        var xx = index - (yy * this.config.cols); // get the x position by subtracting the row times the number of cols and get the left over number

        this.placeAt(xx, yy, obj);
    }
    showNumbers() { // tells me exactly where to put an object

        this.show();
        var count = 0;
        for (var i = 0; i < this.config.rows; i++) { 
            for (var j = 0; j < this.config.cols; j++) {
                var numText = this.scene.add.text(0, 0, count,{color:'#ff0000'}); 
                numText.setOrigin(0.5, 0.5); // sets it in the center of the cell
                this.placeAtIndex(count, numText); // places it on the grid

                count++;
            }
        }
    }
}