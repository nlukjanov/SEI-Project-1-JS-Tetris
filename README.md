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
The app is deployed using heroku: [here](http://bit.ly/nl-sei1-heroku)

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


### Approach

#### Grid

The setup of the grid is an array of cells inside the div element of the certain width. The combination of cell size and container width controls how many cells you have in a row. In this case it is 10 cells per row and 24 rows.

```javascript
Array(height * width)
    .join('.')
    .split('.')
    .forEach((square, index) => {
      square = document.createElement('div')
      square.id = index
      square.classList.add('grid-item')
      squares.push(square)
      grid.appendChild(square)
    })
```
Due to the setup the boundaries have to be worked around, because if we do not fix the width of the container we will just have a long line of cells.

#### Tetrominoes

There are 7 shapes in the game. Shape is displayed by array of indexes that refer to the cell on the grid. To display the shape we add a class for each cell in the array with different background color. All tetrominoes except cube can rotate, which requires to change the indexes in the array of the shape. I have created a function for each shape and corresponding rotations.

```js
function createShape(shapeIndex, tetrominoShape) {
  if (tetrominoShape === 'stick') {
    return (currentIndexes = [
      shapeIndex,
      shapeIndex + 1,
      shapeIndex + 2,
      shapeIndex + 3
    ])
  } else if (tetrominoShape === 'stick180') {
    return (currentIndexes = [
      shapeIndex + 1,
      shapeIndex + 11,
      shapeIndex + 21,
      shapeIndex + 31
    ])
  } else if (tetrominoShape === 'lShape') {
    return (currentIndexes = [
      shapeIndex,
      shapeIndex + 10,
      shapeIndex + 20,
      shapeIndex + 21
    ])
    ...etc
```


#### Movements
To move the tetrominoes I have created key listening events that run the function that adds or subtracts 1 from the starting index of the shape, making the whole shape to move right or left.
To move the shapes down we need to add +10 to the starting index.
Moving is limited by the boundaries of the grid - left, right and bottom.
At the later stage when multiple tetrominoes are shown on the game board, the tetrominoes that are dropped and not active represent new boundaries for active tetromino movement.

For example to check for left edge I check if any cell of the shape has the index of the boundary. The boundary has all indexes with zero - 0, 10, 20 etc and indexes of the currently inactive dropped shapes. Same process is for the right and bottom edges.

```js
function checkLeftEdge(currentIndexes) {
  const bottomBoundaryIndexes = [...new Set(bottomBoundaryArray.flat())]
  const leftEdge = currentIndexes.filter(element => {
    return element % width === 0 || bottomBoundaryIndexes.includes(element - 1)
  })
  return leftEdge
}
```

#### Rotation

I have seen different systems to check for rotation and went with probably a little bit uncommon solution. I checked the amount of indexes that shape has close next the the boundaries (left, right, bottom and dropped shapes). This setup and the fact that shapes have different rotation point and rotation box size did not allow my fully generalise rotation rules. Cube does not rotate, I shape has 4x4 rotation box and other shapes rotate within 3x3 box. I had to make special cases for rotation near the edges for J Shape, I Shape and S shape. Essentially rotation is redrawing the new shape with different indexes in the array of current shape. Before the rotation happens boundaries are being checked and if the test is passed the shapes is redrawn.

Wall kicks were not implemented in my work.

```js
function checkRotation(currentIndexes) {
  const bottomEdge = checkBottomEdge(currentIndexes)
  if (bottomEdge.length === 0) {
    const rotationCheck = currentIndexes.filter(element => {
      return element % width === 9 || element % width === 0
    })
    return rotationCheck
  } else {
    return [0, 0, 0, 0]
  }
}
```


#### Game controls and adding timing

Further I have added function to create new tetromino when the current active is reaching the bottom and becomes dropped and inactive. At this point development process was slightly non linear as I had to go back to already written boundaries and rotation checks to add inactive tetrominoes to the boundaries array.

Automatic falling of the array was implemented by using setInterval function that runs the function moveDown, the same function that is run on the arrow down press.

At this point as the shapes were falling down automatically I have added helper function just to stop the movement in order to be able to run some checks in the browser. It was later refactored to handleStop function that stops the game.

I have added reset function to reset the game. It resets all necessary values for shape movements and boundaries and also removes the interval function.

#### Clearing completed rows

Clearing completed rows was last bit of the game logic. In order to implement it I have created rows with corresponding indexes and then check if every cell in the row has styling class of 'dropped'.
```js
function checkCompletedRow() {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].every(item => item.classList.contains('dropped')) // returns true or false
    let endOfCompletedRow
    if (row) {
      // can add points in this function
      linesRemoved++
      score = score + 100 * (level + 1) // increase score with level
      displayData()
      rows[i].forEach(item => {
        item.classList.remove('dropped')
        boundaryIndexesToRemove.push(Number(item.id))
        endOfCompletedRow = Math.max(...boundaryIndexesToRemove)
      })
      removeBoundaryIndexes()
      moveRows(endOfCompletedRow)
      changeGameLevel()
    }
  }
}
```

 If this is true the class 'dropped' is removed from these cells, the indexes of these cells are removed from the boundary array and the function moveRows is called. To move rows the function takes all cells with indexes less than the completed row and adds +10 to move them one step down. As the function is run for every row, in case if 2 or more rows are removed the upper cells move for corresponding amount of rows down.

 ```js
 function moveRows(endOfCompletedRow) {
  const cellsToMove = bottomBoundaryArray.filter(element => {
    return element < endOfCompletedRow
  })
  const updatedBoundary = bottomBoundaryArray.flat().map(element => {
    if (cellsToMove.includes(element)) {
      return element + 10
    } else {
      return element
    }
  })
  bottomBoundaryArray = updatedBoundary
  squares.forEach(square => square.classList.remove('dropped'))
  bottomBoundaryArray.forEach(cell => {
    const cellToAddClass = document.querySelector(`#${CSS.escape([cell])}`)
    cellToAddClass.classList.add('dropped')
  })
  playFX('lineRemoved')
}
```

At this point I also add scoring, counting for removed lines and increasing game level. The more lines remove the higher level of the game. Higher level of the game increases score multiple for completed rows and increases the music speed, which is quite fun :)
Player also get score for pressing down arrow, as it essentially speeds up the game.

```js
function changeGameLevel() {
  if (linesRemoved < 2) {
    gameSpeed = 600
    level = 0
  } else if (linesRemoved < 4) {
    gameSpeed = 550
    level = 1
  } else if (linesRemoved < 6) {
    gameSpeed = 500
    level = 2
  ... etc
```
To check for game over I have created game over array that has the top row indexes, from 0 to 9. Then I check if the boundary indexes array that has all the dropped shapes includes element from the game over array. If this is true the game is stopped.

#### Score Recording
After the game is over prompt window is shown asking you to enter your name. Your name and score is then stored in array of object with name and scores. Then I create another array with 3 highest scores and those results are displayed. So in fact all the scores are being stored and can be access if required. They are also stored in the local storage until cleared.

```js
function recordScore() {
  const playerScore = {}
  const playerName = prompt('Please enter your name')
  playerScore.name = playerName
  playerScore.score = score
  leaderBoard.push(playerScore)
  storeScores()
  displayLeaderBoard()
}

function displayLeaderBoard() {
  const currentLeaderBoard = storedLeaderBoard ? storedLeaderBoard : leaderBoard
  const sortedTop3 = currentLeaderBoard
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
  console.log('sortedTop3', sortedTop3)
  const names = []
  const scores = []
  if (sortedTop3.length !== 0) {
    for (let i = 0; i < sortedTop3.length; i++) {
      names[i] = document.querySelector(`#name${CSS.escape([i + 1])}`)
      scores[i] = document.querySelector(`#score${CSS.escape([i + 1])}`)
      names[i].innerHTML = sortedTop3[i].name
      scores[i].innerHTML = sortedTop3[i].score
    }
  }
}
```

#### Audio

To run audio I use to audio tags, one for music that has to play all the time and another one for sound effects - rotation, move and row clearing. Music tag has constant source and sound effect tags sets the source to correct sound depending on the effect required. I have a small bug here, where sound effects overlap if for example you press down when the row is cleared, therefore only one sound is played. This can be solved using promises in the functions.

#### Design
I didn't spend much time on design as I was more interested in adding as much technical features as I could. I just used color palette design website to pick some bright matching colors and aligned the blocks.

### Wins
* It Works! 
* Built fully functional game with all the main features and some extra.
* Tetris logic was quite difficult to translate into code. There are many if-else statements for when tetrominoes can move or rotate and when they cannot.
* I'm happy with the result and how it works.
* There are no significant bugs (only sound effect bug) and all the features work as they should.
* Leader Board for top 3 players (can be any number of players)

### Challenges
* To start with an empty file.
  
  It was a little bit difficult to start with an empty file. I didn't want to go googling for help, so I spend a good amount of time planning and writing steps that I need to implement. Then I was focusing on each step at the time - create grid, create shape, move shape, rotate and so on.
* Generalize rules for moves and rotations.

  Because the tetrominoes take up different space on the game board and have different shape it was difficult to write general case for all movements and rotations, I had to think of special conditions for certain shapes.
* Clearing completed row and moving the pieces down.
* Styling. I didn't spend much time on design and styling therefore it looks a bit plain.

### Future features
* Refactor! Even though I did some refactoring and organized code I can see how it can be improved.
* Display of the upcoming shape
* Touch controls
* Mobile first responsive design
* Include rotate left
* 'Store shape for later' function
* 2 players on the same screen

### Key learnings

I am happy with the technical features of the project and it was very good lesson to plan in advance before coding, not to freeze in front of the blank page and just start writing down step by step instruction for myself. It was interesting to see how it started as linear step by step process, but as I have been adding code I had to go back to previous functions and add some logic there for everything to work properly. Also it was nice to see how much can be done in one week.