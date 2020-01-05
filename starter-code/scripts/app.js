// const game = {}
const squares = []
let shapeIndex


function createGameBoard() {
  const grid = document.querySelector('.grid')
  const width = 10
  const height = 20

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
  squares.forEach(square => square.classList.remove('black'))
  showShape(shapeIndex - 1)
}

function moveRight() {
  squares.forEach(square => square.classList.remove('black'))
  showShape(shapeIndex + 1)
}


window.addEventListener('DOMContentLoaded', createGameBoard)
