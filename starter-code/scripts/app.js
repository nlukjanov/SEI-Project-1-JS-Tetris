// const game = {}
const squares = []
const width = 10
const height = 24
let shapeIndex = 4
let currentIndexes
let cell0
let cell1
let cell2
let cell3
const shape = [cell0, cell1, cell2, cell3]
const arrayOfShapes = [
  'stick',
  'stick180',
  'lShape',
  'lShape90',
  'lShape180',
  'lShape270',
  'jShape',
  'sShape',
  'zShape',
  'tShape',
  'cube'
]

const gameOverIndexes = [40,41,42,43,44,45,46,47,48,49]
let gameOver = false

const rows = []

let random = Math.floor(Math.random() * 11)
let tetrominoShape = arrayOfShapes[random]
let bottomBoundaryArray = []
let boundaryIndexesToRemove = []
let timerId

function createGameBoard() {
  const startBtn = document.querySelector('#startBtn')
  const stopBtn = document.querySelector('#stopBtn')
  startBtn.addEventListener('click', handleStart)
  stopBtn.addEventListener('click', handleStop)
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
  console.log(currentIndexes)
}

function droppedShape(currentIndexes) {
  getCells(currentIndexes)
  fixDroppedShape()
}

function fixDroppedShape() {
  for (let i = 0; i < shape.length; i++) {
    shape[i].classList.add('dropped')
  }
}

function colorShape() {
  for (let i = 0; i < shape.length; i++) {
    shape[i].classList.add('black')
  }
}

function checkLeftEdge(currentIndexes) {
  const leftEdge = currentIndexes.filter(element => {
    return element % width === 0
  })
  return leftEdge
}

function moveLeft() {
  const leftEdge = checkLeftEdge(currentIndexes)
  if (leftEdge.length === 0) {
    shapeIndex--
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  }
}

function checkRightEdge(currentIndexes) {
  const rightEdge = currentIndexes.filter(element => {
    return element % width === 9
  })
  return rightEdge
}

function moveRight() {
  const rightEdge = checkRightEdge(currentIndexes)
  if (rightEdge.length === 0) {
    shapeIndex++
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  }
}

function handleStart() {
  createNewTetromino()
  timerId = setInterval(moveDown, 200)
  createRows()
}

function handleStop() {
  clearInterval(timerId)
}

function createNewTetromino() {
  shapeIndex = 4
  random = Math.floor(Math.random() * 11)
  tetrominoShape = arrayOfShapes[random]
  createShape(shapeIndex, tetrominoShape)
  showShape(currentIndexes)
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
    let startOfCompletedRow
    if (row) {
      // can add points in this function
      rows[i].forEach(item => {
        item.classList.remove('dropped')
        boundaryIndexesToRemove.push(Number(item.id))
        startOfCompletedRow = Math.max(...boundaryIndexesToRemove)
      })
      removeBoundaryIndexes()
      moveRows(startOfCompletedRow)
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

function moveRows(startOfCompletedRow) {
  console.log('bottomBoundaryArray', bottomBoundaryArray)
  console.log(startOfCompletedRow)
  const cellsToMove = bottomBoundaryArray.filter(element => {
    return element < startOfCompletedRow
  })
  console.log('cellsToMove', cellsToMove)
  const updatedBoundary = bottomBoundaryArray.flat().map(element => {
    if (cellsToMove.includes(element)) {
      console.log('element', element)
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
  console.log('bottomBoundaryArray', bottomBoundaryArray)
}

function moveDown() {
  const bottomEdge = checkBottomEdge(currentIndexes)
  if (bottomEdge.length === 0) {
    shapeIndex = shapeIndex + 10
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else {
    clearInterval(timerId)
    droppedShape(currentIndexes)
    bottomBoundaryArray.push(currentIndexes)
    handleStart()
  }
  checkCompletedRow()
  checkGameOver()
}

function checkGameOver() {
  gameOverIndexes.forEach(element => {
    console.log('bottomBoundaryArray', bottomBoundaryArray.flat())
    if (bottomBoundaryArray.flat().includes(element)){
      handleStop()
    }
  })
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
      moveDown()
      break
    default:
  }
}

window.addEventListener('keydown', handleKeyDown)

window.addEventListener('DOMContentLoaded', createGameBoard)
