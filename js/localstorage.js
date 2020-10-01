class Storage {

    static getScores() {

        let highscores = [];

        if (localStorage.getItem('highscores') !== null) {
            highscores = JSON.parse(localStorage.getItem('highscores'));
        }

        return highscores;
    }

    static addScores(user, index) {

        // Get the high scores 
        let highscores = this.getScores();
        
        // Insert the current user in the specified index 
        highscores.splice(index, 0, user); // index, no. of items to be deleted, item

        // Remove the 11th high score (if any)
        if (highscores.length > highScoreConfig.total) 
            highscores.splice(highScoreConfig.total, 1);

        // Update the high scores to the local storage 
        localStorage.setItem('highscores', JSON.stringify(highscores));
    }

    static removeScores (index) {

        // Get the high scores 
        let highscores = this.getScores();

        // Remove the user from the specified index 
        highscores.splice(index, 1);

        // Update the modified high scores to the local storage 
        localStorage.setItem('highscores', JSON.stringify(highscores));
    }

}