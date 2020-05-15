class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload() {
    	this.load.image("title", "images/title.png")
    }
    create() {
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        this.alignGrid.showNumbers();

        var title = this.add.image(0, 0, 'title');
        this.alignGrid.placeAtIndex(11, title);
    }
    update() {

    }
}