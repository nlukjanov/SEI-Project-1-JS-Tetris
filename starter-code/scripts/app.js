// const game = {}
const squares = []
const width = 10
const height = 20

function createGameBoard() {
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

  // test game setup
  createShape(shapeIndex, tetrominoShape)
  showShape(currentIndexes)
}

let shapeIndex = 4
let tetrominoShape = 'sShape'
let currentIndexes
let cell0
let cell1
let cell2
let cell3

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
  console.log('shapeIndex', shapeIndex)
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
    console.log('shapeIndex', shapeIndex)
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  }
}

function moveDown() {
  if (shapeIndex + width < height * width) {
    shapeIndex = shapeIndex + 10
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  }
}

function rotate() {
  if (tetrominoShape === 'stick') {
    tetrominoShape = 'stick180'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (
    tetrominoShape === 'stick180' &&
    (shapeIndex + 1) % width !== 0 &&
    shapeIndex % width !== 7 &&
    shapeIndex % width !== 8
  ) {
    tetrominoShape = 'stick'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'lShape' && shapeIndex % width !== 0) {
    tetrominoShape = 'lShape90'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'lShape90') {
    tetrominoShape = 'lShape180'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'lShape180') {
    tetrominoShape = 'lShape270'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'lShape270') {
    tetrominoShape = 'lShape'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'lShape270') {
    tetrominoShape = 'lShape'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'jShape') {
    tetrominoShape = 'jShape90'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'jShape90') {
    tetrominoShape = 'jShape180'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'jShape180') {
    tetrominoShape = 'jShape270'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'jShape270') {
    tetrominoShape = 'jShape'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'sShape') {
    tetrominoShape = 'sShape90'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'sShape90') {
    tetrominoShape = 'sShape'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'zShape') {
    tetrominoShape = 'zShape90'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'zShape90') {
    tetrominoShape = 'zShape'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'tShape' && shapeIndex > 10) {
    tetrominoShape = 'tShape90'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'tShape90') {
    tetrominoShape = 'tShape180'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'tShape180') {
    tetrominoShape = 'tShape270'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
  } else if (tetrominoShape === 'tShape270') {
    tetrominoShape = 'tShape'
    createShape(shapeIndex, tetrominoShape)
    showShape(currentIndexes)
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
