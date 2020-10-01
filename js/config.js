/*************** Global Variables ************* */
const totalWords = 274937, countingAnimationTime = 1000;

const highScoreConfig = {
    initial: 3, 
    total: 10
};

const difficulties = {
    first: 'Easy', 
    second: 'Medium', 
    third: 'Hard'
}

const levels = {
    first: 5, 
    second: 4, 
    third: 3
};

const landmarks = {
    first: 30, 
    second: 70
};

const bonuses = {
    first: 0, 
    second: 10, 
    third: 25
};

const incrementFactors = {
    first: 1, 
    second: 2,
    third: 3
};

let status = {
    name: '',
    isPlaying: false,
    difficulty: difficulties.first,
    limit: levels.first,
    word: '', 
    secondsLeft: levels.first, 
    millisecondsLeft: 0,
    feedback: '', 
    scoreIncrementFactor: incrementFactors.first,
    score: 0, 
    showScoreModal: true,
    bonus: bonuses.first, 
    position: -1
};

let inputTriggered = 0, interval, alertFirst = 0, alertSecond = 0;