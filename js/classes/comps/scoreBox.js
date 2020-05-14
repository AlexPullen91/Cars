class ScoreBox extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene; // reference to the scene
        //
        this.text1 = this.scene.add.text(0,0,"SCORE:0"); // textbox to hold the score
        this.text1.setOrigin(0.5,0.5); // places it in the center of the container
        this.add(this.text1); // add text box to scorebox container

        this.scene.add.existing(this); // adds container to the scene
    }
}