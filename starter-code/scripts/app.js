// const game = {}
const squares = []
const width = 10
const height = 20
let shapeIndex = 4
let currentIndexes
let cell0
let cell1
let cell2
let cell3
const arrayOfShapes = [
  'stick',
  'lShape',
  'jShape',
  'sShape',
  'zShape',
  'tShape',
  'cube'
]

let random = Math.floor(Math.random() * 7)
let tetrominoShape = arrayOfShapes[random]
const bottomBoundaryArray = []
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

function showShape(currentIndexes) {
  squares.forEach(square => square.classList.remove('black'))
  cell0 = document.querySelector(`#${CSS.escape(currentIndexes[0])}`)
  cell1 = document.querySelector(`#${CSS.escape(currentIndexes[1])}`)
  cell2 = document.querySelector(`#${CSS.escape(currentIndexes[2])}`)
  cell3 = document.querySelector(`#${CSS.escape(currentIndexes[3])}`)
  colorShape()
  console.log(currentIndexes)
}

function droppedShape(currentIndexes) {
  cell0 = document.querySelector(`#${CSS.escape(currentIndexes[0])}`)
  cell1 = document.querySelector(`#${CSS.escape(currentIndexes[1])}`)
  cell2 = document.querySelector(`#${CSS.escape(currentIndexes[2])}`)
  cell3 = document.querySelector(`#${CSS.escape(currentIndexes[3])}`)
  fixDroppedShape()
}

function fixDroppedShape() {
  cell0.classList.add('dropped')
  cell1.classList.add('dropped')
  cell2.classList.add('dropped')
  cell3.classList.add('dropped')
}

function colorShape() {
  cell0.classList.add('black')
  cell1.classList.add('black')
  cell2.classList.add('black')
  cell3.classList.add('black')
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
  // test game setup
  createNewTetromino()
  timerId = setInterval(moveDown, 200)
}

function handleStop() {
  clearInterval(timerId)
}

function createNewTetromino() {
  shapeIndex = 4
  random = Math.floor(Math.random() * 7)
  tetrominoShape = arrayOfShapes[random]
  createShape(shapeIndex, tetrominoShape)
  showShape(currentIndexes)
}

function checkBottomEdge(currentIndexes) {

  const bottomEdge = currentIndexes.filter(element => {
    const bottomBoundaryIndexes = [...new Set(bottomBoundaryArray.flat())]
    console.log(bottomBoundaryIndexes)
    return (element >= 190 && element < 200) || bottomBoundaryIndexes.includes(element)
  })
  return bottomEdge
}

function moveDown() {
  const bottomEdge = checkBottomEdge(currentIndexes)
  console.log('bottomEdge', bottomEdge)
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
