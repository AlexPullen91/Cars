var game;
var model;
var emitter; // allows different parts of the game to talk and listen to each other
var G; // stands for game
var controller; 

window.onload=function()
{
	var config = {
        type: Phaser.AUTO,
        width: 480,
        height: 640,
        parent: 'phaser-game',
        scene: [SceneMain]
    };
    G = new Constants();
    model = new Model();
    game = new Phaser.Game(config);
}