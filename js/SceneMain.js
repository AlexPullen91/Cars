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
        this.load.image("button1", "images/ui/buttons/2/1.png");
        this.load.image("button2", "images/ui/buttons/2/5.png");
        

        
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

        this.alignGrid = new AlignGrid({scene:this, rows:5, cols:5});
        this.alignGrid.showNumbers(); // defines alignGrid class instance
        this.alignGrid.placeAtIndex(4, this.sb); // passes in config object

        var flatButton = new FlatButton({scene:this, key:'button1', text:'Press ME!', x:240, y:100, event: 'button_pressed'});
        var flatButton2 = new FlatButton({scene:this, key:'button2', text:'Press ME!', x:240, y:300, event: 'button_pressed'});

        emitter.on('button_pressed', this.buttonPressed, this);
        
        // alignGrid.placeAtIndex(16, this.face);
        // Align.scaleToGameW(this.face,.2); // scales objects down along with screen scaling
        
        
    }
    buttonPressed() {
        console.log("button pressed");
    }
    update() {
        this.road.moveLines();
        this.road.moveObject();
    }
}