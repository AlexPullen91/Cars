class Controller { // allows us to listen to main events
    constructor() {
        emitter.on(G.SET_SCORE,this.setScore); // where we listen to events from the emitter
        emitter.on(G.UP_POINTS,this.upPoints); // 
    }
    setScore(score) { 
        model.score = score; // allow us to directly set score in the model
    }
    upPoints(points) {
        var score = model.score;
        score += points; // triggers setter in the model
        model.score = score;
    }
}