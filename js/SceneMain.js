class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.image("road","images/road.jpg");
        this.load.spritesheet("cars","images/cars.jpg", {frameWidth:60,frameHeight:126});
        
    }
    create() {
        console.log("Ready!");
    }
    update() {

    }
}