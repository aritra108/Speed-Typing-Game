// Class Game: Handles all the game operations
class Game {

    // Returns a random english word
    static async getWord() {  
        const result = await fetch('../json/words.json')
            .then(res => res.json())
            .then(data => {
                return data[Math.floor(Math.random() * totalWords)];
            })
            .catch(err => console.log(err));
        return (result);
    }

    // Starts a timer 
    static countdown () {

        // Calculate the target time 
        const target = new Date().getTime() + status.limit * 1000;

        interval = setInterval(() => {

            const now = new Date().getTime(); // Calculate the present time 

            const distance = target - now; // Get the distance 
            
            if (distance < 0) {
                status.secondsLeft = 0;
                status.millisecondsLeft = 0;
                status.isPlaying = false; // Set the game status to FALSE if time limit is over
            } else {
                status.secondsLeft =  Math.floor((distance % (1000 * 60)) / 1000); // Calculate the secs left
                status.millisecondsLeft = Math.floor(distance % 1000); // Calculate the millisecs left
            }
            
            // Display in the DOM
            UI.displayTimeLeft();

        }, 50); 

    }

    // Matches the input word with the given random word 
    static matchWords(typedWord) {
        
        if (typedWord === status.word && status.isPlaying === true) {

            // Update the score in the status 
            status.score += status.scoreIncrementFactor;

            // Show Feedback 
            UI.displayFeedback('Words Matched');

            // Call the init() function
            init();
        }

    }

    // Updates the difficulty, limit, time limit and bonus score of the game 
    static updateStatus() {

        if ( status.score < landmarks.first ) {

            status.difficulty = difficulties.first; // Update the difficulty 
            status.limit = levels.first; // Update the limit 
            status.secondsLeft = levels.first; // Update the seconds left
            status.millisecondsLeft = 0; // Update the milliseconds left 
            status.bonus = bonuses.first; // Update the bonus score 
            status.scoreIncrementFactor = incrementFactors.first; // Update the score increment factor 

        } else if ( status.score >= landmarks.first && status.score < landmarks.second ) {

            status.difficulty = difficulties.second; 
            status.limit = levels.second; 
            status.secondsLeft = levels.second; 
            status.millisecondsLeft = 0; 
            status.bonus = bonuses.second; 
            status.scoreIncrementFactor = incrementFactors.second; 

            if (alertFirst === 0) { // When the user enters te difficulty for the first time 
                UI.displayDifficultyAlert();
                alertFirst++;
            }

        } else {

            status.difficulty = difficulties.third; 
            status.limit = levels.third; 
            status.secondsLeft = levels.third; 
            status.millisecondsLeft = 0; 
            status.bonus = bonuses.third; 
            status.scoreIncrementFactor = incrementFactors.third;

            if (alertSecond === 0) {
                UI.displayDifficultyAlert();
                alertSecond++;
            }
        }

    }

    // Find the index where the new score (if eligible) is to be placed - Binary search
    static findIndex (currUser, users) {
        
        let start = 0, end = users.length - 1, mid, index;

        if (users.length === 0) {
            index = 0;
        } 

        else {

            while (start <= end) {

                mid = Math.floor((start + end) / 2); // Calculate mid 

                if (currUser.score <= users[mid].score) start = mid + 1; // If user score less than or equal to mid score  

                else if (currUser.score > users[mid].score) end = mid - 1; // If user score greater than mid score 

            }

            // Calculate the index from the value of mid 
            if (currUser.score > users[mid].score) index = mid;
            else index = mid + 1;
        }

        return index;
    }

    // Find duplicates of an user in the leaderboard 
    static findDuplicate (currUser, users) {
        let duplicateIndex = -1;
        users.forEach((user, index) => {
            if (currUser.name === user.name) {
                duplicateIndex = index;
            }
        });
        return duplicateIndex;
    }

    static updateHighScore() {

        // Get the current score and create a new User object 
        const currUser = new User (status.name, status.score);

        // Get all the high scores stored locally
        const users = Storage.getScores();
        const length = users.length;

        // Check for duplicate 
        const duplicateIndex = this.findDuplicate(currUser, users);

        if (duplicateIndex != -1) { // Some duplicate exists
            if (currUser.score <= users[duplicateIndex].score) { // current score less than previous score 
                status.position = -2;
                return;
            }
            else Storage.removeScores(duplicateIndex); // current score more than previous score
        }

        // Find the index where the new user may be inserted 
        const index = this.findIndex(currUser, users);

        // The current score did not make it to the high scores 
        if ( index >= highScoreConfig.total ) {
            return;
        }

        // Store the position of the user in the high score  
        status.position = index;

        // Add the score to the storage
        Storage.addScores(currUser, index);

        // Display the initialHighScores in the DOM
        UI.displayHighScores(highScoreConfig.initial);
    }

    // Checks the status of the game 
    static checkStatus() {

        if (status.isPlaying === false && status.showScoreModal === true) {

            // Show "Game Over" in the feedback
            UI.displayFeedback('Game Over');
            
            // Show the score modal and the overlay

            UI.displayOverlay(true); // Show an overlay  
            UI.displayScoreModal(true); // Display the score modal   
            setTimeout(() => UI.displayScoreModalScore(0), 700); // Show final score in the modal   

            if (status.bonus > 0) { // If there is a bonus, 
                    setTimeout(() => UI.displayScoreModalBonusScore(), 1700); 
                    setTimeout(() => {
                        status.score += status.bonus; // Update the score
                        UI.displayScoreModalScore(status.score - status.bonus)
                    }, 3000);
            }            

            setTimeout(() => {
                this.updateHighScore(); // Check for high score 
            }, 3100); 

            setTimeout(() => {
                UI.displayScoreModalRemark(); // Show remark in the modal
            }, 3300)
            
            status.showScoreModal = false; // So that the modal is not shown again and again

            // Show the "Restart Game" option
            UI.displayRestartButton(true);

            // Show the "New User" option
            UI.displayNewUser(true);
        }

    }
}