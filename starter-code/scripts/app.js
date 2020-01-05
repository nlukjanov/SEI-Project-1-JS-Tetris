// const game = {}
const squares = []
let shapeIndex
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

  showShape(65)
}

function showShape(startPoint) {
  shapeIndex = startPoint
  const cell0 = document.querySelector(`#${CSS.escape(startPoint)}`)
  const cell1 = document.querySelector(`#${CSS.escape(startPoint + 1)}`)
  const cell2 = document.querySelector(`#${CSS.escape(startPoint + 2)}`)
  const cell3 = document.querySelector(`#${CSS.escape(startPoint + 3)}`)

  cell0.classList.add('black')
  cell1.classList.add('black')
  cell2.classList.add('black')
  cell3.classList.add('black')
}

function moveLeft() {
  if (shapeIndex % width > 0) {
    squares.forEach(square => square.classList.remove('black'))
    showShape(shapeIndex - 1)
  }
}

function moveRight() {
  if (shapeIndex % width < width - 4 /* this number 4 depends on the shape*/) {
    squares.forEach(square => square.classList.remove('black'))
    showShape(shapeIndex + 1)
  }
}

function moveDown() {
  if (shapeIndex + width < height * width) {
    squares.forEach(square => square.classList.remove('black'))
    showShape(shapeIndex + 10)
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
      // if (playerIndex - width >= 0) {
      //   playerIndex -= width
      // }
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
