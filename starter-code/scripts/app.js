// game board variables
const squares = []
const width = 10
const height = 24

// game variables
let shapeIndex = 4
let currentIndexes
let gameSpeed = 600
let cell0
let cell1
let cell2
let cell3
const shape = [cell0, cell1, cell2, cell3]
const arrayOfShapes = [
  'stick',
  'stick180',
  'lShape',
  'jShape',
  'sShape',
  'sShape90',
  'tShape',
  'cube'
]
let score = 0
let level = 0
let linesRemoved = 0
const gameOverIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// const gameOverIndexes = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
let gameOverStatus = false
const rows = []
let bottomBoundaryArray = []
let boundaryIndexesToRemove = []
let timerId
let random = Math.floor(Math.random() * 7)
let tetrominoShape = arrayOfShapes[random]

//display variables
let gameOverDisplay
let scoreDisplay
let linesRemovedDisplay
let levelDisplay

// create game board
function createGameBoard() {
  gameOverDisplay = document.querySelector('#gameOver')
  scoreDisplay = document.querySelector('#score')
  linesRemovedDisplay = document.querySelector('#lines')
  levelDisplay = document.querySelector('#level')
  const startBtn = document.querySelector('#startBtn')
  startBtn.addEventListener('click', handleStart)
  const grid = document.querySelector('.grid')

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
}

// creation of tetromino

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
  } else if (tetrominoShape === 'lShape90') {
    return (currentIndexes = [
      shapeIndex + 9,
      shapeIndex + 10,
      shapeIndex + 11,
      shapeIndex + 19
    ])
  } else if (tetrominoShape === 'lShape180') {
    return (currentIndexes = [
      shapeIndex - 1,
      shapeIndex,
      shapeIndex + 10,
      shapeIndex + 20
    ])
  } else if (tetrominoShape === 'lShape270') {
    return (currentIndexes = [
      shapeIndex + 1,
      shapeIndex + 9,
      shapeIndex + 10,
      shapeIndex + 11
    ])
  } else if (tetrominoShape === 'jShape') {
    return (currentIndexes = [
      shapeIndex,
      shapeIndex + 10,
      shapeIndex + 20,
      shapeIndex + 19
    ])
  } else if (tetrominoShape === 'jShape90') {
    return (currentIndexes = [
      shapeIndex - 1,
      shapeIndex + 9,
      shapeIndex + 10,
      shapeIndex + 11
    ])
  } else if (tetrominoShape === 'jShape180') {
    return (currentIndexes = [
      shapeIndex,
      shapeIndex + 1,
      shapeIndex + 10,
      shapeIndex + 20
    ])
  } else if (tetrominoShape === 'jShape270') {
    return (currentIndexes = [
      shapeIndex + 9,
      shapeIndex + 10,
      shapeIndex + 11,
      shapeIndex + 21
    ])
  } else if (tetrominoShape === 'sShape') {
    return (currentIndexes = [
      shapeIndex,
      shapeIndex + 1,
      shapeIndex + 9,
      shapeIndex + 10
    ])
  } else if (tetrominoShape === 'sShape90') {
    return (currentIndexes = [
      shapeIndex,
      shapeIndex + 10,
      shapeIndex + 11,
      shapeIndex + 21
    ])
  } else if (tetrominoShape === 'zShape') {
    return (currentIndexes = [
      shapeIndex - 1,
      shapeIndex,
      shapeIndex + 10,
      shapeIndex + 11
    ])
  } else if (tetrominoShape === 'zShape90') {
    return (currentIndexes = [
      shapeIndex,
      shapeIndex + 9,
      shapeIndex + 10,
      shapeIndex + 19
    ])
  } else if (tetrominoShape === 'tShape') {
    return (currentIndexes = [
      shapeIndex - 1,
      shapeIndex,
      shapeIndex + 1,
      shapeIndex + 10
    ])
  } else if (tetrominoShape === 'tShape90') {
    return (currentIndexes = [
      shapeIndex - 10,
      shapeIndex - 1,
      shapeIndex,
      shapeIndex + 10
    ])
  } else if (tetrominoShape === 'tShape180') {
    return (currentIndexes = [
      shapeIndex - 10,
      shapeIndex - 1,
      shapeIndex,
      shapeIndex + 1
    ])
  } else if (tetrominoShape === 'tShape270') {
    return (currentIndexes = [
      shapeIndex - 10,
      shapeIndex,
      shapeIndex + 1,
      shapeIndex + 10
    ])
  } else if (tetrominoShape === 'cube') {
    return (currentIndexes = [
      shapeIndex,
      shapeIndex + 1,
      shapeIndex + 10,
      shapeIndex + 11
    ])
  }
}

function getCells(currentIndexes) {
  for (let i = 0; i < currentIndexes.length; i++) {
    shape[i] = document.querySelector(`#${CSS.escape(currentIndexes[i])}`)
  }
}

function showShape(currentIndexes) {
  squares.forEach(square => square.classList.remove('black'))
  getCells(currentIndexes)
  colorShape()
}
function colorShape() {
  for (let i = 0; i < shape.length; i++) {
    shape[i].classList.add('black')
  }
}

// freezing a tetromino when it is dropped

function fixDroppedShape() {
  for (let i = 0; i < shape.length; i++) {
    shape[i].classList.add('dropped')
  }
}

function droppedShape(currentIndexes) {
  getCells(currentIndexes)
  fixDroppedShape()
}

// checking boundaries for movement
function checkLeftEdge(currentIndexes) {
  const leftEdge = currentIndexes.filter(element => {
    return element % width === 0
  })
  return leftEdge
}

function checkRightEdge(currentIndexes) {
  const rightEdge = currentIndexes.filter(element => {
    return element % width === 9
  })
  return rightEdge
}

function checkBottomEdge(currentIndexes) {
  const bottomEdge = currentIndexes.filter(element => {
    const bottomBoundaryIndexes = [...new Set(bottomBoundaryArray.flat())]
    return (
      (element >= 230 && element < 240) ||
      bottomBoundaryIndexes.includes(element + 10)
    )
  })
  return bottomEdge
}

// tetromino movements
function moveLeft() {
  const leftEdge = checkLeftEdge(currentIndexes)
  if (leftEdge.length === 0) {
    shapeIndex--
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  }
}

function moveRight() {
  const rightEdge = checkRightEdge(currentIndexes)
  if (rightEdge.length === 0) {
    shapeIndex++
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  }
}

function moveDown() {
  const bottomEdge = checkBottomEdge(currentIndexes)
  checkCompletedRow()
  checkGameOver()
  if (gameOverStatus === false) {
    if (bottomEdge.length === 0) {
      shapeIndex = shapeIndex + 10
      createShape(shapeIndex, tetrominoShape)
      showShape(currentIndexes)
    } else {
      clearInterval(timerId)
      droppedShape(currentIndexes)
      bottomBoundaryArray.push(currentIndexes)
      spawnNewTetromino()
    }
  }
}

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

function rotate() {
  const previousShape = tetrominoShape

  if (tetrominoShape === 'stick') {
    tetrominoShape = 'stick180'
  } else if (tetrominoShape === 'stick180') {
    tetrominoShape = 'stick'
  } else if (tetrominoShape === 'lShape') {
    tetrominoShape = 'lShape90'
  } else if (tetrominoShape === 'lShape90') {
    tetrominoShape = 'lShape180'
  } else if (tetrominoShape === 'lShape180') {
    tetrominoShape = 'lShape270'
  } else if (tetrominoShape === 'lShape270') {
    tetrominoShape = 'lShape'
  } else if (tetrominoShape === 'lShape270') {
    tetrominoShape = 'lShape'
  } else if (tetrominoShape === 'jShape') {
    tetrominoShape = 'jShape90'
  } else if (tetrominoShape === 'jShape90') {
    tetrominoShape = 'jShape180'
  } else if (tetrominoShape === 'jShape180') {
    tetrominoShape = 'jShape270'
  } else if (tetrominoShape === 'jShape270') {
    tetrominoShape = 'jShape'
  } else if (tetrominoShape === 'sShape') {
    tetrominoShape = 'sShape90'
  } else if (tetrominoShape === 'sShape90') {
    tetrominoShape = 'sShape'
  } else if (tetrominoShape === 'zShape') {
    tetrominoShape = 'zShape90'
  } else if (tetrominoShape === 'zShape90') {
    tetrominoShape = 'zShape'
  } else if (tetrominoShape === 'tShape') {
    tetrominoShape = 'tShape90'
  } else if (tetrominoShape === 'tShape90') {
    tetrominoShape = 'tShape180'
  } else if (tetrominoShape === 'tShape180') {
    tetrominoShape = 'tShape270'
  } else if (tetrominoShape === 'tShape270') {
    tetrominoShape = 'tShape'
  }

  createShape(shapeIndex, tetrominoShape)
  const rotationCheck = checkRotation(currentIndexes)
  const bottomEdge = checkBottomEdge(currentIndexes)
  if (tetrominoShape === 'sShape' || tetrominoShape === 'stick') {
    if (rotationCheck.length < 2 && bottomEdge.length < 2) {
      showShape(currentIndexes)
    } else {
      tetrominoShape = previousShape
      createShape(shapeIndex, tetrominoShape)
      showShape(currentIndexes)
    }
  } else {
    if (rotationCheck.length <= 2 && bottomEdge.length < 2) {
      showShape(currentIndexes)
    } else {
      tetrominoShape = previousShape
      createShape(shapeIndex, tetrominoShape)
      showShape(currentIndexes)
    }
  }
}

// game controls

function handleStart() {
  resetGame()
  spawnNewTetromino()
  createRows()
  window.addEventListener('keydown', handleKeyDown)
}

function spawnNewTetromino() {
  createNewTetromino()
  timerId = setInterval(moveDown, gameSpeed)
}

function handleStop() {
  clearInterval(timerId)
  window.removeEventListener('keydown', handleKeyDown)
}

function resetGame() {
  shapeIndex = 4
  currentIndexes
  gameSpeed = 600
  score = 0
  level = 0
  linesRemoved = 0
  bottomBoundaryArray = []
  boundaryIndexesToRemove = []
  clearInterval(timerId)
  squares.forEach(square => square.classList.remove('dropped'))
  displayData()
}

function displayData() {
  scoreDisplay.innerHTML = score
  linesRemovedDisplay.innerHTML = linesRemoved
  levelDisplay.innerHTML = level
}

function createNewTetromino() {
  shapeIndex = 4
  random = Math.floor(Math.random() * 7)
  tetrominoShape = arrayOfShapes[random]
  createShape(shapeIndex, tetrominoShape)
  showShape(currentIndexes)
}

// removal of completed rows

function createRows() {
  for (let i = 0; i < height; i++) {
    rows[i] = []
    for (let j = 0; j < width; j++) {
      rows[i].push(squares[i * width + j])
    }
  }
}

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

function removeBoundaryIndexes() {
  const updatedBoundary = bottomBoundaryArray.flat().filter(element => {
    return !boundaryIndexesToRemove.includes(element)
  })
  bottomBoundaryArray = updatedBoundary
  boundaryIndexesToRemove = []
}

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
}

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
  } else if (linesRemoved < 8) {
    gameSpeed = 450
    level = 3
  } else if (linesRemoved < 10) {
    gameSpeed = 400
    level = 4
  } else if (linesRemoved < 12) {
    gameSpeed = 350
    level = 5
  } else if (linesRemoved < 14) {
    gameSpeed = 300
    level = 6
  } else if (linesRemoved < 16) {
    gameSpeed = 250
    level = 7
  } else if (linesRemoved < 20) {
    gameSpeed = 200
    level = 8
  } else if (linesRemoved < 25) {
    gameSpeed = 100
    level = 9
  }
}

function checkGameOver() {
  gameOverIndexes.forEach(element => {
    if (bottomBoundaryArray.flat().includes(element)) {
      gameOverStatus = true
      handleStop()
      gameOverDisplay.innerHTML = 'Game Over'
    }
  })
}


// key press handlers
function handleKeyDown(e) {
  switch (e.keyCode) {
    //left
    case 37:
      moveLeft()
      break
    //up
    case 38:
      rotate()
      break
    //right
    case 39:
      moveRight()
      break
    //down
    case 40:
      // if you press down you get score
      score++
      scoreDisplay.innerHTML = score
      moveDown()
      break
    default:
  }
}



window.addEventListener('DOMContentLoaded', createGameBoard)
