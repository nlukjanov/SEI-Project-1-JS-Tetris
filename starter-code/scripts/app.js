function init() {
  //  our code goes here
  const grid = document.querySelector('.grid')

  const width = 10
  const height = 20
  const squares = []
  let playerIndex = 0

  Array(height * width)
    .join('.')
    .split('.')
    .forEach(() => {
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      grid.appendChild(square)
    })

  squares[playerIndex].classList.add('player')
  function handleKeyDown(e) {
    switch (e.keyCode) {
      //left
      case 37:
        if (playerIndex % width > 0) {
          playerIndex--
        }
        break
        //up
      case 38:
        if (playerIndex - width >= 0) {
          playerIndex -= width
        }
        break
      //right
      case 39:
        if (playerIndex % width < width - 1) {
          playerIndex++
        }
        break
      //down
      case 40:
        if (playerIndex + width < height * width) {
          playerIndex += width
        }
        break
      default:
    }
    console.log(playerIndex)
    squares.forEach(square => square.classList.remove('player'))
    squares[playerIndex].classList.add('player')
  }

  // places player at the starting position when grid has finished building

  window.addEventListener('keydown', handleKeyDown)
}

window.addEventListener('DOMContentLoaded', init)
