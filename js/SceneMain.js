class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.image("road", "images/road.jpg");
        this.load.spritesheet("cars", "images/cars.png", {frameWidth:60,frameHeight:126});
        this.load.image("line", "images/line.png");
    }
    create() {
        this.road = new Road({scene:this}); // creates the road
        this.road.x = game.config.width/2;
        this.road.makeLines(); // adds lines to the road
        
    }
    update() {
        this.road.moveLines();
    }
}