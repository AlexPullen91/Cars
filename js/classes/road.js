class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.back = this.scene.add.image(0, 0, "road");
        this.add(this.back);
        this.scene.add.existing(this);

        //this.back.displayWidth = game.config.width*.5;  // scales roads to 50% of screen size to fit two roads
        //this.backscaleY=this.back.scaleX; // scales it proportinally
        Align.scaleToGameW(this.back, .5);
        
        // container itself does not have a height and width unless you set it

        this.setSize(this.back.displayWidth, game.config.height) // sets the the height of the game and half the width

        console.log(this)

        this.lineGroup = this.scene.add.group(); // line group for collection to keep the lines in and make it look like road is moving
        //
        //
        this.count = 0. // count how many times we're moving the lines
       // add car
        this.car = this.scene.add.sprite(this.displayWidth / 4, game.config.height * .9, "cars"); // places the car 90% down the screen
        Align.scaleToGameW(this.car, .10) // makes the car smaller
        this.add(this.car) // adds the car to the container
        //
        // add click
        this.back.setInteractive();
        this.back.on('pointerdown', this.changeLanes, this)
        this.addObject(); // adds police car
    }

    addObject() { // adds police car
        var objs = [{key: 'pcar1', speed:10, scale: 10}, {key: 'pcar2', speed: 10, scale: 10}, {key: 'cone', speed: 20, scale: 5}, {key: 'barrier', speed: 20, scale: 8}];
        var index = Math.floor(Math.random() * 4); // pick a number between 0 and 4
        var key = objs[index].key; // chooses a random item from objs to go onto the road
        var speed = objs[index].speed;
        var scale = objs[index].scale / 100; // changes scale of objects

        this.object = this.scene.add.sprite(-this.displayWidth / 4, 0, key); // places it at the top of the left hand lane
        this.object.speed = speed;
        var lane = Math.random() * 100; 
        if (lane < 50) {
            this.object.x = this.displayWidth / 4; // moves car into different lanes
        }
        Align.scaleToGameW(this.object, scale) // makes objects smaller 
        this.add(this.object); // makes it a child of the road container
    }

    changeLanes() {
        if (model.gameOver == true) { // when the car is hit it's game over
            return;
        }
        //mediaManager.playSound("whoosh"); // potential audio fix
        emitter.emit(G.PLAY_SOUND, "whoosh");
        if (this.car.x > 0) {
            this.car.x =- this.displayWidth / 4;
        } else {
            this.car.x = this.displayWidth / 4;
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
        if (model.gameOver == true) { // when the car is hit it's game over, stops lines
            return;
        }
        this.lineGroup.children.iterate(function(child) {
            child.y += this.vSpace / 20; 
        }.bind(this)); // makes this refer to the scene rather than the group
        this.count++;
        if (this.count == 20) {
            this.count = 0;
            this.lineGroup.children.iterate(function(child) {
                child.y = child.oy; //  instead of advancing y reset it to oy
            }.bind(this));
        }
    }
    goGameOver() {
        this.scene.start("SceneOver");
    }

    moveObject() {
        if (model.gameOver == true) { // when the car is hit it's game over
            return;
        }
        this.object.y += (this.vSpace / this.object.speed) * model.speed;;
        if (Collision.checkCollide(this.car, this.object) == true) {
           // this.car.alpha = .5; // fades the car out
            model.gameOver = true;
            //mediaManager.playSound("boom"); // potential audio fix
            emitter.emit(G.PLAY_SOUND, "boom");
            // animates the crash
            this.scene.tweens.add({targets: this.car, duration: 1000, y: game.config.height, angle: -270});
            // timer event to allow animation to play out before going to game over screen
            this.scene.time.addEvent({ delay: 2000, callback: this.goGameOver, callbackScope: this.scene, loop: false});
        } else {
           // this.car.alpha = 1;
        }
        if (this.object.y > game.config.height) { // if below the bottom of the game then destroy object
            emitter.emit(G.UP_POINTS, 1);
            this.object.destroy();
            this.addObject(); // add a new object everytime we destroy an object
        }
    }
}