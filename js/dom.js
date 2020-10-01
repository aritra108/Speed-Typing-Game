/*************** DOM elements ************* */
const overlay = document.querySelector('.overlay');

// First (Play Game) Container 
const gameForm = document.querySelector('#game-form');
const gameInput = document.querySelector('#game-input');
const givenWord = document.querySelector('#given-word');
const wordLoader = document.querySelector('.word-loader');
const limit = document.querySelector('#limit');
const seconds = document.querySelector('#seconds');
const milliseconds = document.querySelector('#milliseconds');
const feedback = document.querySelector('#feedback');

// Middle (Status) container
const difficulty = document.querySelector('#difficulty');
const score = document.querySelector('#score');
const restartGame = document.querySelector('#restart-game');
const newUser = document.querySelector('#new-user');

// Last (High Score) Container 
const highScoreNames = document.querySelector('#high-score-names');
const highScores = document.querySelector('#high-scores');
const seeMore = document.querySelector('.see-more');
const seeLess = document.querySelector('.see-less');

// Introduction Modal Window 
const intro = document.querySelector('#intro');
const introForm = document.querySelector('#intro-form');
const nameInput = document.querySelector('#name-input');

// Instruction Modal Window
const instructionModal = document.querySelector('.instruction-modal');
const scoreList = document.querySelector('#score-list');
const difficultyList = document.querySelector('#difficulty-list');
const pointsList = document.querySelector('#points-list');
const timeLimitList = document.querySelector('#time-limit-list');
const bonusList = document.querySelector('#bonus-list');

// Score Modal Window 
const scoreModal = document.querySelector('.score-modal');
const animatedCounter = document.querySelector('.animated-counter');
const bonus = document.querySelector('#bonus');
const bonusScore = document.querySelector('.bonus-score');
const scoreRemarks = document.querySelector('#score-remarks');

// Difficulty Alert 
const difficultyAlert = document.querySelector('.alert-difficulty');