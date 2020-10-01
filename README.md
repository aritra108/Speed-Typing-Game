# Speed-Typing-Game
You will be given a word which you have to type within the given time limit. If you succeed, you will get points, try again otherwise.

Game Mechanism:
1. You have to enter your name before starting.
2. Then you get an instructions modal, which will tell you in detail of the different levels in the game and scoring criteria of the same.
3. You will be given a random word and a time limit within which you have to type that word correctly.
4. A timer with the limit starts as soon as you begin typing, stops when the words match and again starts as the next word loads.
5. Your final scores will be judged and placed in the high scores, if eligible.
6. Once you fail to type a particular word within the limit, a modal comes up which tells you about your score, bonus(if any). If you make it to the high
   scores you get to know about your position, or else you get the number of points you are away from the score of the last user in the high scores.
7. Finally, you get the option of restarting the game with the same username, or else with a new username.

Logic Implementation:
1. Random word is generated using the Fetch API. An open-source API is ised to fetch the words. There are over 200k valid English words. You can find them in my JSON file.
2. A countdown timer is implemented using the JS Date and TIme Functions.
3. High Scores are stored using the Local Storage.
4. The position where a new score is to be placed is calculated using Binary Search Algorithm.
5. A counting animation is provided to the score which is calculated after the game.
6. Additionally, the website has responsive and width.

Technologies Used:
1. HTML
2. CSS
3. Media Queries 
4. Vanilla Javascript 

All the game settings are stored inside a config file. You can change them if you wish.

The application can be made dynamic by storing the high scores in a database and using a run-time environment. Also, the Frontend will be more robust if a frontend framework is used. These are the improvements which I look forward to make in future.
