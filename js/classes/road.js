class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0,0,"road");
        this.add(this.back);
        this.scene.add.existing(this);

        //this.back.displayWidth = game.config.width*.5;  // scales roads to 50% of screen size to fit two roads
        //this.backscaleY=this.back.scaleX; // scales it proportinally
        Align.scaleToGameW(this.back,.5);
        
        // container itself does not have a height and width unless you set it

        this.setSize(this.back.displayWidth, game.config.height) // sets the the height of the game and half the width

        console.log(this)

        this.lineGroup = this.scene.add.group(); // line group for collection to keep the lines in and make it look like road is moving
        //
        //
        this.count = 0. // count how many times we're moving the lines
       // add car
        this.car = this.scene.add.sprite(this.displayWidth/4, game.config.height*.9,"cars"); // places the car 90% down the screen
        Align.scaleToGameW(this.car,.10) // makes the car smaller
        this.add(this.car) // adds the car to the container
        //
        // add click
        this.back.setInteractive();
        this.back.on('pointerdown',this.changeLanes,this)

    }
    changeLanes() {
        if (this.car.x>0) {
            this.car.x=-this.displayWidth/4;
        } else {
            this.car.x=this.displayWidth/4;
        }
    }

    makeLines() { // spaces out the lines
        this.vSpace = this.displayHeight / 10;
        for (var i = 0; i < 20; i++) {
            var line = this.scene.add.image(this.x, this.vSpace * i, "line");
            line.oy = line.y; // record original position of the line
            this.lineGroup.add(line);
            
        }
    }

    moveLines() { // makes it looks like the road is moving
        this.lineGroup.children.iterate(function(child) {
            child.y+=this.vSpace/20; 
        }.bind(this)); // makes this refer to the scene rather than the group
        this.count++;
        if (this.count == 20) {
            this.count = 0;
            this.lineGroup.children.iterate(function(child) {
                child.y = child.oy; //  instead of advancing y reset it to oy
            }.bind(this));
        }
    }
}