class Model { // central storage locaton for all of the games data
    constructor() { // where all of the variables and data for the game will go
        this._score = 0;
    }
    set score(val) { // lets me know when the score is updated
        this._score = val; // sets score locally
        console.log("Score updated!");
    }
    get score() {
        return this._score;
    }
}