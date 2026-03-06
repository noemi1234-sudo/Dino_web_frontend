const dino = document.getElementById("dino")
const rock = document.getElementById("rock")
const score = document.getElementById("score")
const startButton = document.getElementById("startButton")

let gameStarted = false
let gameOver = false
let scoreInterval

score.innerText = 0

function jump() {
  if (!gameStarted || gameOver) return

  if (!dino.classList.contains("jump-animation")) {
    dino.classList.add("jump-animation")
    setTimeout(() => dino.classList.remove("jump-animation"), 1000)
  }
}

document.addEventListener("keypress", () => jump())

function startGame() {
  if (gameStarted) return

  gameStarted = true
  gameOver = false
  score.innerText = 0

  rock.style.display = "block"
  rock.classList.add("rock-animation")
  startButton.style.display = "none"

  scoreInterval = setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
    const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"))

    score.innerText = Number(score.innerText) + 1

    // Kollision prüfen
    if (rockLeft < 60 && rockLeft > 0 && dinoTop >= 160) {
      clearInterval(scoreInterval)
      rock.classList.remove("rock-animation")
      gameStarted = false
      gameOver = true
      startButton.style.display = "block"

      const gameOverMessage = document.getElementById("gameOverMessage")
      gameOverMessage.style.display = "block"
    }

  }, 50)
}

startButton.addEventListener("click", startGame)
