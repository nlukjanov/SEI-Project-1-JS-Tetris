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

  showShape(currentIndexes)
}

let shapeIndex = 5
let currentShape = 'stick'
let currentIndexes = [
  shapeIndex,
  shapeIndex + 1,
  shapeIndex + 2,
  shapeIndex + 3
]
let cell0
let cell1
let cell2
let cell3

function updateCurrentIndexes(shapeIndex) {
  return (currentIndexes = [
    shapeIndex,
    shapeIndex + 1,
    shapeIndex + 2,
    shapeIndex + 3
  ])
}

function showShape(currentIndexes) {
  squares.forEach(square => square.classList.remove('black'))
  cell0 = document.querySelector(`#${CSS.escape(currentIndexes[0])}`)
  cell1 = document.querySelector(`#${CSS.escape(currentIndexes[1])}`)
  cell2 = document.querySelector(`#${CSS.escape(currentIndexes[2])}`)
  cell3 = document.querySelector(`#${CSS.escape(currentIndexes[3])}`)
  colorShape()
}

function colorShape() {
  cell0.classList.add('black')
  cell1.classList.add('black')
  cell2.classList.add('black')
  cell3.classList.add('black')
}

function moveLeft() {
  if (shapeIndex % width > 0) {
    shapeIndex--
    updateCurrentIndexes(shapeIndex)
    showShape(currentIndexes)
  }
}

function moveRight() {
  if (shapeIndex % width < width - 4 /* this number 4 depends on the shape*/) {
    shapeIndex++
    updateCurrentIndexes(shapeIndex)
    showShape(currentIndexes)
  }
}

function moveDown() {
  if (shapeIndex + width < height * width) {
    shapeIndex = shapeIndex + 10
    updateCurrentIndexes(shapeIndex)
    showShape(currentIndexes)
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
