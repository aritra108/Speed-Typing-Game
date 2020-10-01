// Class UI: Handles all the UI operations 
class UI {

    // Overlay
    static displayOverlay (flag) {
        if (flag === true) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.style.opacity = 1, 100);
        }
        else {
            setTimeout(() => overlay.style.display = 'none', 700);
            overlay.style.opacity = 0;
        }
    }

    // Introduction overlay
    static showIntro () {
        intro.style.display = 'flex';
        setTimeout(() => intro.style.opacity = 1, 500);
    }

    static removeIntro () {        
        intro.style.opacity = 0;
        setTimeout(() => intro.style.display = 'none', 200);
    }

    // DOM elements that are updated after every right answer
    static displayWord(word) {
        givenWord.innerHTML = word;
    }

    static displayLimit() {
        limit.innerHTML = status.limit;
    }

    static displayTimeLeft() {
        seconds.innerHTML = status.secondsLeft;
        milliseconds.innerHTML = Math.floor(status.millisecondsLeft / 10);

        // Formatting the output 
        if (seconds.innerHTML.length === 1) seconds.innerHTML = '0' + seconds.innerHTML;
        if (milliseconds.innerHTML.length === 1) milliseconds.innerHTML = '0' + milliseconds.innerHTML;
    }

    static displayFeedback (msg) {

        let addClass = '', feedbackText = '';

        // Choose the correct class to be added 
        if (msg === 'Game Over') {
            addClass = 'failure-text';
            feedbackText = 'Game Over, please try again!';
        }
        else if (msg === 'Words Matched') {
            addClass = 'success-text';
            feedbackText = 'Words matched, keep it up!';
        }

        // Prepare the HTML to be added 
        const html = `
            <p class = '${addClass}'>${feedbackText}</p>
        `;

        // Add the HTML to the DOM
        feedback.innerHTML = html;
    }

    static displayDifficulty (level) {
        difficulty.innerHTML = level;
    }

    static displayScore (sc) {
        score.innerHTML = sc;
    }

    static displayLoader (flag) {
        if (flag === true) wordLoader.style.display = 'block';
        else wordLoader.style.display = 'none';
    }

    // Display the restart and new user button
    static displayRestartButton (flag) {
        if (flag === false) restartGame.style.display = 'none';
        else restartGame.style.display = 'inline-block';
    }

    static displayNewUser (flag) {
        if (flag === false) newUser.style.display = 'none';
        else newUser.style.display = 'inline-block';
    }

    // Instruction Modal 
    static displayInstructionModal (flag) {
        if (flag === true) {

            // Create the dynamic scoring system 
            const scores_html = `
                <li>${landmarks.first}</li>
                <li>${landmarks.second}</li>
                <li>${landmarks.third}</li>
            `;
            scoreList.innerHTML = scores_html;

            const difficulty_html = `
                <li>${difficulties.first}</li>
                <li>${difficulties.second}</li>
                <li>${difficulties.third}</li>
            `;
            difficultyList.innerHTML = difficulty_html;

            const points_html = `
                <li>${incrementFactors.first}</li>
                <li>${incrementFactors.second}</li>
                <li>${incrementFactors.third}</li>
            `;
            pointsList.innerHTML = points_html;

            const limit_html = `
                <li>${levels.first}</li>
                <li>${levels.second}</li>
                <li>${levels.third}</li>
            `;
            timeLimitList.innerHTML = limit_html;

            const bonus_html = `
                <li>${bonuses.first}</li>
                <li>${bonuses.second}</li>
                <li>${bonuses.third}</li>
            `;
            bonusList.innerHTML = bonus_html;

            instructionModal.style.display = 'flex';
            setTimeout(() => instructionModal.style.opacity = 1, 500);
        } else {
            instructionModal.style.opacity = 0;
            setTimeout(() => instructionModal.style.display = 'none', 500);
            setTimeout(() => UI.displayOverlay(false), 200); // Remove the overlay
        }
    }

    // Score Modal
    static displayScoreModal (flag) {
        if (flag === true) {
            scoreModal.style.display = 'flex';
            setTimeout(() => scoreModal.style.opacity = 1, 500);
        } else {
            scoreModal.style.opacity = 0;
            setTimeout(() => scoreModal.style.display = 'none', 200);
        }
    }

    static displayScoreModalScore (start) {

        // Base Case 
        if (status.score === 0) {
            animatedCounter.innerHTML = 0;
            return;
        }

        // Calculation of the speed according to the size of the score 
        const countingPeriod = countingAnimationTime / status.score; 

        let i = start;
        const countingInterval = setInterval(() => {

            // Increment i
            i += 1;

            // If i is greater than the score, then clear the interval and return 
            if (i > status.score) {
                clearInterval(countingInterval);
                return;
            }

            // Update the DOM
            animatedCounter.innerHTML = i;

        }, countingPeriod);
    }

    static displayScoreModalBonusScore () {
        bonusScore.innerHTML = `
            Bonus Score: <span id="bonus">${status.bonus}</span> +
        `;
        setTimeout(() => bonusScore.innerHTML = '', 5000);
    }

    static displayScoreModalRemark () {
        if (status.position === -1) { // The user has not made it to the high scores 

            // Get the score of the bottommost user in the high scores 
            const threshold = Storage.getScores()[Storage.getScores().length - 1].score;
            
            // Find the difference between threshold and current score 
            const difference = threshold - status.score;

            // Create the html 
            const html = `
                You are only ${difference} point(s) away from the high scores. Try Again!
            `;

            // Add it to the DOM
            scoreRemarks.innerHTML = html;

        } else if (status.position === -2){ // The score has made it but it's previous score is more than the current one
            const html = `You could not beat your <strong>previous score</strong>. Try Again!`;
            scoreRemarks.innerHTML = html;
        } else { // The user has made it to the high scores 

            // Create the html
            const html = `
                <strong>Congratulations,</strong> you have secured <span class = 'highlight'>position ${status.position + 1}</span> in the high scores.
            `;

            // Add the html to the DOM
            scoreRemarks.innerHTML = html;

        }
    }

    // Displays the high scores in the DOM
    static displayHighScores(count) {

        // Get the users in the high scores from the local storage (only the first "count")
        const highscores = Storage.getScores().slice(0, count);

        // Create the html of the first "count" users 
        let names = '', scores = '';
        highscores.forEach(user => {

            names += `
                <li class="high-score-names">${user.name}</li>
            `;

            scores += `
                <li class="high-scores">${user.score}</li>
            `;

        });

        // Add the HTML to the DOM
        highScoreNames.innerHTML = names;
        highScores.innerHTML = scores;
    }

    // See More and See Less
    static displaySeeMore (flag) {
        if (flag === false) seeMore.style.display = 'none';
        else seeMore.style.display = 'block';
    }

    static displaySeeLess (flag) {
        if (flag === false) seeLess.style.display = 'none';
        else seeLess.style.display = 'block';
    }

    // Difficulty Alert 
    static displayDifficultyAlert () {

        // Create the html 
        const html = `
            Difficulty increased to <span class = "highlight">${status.difficulty}</span>!
        `

        // Push it to the DOM
        difficultyAlert.innerHTML = html;

        // Change the position
        difficultyAlert.style.top = '5%';

        // Reset the position after 1s
        setTimeout(() => difficultyAlert.style.top = '-5%', 2000);
    }

    // Clears the input 
    static clearInput() {
        gameInput.value = '';
    }
    
}