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
}