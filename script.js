let currentMoleTile
let currentPlantTile
let score = 0
let gameOver = false
let timeRemains = 5
let moleInterval
let plantInterval
let timeInterval
let restartClicked = false

window.onload = () => {
  setgame()
}

const restart = document.getElementById('restart')
restart.addEventListener('click', () => {
  if (restartClicked === false) {
    moleInterval = setInterval(setMole, 1000)
    plantInterval = setInterval(setPlant, 2000)
    timeInterval = setInterval(timeRemainsForHit, 1000)
    restartClicked = true
  }

  return
})

function setgame() {
  const board = document.getElementById('board')
  board.innerHTML = ''

  for (let i = 0; i < 9; i++) {
    const block = document.createElement('div')
    block.id = i.toString()
    block.onclick = clickmole
    board.appendChild(block)
  }

  moleInterval = setInterval(setMole, 1000)
  plantInterval = setInterval(setPlant, 2000)
  timeInterval = setInterval(timeRemainsForHit, 1000)
}

function setMole() {
  if (currentMoleTile) {
    currentMoleTile.innerHTML = ''
  }

  let randomtile
  do {
    randomtile = selectRandom()
  } while (
    randomtile == currentPlantTile?.id ||
    randomtile == currentMoleTile?.id
  )

  const mole = document.createElement('img')
  mole.src = './images/monty-mole.png'

  currentMoleTile = document.getElementById(randomtile)
  currentMoleTile.appendChild(mole)
}

function setPlant() {
  if (currentPlantTile) {
    currentPlantTile.innerHTML = ''
  }
  let randomtile
  do {
    randomtile = selectRandom()
  } while (
    randomtile == currentMoleTile?.id ||
    randomtile == currentPlantTile?.id
  )

  const plant = document.createElement('img')
  plant.src = './images/piranha-plant.png'
  currentPlantTile = document.getElementById(randomtile)
  currentPlantTile.appendChild(plant)
}

function selectRandom() {
  return Math.floor(Math.random() * 9)
}

function clickmole() {
  if (this.id == currentMoleTile.id) {
    score += 10
    console.log(score)
    document.getElementById('score').innerText = score.toString()
  }
  if (this.id == currentPlantTile.id) {
    document.getElementById('score').innerText =
      'GAME OVER: ' + score.toString()
    gameOver = true
  }
}

function timeRemainsForHit() {
  if (timeRemains == 0 || gameOver) {
    clearInterval(timeInterval)
    clearInterval(moleInterval)
    clearInterval(plantInterval)
    restartClicked = false
    document.getElementById('timeRemains').innerText = '0'
    return
  }
  timeRemains -= 1
  document.getElementById('timeRemains').innerText = timeRemains
}
