// const game = {}
const squares = []
let shapeIndex
let tetromino
const width = 10
const height = 20
let cell0
let cell1
let cell2
let cell3

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

  showShape(65, 'zShape')
}

function setShape() {
  tetromino = 'zShape'
}

function colorShape() {
  cell0.classList.add('black')
  cell1.classList.add('black')
  cell2.classList.add('black')
  cell3.classList.add('black')
}

function showShape(startPoint, tetromino) {
  shapeIndex = startPoint
  if (tetromino === 'stick') {
    cell0 = document.querySelector(`#${CSS.escape(startPoint)}`)
    cell1 = document.querySelector(`#${CSS.escape(startPoint + 1)}`)
    cell2 = document.querySelector(`#${CSS.escape(startPoint + 2)}`)
    cell3 = document.querySelector(`#${CSS.escape(startPoint + 3)}`)
    colorShape()
    setShape()
  } else if (tetromino === 'lShape') {
    cell0 = document.querySelector(`#${CSS.escape(startPoint)}`)
    cell1 = document.querySelector(`#${CSS.escape(startPoint + 1)}`)
    cell2 = document.querySelector(`#${CSS.escape(startPoint + 2)}`)
    cell3 = document.querySelector(`#${CSS.escape(startPoint + 12)}`)

    colorShape()
    setShape()
  } else if (tetromino === 'sShape') {
    cell0 = document.querySelector(`#${CSS.escape(startPoint)}`)
    cell1 = document.querySelector(`#${CSS.escape(startPoint + 1)}`)
    cell2 = document.querySelector(`#${CSS.escape(startPoint + 9)}`)
    cell3 = document.querySelector(`#${CSS.escape(startPoint + 10)}`)

    colorShape()
    setShape()
  } else if (tetromino === 'cube') {
    cell0 = document.querySelector(`#${CSS.escape(startPoint)}`)
    cell1 = document.querySelector(`#${CSS.escape(startPoint + 1)}`)
    cell2 = document.querySelector(`#${CSS.escape(startPoint + 10)}`)
    cell3 = document.querySelector(`#${CSS.escape(startPoint + 11)}`)

    colorShape()
    setShape()
  } else if (tetromino === 'tShape') {
    cell0 = document.querySelector(`#${CSS.escape(startPoint)}`)
    cell1 = document.querySelector(`#${CSS.escape(startPoint + 9)}`)
    cell2 = document.querySelector(`#${CSS.escape(startPoint + 10)}`)
    cell3 = document.querySelector(`#${CSS.escape(startPoint + 11)}`)

    colorShape()
    setShape()
  } else if (tetromino === 'jShape') {
    cell0 = document.querySelector(`#${CSS.escape(startPoint)}`)
    cell1 = document.querySelector(`#${CSS.escape(startPoint + 1)}`)
    cell2 = document.querySelector(`#${CSS.escape(startPoint + 2)}`)
    cell3 = document.querySelector(`#${CSS.escape(startPoint + 10)}`)

    colorShape()
    setShape()
  } else if (tetromino === 'zShape') {
    cell0 = document.querySelector(`#${CSS.escape(startPoint)}`)
    cell1 = document.querySelector(`#${CSS.escape(startPoint + 1)}`)
    cell2 = document.querySelector(`#${CSS.escape(startPoint + 11)}`)
    cell3 = document.querySelector(`#${CSS.escape(startPoint + 12)}`)

    colorShape()
    setShape()
  }
}

function moveLeft() {
  console.log('tetromino', tetromino)
  if (shapeIndex % width > 0) {
    squares.forEach(square => square.classList.remove('black'))
    showShape(shapeIndex - 1, tetromino)
  }
}

function moveRight() {
  if (shapeIndex % width < width - 4 /* this number 4 depends on the shape*/) {
    squares.forEach(square => square.classList.remove('black'))
    showShape(shapeIndex + 1, tetromino)
  }
}

function moveDown() {
  if (shapeIndex + width < height * width) {
    squares.forEach(square => square.classList.remove('black'))
    showShape(shapeIndex + 10, tetromino)
  }
}

function rotate() {
  
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
