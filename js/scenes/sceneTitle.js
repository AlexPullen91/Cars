class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload() {
        this.load.image("button1", "images/ui/buttons/2/1.png");
    	this.load.image("title", "images/title.png")
    }
    create() {
        emitter = new Phaser.Events.EventEmitter(); // allows us to talk globally to other parts of our game
        controller = new Controller(); // instance of emitter has to exist before use of controller because its used inside the controller
        this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this}); // adds grid to the scene
        //this.alignGrid.showNumbers();

        this.backImage = this.add.image(game.config.width / 2, game.config.height / 2, "titleBack");

        var title = this.add.image(0, 0, 'title'); // inserts title image
        Align.scaleToGameW(title, .8); // scales down the title
        this.alignGrid.placeAtIndex(38, title); // places it central
        // button to start the game
        var btnStart = new FlatButton({scene: this, key: 'button1', text: 'start', event: 'start_game'})
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this); // listen for start game event
        mediaManager = new MediaManager({scene: this});
        mediaManager.setBackgroundMusic("backgroundMusic");
    }
    startGame() {
        this.scene.start('SceneMain');
    }
    update() {

    }
}