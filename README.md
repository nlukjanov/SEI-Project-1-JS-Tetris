## Software Engineering Immersive at General Assembly London - Project 1

### Goal: To create a grid based game using plain JavaScript, HTML and CSS

### Brief: [SEI GA Project 1 brief](tetris.md)

### Time frame: 6 days
---

### Technologies used
* JavaScript (ES6)
* HTML5
* CSS3

### Deployment
The app is deployed using github pages: [https://nlukjanov.github.io/sei-project-1/]()

### Game features
* Shapes rotate clockwise by pressing UP
* Scoring is based on lines cleared. 
* Levels increase based on lines cleared.
* At higher levels you get more points for clearing the lines. Music also plays faster.
* You also get points for pressing down as you are speeding up your own game.
* The game can be started by pressing start button or space bar and stopped by pressing stop button
* After the game is started shapes appear at the top of the game grid (hence the size is 10x24) and start falling down.
* If a shape reaches bottom boundary it is considered dropped. It changes color and become boundary for further tetrominos.
* If the line is completed, then the blocks are cleared, and the remaining dropped blocks move down.
* The game is over if any cell of a shape reaches the top edge of the grid.
* After the game is over you are prompted to enter your name.
* Your name and score will be recorded in the local storage until cleared.

---
### Game logic

#### Grid

#### Tetrominoes

#### Movements

* checking for boundaries
* actual movements

#### Rotation

* checking for boundaries
* special cases for jShape and stick

#### Game controls and adding timing
* setInterval

#### Clearing completed rows
* removing indexes from boundary
* moving rows
* adding score 
* changing game level
* check for game over

#### Score Recording
* using object to store all records

#### Audio


### Wins
* It Works!
* Tetris logic was quite difficult to translate into code. There are many if-else statements for when tetrominoes can move or rotate and when they cannot.
* I'm happy with the result and how it works.
* There are no bugs and all the features work as they should.
* Leader Board for top 3 players (can be any number of players)

### Challenges
* To start with an empty file
* Generalize rules for moves and rotations.
* Special cases for certain shape - J Shape and I Shape
* Clearing completed row and moving the pieces down
* Styling. I didn't spend much time on design and styling therefore it looks a bit plain.


### Future features
* Refactor! Even though I did some refactoring and organized code I can see how it can be improved.
* Display of the upcoming shape
* Touch controls
* Mobile first responsive design
* Include rotate left
* 'Store shape for later' function
* 2 players on the same screen