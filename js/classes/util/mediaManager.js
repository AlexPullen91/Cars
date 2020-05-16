class MediaManager {
    constructor(config) {
        this.scene = config.scene;
        emitter.on(G.PLAY_SOUND, this.playSound, this);
    }
    playSound(key) { // key will be what is passed to play sound preloaded from the library
        var sound = this.scene.sound.add(key);
        sound.play();
    }
}