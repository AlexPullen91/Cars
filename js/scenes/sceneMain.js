class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        this.load.image("road", "images/road.jpg");
        this.load.spritesheet("cars", "images/cars.png", {frameWidth:60,frameHeight:126});
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
        
        var mediaManager = new MediaManager({scene: this});
        // mediaManager.setBackgroundMusic("backgroundMusic");

        this.sb = new ScoreBox({scene:this}); // passes in SceneMain as the scene
        this.sb.x = game.config.width - 50; // puts it in the center
        this.sb.y = 50; // 50px down from the top

        this.road = new Road({scene:this}); // creates the road
        this.road.x = game.config.width / 2;
        this.road.makeLines(); // adds lines to the road

        this.alignGrid = new AlignGrid({scene:this, rows:5, cols:5});
        this.alignGrid.showNumbers(); // defines alignGrid class instance
        this.alignGrid.placeAtIndex(4, this.sb); // passes in config object

        var sb = new SoundButtons({scene:this});

        // var fireText = {color:'black', fontSize:30};
        // var flatButton = new FlatButton({scene:this, key:'button1', text:'Fire!', x:240, y:100, event: 'button_pressed', params:'fire_lasers', textConfig:fireText});
        // var flatButton2 = new FlatButton({scene:this, key:'button2', text:'Destruct!', x:240, y:300, event: 'button_pressed', params:'self_destruct'});

        // var toggleButton = new ToggleButton({scene:this, backKey:'toggleBack', onIcon:'musicOn', offIcon:'musicOff', event:G.TOGGLE_MUSIC, x:240, y:450})

        // emitter.on('button_pressed', this.buttonPressed, this);
        
        
        
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
    }
}