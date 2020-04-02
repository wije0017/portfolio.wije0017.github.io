const difficultyEasy = ['ps', 'ai', 'pr', 'ae']
const difficultyNormal = ['ps', 'ai', 'pr', 'ae', 'xd', 'lr', 'au', 'dw']
const difficultyHard = ['ps', 'ai', 'pr', 'ae', 'xd', 'lr', 'au', 'dw', 'mu', 'pl']

const $container = document.getElementById('container')

const home = $container.innerHTML = `
  <div class="home">
    <h1>Memory Game</h1>
    <p>The aim of this game is to memorize the location of different cards and pair them with it's match from the stack as you flip cards. Successfully matching all cards will win the game. Start clicking!</p>
    <h3>Choose Difficulty</h3>
    
      <div class="actions difficulty-actions">
        <button onclick="showCards(difficultyEasy)" class="difficulty easy">EASY</button>
        <button onclick="showCards(difficultyNormal)" class="difficulty normal">NORMAL</button>
        <button onclick="showCards(difficultyHard)" class="difficulty hard">HARD</button>
      </div>
      
  </div>`
const cardBack = 'cc'

const $difficulty = []

function showCards (x) {
  let double = x.slice(0, 1).concat(x.slice(0, 1))
  document.getElementById('container').innerHTML = ''
  for (const card of double) {
    for (const card of x) {
      $difficulty.push(`<div class="memory-card" data-match="${card}">
      <img class="front-face" src="img/${card}.png" alt="${card}">
      <img class="back-face" src="img/${cardBack}.png" alt="Memory Card">
      </div>`)
    }
  }

  $container.innerHTML = $difficulty.join('')

  const $memoryCard = document.querySelectorAll('.memory-card')

  let flippedCard = false
  let lockCards = false
  let firstPick, secondPick

  function flipCard () {
    if (lockCards) return
    if (this === firstPick) return

    this.classList.add('flip')

    if (!flippedCard) {
      flippedCard = true
      firstPick = this
      return
    }
    if (document.querySelectorAll('.container div.flip').length == document.querySelectorAll('.container div.memory-card').length) {
      $container.classList.add('slide-out-bottom')
      setTimeout(() => {
        alert('NICE JOB!')
        window.location.reload()
      }, 1100)
      // $container.innerHTML = $difficulty.join('')
    }

    secondPick = this

    matchingCards()
  }

  function matchingCards () {
    if (firstPick.dataset.match === secondPick.dataset.match) {
      matchFound()
      return
    }
    unflipCards()
  }

  function matchFound () {
    firstPick.removeEventListener('click', flipCard)
    secondPick.removeEventListener('click', flipCard)
    reset()
  }

  function unflipCards () {
    lockCards = true
    setTimeout(() => {
      firstPick.classList.remove('flip')
      secondPick.classList.remove('flip')
      reset()
    }, 1500)
  }

  function reset () {
    [flippedCard, lockCards] = [false, false];
    [firstPick, secondPick] = [null, null]
  }

  // shuffle from stackoverflow
  (function shuffle () {
    $memoryCard.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * difficultyEasy.length + difficultyNormal.length + difficultyHard.length)
      card.style.order = ramdomPos
    })
  })()

  $memoryCard.forEach(card => card.addEventListener('click', flipCard))
}
