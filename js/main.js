/*************** Events ************* */
document.addEventListener('DOMContentLoaded', pageLoaded); // When the page is loaded 
introForm.addEventListener('submit', introSubmitted); // When the intro is submitted
gameForm.addEventListener('submit', preventSubmission); // When enter key is accidentally pressed in the game input
restartGame.addEventListener('click', restartTheGame); // When the restart button has been clicked 
newUser.addEventListener('click', () => location.reload()); // When the new user is clicked
window.addEventListener('click', removeModal); // When something is clicked outside of the score modal
seeMore.addEventListener('click', showMoreHighScores); // When the see more link in the high scores is clicked 
seeLess.addEventListener('click', showLessHighScores); // When the see less link in the high scores is clicked 

/*************** Functions ************* */ 

function pageLoaded () {

    // Show the introduction modal
    UI.showIntro();

    // Show the overlay 
    UI.displayOverlay(true);

}

// After the form has been submitted
function introSubmitted (e) {

    // Prevent default behaviour 
    e.preventDefault();

    // Get the name and store it in a variable 
    status.name = nameInput.value;

    // Validate the name 
    if (status.name === '') return;

    // Change the status to playing 
    status.isPlaying = true;

    // Remove the intro container 
    UI.removeIntro();
    
    // Show the instruction modal
    UI.displayInstructionModal(true);

    // Initialize the game 
    init();
}

async function init() {
    
    // Clear the previous countdown interval (if any)
    clearInterval(interval);

    // Set the game status to true 
    status.isPlaying = true;

    // Clear the game input 
    gameInput.value = '';

    // Update the game status 
    Game.updateStatus();

    // Displaying accessories 
    UI.displayTimeLeft();
    UI.displayLimit();
    UI.displayDifficulty(status.difficulty);
    UI.displayScore(status.score);
    UI.displayHighScores(highScoreConfig.initial);

    // Loading the word 
    UI.displayWord(''); // remove the previous word (if any)
    UI.displayLoader(true); // display the word loader 
    let word = await Game.getWord() // load a random word and update it in status and DOM
                        .then(res => res);
    status.word = word; // update the status 
    UI.displayLoader(false); // remove the word loader 
    UI.displayWord(word); // display the word 
    
    // Display the feedback
    UI.displayFeedback(status.feedback);

    // Update countdown (not for the first time)
    if ( inputTriggered > 1 ) Game.countdown();

    // Check for change in game input and perform matching
    const hasMatched = gameInput.addEventListener('input', () => {

        // Increment the count 
        inputTriggered++;

        // Check if it is the first time input has been triggered 
        if (inputTriggered === 1) { 
            Game.countdown(); // Start the countdown timer
        }

        // Start matching
        Game.matchWords(gameInput.value);
    });

    // Check for game status (time running out and isPlaying) every 10ms
    setInterval(() => Game.checkStatus(), 10);
}

// Prevents default behaviour of form
function preventSubmission(e) {
    e.preventDefault();
}

// Restarts the Game 
function restartTheGame () {

    // Remove the restart and new user buttons from the DOM
    UI.displayRestartButton(false);
    UI.displayNewUser(false);

    // Reset the number of input triggered and the alerts 
    inputTriggered = 0;
    alertFirst = 0;
    alertSecond = 0;

    // Reset the score 
    status.score = 0;

    // Reset the feedback and the remark in the score modal
    status.feedback = '';
    scoreRemarks.innerHTML = '';
    status.showScoreModal = true;

    // Reset the high score position
    status.position = -1;

    // Call the init() function
    init();
}

// Removes the score modal and overlay 
function removeModal(e) {
    if (scoreModal.style.display === 'flex' && e.target.classList.contains('overlay')) {
        UI.displayOverlay(false); // remove the overlay
        UI.displayScoreModal(false); // remove the score modal
        UI.clearInput(); // clear the game input 
    }
    else if (instructionModal.style.display === 'flex' && e.target.classList.contains('overlay')) {
        UI.displayOverlay(false); // remove the overlay
        UI.displayInstructionModal(false); // remnove the score modal
    }
}   

// Shows all the high scores available 
function showMoreHighScores() {

    // Remove the See More Option
    UI.displaySeeMore(false);

    // Show all the high scores 
    UI.displayHighScores(highScoreConfig.total);

    // Add the See Less Option
    UI.displaySeeLess(true);
}

// Shows only the initial high scores 
function showLessHighScores() {

    // Remove the see less option
    UI.displaySeeLess(false);

    // Show only the initial high scores 
    UI.displayHighScores(highScoreConfig.initial);

    // Add the see more option
    UI.displaySeeMore(true);

}