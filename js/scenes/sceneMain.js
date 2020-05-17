class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image("road", "images/road.jpg");
        this.load.spritesheet("cars", "images/cars.png", {frameWidth: 60, frameHeight: 126});
        this.load.image("line", "images/line.png");
        this.load.image("pcar1", "images/pcar1.png");
        this.load.image("pcar2", "images/pcar2.png");
        this.load.image("cone", "images/cone.png");
        this.load.image("barrier", "images/barrier.png");
        // this.load.image("button1", "images/ui/buttons/2/1.png");
        // this.load.image("button2", "images/ui/buttons/2/5.png");
        
        
        this.load.audio("backgroundMusic", ["audio/random-race.mp3", "audio/random-race.ogg"]);
        this.load.audio("boom", ["audio/boom.mp3", "audio/boom.ogg"]);
        this.load.audio("whoosh", ["audio/whoosh.mp3", "audio/whoosh.ogg"]);

        this.load.image("toggleBack", "images/ui/toggles/1.png")
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png")
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png")
        this.load.image("musicOn", "images/ui/icons/music_on.png")
        this.load.image("musicOff", "images/ui/icons/music_off.png")
        
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        model.gameOver = false;
        model.speed = 1; // car speed is reset to this every time play again is pressed
        model.score = 0; // score is reset to this every time play again is pressed

        this.road = new Road({scene: this}); // creates the road
        this.road.x = game.config.width * .25;
        this.road.makeLines(); // adds lines to the road
        //
        //
        this.road2 = new Road({scene: this}); // creates a second road
        this.road2.x = game.config.width * .75;
        this.road2.makeLines(); // adds lines to the road

        this.road2.car.setFrame(1);

        this.alignGrid = new AlignGrid({scene: this, rows: 5, cols: 5});
        //this.alignGrid.showNumbers(); // defines alignGrid class instance
        // this.alignGrid.placeAtIndex(4, this.sb); // temporary placement of scorebox

        var soundButtons = new SoundButtons({scene: this});
    
        this.sb = new ScoreBox({scene: this}); // passes in SceneMain as the scene
        this.sb.x = game.config.width / 2; // puts it in the center
        this.sb.y = 50; // 50px down from the top
        
        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this);

        //var bar = new Bar({scene: this, x: 240, y: 320});

        // var fireText = {color:'black', fontSize:30};
        // var flatButton = new FlatButton({scene:this, key:'button1', text:'Fire!', x:240, y:100, event: 'button_pressed', params:'fire_lasers', textConfig:fireText});
        // var flatButton2 = new FlatButton({scene:this, key:'button2', text:'Destruct!', x:240, y:300, event: 'button_pressed', params:'self_destruct'});

        // var toggleButton = new ToggleButton({scene:this, backKey:'toggleBack', onIcon:'musicOn', offIcon:'musicOff', event:G.TOGGLE_MUSIC, x:240, y:450})

        // emitter.on('button_pressed', this.buttonPressed, this);
        
    }
    scoreUpdated() {
        if (model.score / 5 == Math.floor(model.score / 5)) {
            model.speed += .25;
            if (model.speed > 1.5) {
                model.speed == 1.5;
            }
        }
    }
    // buttonPressed(params) {
    //     console.log(params);
    //     model.musicOn = !model.musicOn;
        //emitter.emit(G.PLAY_SOUND, 'cat')
        // this.scene.start("SceneOver");
    // }
    update() {
        this.road.moveLines();
        this.road.moveObject();
        //
        //
        this.road2.moveLines();
        this.road2.moveObject();
    }
}