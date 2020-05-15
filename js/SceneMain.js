class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.image("road", "images/road.jpg");
        this.load.spritesheet("cars", "images/cars.png", {frameWidth:60,frameHeight:126});
        this.load.image("line", "images/line.png");
        this.load.image("pcar1", "images/pcar1.png");
        this.load.image("pcar2", "images/pcar2.png");
        this.load.image("cone", "images/cone.png");
        this.load.image("barrier", "images/barrier.png");

        
    }
    create() {
        emitter = new Phaser.Events.EventEmitter(); // allows us to talk globally to other parts of our game
        controller = new Controller(); // instance of emitter has to exist before we use controller because we used it inside the controller
        //
        //
        this.sb = new ScoreBox({scene:this}); // passes in SceneMain as the scene
        this.sb.x = game.config.width-50; // puts it in the center
        this.sb.y = 50; // 50px down from the top

        this.road = new Road({scene:this}); // creates the road
        this.road.x = game.config.width/2;
        this.road.makeLines(); // adds lines to the road
        
        
    }
    update() {
        this.road.moveLines();
        this.road.moveObject();
    }
}